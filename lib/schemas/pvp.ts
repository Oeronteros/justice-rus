import { z } from 'zod';

export const pvpQueueEntrySchema = z.object({
  playerId: z.string(),
  nickname: z.string(),
  className: z.string(),
  joinedAt: z.string(),
});

export const pvpRatingSchema = z.object({
  playerId: z.string(),
  nickname: z.string(),
  rating: z.number(),
  wins: z.number(),
  losses: z.number(),
});

export const pvpMatchSchema = z.object({
  id: z.string(),
  status: z.enum(['pending', 'completed']),
  createdAt: z.string(),
  updatedAt: z.string(),
  confirmedAt: z.string().nullable(),
  winnerId: z.string().nullable(),
  playerOne: z.object({
    id: z.string(),
    nickname: z.string(),
    className: z.string(),
  }),
  playerTwo: z.object({
    id: z.string(),
    nickname: z.string(),
    className: z.string(),
  }),
  yourReport: z.enum(['win', 'loss']).nullable(),
  opponentReport: z.enum(['win', 'loss']).nullable(),
  confirmationStatus: z.enum(['unreported', 'waiting', 'disputed', 'confirmed']),
});

export const pvpStateSchema = z.object({
  queue: z.array(pvpQueueEntrySchema),
  leaderboard: z.array(pvpRatingSchema),
  recentMatches: z.array(pvpMatchSchema),
  activeMatch: pvpMatchSchema.nullable(),
  userInQueue: z.boolean(),
  userRating: pvpRatingSchema.nullable(),
});

export const pvpReportSchema = z.object({
  matchId: z.string().min(1),
  result: z.enum(['win', 'loss']),
});

export type PvpQueueEntry = z.infer<typeof pvpQueueEntrySchema>;
export type PvpRating = z.infer<typeof pvpRatingSchema>;
export type PvpMatch = z.infer<typeof pvpMatchSchema>;
export type PvpState = z.infer<typeof pvpStateSchema>;
export type PvpReportDto = z.infer<typeof pvpReportSchema>;
