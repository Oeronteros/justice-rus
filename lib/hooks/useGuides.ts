import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { guidesApi } from '@/lib/api/guides';
import type { CreateGuideDto, CreateCommentDto } from '@/lib/schemas/guide';

// Query key factory
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
  });
}

export function useGuide(id: string | null, voterKey: string) {
  return useQuery({
    queryKey: guideKeys.detail(id || ''),
    queryFn: () => guidesApi.get(id!, voterKey),
    enabled: !!id,
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

export function useVoteGuide() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, voterKey }: { id: string; voterKey: string }) => 
      guidesApi.vote(id, voterKey),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: guideKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: guideKeys.lists() });
    },
  });
}

export function useAddComment() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateCommentDto }) => 
      guidesApi.addComment(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: guideKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: guideKeys.lists() });
    },
  });
}
