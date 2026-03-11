import { deleteApiPvp, getApiPvp, patchApiPvp, postApiPvp } from '@/lib/api/generated';
import { pvpReportSchema, pvpStateSchema, type PvpReportDto, type PvpState } from '@/lib/schemas/pvp';
import { sameOriginOpenApiClient } from './openapi-client';

export const pvpApi = {
  getState: async (): Promise<PvpState> => {
    const response = await getApiPvp({ client: sameOriginOpenApiClient });
    return pvpStateSchema.parse(response.data || {});
  },
  joinQueue: async (): Promise<PvpState> => {
    const response = await postApiPvp({ client: sameOriginOpenApiClient });
    return pvpStateSchema.parse(response.data || {});
  },
  leaveQueue: async (): Promise<PvpState> => {
    const response = await deleteApiPvp({ client: sameOriginOpenApiClient });
    return pvpStateSchema.parse(response.data || {});
  },
  reportResult: async (data: PvpReportDto): Promise<PvpState> => {
    const response = await patchApiPvp({
      client: sameOriginOpenApiClient,
      body: pvpReportSchema.parse(data),
    });
    return pvpStateSchema.parse(response.data || {});
  },
};
