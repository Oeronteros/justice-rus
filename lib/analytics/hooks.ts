import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from './api';

export const analyticsKeys = {
  all: ['analytics'] as const,
  roster: () => [...analyticsKeys.all, 'roster'] as const,
  rosterWithDays: (days: number) => [...analyticsKeys.roster(), { days }] as const,
};

export function useRosterAnalytics(days: number = 30) {
  return useQuery({
    queryKey: analyticsKeys.rosterWithDays(days),
    queryFn: () => analyticsApi.getRosterAnalytics(days),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
