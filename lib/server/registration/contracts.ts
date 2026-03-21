import { z } from 'zod';
import {
  notificationDefaultsSchema,
  prefixOptionSchema,
  profileInterestSchema,
  profileTitleSchema,
} from '@/lib/schemas/registration';

export const updateRegistrationStatsSchema = z.object({
  nickname: z.string().trim().min(1),
  className: z.string().trim().min(1).max(100).optional(),
  guild: z.string().trim().max(120).optional(),
  discordHandle: z.string().trim().max(120).optional(),
  prefix: prefixOptionSchema.nullable().optional(),
  profileTitle: profileTitleSchema.nullable().optional(),
  preferredClasses: z.array(z.string().trim().min(1).max(100)).max(6).optional(),
  interests: z.array(profileInterestSchema).max(8).optional(),
  notificationDefaults: notificationDefaultsSchema.optional(),
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
