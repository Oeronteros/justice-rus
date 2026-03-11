import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { absencesApi } from '@/lib/api/absences';
import type { CreateAbsenceDto, UpdateAbsenceStatusDto } from '@/lib/schemas/absence';
import type { Absence } from '@/types';

export const absenceKeys = {
  all: ['absences'] as const,
  lists: () => [...absenceKeys.all, 'list'] as const,
};

export function useAbsences() {
  return useQuery({
    queryKey: absenceKeys.lists(),
    queryFn: absencesApi.list,
    staleTime: 5 * 60 * 1000,
  });
}

// Optimistic absence creation
export function useCreateAbsence() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAbsenceDto) => absencesApi.create(data),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: absenceKeys.lists() });
      
      const previousAbsences = queryClient.getQueryData<Absence[]>(absenceKeys.lists());

      if (previousAbsences) {
        const optimisticAbsence: Absence = {
          id: `temp-${Date.now()}`,
          ...newData,
          member: newData.member || '',
          status: 'pending',
        };
        
        queryClient.setQueryData<Absence[]>(absenceKeys.lists(), (old) => {
          if (!old) return [optimisticAbsence];
          return [...old, optimisticAbsence];
        });
      }

      return { previousAbsences };
    },
    onError: (err, newData, context) => {
      if (context?.previousAbsences) {
        queryClient.setQueryData(absenceKeys.lists(), context.previousAbsences);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: absenceKeys.lists() });
    },
  });
}

// Optimistic status update (approve/reject)
export function useUpdateAbsenceStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateAbsenceStatusDto) => absencesApi.updateStatus(data),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: absenceKeys.lists() });
      
      const previousAbsences = queryClient.getQueryData<Absence[]>(absenceKeys.lists());

      if (previousAbsences) {
        queryClient.setQueryData<Absence[]>(absenceKeys.lists(), (old) => {
          if (!old) return old;
          return old.map((absence) =>
            absence.id === newData.id
              ? { ...absence, status: newData.status }
              : absence
          );
        });
      }

      return { previousAbsences };
    },
    onError: (err, newData, context) => {
      if (context?.previousAbsences) {
        queryClient.setQueryData(absenceKeys.lists(), context.previousAbsences);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: absenceKeys.lists() });
    },
  });
}

// Prefetch absences for faster navigation
export function usePrefetchAbsences() {
  const queryClient = useQueryClient();

  return useCallback(() => {
    queryClient.prefetchQuery({
      queryKey: absenceKeys.lists(),
      queryFn: absencesApi.list,
      staleTime: 5 * 60 * 1000,
    });
  }, [queryClient]);
}
