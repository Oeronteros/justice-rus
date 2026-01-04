import { api } from './client';
import {
  absencesArraySchema,
  absenceSchema,
  type Absence,
  type CreateAbsenceDto,
} from '@/lib/schemas/absence';

export const absencesApi = {
  list: async (): Promise<Absence[]> => {
    return api.get('discord-proxy/absences', absencesArraySchema);
  },

  create: async (data: CreateAbsenceDto): Promise<Absence> => {
    return api.post('discord-proxy/absences', data, absenceSchema);
  },
};
