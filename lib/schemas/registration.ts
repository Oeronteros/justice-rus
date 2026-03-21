import { z } from 'zod';

export const prefixOptions = [
  'Чертила',
  'VIP',
  'Boobs',
  'Moonborn',
  'Raid Lead',
  'PvP Ace',
  'Abyss Walker',
] as const;

export const prefixOptionSchema = z.enum(prefixOptions);

export const profileTitleOptions = [
  'Striker',
  'Strategist',
  'Vanguard',
  'Scout',
  'Support',
] as const;

export const profileTitleSchema = z.enum(profileTitleOptions);

export const profileInterestOptions = [
  'pvp',
  'absences-planning',
  'raid-prep',
  'matchmaking',
  'mentoring',
] as const;

export const profileInterestSchema = z.enum(profileInterestOptions);

export const notificationDefaultsSchema = z.object({
  helpRequests: z.boolean(),
  absenceApprovals: z.boolean(),
  pvpMatches: z.boolean(),
  eventReminders: z.boolean(),
});

export const registrationRanks = [
  'guest', 'member', 'officer', 'head', 'sysadmin'
] as const;

export const registrationStatuses = [
  'active', 'inactive', 'pending', 'leave'
] as const;

export const registrationSchema = z.object({
  discord: z.string(),
  discordHandle: z.string().nullable().optional(),
  avatarUrl: z.string().nullable().optional(),
  prefix: z.string().nullable().optional(),
  title: profileTitleSchema.nullable().optional(),
  preferredClasses: z.array(z.string()).optional().default([]),
  interests: z.array(profileInterestSchema).optional().default([]),
  notificationDefaults: notificationDefaultsSchema.optional(),
  nickname: z.string(),
  rank: z.enum(registrationRanks),
  class: z.string(),
  guild: z.string(),
  joinDate: z.string(),
  kpi: z.number(),
  elo: z.number().default(0),
  mmr20: z.number().default(0),
  bounty: z.number().default(0),
  marks: z.number().default(0),
  outerHeroic: z.number().default(0),
  innerHeroic: z.number().default(0),
  crimsonSands: z.number().default(0),
  abyss: z.number().default(0),
  gvg: z.number().default(0),
  secretRealm: z.number().default(0),
  duelWins: z.number().default(0),
  duelLosses: z.number().default(0),
  status: z.enum(registrationStatuses),
});

export const registrationsArraySchema = z.array(registrationSchema);

export type Registration = z.infer<typeof registrationSchema>;
export type RegistrationRank = typeof registrationRanks[number];
export type RegistrationStatus = typeof registrationStatuses[number];
export type PrefixOption = typeof prefixOptions[number];
export type ProfileTitle = typeof profileTitleOptions[number];
export type ProfileInterest = typeof profileInterestOptions[number];
export type NotificationDefaults = z.infer<typeof notificationDefaultsSchema>;
