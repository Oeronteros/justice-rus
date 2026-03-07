import { api } from './client';
import {
  registrationsArraySchema,
  type Registration,
} from '@/lib/schemas/registration';

export const registrationsApi = {
  list: async (): Promise<Registration[]> => {
    const data = await api.get('discord-proxy/registration', registrationsArraySchema);
    return data.map((item) => ({
      ...item,
      elo: item.elo || 0,
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
};
