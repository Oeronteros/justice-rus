import { z } from 'zod';

export const newsSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  author: z.string(),
  date: z.string(),
  pinned: z.boolean().optional(),
});

export const newsArraySchema = z.array(newsSchema);

// Inferred types
export type News = z.infer<typeof newsSchema>;
