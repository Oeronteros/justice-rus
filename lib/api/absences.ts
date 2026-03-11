import {
  getApiDiscordProxyAbsences,
  patchApiDiscordProxyAbsences,
  postApiDiscordProxyAbsences,
} from '@/lib/api/generated';
import {
  absencesArraySchema,
  absenceSchema,
  type Absence,
  type CreateAbsenceDto,
  type UpdateAbsenceStatusDto,
} from '@/lib/schemas/absence';
import { sameOriginOpenApiClient } from './openapi-client';

export const absencesApi = {
  list: async (): Promise<Absence[]> => {
    const response = await getApiDiscordProxyAbsences({ client: sameOriginOpenApiClient });
    return absencesArraySchema.parse(response.data || []);
  },

  create: async (data: CreateAbsenceDto): Promise<Absence> => {
    const response = await postApiDiscordProxyAbsences({
      client: sameOriginOpenApiClient,
      body: data,
    });
    return absenceSchema.parse(response.data || {});
  },

  updateStatus: async (data: UpdateAbsenceStatusDto): Promise<Absence> => {
    const response = await patchApiDiscordProxyAbsences({
      client: sameOriginOpenApiClient,
      body: data,
    });
    return absenceSchema.parse(response.data || {});
  },
};
