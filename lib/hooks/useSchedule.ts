import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { scheduleApi } from '@/lib/api/schedule';
import type { UpdateScheduleDto } from '@/lib/schemas/schedule';

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

export function useUpdateSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateScheduleDto) => scheduleApi.update(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: scheduleKeys.all });
    },
  });
}
