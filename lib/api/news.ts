import { getApiNews, postApiNews } from '@/lib/api/generated';
import { sameOriginOpenApiClient } from './openapi-client';
import { toApiError, parseJsonResponse } from './route-contract';
import {
  createNewsSchema,
  newsArraySchema,
  newsSchema,
  type CreateNewsDto,
  type News,
} from '@/lib/schemas/news';

export type CreateNewsPayload = CreateNewsDto;

function unwrapNewsResponse<T>(
  result: { data?: T; error?: unknown; response?: Response },
  fallbackMessage: string
): T {
  if (result.error !== undefined) {
    const status = result.response?.status ?? 500;
    throw toApiError(result.error, status, fallbackMessage);
  }

  return (result.data as T | undefined) as T;
}

export const newsApi = {
  list: async (): Promise<News[]> => {
    const response = await getApiNews({ client: sameOriginOpenApiClient });
    return newsArraySchema.parse(unwrapNewsResponse(response, 'Failed to fetch news') || []);
  },

  create: async (payload: CreateNewsDto): Promise<News> => {
    const response = await postApiNews({
      client: sameOriginOpenApiClient,
      body: createNewsSchema.parse(payload),
    });

    return newsSchema.parse(unwrapNewsResponse(response, 'Failed to create news') || {});
  },

  remove: async (id: string): Promise<{ id: string }> => {
    const response = await fetch(`/api/news/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
      },
    });

    const payload = await parseJsonResponse(response);
    if (!response.ok) {
      throw toApiError(payload, response.status, 'Failed to delete news');
    }

    const payloadId =
      payload && typeof payload === 'object' && 'id' in payload && typeof payload.id === 'string'
        ? payload.id
        : id;

    return {
      id: payloadId,
    };
  },
};
