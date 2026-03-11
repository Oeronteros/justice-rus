import { getApiNews } from '@/lib/api/generated';
import { sameOriginOpenApiClient } from './openapi-client';
import { api } from './client';
import {
  newsArraySchema,
  newsSchema,
  type News,
} from '@/lib/schemas/news';
import { z } from 'zod';

const createNewsPayloadSchema = z.object({
  title: z.string().trim().min(3).max(160),
  content: z.string().trim().min(3).max(12000),
  author: z.string().trim().max(120).optional(),
  pinned: z.boolean().optional(),
});

export type CreateNewsPayload = z.infer<typeof createNewsPayloadSchema>;

export const newsApi = {
  list: async (): Promise<News[]> => {
    const response = await getApiNews({ client: sameOriginOpenApiClient });
    return newsArraySchema.parse(response.data || []);
  },

  create: async (payload: CreateNewsPayload): Promise<News> => {
    return api.post('news', createNewsPayloadSchema.parse(payload), newsSchema);
  },
};
