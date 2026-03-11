import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { scheduleApi } from '@/lib/api/schedule';
import type { CreateScheduleDto, UpdateScheduleDto, Schedule } from '@/lib/schemas/schedule';

export const scheduleKeys = {
  all: ['schedule'] as const,
  lists: () => [...scheduleKeys.all, 'list'] as const,
  list: (language: string) => [...scheduleKeys.lists(), { language }] as const,
};

// Schedule changes less frequently but is time-sensitive
export function useSchedule(language: string = 'ru') {
  return useQuery({
    queryKey: scheduleKeys.list(language),
    queryFn: () => scheduleApi.list(language),
    staleTime: 2 * 60 * 1000,
  });
}

// Optimistic update for schedule
export function useUpdateSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateScheduleDto) => scheduleApi.update(payload),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: scheduleKeys.all });
      
      const previousSchedule = queryClient.getQueryData<Schedule[]>(scheduleKeys.lists());

      if (previousSchedule) {
        queryClient.setQueryData<Schedule[]>(scheduleKeys.lists(), (old) => {
          if (!old) return old;
          return old.map((item) => (item.id === newData.id ? { ...item, ...newData } : item));
        });
      }

      return { previousSchedule };
    },
    onError: (_err, _newData, context) => {
      if (context?.previousSchedule) {
        queryClient.setQueryData(scheduleKeys.lists(), context.previousSchedule);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: scheduleKeys.all });
    },
  });
}

// Optimistic creation of schedule
export function useCreateSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateScheduleDto) => scheduleApi.create(payload),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: scheduleKeys.all });
      
      const previousSchedule = queryClient.getQueryData<Schedule[]>(scheduleKeys.lists());

      if (previousSchedule) {
        queryClient.setQueryData<Schedule[]>(scheduleKeys.lists(), (old) => {
          if (!old) return [newData as unknown as Schedule];
          return [...old, newData as unknown as Schedule];
        });
      }

      return { previousSchedule };
    },
    onError: (_err, _newData, context) => {
      if (context?.previousSchedule) {
        queryClient.setQueryData(scheduleKeys.lists(), context.previousSchedule);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: scheduleKeys.all });
    },
  });
}

// Prefetch schedule for faster navigation
export function usePrefetchSchedule() {
  const queryClient = useQueryClient();

  return useCallback(
    (language: string = 'ru') => {
      queryClient.prefetchQuery({
        queryKey: scheduleKeys.list(language),
        queryFn: () => scheduleApi.list(language),
        staleTime: 2 * 60 * 1000,
      });
    },
    [queryClient]
  );
}
