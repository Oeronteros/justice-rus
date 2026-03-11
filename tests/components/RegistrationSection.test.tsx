import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import RegistrationSection from '@/components/sections/registration';
import { I18nProvider } from '@/lib/i18n/context';
import type { User } from '@/lib/schemas/auth';
import type { Registration } from '@/lib/schemas/registration';
import { defaultRegistrationColumnLabels } from '@/components/sections/registration/columnLabels';

const refetchMock = vi.fn();

const roster: Registration[] = [
  {
    discord: 'discord-001',
    avatarUrl: null,
    nickname: 'Moonblade',
    rank: 'member',
    class: 'Numina',
    guild: 'Silent Moonfall',
    joinDate: '2025-01-01',
    kpi: 88,
    elo: 1200,
    mmr20: 1500,
    bounty: 10,
    marks: 0,
    outerHeroic: 1,
    innerHeroic: 1,
    crimsonSands: 0,
    abyss: 0,
    gvg: 1,
    secretRealm: 1,
    duelWins: 3,
    duelLosses: 1,
    status: 'active',
  },
];

const sharedColumnLabels = {
  ...defaultRegistrationColumnLabels,
  guild: 'Общий клан',
};

vi.mock('@/lib/registration/hooks', () => ({
  useRegistrations: () => ({
    data: roster,
    isLoading: false,
    error: null,
    refetch: refetchMock,
  }),
  useRegistrationColumnLabels: () => ({
    data: sharedColumnLabels,
  }),
  useUpdateRegistrationColumnLabels: () => ({
    mutateAsync: vi.fn(),
    isPending: false,
  }),
  useUpdateRegistrationStats: () => ({
    mutateAsync: vi.fn(),
    isPending: false,
  }),
}));

describe('RegistrationSection column label access', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('shows shared column labels to members without edit controls', () => {
    const user: User = {
      id: 'member-1',
      nickname: 'Member',
      role: 'member',
      isActive: true,
    };

    render(
      <I18nProvider>
        <RegistrationSection user={user} />
      </I18nProvider>
    );

    expect(screen.queryByRole('button', { name: 'Переименовать столбцы' })).not.toBeInTheDocument();
    expect(screen.getAllByText('Общий клан').length).toBeGreaterThan(0);
  });

  it('shows edit controls to officers and above', () => {
    const user: User = {
      id: 'officer-1',
      nickname: 'Officer',
      role: 'officer',
      isActive: true,
    };

    render(
      <I18nProvider>
        <RegistrationSection user={user} />
      </I18nProvider>
    );

    expect(screen.getByRole('button', { name: 'Переименовать столбцы' })).toBeInTheDocument();
    expect(screen.getAllByText('Общий клан').length).toBeGreaterThan(0);
  });
});
