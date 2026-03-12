// Mock API for RSVP - backend endpoints need to be implemented
// import { 
//   getApiScheduleRsvp,
//   postApiScheduleRsvp,
//   patchApiScheduleRsvp,
//   deleteApiScheduleRsvp,
//   getApiScheduleRsvpSummary
// } from '@/lib/api/generated';
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
  // Get user's RSVP responses - MOCK
  list: async (userId: string): Promise<Rsvp[]> => {
    console.log('Mock: list RSVPs for', userId);
    return [];
  },

  // Get RSVP summary for a schedule event - MOCK
  getSummary: async (scheduleId: string): Promise<RsvpSummary> => {
    console.log('Mock: get RSVP summary for', scheduleId);
    return {
      scheduleId,
      going: 0,
      notGoing: 0,
      maybe: 0,
      pending: 0,
      total: 0,
      myStatus: null,
    };
  },

  // Create or update RSVP - MOCK
  upsert: async (payload: CreateRsvpDto & { userId: string }): Promise<Rsvp> => {
    console.log('Mock: upsert RSVP', payload);
    return {
      id: 'mock',
      ...payload,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },

  // Update RSVP - MOCK
  update: async (payload: UpdateRsvpDto): Promise<Rsvp> => {
    console.log('Mock: update RSVP', payload);
    return {} as Rsvp;
  },

  // Delete RSVP - MOCK
  delete: async (id: string): Promise<void> => {
    console.log('Mock: delete RSVP', id);
  },
};



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
