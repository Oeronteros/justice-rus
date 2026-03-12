import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { pvpApi } from '@/lib/api/pvp';
import type { PvpQueueEntry, PvpReportDto, PvpState } from '@/lib/schemas/pvp';

export const pvpKeys = {
  all: ['pvp'] as const,
  state: () => [...pvpKeys.all, 'state'] as const,
};

interface OptimisticQueuePlayer {
  playerId: string;
  nickname: string;
  prefix?: string | null;
  className: string;
}

export function usePvpState() {
  return useQuery({
    queryKey: pvpKeys.state(),
    queryFn: pvpApi.getState,
    refetchInterval: 15000,
  });
}

export function useJoinPvpQueue(optimisticPlayer?: OptimisticQueuePlayer) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => pvpApi.joinQueue(),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: pvpKeys.state() });

      const previousState = queryClient.getQueryData<PvpState>(pvpKeys.state());
      if (!optimisticPlayer) {
        return { previousState };
      }

      const optimisticEntry: PvpQueueEntry = {
        ...optimisticPlayer,
        joinedAt: new Date().toISOString(),
      };

      queryClient.setQueryData<PvpState>(pvpKeys.state(), (current) =>
        current
          ? {
              ...current,
              userInQueue: true,
              queue: current.queue.some((entry) => entry.playerId === optimisticPlayer.playerId)
                ? current.queue
                : [...current.queue, optimisticEntry],
            }
          : current
      );

      return { previousState };
    },
    onError: (_error, _vars, context) => {
      if (context?.previousState) {
        queryClient.setQueryData(pvpKeys.state(), context.previousState);
      }
    },
    onSuccess: (nextState) => {
      queryClient.setQueryData(pvpKeys.state(), nextState);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: pvpKeys.state() });
    },
  });
}

export function useLeavePvpQueue(identity?: { playerId: string; nickname: string }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => pvpApi.leaveQueue(),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: pvpKeys.state() });

      const previousState = queryClient.getQueryData<PvpState>(pvpKeys.state());
      if (!identity) {
        return { previousState };
      }

      const { playerId, nickname } = identity;
      queryClient.setQueryData<PvpState>(pvpKeys.state(), (current) =>
        current
          ? {
              ...current,
              userInQueue: false,
              activeMatch: null,
              queue: current.queue.filter((entry) => entry.playerId !== playerId && entry.nickname !== nickname),
            }
          : current
      );

      return { previousState };
    },
    onError: (_error, _vars, context) => {
      if (context?.previousState) {
        queryClient.setQueryData(pvpKeys.state(), context.previousState);
      }
    },
    onSuccess: (nextState) => {
      queryClient.setQueryData(pvpKeys.state(), nextState);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: pvpKeys.state() });
    },
  });
}

export function useReportPvpResult() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PvpReportDto) => pvpApi.reportResult(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: pvpKeys.state() });

      const previousState = queryClient.getQueryData<PvpState>(pvpKeys.state());
      queryClient.setQueryData<PvpState>(pvpKeys.state(), (current) => {
        if (!current?.activeMatch || current.activeMatch.id !== data.matchId) {
          return current;
        }

        const nextOpponentReport = current.activeMatch.opponentReport;
        const confirmationStatus = nextOpponentReport
          ? nextOpponentReport === data.result
            ? 'confirmed'
            : 'disputed'
          : 'waiting';

        return {
          ...current,
          activeMatch: {
            ...current.activeMatch,
            yourReport: data.result,
            confirmationStatus,
          },
        };
      });

      return { previousState };
    },
    onError: (_error, _vars, context) => {
      if (context?.previousState) {
        queryClient.setQueryData(pvpKeys.state(), context.previousState);
      }
    },
    onSuccess: (nextState) => {
      queryClient.setQueryData(pvpKeys.state(), nextState);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: pvpKeys.state() });
    },
  });
}
