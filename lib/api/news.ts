import { getApiNews, postApiNews } from '@/lib/api/generated';
import { sameOriginOpenApiClient } from './openapi-client';
import {
  createNewsSchema,
  newsArraySchema,
  newsSchema,
  type CreateNewsDto,
  type News,
} from '@/lib/schemas/news';

export type CreateNewsPayload = CreateNewsDto;

export const newsApi = {
  list: async (): Promise<News[]> => {
    const response = await getApiNews({ client: sameOriginOpenApiClient });
    return newsArraySchema.parse(response.data || []);
  },

  create: async (payload: CreateNewsDto): Promise<News> => {
    const response = await postApiNews({
      client: sameOriginOpenApiClient,
      body: createNewsSchema.parse(payload),
    });

    return newsSchema.parse(response.data || {});
  },

  remove: async (id: string): Promise<{ id: string }> => {
    const response = await fetch(`/api/news/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
      },
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(typeof payload?.error === 'string' ? payload.error : 'Failed to delete news');
    }

    return {
      id: typeof payload?.id === 'string' ? payload.id : id,
    };
  },
};
