import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { guidesApi } from '@/lib/api/guides';
import type { CreateGuideDto, CreateCommentDto, GuideComment, GuideDetail, GuideSummary } from '@/lib/schemas/guide';

export const guideKeys = {
  all: ['guides'] as const,
  lists: () => [...guideKeys.all, 'list'] as const,
  details: () => [...guideKeys.all, 'detail'] as const,
  detail: (id: string) => [...guideKeys.details(), id] as const,
};

function updateGuideLists(
  queryClient: ReturnType<typeof useQueryClient>,
  updater: (items: GuideSummary[]) => GuideSummary[]
) {
  const matches = queryClient.getQueriesData<GuideSummary[]>({ queryKey: guideKeys.lists() });
  matches.forEach(([key, value]) => {
    queryClient.setQueryData<GuideSummary[]>(key, updater(value ?? []));
  });
}

export function useGuides() {
  return useQuery({
    queryKey: guideKeys.lists(),
    queryFn: guidesApi.list,
    staleTime: 10 * 60 * 1000,
  });
}

export function useGuide(id: string | null, voterKey: string) {
  return useQuery({
    queryKey: guideKeys.detail(id || ''),
    queryFn: () => guidesApi.get(id!, voterKey),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateGuide() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateGuideDto) => guidesApi.create(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: guideKeys.lists() });

      const previousLists = queryClient.getQueriesData<GuideSummary[]>({ queryKey: guideKeys.lists() });
      const optimisticId = `temp-guide-${Date.now()}`;
      const now = new Date().toISOString();
      const optimisticGuide: GuideSummary = {
        id: optimisticId,
        slug: optimisticId,
        ownerAccountId: null,
        title: data.title.trim(),
        category: data.category,
        author: data.author?.trim() || 'You',
        createdAt: now,
        updatedAt: now,
        votes: 0,
        commentsCount: 0,
        linkTargets: [],
      };

      updateGuideLists(queryClient, (items) => [optimisticGuide, ...items]);

      return { previousLists, optimisticId };
    },
    onError: (_error, _data, context) => {
      context?.previousLists?.forEach(([key, value]) => {
        queryClient.setQueryData(key, value);
      });
    },
    onSuccess: (createdGuide, _data, context) => {
      updateGuideLists(queryClient, (items) =>
        items.map((item) => (item.id === context?.optimisticId ? createdGuide : item))
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: guideKeys.lists() });
    },
  });
}

export function useUpdateGuide() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Pick<CreateGuideDto, 'title' | 'content' | 'category'> }) =>
      guidesApi.update(id, data),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: guideKeys.detail(variables.id) });
      await queryClient.cancelQueries({ queryKey: guideKeys.lists() });

      const previousDetail = queryClient.getQueryData<GuideDetail>(guideKeys.detail(variables.id));
      const previousLists = queryClient.getQueriesData<GuideSummary[]>({ queryKey: guideKeys.lists() });
      const now = new Date().toISOString();

      queryClient.setQueryData<GuideDetail>(guideKeys.detail(variables.id), (current) =>
        current
          ? {
              ...current,
              guide: {
                ...current.guide,
                ...variables.data,
                updatedAt: now,
              },
            }
          : current
      );

      updateGuideLists(queryClient, (items) =>
        items.map((item) =>
          item.id === variables.id
            ? { ...item, title: variables.data.title, category: variables.data.category, updatedAt: now }
            : item
        )
      );

      return { previousDetail, previousLists, id: variables.id };
    },
    onError: (_error, variables, context) => {
      if (context?.previousDetail) {
        queryClient.setQueryData(guideKeys.detail(variables.id), context.previousDetail);
      }
      context?.previousLists?.forEach(([key, value]) => {
        queryClient.setQueryData(key, value);
      });
    },
    onSuccess: (updatedGuide, variables) => {
      queryClient.setQueryData<GuideDetail>(guideKeys.detail(variables.id), (current) =>
        current
          ? {
              ...current,
              guide: updatedGuide,
            }
          : current
      );

      updateGuideLists(queryClient, (items) =>
        items.map((item) =>
          item.id === variables.id
            ? { ...item, title: updatedGuide.title, category: updatedGuide.category, updatedAt: updatedGuide.updatedAt }
            : item
        )
      );
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: guideKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: guideKeys.lists() });
    },
  });
}

