import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

const {
  verifyTokenMock,
  hasDatabaseUrlMock,
  getAuthTokenMock,
  isSameOriginMock,
  clearAuthCookieMock,
  resolveSessionFromTokenMock,
  getPvpStateMock,
  joinPvpQueueMock,
  leavePvpQueueMock,
  reportPvpResultMock,
} = vi.hoisted(() => ({
  verifyTokenMock: vi.fn(),
  hasDatabaseUrlMock: vi.fn(),
  getAuthTokenMock: vi.fn(),
  isSameOriginMock: vi.fn(),
  clearAuthCookieMock: vi.fn(),
  resolveSessionFromTokenMock: vi.fn(),
  getPvpStateMock: vi.fn(),
  joinPvpQueueMock: vi.fn(),
  leavePvpQueueMock: vi.fn(),
  reportPvpResultMock: vi.fn(),
}));

vi.mock('@/lib/auth', () => ({
  verifyToken: verifyTokenMock,
}));

vi.mock('@/lib/neon', () => ({
  hasDatabaseUrl: hasDatabaseUrlMock,
}));

vi.mock('@/lib/auth/request', () => ({
  getAuthToken: getAuthTokenMock,
  isSameOrigin: isSameOriginMock,
  clearAuthCookie: clearAuthCookieMock,
}));

vi.mock('@/lib/server/auth-session', () => ({
  resolveSessionFromToken: resolveSessionFromTokenMock,
}));

vi.mock('@/lib/server/pvp/service', () => ({
  getPvpState: getPvpStateMock,
  joinPvpQueue: joinPvpQueueMock,
  leavePvpQueue: leavePvpQueueMock,
  reportPvpResult: reportPvpResultMock,
}));

import { GET, PATCH, POST } from '@/app/api/pvp/route';

describe('app/api/pvp/route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getAuthTokenMock.mockReturnValue('valid-token');
    hasDatabaseUrlMock.mockReturnValue(true);
    isSameOriginMock.mockReturnValue(true);
    resolveSessionFromTokenMock.mockResolvedValue({
      valid: true,
      user: {
        id: '42',
        nickname: 'Moon',
        role: 'member',
        isActive: true,
        authMethod: 'account',
      },
    });
    getPvpStateMock.mockResolvedValue({ queue: [], leaderboard: [], recentMatches: [], activeMatch: null, userInQueue: false, userRating: null });
    joinPvpQueueMock.mockResolvedValue({ queue: [], leaderboard: [], recentMatches: [], activeMatch: null, userInQueue: true, userRating: null });
    leavePvpQueueMock.mockResolvedValue({ queue: [], leaderboard: [], recentMatches: [], activeMatch: null, userInQueue: false, userRating: null });
    reportPvpResultMock.mockResolvedValue({ queue: [], leaderboard: [], recentMatches: [], activeMatch: null, userInQueue: false, userRating: null });
  });

  it('rejects inactive sessions on state reads', async () => {
    resolveSessionFromTokenMock.mockResolvedValueOnce({ valid: false, reason: 'inactive-account' });

    const response = await GET(new NextRequest('http://localhost/api/pvp'));
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body.error).toBe('Account is inactive');
    expect(getPvpStateMock).not.toHaveBeenCalled();
  });

  it('rejects cross-origin queue joins before service logic runs', async () => {
    isSameOriginMock.mockReturnValueOnce(false);

    const request = new NextRequest('http://localhost/api/pvp', { method: 'POST' });
    const response = await POST(request);

    expect(response.status).toBe(403);
    expect(joinPvpQueueMock).not.toHaveBeenCalled();
  });

  it('rejects invalid result payloads before report service runs', async () => {
    const request = new NextRequest('http://localhost/api/pvp', {
      method: 'PATCH',
      body: JSON.stringify({ matchId: '', result: 'draw' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await PATCH(request);

    expect(response.status).toBe(400);
    expect(reportPvpResultMock).not.toHaveBeenCalled();
  });
});
