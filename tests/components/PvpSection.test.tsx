import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import PvpSection from '@/components/sections/pvp';
import { I18nProvider } from '@/lib/i18n/context';
import type { User } from '@/lib/schemas/auth';

vi.mock('@/lib/pvp/hooks', () => ({
  usePvpState: () => ({
    data: {
      queue: [
        { playerId: '1', nickname: 'Smoke Member', prefix: 'Raid Lead', className: 'Numina', joinedAt: '2026-03-12T12:00:00.000Z' },
      ],
      leaderboard: [
        { playerId: '1', nickname: 'Smoke Member', prefix: 'Raid Lead', rating: 1200, wins: 4, losses: 1 },
      ],
      recentMatches: [
        {
          id: 'm-1',
          status: 'completed',
          createdAt: '2026-03-12T12:00:00.000Z',
          updatedAt: '2026-03-12T12:10:00.000Z',
          confirmedAt: '2026-03-12T12:10:00.000Z',
          winnerId: '1',
          playerOne: { id: '1', nickname: 'Smoke Member', prefix: 'Raid Lead', className: 'Numina' },
          playerTwo: { id: '2', nickname: 'Night Fox', prefix: 'Vanguard', className: 'Sylph' },
          yourReport: null,
          opponentReport: null,
          confirmationStatus: 'confirmed',
        },
      ],
      activeMatch: null,
      userInQueue: true,
      userRating: { playerId: '1', nickname: 'Smoke Member', prefix: 'Raid Lead', rating: 1200, wins: 4, losses: 1 },
    },
    isLoading: false,
    error: null,
    refetch: vi.fn(),
  }),
  useJoinPvpQueue: () => ({ mutateAsync: vi.fn(), isPending: false }),
  useLeavePvpQueue: () => ({ mutateAsync: vi.fn(), isPending: false }),
  useReportPvpResult: () => ({ mutateAsync: vi.fn(), isPending: false }),
}));

describe('PvpSection', () => {
  const user: User = {
    id: 'member-1',
    nickname: 'Smoke Member',
    role: 'member',
    isActive: true,
    className: 'Numina',
    prefix: 'Raid Lead',
  };

  it('renders shared prefixes in queue, leaderboard, and recent matches', () => {
    render(
      <I18nProvider>
        <PvpSection user={user} />
      </I18nProvider>
    );

    expect(screen.getAllByText('Raid Lead').length).toBeGreaterThan(0);
    expect(screen.getByText('Vanguard')).toBeInTheDocument();
    expect(screen.getByText('Топ рейтинга')).toBeInTheDocument();
    expect(screen.getByText('Последние подтвержденные матчи')).toBeInTheDocument();
  });
});
