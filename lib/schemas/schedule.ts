import { z } from 'zod';

export const scheduleSchema = z.object({
  id: z.string().optional(),
  date: z.string().default(''),
  registration: z.string().default(''),
  type: z.string().default(''),
  description: z.string().default(''),
  group: z.string().default(''),
  dayType: z.string().optional(),
  time: z.string().optional(),
  titleRu: z.string().optional(),
  titleEn: z.string().optional(),
  titleZh: z.string().optional(),
  orderIndex: z.number().optional(),
  active: z.boolean().optional(),
});

export const schedulesArraySchema = z.array(scheduleSchema);

export const updateScheduleSchema = z.object({
  id: z.string().min(1),
  dayType: z.string().trim().min(1).max(60),
  time: z.string().trim().max(60),
  titleRu: z.string().trim().min(1).max(160),
  titleEn: z.string().trim().min(1).max(160),
  titleZh: z.string().trim().max(160).optional(),
  orderIndex: z.number().int().min(0).max(999).default(0),
  active: z.boolean().default(true),
});

// Inferred types
export type Schedule = z.infer<typeof scheduleSchema>;
export type UpdateScheduleDto = z.infer<typeof updateScheduleSchema>;
