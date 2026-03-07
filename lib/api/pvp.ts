import { api } from './client';
import { pvpReportSchema, pvpStateSchema, type PvpReportDto, type PvpState } from '@/lib/schemas/pvp';

export const pvpApi = {
  getState: async (): Promise<PvpState> => api.get('pvp', pvpStateSchema),
  joinQueue: async (): Promise<PvpState> => api.post('pvp', {}, pvpStateSchema),
  leaveQueue: async (): Promise<PvpState> => api.delete('pvp', pvpStateSchema),
  reportResult: async (data: PvpReportDto): Promise<PvpState> => api.patch('pvp', pvpReportSchema.parse(data), pvpStateSchema),
};
