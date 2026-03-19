import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DashboardSection from '@/components/sections/dashboard';
import { I18nProvider } from '@/lib/i18n/context';
import type { User } from '@/lib/schemas/auth';

vi.mock('@/lib/schedule/hooks', () => ({
  useSchedule: () => ({ data: [], isLoading: false, error: null, refetch: vi.fn() }),
}));

vi.mock('@/lib/help/hooks', () => ({
  useHelp: () => ({ data: [], isLoading: false, error: null, refetch: vi.fn() }),
}));

vi.mock('@/lib/registration/hooks', () => ({
  useRegistrations: () => ({ data: [], isLoading: false, error: null, refetch: vi.fn() }),
}));

vi.mock('@/lib/news/hooks', () => ({
  useNews: () => ({ data: [], isLoading: false, error: null, refetch: vi.fn() }),
}));

vi.mock('@/lib/absences/hooks', () => ({
  useAbsences: () => ({ data: [], isLoading: false }),
}));

vi.mock('@/lib/pvp/hooks', () => ({
  usePvpState: () => ({
    data: { queue: [], leaderboard: [], recentMatches: [], activeMatch: null, userInQueue: false, userRating: null },
    isLoading: false,
  }),
}));

vi.mock('@/lib/notifications/hooks', () => ({
  useHelpNotifications: vi.fn(),
  useAbsenceNotifications: vi.fn(),
  usePvpNotifications: vi.fn(),
}));

describe('DashboardSection', () => {
  const user: User = {
    id: 'member-1',
    nickname: 'Smoke Member',
    role: 'member',
    isActive: true,
    className: 'Numina',
    prefix: 'Raid Lead',
  };

  it('renders signal strip and shared prefix content', () => {
    render(
      <I18nProvider>
        <DashboardSection user={user} language="ru" />
      </I18nProvider>
    );

    expect(screen.getByText('Операционная сводка')).toBeInTheDocument();
    expect(screen.getByText('Readiness')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
    expect(screen.getByText('Officer')).toBeInTheDocument();
    expect(screen.getAllByText('Raid Lead').length).toBeGreaterThan(0);
    expect(screen.getByText('Очередь действий')).toBeInTheDocument();
    expect(screen.getByText('Контур наблюдения')).toBeInTheDocument();
    expect(screen.getByText(/Следующее событие:/)).toBeInTheDocument();
    expect(screen.getByText(/Готовность состава:/)).toBeInTheDocument();
  });
});
