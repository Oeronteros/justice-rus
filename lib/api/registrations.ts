import { api } from './client';
import {
  registrationsArraySchema,
  type Registration,
} from '@/lib/schemas/registration';

export const registrationsApi = {
  list: async (): Promise<Registration[]> => {
    return api.get('discord-proxy/registration', registrationsArraySchema);
  },
};
