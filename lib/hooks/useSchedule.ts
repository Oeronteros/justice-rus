import { useQuery } from '@tanstack/react-query';
import { scheduleApi } from '@/lib/api/schedule';

// Query key factory
export const scheduleKeys = {
  all: ['schedule'] as const,
  lists: () => [...scheduleKeys.all, 'list'] as const,
  list: (language: string) => [...scheduleKeys.lists(), { language }] as const,
};

export function useSchedule(language: string = 'ru') {
  return useQuery({
    queryKey: scheduleKeys.list(language),
    queryFn: () => scheduleApi.list(language),
  });
}
