import { z } from 'zod';
import { api } from './client';

const classesSchema = z.array(z.string());

export const classesApi = {
  list: async (): Promise<string[]> => api.get('classes', classesSchema),
};
