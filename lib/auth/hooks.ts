import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { accountsApi, type UpdateAccountPayload } from '@/lib/api/accounts';
import { classesApi } from '@/lib/api/classes';

export const accountKeys = {
  all: ['accounts'] as const,
  lists: () => [...accountKeys.all, 'list'] as const,
};

export function useAccounts(enabled = true) {
  return useQuery({
    queryKey: accountKeys.lists(),
    queryFn: accountsApi.list,
    enabled,
  });
}

export function useUpdateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateAccountPayload) => accountsApi.update(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accountKeys.lists() });
    },
  });
}

export const knownClassesKeys = {
  all: ['known-classes'] as const,
  lists: () => [...knownClassesKeys.all, 'list'] as const,
};

interface UseKnownClassesOptions {
  enabled?: boolean;
}

export function useKnownClasses({ enabled = true }: UseKnownClassesOptions = {}) {
  return useQuery({
    queryKey: knownClassesKeys.lists(),
    queryFn: classesApi.list,
    staleTime: 5 * 60 * 1000,
    enabled,
  });
}
