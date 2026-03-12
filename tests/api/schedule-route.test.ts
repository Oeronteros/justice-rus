import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

const {
  verifyTokenMock,
  getAuthTokenMock,
  isSameOriginMock,
  clearAuthCookieMock,
  resolveSessionFromTokenMock,
  createScheduleEntryMock,
  updateScheduleEntryMock,
  listScheduleMock,
} = vi.hoisted(() => ({
  verifyTokenMock: vi.fn(),
  getAuthTokenMock: vi.fn(),
  isSameOriginMock: vi.fn(),
  clearAuthCookieMock: vi.fn(),
  resolveSessionFromTokenMock: vi.fn(),
  createScheduleEntryMock: vi.fn(),
  updateScheduleEntryMock: vi.fn(),
  listScheduleMock: vi.fn(),
}));

vi.mock('@/lib/auth', () => ({
  verifyToken: verifyTokenMock,
}));

vi.mock('@/lib/auth/request', () => ({
  getAuthToken: getAuthTokenMock,
  isSameOrigin: isSameOriginMock,
  clearAuthCookie: clearAuthCookieMock,
}));

vi.mock('@/lib/server/auth-session', () => ({
  resolveSessionFromToken: resolveSessionFromTokenMock,
}));

vi.mock('@/lib/server/schedule/source', () => ({
  createScheduleEntry: createScheduleEntryMock,
  updateScheduleEntry: updateScheduleEntryMock,
  listSchedule: listScheduleMock,
}));

import { PATCH, POST } from '@/app/api/schedule/route';

describe('app/api/schedule/route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getAuthTokenMock.mockReturnValue('valid-token');
    isSameOriginMock.mockReturnValue(true);
    resolveSessionFromTokenMock.mockResolvedValue({
      valid: true,
      user: {
        id: '42',
        nickname: 'Moon',
        role: 'officer',
        isActive: true,
        authMethod: 'account',
      },
    });
    createScheduleEntryMock.mockResolvedValue({ id: '1', date: '', registration: '', type: '', description: '', group: '' });
    updateScheduleEntryMock.mockResolvedValue({ id: '1', date: '', registration: '', type: '', description: '', group: '' });
  });

  it('rejects inactive sessions before write logic runs', async () => {
    resolveSessionFromTokenMock.mockResolvedValueOnce({ valid: false, reason: 'inactive-account' });

    const request = new NextRequest('http://localhost/api/schedule', {
      method: 'POST',
      body: JSON.stringify({ dayType: 'raid', time: '21:00', titleRu: 'Рейд', titleEn: 'Raid' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body.error).toBe('Account is inactive');
    expect(clearAuthCookieMock).toHaveBeenCalledTimes(1);
    expect(createScheduleEntryMock).not.toHaveBeenCalled();
  });

  it('rejects cross-origin writes before session lookup', async () => {
    isSameOriginMock.mockReturnValueOnce(false);

    const request = new NextRequest('http://localhost/api/schedule', {
      method: 'POST',
      body: JSON.stringify({ dayType: 'raid', time: '21:00', titleRu: 'Рейд', titleEn: 'Raid' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);

    expect(response.status).toBe(403);
    expect(resolveSessionFromTokenMock).not.toHaveBeenCalled();
    expect(createScheduleEntryMock).not.toHaveBeenCalled();
  });

  it('returns 400 for invalid payloads before service write logic', async () => {
    const request = new NextRequest('http://localhost/api/schedule', {
      method: 'POST',
      body: JSON.stringify({ dayType: '', time: '21:00' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    expect(createScheduleEntryMock).not.toHaveBeenCalled();
  });

  it('passes parsed payload and active session to schedule write service', async () => {
    const request = new NextRequest('http://localhost/api/schedule', {
      method: 'PATCH',
      body: JSON.stringify({ id: '1', dayType: 'raid', time: '21:00', titleRu: 'Рейд', titleEn: 'Raid' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await PATCH(request);

    expect(response.status).toBe(200);
    expect(updateScheduleEntryMock).toHaveBeenCalledWith(
      expect.objectContaining({ id: '1', dayType: 'raid', time: '21:00', titleRu: 'Рейд', titleEn: 'Raid' }),
      expect.objectContaining({ id: '42', role: 'officer' })
    );
  });
});
