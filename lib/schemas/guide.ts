import { z } from 'zod';

export const guideCategories = [
  'general', 'pve', 'pvp', 'build', 'farm', 'craft', 'training'
] as const;

export const guideSummarySchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  author: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  votes: z.number(),
  commentsCount: z.number(),
});

export const guideCommentSchema = z.object({
  id: z.string(),
  author: z.string(),
  comment: z.string(),
  createdAt: z.string(),
});

export const guideDetailSchema = z.object({
  guide: z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    category: z.string(),
    author: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  votes: z.number(),
  voted: z.boolean(),
  comments: z.array(guideCommentSchema),
});

export const createGuideSchema = z.object({
  title: z.string().min(1, 'Название обязательно').max(200, 'Максимум 200 символов'),
  content: z.string().min(10, 'Минимум 10 символов').max(500000, 'Слишком длинный текст'),
  category: z.enum(guideCategories),
  author: z.string().max(100, 'Максимум 100 символов').optional(),
});

export const createCommentSchema = z.object({
  author: z.string().max(100, 'Максимум 100 символов').optional(),
  comment: z.string().min(1, 'Комментарий обязателен').max(3000, 'Максимум 3000 символов'),
});

export const voteResponseSchema = z.object({
  votes: z.number(),
  voted: z.boolean(),
});

// Inferred types
export type GuideSummary = z.infer<typeof guideSummarySchema>;
export type GuideComment = z.infer<typeof guideCommentSchema>;
export type GuideDetail = z.infer<typeof guideDetailSchema>;
export type CreateGuideDto = z.infer<typeof createGuideSchema>;
export type CreateCommentDto = z.infer<typeof createCommentSchema>;
export type VoteResponse = z.infer<typeof voteResponseSchema>;
export type GuideCategory = typeof guideCategories[number];
