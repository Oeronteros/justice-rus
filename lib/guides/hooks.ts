import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { guidesApi } from '@/lib/api/guides';
import type { CreateGuideDto, CreateCommentDto } from '@/lib/schemas/guide';

export const guideKeys = {
  all: ['guides'] as const,
  lists: () => [...guideKeys.all, 'list'] as const,
  details: () => [...guideKeys.all, 'detail'] as const,
  detail: (id: string) => [...guideKeys.details(), id] as const,
};

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: guideKeys.lists() });
    },
  });
}

export function useUpdateGuide() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Pick<CreateGuideDto, 'title' | 'content' | 'category'> }) =>
      guidesApi.update(id, data),
    onSuccess: (_data, variables) => {
      if (variables) {
        queryClient.invalidateQueries({ queryKey: guideKeys.detail(variables.id) });
        queryClient.invalidateQueries({ queryKey: guideKeys.lists() });
      }
    },
  });
}

export function useVoteGuide() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, voterKey }: { id: string; voterKey: string }) => guidesApi.vote(id, voterKey),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: guideKeys.lists() });
    },
  });
}

export function useAddComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateCommentDto }) => guidesApi.addComment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: guideKeys.lists() });
    },
  });
}

export function useDeleteGuide() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => guidesApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: guideKeys.lists() });
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
