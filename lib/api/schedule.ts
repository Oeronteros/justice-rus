import { api } from './client';
import {
  schedulesArraySchema,
  type Schedule,
} from '@/lib/schemas/schedule';

export const scheduleApi = {
  list: async (language: string = 'ru'): Promise<Schedule[]> => {
    const data = await api.get(`schedule?language=${encodeURIComponent(language)}`, schedulesArraySchema);
    return data.map((item) => ({
      date: item.date || '',
      registration: item.registration || '',
      type: item.type || '',
      description: item.description || '',
      group: item.group || '',
    }));
  },
};
