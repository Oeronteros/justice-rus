import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { accountsApi, type UpdateAccountPayload } from '@/lib/api/accounts';

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
