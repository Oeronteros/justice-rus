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
  helpResponderSchema,
  type HelpRequest,
  type CreateHelpRequestDto,
  type UpdateHelpRequestDto,
  type UpdateHelpTimeRangeDto,
  type HelpRsvpDto,
} from '@/lib/schemas/help';
import { z } from 'zod';
import { sameOriginOpenApiClient } from './openapi-client';

const helpRequestWireSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  title: z.string().optional(),
  details: z.string().optional(),
  category: z.string().optional(),
  author: z.string().optional(),
  authorUserId: z.union([z.string(), z.number(), z.null()]).optional(),
  author_user_id: z.union([z.string(), z.number(), z.null()]).optional(),
  status: z.enum(['open', 'closed']).optional(),
  createdAt: z.string().optional(),
  created_at: z.string().optional(),
  gatheringStart: z.string().optional(),
  gathering_start: z.string().optional(),
  gatheringEnd: z.string().optional(),
  gathering_end: z.string().optional(),
  responders: z.array(z.any()).optional(),
});

function normalizeResponder(value: unknown) {
  const responder = z.object({
    userId: z.union([z.string(), z.number()]).optional(),
    responder_user_id: z.union([z.string(), z.number()]).optional(),
    nickname: z.string().optional(),
    responder_nickname: z.string().optional(),
    className: z.string().optional(),
    responder_class: z.string().optional(),
    respondedAt: z.string().optional(),
    responded_at: z.string().optional(),
  }).parse(value);

  return helpResponderSchema.parse({
    userId: String(responder.userId ?? responder.responder_user_id ?? ''),
    nickname: responder.nickname ?? responder.responder_nickname ?? '',
    className: responder.className ?? responder.responder_class ?? '',
    respondedAt: responder.respondedAt ?? responder.responded_at ?? new Date().toISOString(),
  });
}

function normalizeHelpRequest(value: unknown): HelpRequest {
  const request = helpRequestWireSchema.parse(value);
  return helpRequestSchema.parse({
    id: String(request.id ?? ''),
    title: request.title ?? '',
    details: request.details ?? '',
    category: request.category ?? 'general',
    author: request.author ?? 'unknown',
    authorUserId: request.authorUserId ?? request.author_user_id ?? null,
    status: request.status ?? 'open',
    createdAt: request.createdAt ?? request.created_at ?? new Date().toISOString(),
    gatheringStart: request.gatheringStart ?? request.gathering_start ?? new Date().toISOString(),
    gatheringEnd: request.gatheringEnd ?? request.gathering_end ?? new Date().toISOString(),
    responders: Array.isArray(request.responders) ? request.responders.map(normalizeResponder) : [],
  });
}

async function readJsonResponse(response: Response): Promise<unknown> {
  return response.json().catch(() => null);
}

export const helpApi = {
  list: async (status: 'open' | 'closed' | 'all' = 'open'): Promise<HelpRequest[]> => {
    const response = await fetch(`/api/help?status=${encodeURIComponent(status)}`, {
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
      },
    });
    const payload = await readJsonResponse(response);
    if (!response.ok) {
      const error = z.object({ error: z.string().optional() }).catch({}).parse(payload);
      throw new Error(error.error || 'Failed to load help requests');
    }

    const list = Array.isArray(payload)
      ? payload
      : Array.isArray((payload as { items?: unknown[] } | null)?.items)
        ? (payload as { items: unknown[] }).items
        : [];

    return list.map(normalizeHelpRequest);
  },

  create: async (data: CreateHelpRequestDto): Promise<HelpRequest> => {
    const response = await postApiHelp({
      client: sameOriginOpenApiClient,
      body: data,
    });
    return normalizeHelpRequest(response.data || {});
  },

  updateStatus: async (data: UpdateHelpRequestDto): Promise<HelpRequest> => {
    const response = await patchApiHelp({
      client: sameOriginOpenApiClient,
      body: { ...data, id: String(data.id) },
    });
    return normalizeHelpRequest(response.data || {});
  },

  updateTimeRange: async (data: UpdateHelpTimeRangeDto): Promise<HelpRequest> => {
    const response = await patchApiHelp({
      client: sameOriginOpenApiClient,
      body: { ...data, id: String(data.id) },
    });
    return normalizeHelpRequest(response.data || {});
  },

  rsvp: async (data: HelpRsvpDto): Promise<HelpRequest> => {
    const response = await postApiHelpResponders({
      client: sameOriginOpenApiClient,
      body: { ...data, id: String(data.id) },
    });
    return normalizeHelpRequest(response.data || {});
  },

  withdrawRsvp: async (id: string): Promise<HelpRequest> => {
    const response = await deleteApiHelpResponders({
      client: sameOriginOpenApiClient,
      query: { id },
    });
    return normalizeHelpRequest(response.data || {});
  },

  remove: async (id: string): Promise<{ success: boolean }> => {
    const response = await deleteApiHelp({
      client: sameOriginOpenApiClient,
      query: { id },
    });
    return z.object({ success: z.boolean() }).parse(response.data || {});
  },
};
