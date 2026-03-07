import { z } from 'zod';

export const registrationRanks = [
  'guest', 'member', 'officer', 'head', 'sysadmin'
] as const;

export const registrationStatuses = [
  'active', 'inactive', 'pending', 'leave'
] as const;

export const registrationSchema = z.object({
  discord: z.string(),
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
  status: z.enum(registrationStatuses),
});

export const registrationsArraySchema = z.array(registrationSchema);

// Inferred types
export type Registration = z.infer<typeof registrationSchema>;
export type RegistrationRank = typeof registrationRanks[number];
export type RegistrationStatus = typeof registrationStatuses[number];
