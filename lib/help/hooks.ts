import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { helpApi } from '@/lib/api/help';
import type {
  CreateHelpRequestDto,
  HelpRequest,
  UpdateHelpRequestDto,
  UpdateHelpTimeRangeDto,
  HelpRsvpDto,
} from '@/lib/schemas/help';

export const helpKeys = {
  all: ['help'] as const,
  lists: () => [...helpKeys.all, 'list'] as const,
  list: (status: string) => [...helpKeys.lists(), { status }] as const,
};

function getHelpStatusFromKey(queryKey: readonly unknown[]): 'open' | 'closed' | 'all' {
  const statusPart = queryKey[2];
  if (typeof statusPart === 'object' && statusPart && 'status' in statusPart) {
    const status = statusPart.status;
    if (status === 'open' || status === 'closed' || status === 'all') {
      return status;
    }
  }
  return 'all';
}

function updateHelpLists(
  queryClient: ReturnType<typeof useQueryClient>,
  updater: (items: HelpRequest[], status: 'open' | 'closed' | 'all') => HelpRequest[]
) {
  const entries = queryClient.getQueriesData<HelpRequest[]>({ queryKey: helpKeys.lists() });
  entries.forEach(([key, value]) => {
    queryClient.setQueryData<HelpRequest[]>(key, updater(value ?? [], getHelpStatusFromKey(key)));
  });
}

function upsertHelpRequest(items: HelpRequest[], nextItem: HelpRequest) {
  const existingIndex = items.findIndex((item) => item.id === nextItem.id);
  if (existingIndex === -1) {
    return [nextItem, ...items];
  }

  return items.map((item) => (item.id === nextItem.id ? nextItem : item));
}

export function useHelp(status: 'open' | 'closed' | 'all' = 'open') {
  return useQuery({
    queryKey: helpKeys.list(status),
    queryFn: () => helpApi.list(status),
  });
}

export function useCreateHelpRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateHelpRequestDto) => helpApi.create(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: helpKeys.lists() });

      const previousLists = queryClient.getQueriesData<HelpRequest[]>({ queryKey: helpKeys.lists() });
      const optimisticId = `temp-help-${Date.now()}`;
      const optimisticRequest: HelpRequest = {
        id: optimisticId,
        title: data.title.trim(),
        details: data.details.trim(),
        category: data.category,
        author: data.author?.trim() || 'You',
        authorUserId: null,
        status: 'open',
        createdAt: new Date().toISOString(),
        gatheringStart: data.gatheringStart,
        gatheringEnd: data.gatheringEnd,
        responders: [],
      };

      updateHelpLists(queryClient, (items, status) => (status === 'closed' ? items : [optimisticRequest, ...items]));

      return { previousLists, optimisticId };
    },
    onError: (_error, _data, context) => {
      context?.previousLists?.forEach(([key, value]) => {
        queryClient.setQueryData(key, value);
      });
    },
    onSuccess: (createdRequest, _data, context) => {
      updateHelpLists(queryClient, (items, status) => {
        if (status === 'closed') {
          return items.filter((item) => item.id !== context?.optimisticId);
        }

        return upsertHelpRequest(
          items.filter((item) => item.id !== context?.optimisticId),
          createdRequest
        );
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: helpKeys.lists() });
    },
  });
}

export function useUpdateHelpStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateHelpRequestDto) => helpApi.updateStatus(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: helpKeys.lists() });

      const previousLists = queryClient.getQueriesData<HelpRequest[]>({ queryKey: helpKeys.lists() });

      updateHelpLists(queryClient, (items, status) => {
        const currentItem = items.find((item) => item.id === data.id);
        if (!currentItem) {
          return items;
        }

        const nextItem: HelpRequest = { ...currentItem, status: data.status };
        const withoutItem = items.filter((item) => item.id !== data.id);

        if (status === 'all' || status === data.status) {
          return [nextItem, ...withoutItem];
        }

        return withoutItem;
      });

      return { previousLists };
    },
    onError: (_error, _data, context) => {
      context?.previousLists?.forEach(([key, value]) => {
        queryClient.setQueryData(key, value);
      });
    },
    onSuccess: (updatedRequest) => {
      updateHelpLists(queryClient, (items, status) => {
        const withoutItem = items.filter((item) => item.id !== updatedRequest.id);
        if (status === 'all' || status === updatedRequest.status) {
          return [updatedRequest, ...withoutItem];
        }
        return withoutItem;
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: helpKeys.lists() });
    },
  });
}

export function useUpdateHelpTimeRange() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateHelpTimeRangeDto) => helpApi.updateTimeRange(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: helpKeys.lists() });

      const previousLists = queryClient.getQueriesData<HelpRequest[]>({ queryKey: helpKeys.lists() });
      updateHelpLists(queryClient, (items) =>
        items.map((item) =>
          item.id === data.id
            ? { ...item, gatheringStart: data.gatheringStart, gatheringEnd: data.gatheringEnd }
            : item
        )
      );

      return { previousLists };
    },
    onError: (_error, _data, context) => {
      context?.previousLists?.forEach(([key, value]) => {
        queryClient.setQueryData(key, value);
      });
    },
    onSuccess: (updatedRequest) => {
      updateHelpLists(queryClient, (items) => items.map((item) => (item.id === updatedRequest.id ? updatedRequest : item)));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: helpKeys.lists() });
    },
  });
}

export function useHelpRsvp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: HelpRsvpDto) => helpApi.rsvp(data),
    onSuccess: (updatedRequest) => {
      updateHelpLists(queryClient, (items) => items.map((item) => (item.id === updatedRequest.id ? updatedRequest : item)));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: helpKeys.lists() });
    },
  });
}

export function useHelpWithdrawRsvp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => helpApi.withdrawRsvp(id),
    onSuccess: (updatedRequest) => {
      updateHelpLists(queryClient, (items) => items.map((item) => (item.id === updatedRequest.id ? updatedRequest : item)));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: helpKeys.lists() });
    },
  });
}

export function useDeleteHelpRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => helpApi.remove(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: helpKeys.lists() });

      const previousLists = queryClient.getQueriesData<HelpRequest[]>({ queryKey: helpKeys.lists() });
      updateHelpLists(queryClient, (items) => items.filter((item) => item.id !== id));

      return { previousLists };
    },
    onError: (_error, _id, context) => {
      context?.previousLists?.forEach(([key, value]) => {
        queryClient.setQueryData(key, value);
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: helpKeys.lists() });
    },
  });
}
