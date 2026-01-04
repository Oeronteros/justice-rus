import { api } from './client';
import {
  schedulesArraySchema,
  type Schedule,
} from '@/lib/schemas/schedule';

export const scheduleApi = {
  list: async (language: string = 'ru'): Promise<Schedule[]> => {
    return api.get(`schedule?language=${encodeURIComponent(language)}`, schedulesArraySchema);
  },
};
