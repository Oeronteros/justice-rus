import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { newsApi, type CreateNewsPayload } from '@/lib/api/news';
import type { News } from '@/lib/schemas/news';

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
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: newsKeys.lists() });

      const previousNews = queryClient.getQueryData<News[]>(newsKeys.lists()) ?? [];
      const optimisticId = `temp-news-${Date.now()}`;
      const optimisticNews: News = {
        id: optimisticId,
        title: payload.title.trim(),
        content: payload.content.trim(),
        author: payload.author?.trim() || 'You',
        date: new Date().toISOString(),
        pinned: payload.pinned ?? false,
        discordDeliveryStatus: 'pending',
      };

      queryClient.setQueryData<News[]>(newsKeys.lists(), (old = []) => [optimisticNews, ...old]);

      return { previousNews, optimisticId };
    },
    onError: (_error, _payload, context) => {
      if (context?.previousNews) {
        queryClient.setQueryData(newsKeys.lists(), context.previousNews);
      }
    },
    onSuccess: (createdNews, _payload, context) => {
      queryClient.setQueryData<News[]>(newsKeys.lists(), (old = []) =>
        old.map((item) => (item.id === context?.optimisticId ? createdNews : item))
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: newsKeys.lists() });
    },
  });
}
