import { z } from 'zod';

export const scheduleSchema = z.object({
  date: z.string(),
  registration: z.string(),
  type: z.string(),
  description: z.string(),
});

export const schedulesArraySchema = z.array(scheduleSchema);

// Inferred types
export type Schedule = z.infer<typeof scheduleSchema>;
