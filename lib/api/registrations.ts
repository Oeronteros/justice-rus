import { getApiDiscordProxyRegistration, patchApiDiscordProxyRegistration } from '@/lib/api/generated';
import type { RegistrationColumnLabels } from '@/components/sections/registration/columnLabels';
import {
  notificationDefaultsSchema,
  prefixOptionSchema,
  profileInterestSchema,
  profileTitleSchema,
  registrationsArraySchema,
  type Registration,
} from '@/lib/schemas/registration';
import { z } from 'zod';
import { sameOriginOpenApiClient } from './openapi-client';
import { registrationColumnLabelsSchema } from '@/lib/registration/column-labels';

const updateRegistrationStatsPayloadSchema = z.object({
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

const updateRegistrationStatsResponseSchema = z.object({
  success: z.boolean(),
  portalOnly: z.boolean(),
});

async function readApiError(response: Response, fallbackMessage: string): Promise<never> {
  const payload = await response.json().catch(() => null) as { error?: string } | null;
  throw new Error(payload?.error || fallbackMessage);
}

export type UpdateRegistrationStatsPayload = z.infer<typeof updateRegistrationStatsPayloadSchema>;

export const registrationsApi = {
  list: async (): Promise<Registration[]> => {
    const response = await getApiDiscordProxyRegistration({ client: sameOriginOpenApiClient });
    const data = registrationsArraySchema.parse(response.data || []);
    return data.map((item) => ({
      ...item,
      elo: (item.elo ?? 0) > 0 ? (item.elo ?? 0) : 1000,
      mmr20: item.mmr20 || 0,
      bounty: item.bounty || 0,
      marks: item.marks || 0,
      outerHeroic: item.outerHeroic || 0,
      innerHeroic: item.innerHeroic || 0,
      crimsonSands: item.crimsonSands || 0,
      abyss: item.abyss || 0,
      gvg: item.gvg || 0,
      secretRealm: item.secretRealm || 0,
      duelWins: item.duelWins || 0,
      duelLosses: item.duelLosses || 0,
    }));
  },

  updateStats: async (payload: UpdateRegistrationStatsPayload): Promise<{ success: boolean; portalOnly: boolean }> => {
    const response = await patchApiDiscordProxyRegistration({
      client: sameOriginOpenApiClient,
      body: updateRegistrationStatsPayloadSchema.parse(payload),
    });

    return updateRegistrationStatsResponseSchema.parse(response.data || {});
  },

  getColumnLabels: async (): Promise<RegistrationColumnLabels> => {
    const response = await fetch('/api/registration/column-labels', {
      method: 'GET',
      credentials: 'same-origin',
    });

    if (!response.ok) {
      await readApiError(response, 'Failed to load registration column labels');
    }

    const data = await response.json();
    return registrationColumnLabelsSchema.parse(data);
  },

  updateColumnLabels: async (payload: RegistrationColumnLabels): Promise<RegistrationColumnLabels> => {
    const response = await fetch('/api/registration/column-labels', {
      method: 'PATCH',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      await readApiError(response, 'Failed to update registration column labels');
    }

    const data = await response.json();
    return registrationColumnLabelsSchema.parse(data);
  },
};
