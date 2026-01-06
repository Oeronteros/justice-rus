import { z } from 'zod';

export const scheduleSchema = z.object({
  date: z.string().optional().default(''),
  registration: z.string().optional().default(''),
  type: z.string().optional().default(''),
  description: z.string().optional().default(''),
  group: z.string().optional().default(''),
});

export const schedulesArraySchema = z.array(scheduleSchema);

// Inferred types
export type Schedule = z.infer<typeof scheduleSchema>;
