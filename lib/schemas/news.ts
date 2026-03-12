import { z } from 'zod';

export const discordDeliveryStatusSchema = z.enum(['pending', 'sent', 'failed']);

export const createNewsSchema = z.object({
  title: z.string().trim().min(3).max(160),
  content: z.string().trim().min(3).max(12000),
  author: z.string().trim().max(120).optional(),
  pinned: z.boolean().optional(),
  messageUrl: z.string().trim().url().optional(),
});

export const newsSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  author: z.string(),
  date: z.string(),
  pinned: z.boolean().optional(),
  messageUrl: z.string().optional(),
  discordDeliveryStatus: discordDeliveryStatusSchema.optional(),
  discordDeliveryError: z.string().optional(),
  publishedToDiscordAt: z.string().optional(),
});

export const newsArraySchema = z.array(newsSchema);

// Inferred types
export type News = z.infer<typeof newsSchema>;
export type DiscordDeliveryStatus = z.infer<typeof discordDeliveryStatusSchema>;
export type CreateNewsDto = z.infer<typeof createNewsSchema>;
