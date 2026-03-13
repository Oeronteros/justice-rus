import { beforeEach, describe, expect, it, vi } from 'vitest';

const {
  verifyTokenMock,
  ensureAccountsSchemaMock,
  getPoolMock,
  hasDatabaseUrlMock,
  getCachedTableColumnsMock,
} = vi.hoisted(() => ({
  verifyTokenMock: vi.fn(),
  ensureAccountsSchemaMock: vi.fn(),
  getPoolMock: vi.fn(),
  hasDatabaseUrlMock: vi.fn(),
  getCachedTableColumnsMock: vi.fn(),
}));

vi.mock('@/lib/auth', () => ({
  verifyToken: verifyTokenMock,
}));

vi.mock('@/lib/auth/accounts', () => ({
  ensureAccountsSchema: ensureAccountsSchemaMock,
}));

vi.mock('@/lib/neon', () => ({
  getPool: getPoolMock,
  hasDatabaseUrl: hasDatabaseUrlMock,
}));

vi.mock('@/lib/server/db-cache', () => ({
  getCachedTableColumns: getCachedTableColumnsMock,
}));

import { resolveSessionFromToken } from '@/lib/server/auth-session';

describe('resolveSessionFromToken', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    hasDatabaseUrlMock.mockReturnValue(false);
  });

  it('returns missing-token when auth token is absent', async () => {
    const result = await resolveSessionFromToken(null);

    expect(result).toEqual({ valid: false, reason: 'missing-token' });
    expect(verifyTokenMock).not.toHaveBeenCalled();
  });

  it('returns invalid-token when jwt verification fails', async () => {
    verifyTokenMock.mockReturnValue(null);

    const result = await resolveSessionFromToken('bad-token');

    expect(result).toEqual({ valid: false, reason: 'invalid-token' });
  });

  it('returns pin user without DB lookup when authMethod is pin', async () => {
    verifyTokenMock.mockReturnValue({
      id: 'pin-officer',
      nickname: 'OFFICER PIN',
      role: 'officer',
      isActive: true,
      authMethod: 'pin',
      discordId: null,
      discordHandle: null,
    });

    const result = await resolveSessionFromToken('pin-token');

    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.user.authMethod).toBe('pin');
      expect(result.user.className).toBeNull();
    }
    expect(ensureAccountsSchemaMock).not.toHaveBeenCalled();
  });

  it('returns account-state-unavailable when account token has no id', async () => {
    verifyTokenMock.mockReturnValue({
      role: 'guest',
      authMethod: 'account',
      nickname: 'NoId',
    });

    const result = await resolveSessionFromToken('account-token');

    expect(result).toEqual({ valid: false, reason: 'account-state-unavailable' });
  });

  it.each(['member-1', 'officer-1'])('rejects malformed account id %s before any DB query', async (invalidId) => {
    hasDatabaseUrlMock.mockReturnValue(true);
    const queryMock = vi.fn();

    verifyTokenMock.mockReturnValue({
      id: invalidId,
      role: 'member',
      authMethod: 'account',
      nickname: 'Smoke Member',
    });
    getPoolMock.mockReturnValue({ query: queryMock });

    const result = await resolveSessionFromToken('account-token');

    expect(result).toEqual({ valid: false, reason: 'account-state-unavailable' });
    expect(ensureAccountsSchemaMock).not.toHaveBeenCalled();
    expect(queryMock).not.toHaveBeenCalled();
  });

  it('resolves active account user with class name from registrations', async () => {
    hasDatabaseUrlMock.mockReturnValue(true);
    verifyTokenMock.mockReturnValue({
      id: '123',
      nickname: 'PlayerOne',
      role: 'member',
      authMethod: 'account',
      discordId: 'discord-1',
      discordHandle: 'player#1234',
    });

    const queryMock = vi
      .fn()
      .mockResolvedValueOnce({
        rows: [
          {
            id: '123',
            nickname: 'PlayerOne',
            class_name: 'Monk',
            discord_handle: 'player#1234',
            role: 'member',
            is_active: true,
          },
        ],
      })
      .mockResolvedValueOnce({ rows: [{ class_name: 'Assassin' }] });

    getPoolMock.mockReturnValue({ query: queryMock });
    getCachedTableColumnsMock.mockResolvedValue(new Set(['nick', 'class_name']));

    const result = await resolveSessionFromToken('account-token');

    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.user.id).toBe('123');
      expect(result.user.className).toBe('Assassin');
      expect(result.user.discordHandle).toBe('player#1234');
      expect(result.user.authMethod).toBe('account');
    }
  });
});
