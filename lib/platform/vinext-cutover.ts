type VinextCutoverScope = 'off' | 'pilot' | 'wave2' | 'all';

const pilotRoutes = ['/news', '/help', '/guides'] as const;
const secondWaveRoutes = ['/profile', '/absences', '/pvp', '/schedule', '/calendar'] as const;

export const vinextRouteWaves = {
  pilot: [...pilotRoutes],
  wave2: [...secondWaveRoutes],
} as const;

export function getVinextCutoverScope(value = process.env.VINEXT_CUTOVER_SCOPE): VinextCutoverScope {
  if (value === 'pilot' || value === 'wave2' || value === 'all') {
    return value;
  }

  return 'off';
}

export function getVinextOwnedRoutes(scope = getVinextCutoverScope()): string[] {
  if (scope === 'pilot') {
    return [...pilotRoutes];
  }

  if (scope === 'wave2' || scope === 'all') {
    return [...pilotRoutes, ...secondWaveRoutes];
  }

  return [];
}

export function getVinextCutoverOrigin(value = process.env.VINEXT_CUTOVER_ORIGIN): string | null {
  const normalized = (value || '').trim().replace(/\/$/, '');
  return normalized || null;
}

export function buildVinextCutoverRewrites(options?: {
  scope?: VinextCutoverScope;
  origin?: string | null;
}) {
  const scope = options?.scope ?? getVinextCutoverScope();
  const origin = options?.origin ?? getVinextCutoverOrigin();

  if (!origin) {
    return [];
  }

  return getVinextOwnedRoutes(scope).flatMap((route) => [
    {
      source: route,
      destination: `${origin}${route}`,
    },
    {
      source: `${route}/:path*`,
      destination: `${origin}${route}/:path*`,
    },
  ]);
}
