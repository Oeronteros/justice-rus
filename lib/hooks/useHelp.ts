import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { helpApi } from '@/lib/api/help';
import type { CreateHelpRequestDto, UpdateHelpRequestDto } from '@/lib/schemas/help';

// Query key factory
export const helpKeys = {
  all: ['help'] as const,
  lists: () => [...helpKeys.all, 'list'] as const,
  list: (status: string) => [...helpKeys.lists(), { status }] as const,
};

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: helpKeys.lists() });
    },
  });
}

export function useUpdateHelpStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: UpdateHelpRequestDto) => helpApi.updateStatus(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: helpKeys.lists() });
    },
  });
}
