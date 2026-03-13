import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { scheduleApi } from '@/lib/api/schedule';
import type { CreateScheduleDto, UpdateScheduleDto, Schedule } from '@/lib/schemas/schedule';

export const scheduleKeys = {
  all: ['schedule'] as const,
  lists: () => [...scheduleKeys.all, 'list'] as const,
  list: (language: string) => [...scheduleKeys.lists(), { language }] as const,
};

function getScheduleLanguageFromKey(queryKey: readonly unknown[]): string {
  const languagePart = queryKey[2];
  if (languagePart && typeof languagePart === 'object' && 'language' in languagePart) {
    const value = languagePart.language;
    return value === 'en' || value === 'zh' ? value : 'ru';
  }

  return 'ru';
}

function getScheduleRegistrationForLanguage(item: Pick<Schedule, 'registration' | 'titleRu' | 'titleEn' | 'titleZh'>, language: string): string {
  if (language === 'zh') {
    return item.titleZh || item.titleEn || item.titleRu || item.registration || '';
  }

  if (language === 'en') {
    return item.titleEn || item.titleRu || item.titleZh || item.registration || '';
  }

  return item.titleRu || item.titleEn || item.titleZh || item.registration || '';
}

function setScheduleListCaches(
  queryClient: ReturnType<typeof useQueryClient>,
  updater: (items: Schedule[], language: string) => Schedule[]
): Array<[readonly unknown[], Schedule[] | undefined]> {
  const previousLists = queryClient.getQueriesData<Schedule[]>({ queryKey: scheduleKeys.lists() });

  for (const [key, value] of previousLists) {
    queryClient.setQueryData<Schedule[]>(key, updater(value ?? [], getScheduleLanguageFromKey(key)));
  }

  return previousLists;
}

function restoreScheduleListCaches(
  queryClient: ReturnType<typeof useQueryClient>,
  previousLists: Array<[readonly unknown[], Schedule[] | undefined]>
) {
  for (const [key, value] of previousLists) {
    queryClient.setQueryData(key, value);
  }
}

function toOptimisticSchedule(payload: CreateScheduleDto, language: string): Schedule {
  return {
    id: `temp-schedule-${Date.now()}`,
    date: new Date().toISOString(),
    registration: getScheduleRegistrationForLanguage(
      {
        registration: payload.titleRu,
        titleRu: payload.titleRu,
        titleEn: payload.titleEn,
        titleZh: payload.titleZh,
      },
      language
    ),
    type: payload.dayType,
    description: payload.time,
    group: payload.dayType,
    dayType: payload.dayType,
    time: payload.time,
    titleRu: payload.titleRu,
    titleEn: payload.titleEn,
    titleZh: payload.titleZh,
    orderIndex: payload.orderIndex,
    active: payload.active ?? true,
  };
}

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

      const previousLists = setScheduleListCaches(queryClient, (items, language) =>
        items.map((item) =>
          item.id === newData.id
            ? {
                ...item,
                ...newData,
                registration: getScheduleRegistrationForLanguage(
                  {
                    registration: item.registration,
                    titleRu: newData.titleRu,
                    titleEn: newData.titleEn,
                    titleZh: newData.titleZh,
                  },
                  language
                ),
              }
            : item
        )
      );

      return { previousLists };
    },
    onError: (_err, _newData, context) => {
      if (context?.previousLists) {
        restoreScheduleListCaches(queryClient, context.previousLists);
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

      const previousLists = setScheduleListCaches(queryClient, (items, language) => [
        ...items,
        toOptimisticSchedule(newData, language),
      ]);

      return { previousLists };
    },
    onError: (_err, _newData, context) => {
      if (context?.previousLists) {
        restoreScheduleListCaches(queryClient, context.previousLists);
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
