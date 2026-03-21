import { hasRoleAtLeast } from '@/lib/authz';
import { handleApiError } from '@/lib/api/errors';
import { newsKeys, useCreateNews, useDeleteNews, useNews, usePrefetchNews } from '@/lib/news/hooks';
import type { User } from '@/lib/schemas/auth';

export type NewsFeatureAdapter = {
  keys: typeof newsKeys;
  useListQuery: typeof useNews;
  useCreateMutation: typeof useCreateNews;
  useDeleteMutation: typeof useDeleteNews;
  usePrefetchList: typeof usePrefetchNews;
  canManage: (user: User) => boolean;
  toErrorMessage: (error: unknown) => string;
  permissionMessage: string;
};

export function createNewsFeatureAdapter(): NewsFeatureAdapter {
  return {
    keys: newsKeys,
    useListQuery: useNews,
    useCreateMutation: useCreateNews,
    useDeleteMutation: useDeleteNews,
    usePrefetchList: usePrefetchNews,
    canManage: (user) => hasRoleAtLeast(user.role, 'officer'),
    toErrorMessage: (error) => handleApiError(error),
    permissionMessage: 'Недостаточно прав для публикации новостей',
  };
}

export const sharedNewsFeatureAdapter = createNewsFeatureAdapter();
