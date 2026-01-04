import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { absencesApi } from '@/lib/api/absences';
import type { CreateAbsenceDto } from '@/lib/schemas/absence';

// Query key factory
export const absenceKeys = {
  all: ['absences'] as const,
  lists: () => [...absenceKeys.all, 'list'] as const,
};

export function useAbsences() {
  return useQuery({
    queryKey: absenceKeys.lists(),
    queryFn: absencesApi.list,
  });
}

export function useCreateAbsence() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateAbsenceDto) => absencesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: absenceKeys.lists() });
    },
  });
}
