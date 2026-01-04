import { useQuery } from '@tanstack/react-query';
import { newsApi } from '@/lib/api/news';

// Query key factory
export const newsKeys = {
  all: ['news'] as const,
  lists: () => [...newsKeys.all, 'list'] as const,
};

export function useNews() {
  return useQuery({
    queryKey: newsKeys.lists(),
    queryFn: newsApi.list,
  });
}
