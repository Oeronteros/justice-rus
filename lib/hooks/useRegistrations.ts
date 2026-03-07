import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { registrationsApi } from '@/lib/api/registrations';
import type { UpdateRegistrationStatsPayload } from '@/lib/api/registrations';

// Query key factory
export const registrationKeys = {
  all: ['registrations'] as const,
  lists: () => [...registrationKeys.all, 'list'] as const,
};

export function useRegistrations() {
  return useQuery({
    queryKey: registrationKeys.lists(),
    queryFn: registrationsApi.list,
  });
}

export function useUpdateRegistrationStats() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateRegistrationStatsPayload) => registrationsApi.updateStats(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: registrationKeys.lists() });
    },
  });
}
