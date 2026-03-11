import { z } from 'zod';
import { getApiClasses } from '@/lib/api/generated';
import { sameOriginOpenApiClient } from './openapi-client';

const classesSchema = z.array(z.string());

export const classesApi = {
  list: async (): Promise<string[]> => {
    const response = await getApiClasses({ client: sameOriginOpenApiClient });
    return classesSchema.parse(response.data || []);
  },
};
