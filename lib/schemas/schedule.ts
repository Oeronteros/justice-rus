import { z } from 'zod';

export const scheduleSchema = z.object({
  date: z.string().default(''),
  registration: z.string().default(''),
  type: z.string().default(''),
  description: z.string().default(''),
  group: z.string().default(''),
});

export const schedulesArraySchema = z.array(scheduleSchema);

// Inferred types
export type Schedule = z.infer<typeof scheduleSchema>;
