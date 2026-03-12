import { getApiNews, postApiNews } from '@/lib/api/generated';
import { sameOriginOpenApiClient } from './openapi-client';
import {
  createNewsSchema,
  newsArraySchema,
  newsSchema,
  type CreateNewsDto,
  type News,
} from '@/lib/schemas/news';

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
};