export function useVoteGuide() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, voterKey }: { id: string; voterKey: string }) => guidesApi.vote(id, voterKey),
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: guideKeys.detail(id) });
      await queryClient.cancelQueries({ queryKey: guideKeys.lists() });

      const previousDetail = queryClient.getQueryData<GuideDetail>(guideKeys.detail(id));
      const previousLists = queryClient.getQueriesData<GuideSummary[]>({ queryKey: guideKeys.lists() });
      const nextVotes = previousDetail ? previousDetail.votes + (previousDetail.voted ? -1 : 1) : null;
      const nextVoted = previousDetail ? !previousDetail.voted : true;

      if (previousDetail && nextVotes !== null) {
        queryClient.setQueryData<GuideDetail>(guideKeys.detail(id), {
          ...previousDetail,
          votes: nextVotes,
          voted: nextVoted,
        });
      }

      if (nextVotes !== null) {
        updateGuideLists(queryClient, (items) =>
          items.map((item) => (item.id === id ? { ...item, votes: nextVotes } : item))
        );
      }

      return { previousDetail, previousLists };
    },
    onError: (_error, _vars, context) => {
      if (context?.previousDetail) {
        queryClient.setQueryData(guideKeys.detail(context.previousDetail.guide.id), context.previousDetail);
      }
      context?.previousLists?.forEach(([key, value]) => {
        queryClient.setQueryData(key, value);
      });
    },
    onSuccess: (voteResponse, variables) => {
      queryClient.setQueryData<GuideDetail>(guideKeys.detail(variables.id), (current) =>
        current
          ? {
              ...current,
              votes: voteResponse.votes,
              voted: voteResponse.voted,
            }
          : current
      );

      updateGuideLists(queryClient, (items) =>
        items.map((item) => (item.id === variables.id ? { ...item, votes: voteResponse.votes } : item))
      );
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: guideKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: guideKeys.lists() });
    },
  });
}

export function useAddComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateCommentDto }) => guidesApi.addComment(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: guideKeys.detail(id) });
      await queryClient.cancelQueries({ queryKey: guideKeys.lists() });

      const previousDetail = queryClient.getQueryData<GuideDetail>(guideKeys.detail(id));
      const previousLists = queryClient.getQueriesData<GuideSummary[]>({ queryKey: guideKeys.lists() });
      const optimisticId = `temp-comment-${Date.now()}`;
      const optimisticComment: GuideComment = {
        id: optimisticId,
        author: data.author?.trim() || 'You',
        comment: data.comment,
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData<GuideDetail>(guideKeys.detail(id), (current) =>
        current
          ? {
              ...current,
              comments: [...current.comments, optimisticComment],
            }
          : current
      );

      updateGuideLists(queryClient, (items) =>
        items.map((item) => (item.id === id ? { ...item, commentsCount: item.commentsCount + 1 } : item))
      );

      return { previousDetail, previousLists, optimisticId };
    },
    onError: (_error, vars, context) => {
      if (context?.previousDetail) {
        queryClient.setQueryData(guideKeys.detail(vars.id), context.previousDetail);
      }
      context?.previousLists?.forEach(([key, value]) => {
        queryClient.setQueryData(key, value);
      });
    },
    onSuccess: (comment, vars, context) => {
      queryClient.setQueryData<GuideDetail>(guideKeys.detail(vars.id), (current) =>
        current
          ? {
              ...current,
              comments: current.comments.map((item) => (item.id === context?.optimisticId ? comment : item)),
            }
          : current
      );
    },
    onSettled: (_data, _error, vars) => {
      queryClient.invalidateQueries({ queryKey: guideKeys.detail(vars.id) });
      queryClient.invalidateQueries({ queryKey: guideKeys.lists() });
    },
  });
}

export function useDeleteGuide() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => guidesApi.remove(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: guideKeys.detail(id) });
      await queryClient.cancelQueries({ queryKey: guideKeys.lists() });

      const previousDetail = queryClient.getQueryData<GuideDetail>(guideKeys.detail(id));
      const previousLists = queryClient.getQueriesData<GuideSummary[]>({ queryKey: guideKeys.lists() });

      updateGuideLists(queryClient, (items) => items.filter((item) => item.id !== id));
      queryClient.removeQueries({ queryKey: guideKeys.detail(id), exact: true });

      return { previousDetail, previousLists, id };
    },
    onError: (_error, _id, context) => {
      if (context?.previousDetail) {
        queryClient.setQueryData(guideKeys.detail(context.id), context.previousDetail);
      }
      context?.previousLists?.forEach(([key, value]) => {
        queryClient.setQueryData(key, value);
      });
    },
    onSettled: (_data, _error, id) => {
      queryClient.invalidateQueries({ queryKey: guideKeys.lists() });
      queryClient.invalidateQueries({ queryKey: guideKeys.detail(id) });
    },
  });
}

export function usePrefetchGuides() {
  const queryClient = useQueryClient();
  return useCallback(() => {
    queryClient.prefetchQuery({
      queryKey: guideKeys.lists(),
      queryFn: guidesApi.list,
      staleTime: 10 * 60 * 1000,
    });
  }, [queryClient]);
}
