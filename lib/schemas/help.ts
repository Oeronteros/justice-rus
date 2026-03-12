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

export const helpRequestIdSchema = z.union([z.string(), z.number()]);

export const updateHelpRequestSchema = z.object({
  id: helpRequestIdSchema,
  status: z.enum(['open', 'closed']),
});

export const updateHelpTimeRangeSchema = z.object({
  id: helpRequestIdSchema,
  gatheringStart: z.string().min(1),
  gatheringEnd: z.string().min(1),
});

export const mutateHelpRequestSchema = z
  .object({
    id: helpRequestIdSchema,
    status: z.enum(['open', 'closed']).optional(),
    gatheringStart: z.string().trim().min(1).optional(),
    gatheringEnd: z.string().trim().min(1).optional(),
  })
  .superRefine((value, ctx) => {
    const hasStatus = Boolean(value.status);
    const hasStart = Boolean(value.gatheringStart);
    const hasEnd = Boolean(value.gatheringEnd);

    if (!hasStatus && !(hasStart && hasEnd)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Nothing to update' });
    }

    if ((hasStart || hasEnd) && !(hasStart && hasEnd)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Both gatheringStart and gatheringEnd are required',
      });
    }
  });

export const helpRsvpSchema = z.object({
  id: helpRequestIdSchema,
});

export type HelpRequest = z.infer<typeof helpRequestSchema>;
export type CreateHelpRequestDto = z.infer<typeof createHelpRequestSchema>;
export type UpdateHelpRequestDto = z.infer<typeof updateHelpRequestSchema>;
export type UpdateHelpTimeRangeDto = z.infer<typeof updateHelpTimeRangeSchema>;
export type MutateHelpRequestDto = z.infer<typeof mutateHelpRequestSchema>;
export type HelpRsvpDto = z.infer<typeof helpRsvpSchema>;
export type HelpResponder = z.infer<typeof helpResponderSchema>;
