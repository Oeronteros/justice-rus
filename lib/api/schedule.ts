import { api } from './client';
import {
  scheduleSchema,
  schedulesArraySchema,
  type Schedule,
  type UpdateScheduleDto,
  updateScheduleSchema,
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
      id: item.id,
      dayType: item.dayType,
      time: item.time,
      titleRu: item.titleRu,
      titleEn: item.titleEn,
      titleZh: item.titleZh,
      orderIndex: item.orderIndex,
      active: item.active,
    }));
  },

  update: async (payload: UpdateScheduleDto): Promise<Schedule> => {
    const item = await api.patch('schedule', updateScheduleSchema.parse(payload), scheduleSchema);
    return {
      date: item.date || '',
      registration: item.registration || '',
      type: item.type || '',
      description: item.description || '',
      group: item.group || '',
      id: item.id,
      dayType: item.dayType,
      time: item.time,
      titleRu: item.titleRu,
      titleEn: item.titleEn,
      titleZh: item.titleZh,
      orderIndex: item.orderIndex,
      active: item.active,
    };
  },
};
