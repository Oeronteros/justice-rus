import { describe, expect, it } from 'vitest';
import { sortRegistrations } from '@/components/sections/registration/sortRegistrations';
import type { Registration } from '@/types';

const baseRegistration = {
  discord: 'discord',
  avatarUrl: null,
  class: 'Numina',
  guild: 'Silent Moonfall',
  joinDate: '2025-01-01',
  elo: 1000,
  mmr20: 1000,
  bounty: 0,
  marks: 0,
  outerHeroic: 0,
  innerHeroic: 0,
  crimsonSands: 0,
  abyss: 0,
  gvg: 0,
  secretRealm: 0,
  duelWins: 0,
  duelLosses: 0,
} satisfies Omit<Registration, 'nickname' | 'rank' | 'kpi' | 'status'>;

function createRegistration(overrides: Partial<Registration>): Registration {
  return {
    ...baseRegistration,
    nickname: 'Player',
    rank: 'member',
    kpi: 0,
    status: 'active',
    ...overrides,
  };
}

describe('sortRegistrations', () => {
  const registrations: Registration[] = [
    createRegistration({ nickname: 'Яр', rank: 'member', kpi: 80, status: 'inactive' }),
    createRegistration({ nickname: 'Альфа', rank: 'sysadmin', kpi: 10, status: 'active' }),
    createRegistration({ nickname: 'Бета', rank: 'officer', kpi: 95, status: 'pending' }),
  ];

  it('sorts by nickname ascending', () => {
    expect(sortRegistrations(registrations, 'nickname-asc').map((item) => item.nickname)).toEqual(['Альфа', 'Бета', 'Яр']);
  });

  it('sorts by rank descending', () => {
    expect(sortRegistrations(registrations, 'rank-desc').map((item) => item.nickname)).toEqual(['Альфа', 'Бета', 'Яр']);
  });

  it('sorts by KPI descending', () => {
    expect(sortRegistrations(registrations, 'kpi-desc').map((item) => item.nickname)).toEqual(['Бета', 'Яр', 'Альфа']);
  });

  it('sorts by status priority', () => {
    expect(sortRegistrations(registrations, 'status-asc').map((item) => item.nickname)).toEqual(['Альфа', 'Бета', 'Яр']);
  });
});
