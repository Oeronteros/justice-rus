import { api } from './client';
import { helpRequestSchema, type HelpRequest, type CreateHelpRequestDto, type UpdateHelpRequestDto } from '@/lib/schemas/help';
import { z } from 'zod';

export const helpApi = {
  list: async (status: 'open' | 'closed' | 'all' = 'open'): Promise<HelpRequest[]> => {
    return api.get(`help?status=${status}`, z.array(helpRequestSchema));
  },

  create: async (data: CreateHelpRequestDto): Promise<HelpRequest> => {
    return api.post('help', data, helpRequestSchema);
  },

  updateStatus: async (data: UpdateHelpRequestDto): Promise<HelpRequest> => {
    return api.patch('help', data, helpRequestSchema);
  },
};
