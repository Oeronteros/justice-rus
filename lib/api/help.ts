import {
  deleteApiHelp,
  deleteApiHelpResponders,
  getApiHelp,
  patchApiHelp,
  postApiHelp,
  postApiHelpResponders,
} from '@/lib/api/generated';
import {
  helpRequestSchema,
  type HelpRequest,
  type CreateHelpRequestDto,
  type UpdateHelpRequestDto,
  type UpdateHelpTimeRangeDto,
  type HelpRsvpDto,
} from '@/lib/schemas/help';
import { z } from 'zod';
import { sameOriginOpenApiClient } from './openapi-client';

export const helpApi = {
  list: async (status: 'open' | 'closed' | 'all' = 'open'): Promise<HelpRequest[]> => {
    const response = await getApiHelp({
      client: sameOriginOpenApiClient,
      query: { status },
    });
    return z.array(helpRequestSchema).parse(response.data || []);
  },

  create: async (data: CreateHelpRequestDto): Promise<HelpRequest> => {
    const response = await postApiHelp({
      client: sameOriginOpenApiClient,
      body: data,
    });
    return helpRequestSchema.parse(response.data || {});
  },

  updateStatus: async (data: UpdateHelpRequestDto): Promise<HelpRequest> => {
    const response = await patchApiHelp({
      client: sameOriginOpenApiClient,
      body: { ...data, id: String(data.id) },
    });
    return helpRequestSchema.parse(response.data || {});
  },

  updateTimeRange: async (data: UpdateHelpTimeRangeDto): Promise<HelpRequest> => {
    const response = await patchApiHelp({
      client: sameOriginOpenApiClient,
      body: { ...data, id: String(data.id) },
    });
    return helpRequestSchema.parse(response.data || {});
  },

  rsvp: async (data: HelpRsvpDto): Promise<HelpRequest> => {
    const response = await postApiHelpResponders({
      client: sameOriginOpenApiClient,
      body: { ...data, id: String(data.id) },
    });
    return helpRequestSchema.parse(response.data || {});
  },

  withdrawRsvp: async (id: string): Promise<HelpRequest> => {
    const response = await deleteApiHelpResponders({
      client: sameOriginOpenApiClient,
      query: { id },
    });
    return helpRequestSchema.parse(response.data || {});
  },

  remove: async (id: string): Promise<{ success: boolean }> => {
    const response = await deleteApiHelp({
      client: sameOriginOpenApiClient,
      query: { id },
    });
    return z.object({ success: z.boolean() }).parse(response.data || {});
  },
};
