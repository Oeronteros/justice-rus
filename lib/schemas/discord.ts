import { z } from 'zod';

// Discord integration schemas
export const discordBotConfigSchema = z.object({
  botToken: z.string().min(1),
  guildId: z.string().min(1),
  apiBaseUrl: z.string().url(),
  apiKey: z.string().optional(),
  webhookUrls: z.object({
    news: z.string().url().optional(),
    absences: z.string().url().optional(),
    help: z.string().url().optional(),
    pvp: z.string().url().optional(),
  }).optional(),
  channelIds: z.object({
    news: z.string().optional(),
    announcements: z.string().optional(),
    help: z.string().optional(),
    absences: z.string().optional(),
    pvp: z.string().optional(),
  }).optional(),
});

export const discordSyncStatusSchema = z.object({
  lastSync: z.string().optional(),
  nextSync: z.string().optional(),
  status: z.enum(['idle', 'syncing', 'error']),
  error: z.string().optional(),
  stats: z.object({
    membersSynced: z.number(),
    rolesSynced: z.number(),
    messagesSent: z.number(),
  }),
});

export const discordCommandSchema = z.object({
  name: z.string(),
  description: z.string(),
  enabled: z.boolean(),
  roles: z.array(z.string()).optional(), // roles that can use command
  cooldown: z.number().optional(), // seconds
});

export const discordNotificationSchema = z.object({
  id: z.string().optional(),
  type: z.enum(['absence', 'help', 'pvp', 'news', 'schedule']),
  channelId: z.string(),
  enabled: z.boolean(),
  filters: z.object({
    roles: z.array(z.string()).optional(),
    keywords: z.array(z.string()).optional(),
  }).optional(),
  template: z.string().optional(),
});

export type DiscordBotConfig = z.infer<typeof discordBotConfigSchema>;
export type DiscordSyncStatus = z.infer<typeof discordSyncStatusSchema>;
export type DiscordCommand = z.infer<typeof discordCommandSchema>;
export type DiscordNotification = z.infer<typeof discordNotificationSchema>;
