import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import ScheduleSection from '@/components/sections/schedule';
import HelpSection from '@/components/sections/help';
import { I18nProvider } from '@/lib/i18n/context';
import type { User } from '@/lib/schemas/auth';

const useScheduleMock = vi.fn();
const useHelpMock = vi.fn();

vi.mock('@/lib/schedule/hooks', () => ({
  useSchedule: (language: string) => useScheduleMock(language),
  useCreateSchedule: () => ({ mutateAsync: vi.fn(), isPending: false }),
  useUpdateSchedule: () => ({ mutateAsync: vi.fn(), isPending: false }),
}));

vi.mock('@/lib/rsvp/hooks', () => ({
  useRsvps: () => ({ data: [] }),
}));

vi.mock('@/components/rsvp/RsvpButton', () => ({
  RsvpButton: () => null,
}));

vi.mock('@/components/rsvp/RsvpSummary', () => ({
  RsvpSummaryDisplay: () => null,
}));

vi.mock('@/lib/help/hooks', () => ({
  useHelp: (status: 'open' | 'closed' | 'all') => useHelpMock(status),
  useCreateHelpRequest: () => ({ mutateAsync: vi.fn(), isPending: false, error: null }),
  useUpdateHelpStatus: () => ({ mutateAsync: vi.fn(), isPending: false }),
  useUpdateHelpTimeRange: () => ({ mutateAsync: vi.fn(), isPending: false }),
  useHelpRsvp: () => ({ mutateAsync: vi.fn(), isPending: false }),
  useHelpWithdrawRsvp: () => ({ mutateAsync: vi.fn(), isPending: false }),
  useDeleteHelpRequest: () => ({ mutateAsync: vi.fn(), isPending: false }),
}));

describe('Schedule and Help sections', () => {
  const user: User = {
    id: 'member-1',
    nickname: 'Smoke Member',
    role: 'member',
    isActive: true,
    className: 'Numina',
    prefix: 'Raid Lead',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    useScheduleMock.mockReturnValue({ data: [], isLoading: false, error: null, refetch: vi.fn() });
    useHelpMock.mockReturnValue({ data: [], isLoading: false, error: null, refetch: vi.fn() });
  });

  afterEach(() => {
    cleanup();
  });

  it('uses the shared empty state for schedule in english', () => {
    render(
      <I18nProvider defaultLanguage="en">
        <ScheduleSection user={user} language="en" />
      </I18nProvider>
    );

    expect(screen.getByText('Open window')).toBeInTheDocument();
    expect(screen.getByText(/No events for/i)).toBeInTheDocument();
  });

  it('uses the shared empty state for help requests in english', () => {
    render(
      <I18nProvider defaultLanguage="en">
        <HelpSection user={user} />
      </I18nProvider>
    );

    expect(screen.getAllByText('Open').length).toBeGreaterThan(0);
    expect(screen.getByText('Silence in the ritual hall')).toBeInTheDocument();
  });
});
