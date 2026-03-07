import { z } from 'zod';

export const updateRegistrationStatsSchema = z.object({
  nickname: z.string().trim().min(1),
  className: z.string().trim().min(1).max(100).optional(),
  guild: z.string().trim().max(120).optional(),
  discordHandle: z.string().trim().max(120).optional(),
  elo: z.number().optional(),
  mmr20: z.number().optional(),
  bounty: z.number().optional(),
  outerHeroic: z.number().optional(),
  innerHeroic: z.number().optional(),
  crimsonSands: z.number().optional(),
  abyss: z.number().optional(),
  gvg: z.number().optional(),
  secretRealm: z.number().optional(),
});

export type UpdateRegistrationStatsPayload = z.infer<typeof updateRegistrationStatsSchema>;
