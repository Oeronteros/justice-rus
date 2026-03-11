import { getApiSchedule, patchApiSchedule, postApiSchedule } from '@/lib/api/generated';
import { sameOriginOpenApiClient } from './openapi-client';
import {
  createScheduleSchema,
  scheduleSchema,
  schedulesArraySchema,
  type CreateScheduleDto,
  type Schedule,
  type UpdateScheduleDto,
  updateScheduleSchema,
} from '@/lib/schemas/schedule';

export const scheduleApi = {
  list: async (language: string = 'ru'): Promise<Schedule[]> => {
    const queryLanguage = language === 'en' || language === 'zh' ? language : 'ru';
    const response = await getApiSchedule({
      client: sameOriginOpenApiClient,
      query: { language: queryLanguage },
    });
    const data = schedulesArraySchema.parse(response.data || []);
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
    const response = await patchApiSchedule({
      client: sameOriginOpenApiClient,
      body: updateScheduleSchema.parse(payload),
    });
    const item = scheduleSchema.parse(response.data || {});
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

  create: async (payload: CreateScheduleDto): Promise<Schedule> => {
    const response = await postApiSchedule({
      client: sameOriginOpenApiClient,
      body: createScheduleSchema.parse(payload),
    });
    const item = scheduleSchema.parse(response.data || {});
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
