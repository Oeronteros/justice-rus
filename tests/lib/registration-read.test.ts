import { beforeEach, describe, expect, it, vi } from 'vitest';

const queryMock = vi.fn();
const ensureRegistrationStatsSchemaMock = vi.fn();
const getTableColumnsMock = vi.fn();
const syncPortalMemberAvatarSeedsMock = vi.fn();

vi.mock('@/lib/neon', () => ({
  getPool: () => ({
    query: queryMock,
  }),
}));

vi.mock('@/lib/server/registration/schema', () => ({
  ensureRegistrationStatsSchema: ensureRegistrationStatsSchemaMock,
  getTableColumns: getTableColumnsMock,
}));

vi.mock('@/lib/server/registration/avatar', () => ({
  syncPortalMemberAvatarSeeds: syncPortalMemberAvatarSeedsMock,
  getRegistrationAvatarUrl: () => null,
}));

describe('getRegistrationsFromDb', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();

    ensureRegistrationStatsSchemaMock.mockResolvedValue(undefined);
    syncPortalMemberAvatarSeedsMock.mockResolvedValue(new Map());
    getTableColumnsMock.mockImplementation(async (tableName: string) => {
      if (tableName === 'registrations') {
        return new Set(['discord_login', 'nick', 'class_name', 'guild_name', 'created_at']);
      }

      return new Set<string>();
    });
  });

  it('excludes inactive linked and portal-only accounts from participants', async () => {
    queryMock
      .mockResolvedValueOnce({
        rows: [
          {
            id: 1,
            nickname: 'ActivePortal',
            class_name: 'Numina',
            guild_name: 'Moonfall',
            discord_handle: 'active_portal',
            role: 'member',
            is_active: true,
            created_at: '2025-01-01T00:00:00.000Z',
            duel_rating: 1200,
            duel_wins: 3,
            duel_losses: 1,
            best_mmr: 1400,
            bounty_score: 2,
            outer_heroic: 1,
            inner_heroic: 0,
            crimson_sands: 0,
            abyss_score: 0,
            gvg_score: 0,
            secret_realm_score: 1,
          },
          {
            id: 2,
            nickname: 'InactivePortal',
            class_name: 'Sylph',
            guild_name: 'Moonfall',
            discord_handle: 'inactive_portal',
            role: 'member',
            is_active: false,
            created_at: '2025-01-02T00:00:00.000Z',
            duel_rating: 1100,
            duel_wins: 1,
            duel_losses: 2,
            best_mmr: 1000,
            bounty_score: 0,
            outer_heroic: 0,
            inner_heroic: 0,
            crimson_sands: 0,
            abyss_score: 0,
            gvg_score: 0,
            secret_realm_score: 0,
          },
        ],
      })
      .mockResolvedValueOnce({
        rows: [
          {
            discord: 'discord-active-linked',
            avatar_url: null,
            nickname: 'ActiveLinked',
            discord_handle: 'active_linked',
            class_name: 'Numina',
            guild_name: 'Moonfall',
            join_date: '2025-01-03T00:00:00.000Z',
            role: 'member',
            account_status: 'active',
            outer_heroic: 2,
            inner_heroic: 0,
            crimson_sands: 1,
            abyss_score: 0,
            bounty_score: 4,
            gvg_score: 0,
            best_mmr: 1500,
            secret_realm_score: 1,
            duel_rating: 1250,
            duel_wins: 7,
            duel_losses: 3,
          },
          {
            discord: 'discord-inactive-linked',
            avatar_url: null,
            nickname: 'InactiveLinked',
            discord_handle: 'inactive_linked',
            class_name: 'Sylph',
            guild_name: 'Moonfall',
            join_date: '2025-01-04T00:00:00.000Z',
            role: 'member',
            account_status: 'inactive',
            outer_heroic: 0,
            inner_heroic: 0,
            crimson_sands: 0,
            abyss_score: 0,
            bounty_score: 0,
            gvg_score: 0,
            best_mmr: 900,
            secret_realm_score: 0,
            duel_rating: 1000,
            duel_wins: 0,
            duel_losses: 1,
          },
        ],
      });

    const { getRegistrationsFromDb } = await import('@/lib/server/registration/read');
    const registrations = await getRegistrationsFromDb();

    expect(registrations.map((entry) => entry.nickname)).toEqual(['ActiveLinked', 'ActivePortal']);
    expect(registrations.every((entry) => entry.status === 'active')).toBe(true);
  });
});
