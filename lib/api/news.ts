import { api } from './client';
import {
  newsArraySchema,
  type News,
} from '@/lib/schemas/news';

export const newsApi = {
  list: async (): Promise<News[]> => {
    return api.get('news', newsArraySchema);
  },
};
