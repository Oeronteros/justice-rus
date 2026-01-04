import { z } from 'zod';

export const helpRequestSchema = z.object({
  id: z.string(),
  title: z.string(),
  details: z.string(),
  category: z.string(),
  author: z.string(),
  status: z.enum(['open', 'closed']),
  createdAt: z.string(),
});

export const createHelpRequestSchema = z.object({
  title: z.string().min(1, 'Заголовок обязателен').max(140),
  details: z.string().min(10, 'Минимум 10 символов').max(5000),
  category: z.string(),
  author: z.string().max(60).optional(),
});

export const updateHelpRequestSchema = z.object({
  id: z.string(),
  status: z.enum(['open', 'closed']),
});

export type HelpRequest = z.infer<typeof helpRequestSchema>;
export type CreateHelpRequestDto = z.infer<typeof createHelpRequestSchema>;
export type UpdateHelpRequestDto = z.infer<typeof updateHelpRequestSchema>;
