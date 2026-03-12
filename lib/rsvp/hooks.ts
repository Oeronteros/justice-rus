import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Rsvp, RsvpStatus, RsvpSummary } from '@/lib/schemas/rsvp';

const rsvpKeys = {
  all: ['rsvps'] as const,
  list: (userId: string) => [...rsvpKeys.all, 'list', userId] as const,
  summary: (scheduleId: string) => [...rsvpKeys.all, 'summary', scheduleId] as const,
};

export function useRsvps(userId: string | null, enabled: boolean = true) {
  return useQuery<Rsvp[]>({
    queryKey: rsvpKeys.list(userId!),
    queryFn: async () => {
      const response = await fetch(`/api/schedule/rsvp?userId=${userId}`);
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to fetch RSVPs');
      }
      return response.json();
    },
    enabled: enabled && !!userId,
    staleTime: 30 * 1000,
  });
}

export function useRsvpSummary(scheduleId: string | null, enabled: boolean = true) {
  return useQuery<RsvpSummary>({
    queryKey: rsvpKeys.summary(scheduleId!),
    queryFn: async () => {
      const response = await fetch(`/api/schedule/rsvp/summary?scheduleId=${scheduleId}`);
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to fetch RSVP summary');
      }
      return response.json();
    },
    enabled: enabled && !!scheduleId,
    staleTime: 30 * 1000,
  });
}

export function useUpsertRsvp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      scheduleId,
      status,
      note,
    }: {
      scheduleId: string;
      status: RsvpStatus;
      note?: string;
    }) => {
      const response = await fetch('/api/schedule/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scheduleId, status, note }),
      });
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to save RSVP');
      }
      return response.json();
    },
    onSuccess: (data, { scheduleId }) => {
      queryClient.invalidateQueries({ queryKey: rsvpKeys.all });
      queryClient.invalidateQueries({ queryKey: ['schedule'] });
    },
  });
}
