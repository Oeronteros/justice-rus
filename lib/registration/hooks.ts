import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { registrationsApi } from '@/lib/api/registrations';
import type { RegistrationColumnLabels } from '@/components/sections/registration/columnLabels';
import type { UpdateRegistrationStatsPayload } from '@/lib/api/registrations';
import type { Registration } from '@/lib/schemas/registration';

export const registrationKeys = {
  all: ['registrations'] as const,
  lists: () => [...registrationKeys.all, 'list'] as const,
  detail: (nickname: string) => [...registrationKeys.all, 'detail', nickname] as const,
  columnLabels: () => [...registrationKeys.all, 'column-labels'] as const,
};

// Query function with error handling
export function useRegistrations() {
  return useQuery({
    queryKey: registrationKeys.lists(),
    queryFn: registrationsApi.list,
    // Data won't be refetched automatically within 5 minutes
    // This reduces unnecessary network requests
  });
}

export function useRegistrationColumnLabels() {
  return useQuery({
    queryKey: registrationKeys.columnLabels(),
    queryFn: registrationsApi.getColumnLabels,
  });
}

// Optimistic update mutation - provides instant UI feedback
export function useUpdateRegistrationStats() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateRegistrationStatsPayload) => registrationsApi.updateStats(payload),
    
    // Called before the mutation function
    onMutate: async (newData) => {
      // Cancel any in-flight queries to avoid race conditions
      await queryClient.cancelQueries({ queryKey: registrationKeys.lists() });

      // Snapshot the previous value for rollback
      const previousRegistrations = queryClient.getQueryData<Registration[]>(registrationKeys.lists());

      // Optimistically update the cache
      if (previousRegistrations) {
        queryClient.setQueryData<Registration[]>(registrationKeys.lists(), (old) => {
          if (!old) return old;
          return old.map((reg) => {
            if (reg.nickname === newData.nickname) {
              return {
                ...reg,
                // Apply only the fields that are being updated
                ...(newData.className !== undefined && { class: newData.className }),
                ...(newData.guild !== undefined && { guild: newData.guild }),
                ...(newData.discordHandle !== undefined && { discordHandle: newData.discordHandle }),
                ...(newData.profileTitle !== undefined && { title: newData.profileTitle }),
                ...(newData.preferredClasses !== undefined && { preferredClasses: newData.preferredClasses }),
                ...(newData.interests !== undefined && { interests: newData.interests }),
                ...(newData.notificationDefaults !== undefined && { notificationDefaults: newData.notificationDefaults }),
                ...(newData.elo !== undefined && { elo: newData.elo }),
                ...(newData.mmr20 !== undefined && { mmr20: newData.mmr20 }),
                ...(newData.bounty !== undefined && { bounty: newData.bounty }),
                ...(newData.outerHeroic !== undefined && { outerHeroic: newData.outerHeroic }),
                ...(newData.innerHeroic !== undefined && { innerHeroic: newData.innerHeroic }),
                ...(newData.crimsonSands !== undefined && { crimsonSands: newData.crimsonSands }),
                ...(newData.abyss !== undefined && { abyss: newData.abyss }),
                ...(newData.gvg !== undefined && { gvg: newData.gvg }),
                ...(newData.secretRealm !== undefined && { secretRealm: newData.secretRealm }),
              };
            }
            return reg;
          });
        });
      }

      // Return context with previous value for rollback
      return { previousRegistrations };
    },

    // Called if mutation fails - rollback to previous state
    onError: (err, newData, context) => {
      if (context?.previousRegistrations) {
        queryClient.setQueryData<Registration[]>(
          registrationKeys.lists(),
          context.previousRegistrations
        );
      }
    },

    // Always refetch after mutation settles (success or failure)
    // This ensures data consistency with server
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: registrationKeys.lists() });
    },
  });
}

export function useUpdateRegistrationColumnLabels() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegistrationColumnLabels) => registrationsApi.updateColumnLabels(payload),
    onSuccess: (labels) => {
      queryClient.setQueryData(registrationKeys.columnLabels(), labels);
      queryClient.invalidateQueries({ queryKey: registrationKeys.columnLabels() });
    },
  });
}

// Prefetch registrations for faster navigation
export function usePrefetchRegistrations() {
  const queryClient = useQueryClient();

  return useCallback(() => {
    queryClient.prefetchQuery({
      queryKey: registrationKeys.lists(),
      queryFn: registrationsApi.list,
      // Data will be stale after 5 minutes
      // Prefetch happens in background, doesn't block UI
      staleTime: 5 * 60 * 1000,
    });
  }, [queryClient]);
}
