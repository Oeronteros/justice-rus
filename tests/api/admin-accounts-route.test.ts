import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

const {
  getAuthTokenMock,
  isSameOriginMock,
  verifyTokenMock,
  hasDatabaseUrlMock,
  ensureAccountsSchemaMock,
  toPublicAccountMock,
  queryMock,
} = vi.hoisted(() => ({
  getAuthTokenMock: vi.fn(),
  isSameOriginMock: vi.fn(),
  verifyTokenMock: vi.fn(),
  hasDatabaseUrlMock: vi.fn(),
  ensureAccountsSchemaMock: vi.fn(),
  toPublicAccountMock: vi.fn(),
  queryMock: vi.fn(),
}));

vi.mock('@/lib/auth/request', () => ({
  getAuthToken: getAuthTokenMock,
  isSameOrigin: isSameOriginMock,
}));

vi.mock('@/lib/auth', () => ({
  verifyToken: verifyTokenMock,
}));

vi.mock('@/lib/neon', () => ({
  getPool: () => ({ query: queryMock }),
  hasDatabaseUrl: hasDatabaseUrlMock,
}));

vi.mock('@/lib/auth/accounts', () => ({
  ensureAccountsSchema: ensureAccountsSchemaMock,
  toPublicAccount: toPublicAccountMock,
}));

import { GET, PATCH } from '@/app/api/admin/accounts/route';

describe('app/api/admin/accounts/route', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    getAuthTokenMock.mockReturnValue('valid-token');
    isSameOriginMock.mockReturnValue(true);
    hasDatabaseUrlMock.mockReturnValue(true);
    ensureAccountsSchemaMock.mockResolvedValue(undefined);
    toPublicAccountMock.mockImplementation((row) => ({
      id: String(row.id),
      nickname: row.nickname,
      role: row.role,
      isActive: row.is_active,
      prefix: row.prefix,
    }));
    verifyTokenMock.mockReturnValue({
      id: '42',
      nickname: 'Moon',
      role: 'officer',
      isActive: true,
      authMethod: 'account',
    });
  });

  it('rejects member access to the accounts list', async () => {
    verifyTokenMock.mockReturnValueOnce({
      id: '7',
      nickname: 'Member',
      role: 'member',
      isActive: true,
      authMethod: 'account',
    });

    const response = await GET(new NextRequest('http://localhost/api/admin/accounts'));
    const body = await response.json();

    expect(response.status).toBe(403);
    expect(body.error).toBe('Forbidden');
    expect(ensureAccountsSchemaMock).not.toHaveBeenCalled();
    expect(queryMock).not.toHaveBeenCalled();
  });

  it('blocks cross-origin account updates before auth or database work runs', async () => {
    isSameOriginMock.mockReturnValueOnce(false);

    const response = await PATCH(
      new NextRequest('http://localhost/api/admin/accounts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: '7', isActive: true }),
      })
    );
    const body = await response.json();

    expect(response.status).toBe(403);
    expect(body.error).toBe('Forbidden origin');
    expect(verifyTokenMock).not.toHaveBeenCalled();
    expect(queryMock).not.toHaveBeenCalled();
  });

  it('prevents officers from assigning roles even when they can manage accounts', async () => {
    const response = await PATCH(
      new NextRequest('http://localhost/api/admin/accounts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: '7', isActive: true, role: 'head' }),
      })
    );
    const body = await response.json();

    expect(response.status).toBe(403);
    expect(body.error).toBe('Only head/sysadmin can assign roles');
    expect(ensureAccountsSchemaMock).not.toHaveBeenCalled();
    expect(queryMock).not.toHaveBeenCalled();
  });

  it('allows heads to assign roles through the update route', async () => {
    verifyTokenMock.mockReturnValueOnce({
      id: '99',
      nickname: 'Head',
      role: 'head',
      isActive: true,
      authMethod: 'account',
    });
    queryMock.mockResolvedValueOnce({
      rows: [
        {
          id: 7,
          nickname: 'Recruit',
          role: 'officer',
          is_active: true,
          prefix: 'SM',
        },
      ],
    });

    const response = await PATCH(
      new NextRequest('http://localhost/api/admin/accounts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: '7', isActive: true, role: 'officer', prefix: 'SM' }),
      })
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(ensureAccountsSchemaMock).toHaveBeenCalledTimes(1);
    expect(queryMock).toHaveBeenCalledWith(expect.stringContaining('UPDATE portal_account'), [7, true, 'officer', 'SM']);
    expect(body).toEqual({
      id: '7',
      nickname: 'Recruit',
      role: 'officer',
      isActive: true,
      prefix: 'SM',
    });
  });
});
