import { z } from 'zod';

export const helpResponderSchema = z.object({
  userId: z.string(),
  nickname: z.string(),
  className: z.string(),
  respondedAt: z.string(),
});

export const helpRequestSchema = z.object({
  id: z.string(),
  title: z.string(),
  details: z.string(),
  category: z.string(),
  author: z.string(),
  authorUserId: z.string().nullable(),
  status: z.enum(['open', 'closed']),
  createdAt: z.string(),
  gatheringStart: z.string(),
  gatheringEnd: z.string(),
  responders: z.array(helpResponderSchema),
});

export const createHelpRequestSchema = z.object({
  title: z.string().min(1, 'Заголовок обязателен').max(140),
  details: z.string().min(10, 'Минимум 10 символов').max(5000),
  category: z.string(),
  author: z.string().max(60).optional(),
  gatheringStart: z.string().min(1, 'Укажи время сбора: начало'),
  gatheringEnd: z.string().min(1, 'Укажи время сбора: конец'),
});

export const updateHelpRequestSchema = z.object({
  id: z.string(),
  status: z.enum(['open', 'closed']),
});

export const updateHelpTimeRangeSchema = z.object({
  id: z.string(),
  gatheringStart: z.string().min(1),
  gatheringEnd: z.string().min(1),
});

export const helpRsvpSchema = z.object({
  id: z.string(),
});

export type HelpRequest = z.infer<typeof helpRequestSchema>;
export type CreateHelpRequestDto = z.infer<typeof createHelpRequestSchema>;
export type UpdateHelpRequestDto = z.infer<typeof updateHelpRequestSchema>;
export type UpdateHelpTimeRangeDto = z.infer<typeof updateHelpTimeRangeSchema>;
export type HelpRsvpDto = z.infer<typeof helpRsvpSchema>;
export type HelpResponder = z.infer<typeof helpResponderSchema>;
