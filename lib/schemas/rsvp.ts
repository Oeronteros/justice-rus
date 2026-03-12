import { z } from 'zod';

// RSVP response types
export const rsvpStatusSchema = z.enum(['going', 'not_going', 'maybe', 'pending']);
export type RsvpStatus = z.infer<typeof rsvpStatusSchema>;

// RSVP response for a schedule event
export const rsvpSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  scheduleId: z.string(),
  status: rsvpStatusSchema,
  note: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const createRsvpSchema = z.object({
  scheduleId: z.string(),
  status: rsvpStatusSchema,
  note: z.string().optional(),
});

export const updateRsvpSchema = z.object({
  id: z.string(),
  status: rsvpStatusSchema,
  note: z.string().optional(),
});

export type Rsvp = z.infer<typeof rsvpSchema>;
export type CreateRsvpDto = z.infer<typeof createRsvpSchema>;
export type UpdateRsvpDto = z.infer<typeof updateRsvpSchema>;

// RSVP summary for display
export const rsvpSummarySchema = z.object({
  scheduleId: z.string(),
  going: z.number(),
  notGoing: z.number(),
  maybe: z.number(),
  pending: z.number(),
  total: z.number(),
  myStatus: rsvpStatusSchema.nullable(),
});

export type RsvpSummary = z.infer<typeof rsvpSummarySchema>;

export const rsvpsArraySchema = z.array(rsvpSchema);