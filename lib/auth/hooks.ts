import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { accountsApi, type UpdateAccountPayload } from '@/lib/api/accounts';
import { classesApi } from '@/lib/api/classes';
import type { PortalAccountDto } from '@/lib/schemas/account';

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
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: accountKeys.lists() });

      const previousAccounts = queryClient.getQueryData<PortalAccountDto[]>(accountKeys.lists()) ?? [];
      queryClient.setQueryData<PortalAccountDto[]>(accountKeys.lists(), (old = []) =>
        old.map((account) =>
          account.id === payload.id
            ? {
                ...account,
                isActive: payload.isActive,
                role: payload.role ?? account.role,
                prefix: payload.prefix ?? account.prefix,
              }
            : account
        )
      );

      return { previousAccounts };
    },
    onError: (_error, _payload, context) => {
      if (context?.previousAccounts) {
        queryClient.setQueryData(accountKeys.lists(), context.previousAccounts);
      }
    },
    onSuccess: (updatedAccount) => {
      queryClient.setQueryData<PortalAccountDto[]>(accountKeys.lists(), (old = []) =>
        old.map((account) => (account.id === updatedAccount.id ? updatedAccount : account))
      );
    },
    onSettled: () => {
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
