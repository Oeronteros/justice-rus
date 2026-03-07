import type { Registration } from '@/lib/schemas/registration';

export type RegistrationRow = Omit<Registration, 'kpi'>;

export type PortalOnlyRow = {
  id: number | string;
  nickname: string;
  class_name: string | null;
  guild_name?: string | null;
  discord_handle?: string | null;
  role: string;
  is_active: boolean;
  created_at: Date | string;
  duel_rating?: number;
  duel_wins?: number;
  duel_losses?: number;
  best_mmr?: number;
  bounty_score?: number;
  outer_heroic?: number;
  inner_heroic?: number;
  crimson_sands?: number;
  abyss_score?: number;
  gvg_score?: number;
  secret_realm_score?: number;
};

export function pick(columns: Set<string>, ...candidates: string[]): string | null {
  return candidates.find((candidate) => columns.has(candidate.toLowerCase())) || null;
}

export function numericValue(value: unknown): number {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : 0;
}

export function isoDate(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === 'string' && value.trim()) {
    return value;
  }

  return new Date().toISOString();
}

export function portalStatsDiscordId(accountId: number | string): string {
  return `portal:${accountId}`;
}

export function buildComputedRows(rows: RegistrationRow[]): Registration[] {
  const averageMmr = rows.length > 0 ? rows.reduce((sum, row) => sum + row.mmr20, 0) / rows.length : 0;

  return rows.map((row) => {
    const marks =
      row.outerHeroic +
      row.innerHeroic +
      row.crimsonSands +
      row.abyss +
      row.gvg +
      row.secretRealm;
    const modifier = averageMmr > 0 && row.mmr20 < averageMmr * 0.7 ? -2 : 1;

    return {
      ...row,
      marks,
      kpi: marks + row.bounty + modifier,
    };
  });
}
