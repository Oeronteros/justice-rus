import { 
  getApiScheduleRsvp,
  postApiScheduleRsvp,
  patchApiScheduleRsvp,
  deleteApiScheduleRsvp,
  getApiScheduleRsvpSummary
} from '@/lib/api/generated';
import { sameOriginOpenApiClient } from './openapi-client';
import {
  rsvpSchema,
  rsvpsArraySchema,
  rsvpSummarySchema,
  createRsvpSchema,
  updateRsvpSchema,
  type Rsvp,
  type CreateRsvpDto,
  type UpdateRsvpDto,
  type RsvpSummary,
} from '@/lib/schemas/rsvp';



export const rsvpApi = {
  // Get user's RSVP responses
  list: async (userId: string): Promise<Rsvp[]> => {
    const response = await getApiScheduleRsvp({
      client: sameOriginOpenApiClient,
      query: { userId },
    });
    return rsvpsArraySchema.parse(response.data || []);
  },

  // Get RSVP summary for a schedule event
  getSummary: async (scheduleId: string): Promise<RsvpSummary> => {
    const response = await getApiScheduleRsvpSummary({
      client: sameOriginOpenApiClient,
      query: { scheduleId },
    });
    return rsvpSummarySchema.parse(response.data || {});
  },

  // Create or update RSVP
  upsert: async (payload: CreateRsvpDto & { userId: string }): Promise<Rsvp> => {
    const response = await postApiScheduleRsvp({
      client: sameOriginOpenApiClient,
      body: createRsvpSchema.parse({
        scheduleId: payload.scheduleId,
        status: payload.status,
        note: payload.note,
      }),
      query: { userId: payload.userId },
    });
    return rsvpSchema.parse(response.data || {});
  },

  // Update RSVP
  update: async (payload: UpdateRsvpDto): Promise<Rsvp> => {
    const response = await patchApiScheduleRsvp({
      client: sameOriginOpenApiClient,
      body: updateRsvpSchema.parse(payload),
    });
    return rsvpSchema.parse(response.data || {});
  },

  // Delete RSVP
  delete: async (id: string): Promise<void> => {
    await deleteApiScheduleRsvp({
      client: sameOriginOpenApiClient,
      query: { id },
    });
  },
};
