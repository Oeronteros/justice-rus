import { z } from 'zod';

export const registrationRanks = [
  'novice', 'member', 'veteran', 'elite', 'legend', 'gm'
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
  status: z.enum(registrationStatuses),
});

export const registrationsArraySchema = z.array(registrationSchema);

// Inferred types
export type Registration = z.infer<typeof registrationSchema>;
export type RegistrationRank = typeof registrationRanks[number];
export type RegistrationStatus = typeof registrationStatuses[number];
