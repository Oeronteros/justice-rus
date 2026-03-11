import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import ProfileSection from '@/components/sections/profile';
import { I18nProvider } from '@/lib/i18n/context';
import type { User } from '@/lib/schemas/auth';
import type { Registration } from '@/lib/schemas/registration';

const mutateProfileStats = vi.fn();
const mockedRoster: Registration[] = [
  {
    discord: 'discord-001',
    avatarUrl: null,
    nickname: 'Tester',
    rank: 'member',
    class: 'Numina',
    guild: 'Moonfall',
    joinDate: '2025-01-01',
    kpi: 50,
    elo: 1200,
    mmr20: 1400,
    bounty: 3,
    marks: 0,
    outerHeroic: 1,
    innerHeroic: 0,
    crimsonSands: 1,
    abyss: 0,
    gvg: 0,
    secretRealm: 1,
    duelWins: 5,
    duelLosses: 2,
    status: 'active',
  },
];

vi.mock('@/lib/auth/hooks', () => ({
  useAccounts: () => ({
    data: [],
    isLoading: false,
    error: null,
    refetch: vi.fn(),
  }),
  useUpdateAccount: () => ({
    mutateAsync: vi.fn(),
    isPending: false,
    error: null,
  }),
  useKnownClasses: () => ({
    data: ['Numina', 'Sylph'],
  }),
}));

vi.mock('@/lib/registration/hooks', () => ({
  useRegistrations: () => ({
    data: mockedRoster,
  }),
  useUpdateRegistrationStats: () => ({
    mutateAsync: mutateProfileStats,
    isPending: false,
    error: null,
  }),
}));

describe('ProfileSection role explainer and guild fields', () => {
  const user: User = {
    id: 'member-id',
    nickname: 'Tester',
    role: 'member',
    isActive: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('shows guild and role explainer content for current hierarchy', () => {
    render(<I18nProvider><ProfileSection user={user} /></I18nProvider>);

    expect(screen.getByText('Роли и доступ')).toBeInTheDocument();
    expect(screen.getByText('Гость')).toBeInTheDocument();
    expect(screen.getByText('Офицер')).toBeInTheDocument();
    expect(screen.getByText('Сис.Админ')).toBeInTheDocument();

    expect(screen.getAllByText('Клан').length).toBeGreaterThan(0);
    expect(screen.getByDisplayValue('Moonfall')).toBeInTheDocument();
  });

  it('gives each activity switch a discernible name and updates its state', () => {
    render(<I18nProvider><ProfileSection user={user} /></I18nProvider>);

    const outerHeroicSwitch = screen.getByRole('switch', { name: 'Outer Heroic' });

    expect(outerHeroicSwitch).toHaveAttribute('aria-checked', 'true');

    fireEvent.click(outerHeroicSwitch);

    expect(outerHeroicSwitch).toHaveAttribute('aria-checked', 'false');
  });
});
