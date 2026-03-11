import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { newsApi, type CreateNewsPayload } from '@/lib/api/news';

export const newsKeys = {
  all: ['news'] as const,
  lists: () => [...newsKeys.all, 'list'] as const,
  detail: (id: string) => [...newsKeys.all, 'detail', id] as const,
};

// Query with explicit staleTime - news doesn't change frequently
export function useNews() {
  return useQuery({
    queryKey: newsKeys.lists(),
    queryFn: newsApi.list,
    // News is relatively static - consider it fresh for 10 minutes
    staleTime: 10 * 60 * 1000,
  });
}

// Prefetch news for faster navigation
export function usePrefetchNews() {
  const queryClient = useQueryClient();

  return useCallback(() => {
    queryClient.prefetchQuery({
      queryKey: newsKeys.lists(),
      queryFn: newsApi.list,
      staleTime: 10 * 60 * 1000,
    });
  }, [queryClient]);
}

export function useCreateNews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateNewsPayload) => newsApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: newsKeys.lists() });
    },
  });
}
