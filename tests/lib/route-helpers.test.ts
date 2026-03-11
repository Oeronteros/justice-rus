import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { z } from 'zod';

const {
  verifyTokenMock,
  getAuthTokenMock,
  isSameOriginMock,
  hasDatabaseUrlMock,
} = vi.hoisted(() => ({
  verifyTokenMock: vi.fn(),
  getAuthTokenMock: vi.fn(),
  isSameOriginMock: vi.fn(),
  hasDatabaseUrlMock: vi.fn(),
}));

vi.mock('@/lib/auth', () => ({
  verifyToken: verifyTokenMock,
}));

vi.mock('@/lib/auth/request', () => ({
  getAuthToken: getAuthTokenMock,
  isSameOrigin: isSameOriginMock,
}));

vi.mock('@/lib/neon', () => ({
  hasDatabaseUrl: hasDatabaseUrlMock,
}));

import {
  handleRouteError,
  parseJsonBody,
  requireAuth,
  requireDatabase,
  requireMinimumRole,
  requirePermission,
  requireSameOrigin,
} from '@/lib/server/route-helpers';

describe('route-helpers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    isSameOriginMock.mockReturnValue(true);
    hasDatabaseUrlMock.mockReturnValue(true);
  });

  it('returns unauthorized response when token is missing or invalid', () => {
    getAuthTokenMock.mockReturnValue(null);

    const result = requireAuth(new Request('http://localhost/api/test'));

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.response.status).toBe(401);
    }
  });

  it('returns authenticated user when token verification succeeds', () => {
    getAuthTokenMock.mockReturnValue('token');
    verifyTokenMock.mockReturnValue({ role: 'officer', nickname: 'Moon', id: '42' });

    const result = requireAuth(new Request('http://localhost/api/test'));

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.nickname).toBe('Moon');
      expect(result.value.role).toBe('officer');
    }
  });

  it('returns forbidden response when minimum role is not satisfied', () => {
    const result = requireMinimumRole({ role: 'member' }, 'officer');

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.response.status).toBe(403);
    }
  });

  it('returns forbidden response when custom permission predicate fails', () => {
    const result = requirePermission({ role: 'member' }, () => false);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.response.status).toBe(403);
    }
  });

  it('returns forbidden response when origin check fails', () => {
    isSameOriginMock.mockReturnValue(false);

    const result = requireSameOrigin(new NextRequest('http://localhost/api/test'));

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.response.status).toBe(403);
    }
  });

  it('returns service unavailable when database is not configured', () => {
    hasDatabaseUrlMock.mockReturnValue(false);

    const result = requireDatabase();

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.response.status).toBe(503);
    }
  });

  it('parses valid JSON request bodies through a schema', async () => {
    const request = new Request('http://localhost/api/test', {
      method: 'POST',
      body: JSON.stringify({ title: 'Valid title' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await parseJsonBody(request, z.object({ title: z.string().min(1) }));

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.title).toBe('Valid title');
    }
  });

  it('returns a 400 response when schema validation fails', async () => {
    const request = new Request('http://localhost/api/test', {
      method: 'POST',
      body: JSON.stringify({ title: '' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await parseJsonBody(request, z.object({ title: z.string().min(1) }));

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.response.status).toBe(400);
    }
  });

  it('returns a 400 response when request JSON is malformed', async () => {
    const request = new Request('http://localhost/api/test', {
      method: 'POST',
      body: '{bad json',
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await parseJsonBody(request, z.object({ title: z.string() }));

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.response.status).toBe(400);
    }
  });

  it('maps unexpected route errors to a 500 response', () => {
    const response = handleRouteError(new Error('boom'), {
      logLabel: 'Route failed:',
      fallbackMessage: 'Route failed',
    });

    expect(response.status).toBe(500);
  });
});
