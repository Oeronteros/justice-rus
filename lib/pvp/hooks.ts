import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { pvpApi } from '@/lib/api/pvp';
import type { PvpReportDto } from '@/lib/schemas/pvp';

export const pvpKeys = {
  all: ['pvp'] as const,
  state: () => [...pvpKeys.all, 'state'] as const,
};

export function usePvpState() {
  return useQuery({
    queryKey: pvpKeys.state(),
    queryFn: pvpApi.getState,
    refetchInterval: 15000,
  });
}

export function useJoinPvpQueue() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: pvpApi.joinQueue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pvpKeys.state() });
    },
  });
}

export function useLeavePvpQueue() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: pvpApi.leaveQueue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pvpKeys.state() });
    },
  });
}

export function useReportPvpResult() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PvpReportDto) => pvpApi.reportResult(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pvpKeys.state() });
    },
  });
}
