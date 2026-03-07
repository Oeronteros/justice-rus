import { useQuery } from '@tanstack/react-query';
import { classesApi } from '@/lib/api/classes';

export const knownClassesKeys = {
  all: ['known-classes'] as const,
  lists: () => [...knownClassesKeys.all, 'list'] as const,
};

export function useKnownClasses() {
  return useQuery({
    queryKey: knownClassesKeys.lists(),
    queryFn: classesApi.list,
    staleTime: 5 * 60 * 1000,
  });
}
