import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { rsvpApi } from '@/lib/api/rsvp';
import type { Rsvp, CreateRsvpDto, UpdateRsvpDto, RsvpSummary } from '@/lib/schemas/rsvp';

export const rsvpKeys = {
  all: ['rsvp'] as const,
  lists: () => [...rsvpKeys.all, 'list'] as const,
  list: (userId: string) => [...rsvpKeys.lists(), { userId }] as const,
  summary: (scheduleId: string) => [...rsvpKeys.all, 'summary', { scheduleId }] as const,
};

// Get user's RSVP responses
export function useRsvps(userId: string | null, enabled: boolean = true) {
  return useQuery({
    queryKey: userId ? rsvpKeys.list(userId) : undefined,
    queryFn: () => rsvpApi.list(userId!),
    enabled: enabled && !!userId,
    staleTime: 30 * 1000, // 30 seconds
  });
}

// Get RSVP summary for a schedule event
export function useRsvpSummary(scheduleId: string | null, enabled: boolean = true) {
  return useQuery({
    queryKey: scheduleId ? rsvpKeys.summary(scheduleId) : undefined,
    queryFn: () => rsvpApi.getSummary(scheduleId!),
    enabled: enabled && !!scheduleId,
    staleTime: 60 * 1000, // 1 minute
  });
}

// Create or update RSVP
export function useUpsertRsvp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateRsvpDto & { userId: string }) => rsvpApi.upsert(payload),
    onMutate: async (newRsvp) => {
      await queryClient.cancelQueries({ queryKey: rsvpKeys.all });

      const previousRsvps = queryClient.getQueryData<Rsvp[]>(rsvpKeys.list(newRsvp.userId));

      if (previousRsvps) {
        queryClient.setQueryData<Rsvp[]>(rsvpKeys.list(newRsvp.userId), (old) => {
          if (!old) return [newRsvp as unknown as Rsvp];
          
          const existingIndex = old.findIndex((r) => r.scheduleId === newRsvp.scheduleId);
          if (existingIndex >= 0) {
            const updated = [...old];
            updated[existingIndex] = {
              ...updated[existingIndex],
              status: newRsvp.status,
              note: newRsvp.note,
              updatedAt: new Date().toISOString(),
            };
            return updated;
          }
          
          return [...old, { ...newRsvp, id: 'temp', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() } as Rsvp];
        });
      }

      return { previousRsvps };
    },
    onError: (_err, newRsvp, context) => {
      if (context?.previousRsvps) {
        queryClient.setQueryData(rsvpKeys.list(newRsvp.userId), context.previousRsvps);
      }
    },
    onSettled: (_data, _error, newRsvp) => {
      queryClient.invalidateQueries({ queryKey: rsvpKeys.all });
    },
  });
}

// Update RSVP
export function useUpdateRsvp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateRsvpDto) => rsvpApi.update(payload),
    onMutate: async (updatedRsvp) => {
      await queryClient.cancelQueries({ queryKey: rsvpKeys.all });

      const previousRsvps = queryClient.getQueryData<Rsvp[]>(rsvpKeys.lists());

      if (previousRsvps) {
        queryClient.setQueryData<Rsvp[]>(rsvpKeys.lists(), (old) => {
          if (!old) return old;
          return old.map((r) => (r.id === updatedRsvp.id ? { ...r, ...updatedRsvp } : r));
        });
      }

      return { previousRsvps };
    },
    onError: (_err, _updatedRsvp, context) => {
      if (context?.previousRsvps) {
        queryClient.setQueryData(rsvpKeys.lists(), context.previousRsvps);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: rsvpKeys.all });
    },
  });
}

// Delete RSVP
export function useDeleteRsvp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => rsvpApi.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: rsvpKeys.all });

      const previousRsvps = queryClient.getQueryData<Rsvp[]>(rsvpKeys.lists());

      if (previousRsvps) {
        queryClient.setQueryData<Rsvp[]>(rsvpKeys.lists(), (old) => {
          if (!old) return old;
          return old.filter((r) => r.id !== id);
        });
      }

      return { previousRsvps };
    },
    onError: (_err, _id, context) => {
      if (context?.previousRsvps) {
        queryClient.setQueryData(rsvpKeys.lists(), context.previousRsvps);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: rsvpKeys.all });
    },
  });
}
