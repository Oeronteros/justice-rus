type VinextCutoverScope = 'off' | 'pilot' | 'wave2' | 'all';

type VinextCutoverWave = Exclude<VinextCutoverScope, 'off'>;
type VinextRouteStatus = 'ready' | 'blocked';

type VinextRouteParityEntry = {
  route: string;
  sectionKey: string;
  nextPagePath: string | null;
  vinextPagePath: string | null;
  cutoverWave: VinextCutoverWave;
  status: VinextRouteStatus;
  blocker: string | null;
  rollbackScope: 'off';
};

const vinextRouteParityManifest: readonly VinextRouteParityEntry[] = [
  {
    route: '/',
    sectionKey: 'about',
    nextPagePath: 'app/(portal)/page.tsx',
    vinextPagePath: 'apps/portal-vinext/app/(portal)/page.tsx',
    cutoverWave: 'all',
    status: 'ready',
    blocker: null,
    rollbackScope: 'off',
  },
  {
    route: '/about',
    sectionKey: 'about',
    nextPagePath: null,
    vinextPagePath: 'apps/portal-vinext/app/(portal)/about/page.tsx',
    cutoverWave: 'all',
    status: 'ready',
    blocker: null,
    rollbackScope: 'off',
  },
  {
    route: '/news',
    sectionKey: 'news',
    nextPagePath: 'app/(portal)/news/page.tsx',
    vinextPagePath: 'apps/portal-vinext/app/(portal)/news/page.tsx',
    cutoverWave: 'pilot',
    status: 'ready',
    blocker: null,
    rollbackScope: 'off',
  },
  {
    route: '/help',
    sectionKey: 'help',
    nextPagePath: 'app/(portal)/help/page.tsx',
    vinextPagePath: 'apps/portal-vinext/app/(portal)/help/page.tsx',
    cutoverWave: 'pilot',
    status: 'ready',
    blocker: null,
    rollbackScope: 'off',
  },
  {
    route: '/guides',
    sectionKey: 'guides',
    nextPagePath: 'app/(portal)/guides/page.tsx',
    vinextPagePath: 'apps/portal-vinext/app/(portal)/guides/page.tsx',
    cutoverWave: 'pilot',
    status: 'ready',
    blocker: null,
    rollbackScope: 'off',
  },
  {
    route: '/profile',
    sectionKey: 'profile',
    nextPagePath: 'app/(portal)/profile/page.tsx',
    vinextPagePath: 'apps/portal-vinext/app/(portal)/profile/page.tsx',
    cutoverWave: 'wave2',
    status: 'ready',
    blocker: null,
    rollbackScope: 'off',
  },
  {
    route: '/absences',
    sectionKey: 'absences',
    nextPagePath: 'app/(portal)/absences/page.tsx',
    vinextPagePath: 'apps/portal-vinext/app/(portal)/absences/page.tsx',
    cutoverWave: 'wave2',
    status: 'ready',
    blocker: null,
    rollbackScope: 'off',
  },
  {
    route: '/pvp',
    sectionKey: 'pvp',
    nextPagePath: 'app/(portal)/pvp/page.tsx',
    vinextPagePath: 'apps/portal-vinext/app/(portal)/pvp/page.tsx',
    cutoverWave: 'wave2',
    status: 'ready',
    blocker: null,
    rollbackScope: 'off',
  },
  {
    route: '/schedule',
    sectionKey: 'schedule',
    nextPagePath: 'app/(portal)/schedule/page.tsx',
    vinextPagePath: 'apps/portal-vinext/app/(portal)/schedule/page.tsx',
    cutoverWave: 'wave2',
    status: 'ready',
    blocker: null,
    rollbackScope: 'off',
  },
  {
    route: '/calendar',
    sectionKey: 'calendar',
    nextPagePath: 'app/(portal)/calendar/page.tsx',
    vinextPagePath: 'apps/portal-vinext/app/(portal)/calendar/page.tsx',
    cutoverWave: 'wave2',
    status: 'ready',
    blocker: null,
    rollbackScope: 'off',
  },
  {
    route: '/analytics',
    sectionKey: 'analytics',
    nextPagePath: 'app/(portal)/analytics/page.tsx',
    vinextPagePath: 'apps/portal-vinext/app/(portal)/analytics/page.tsx',
    cutoverWave: 'all',
    status: 'ready',
    blocker: null,
    rollbackScope: 'off',
  },
  {
    route: '/workflow',
    sectionKey: 'workflow',
    nextPagePath: 'app/(portal)/workflow/page.tsx',
    vinextPagePath: 'apps/portal-vinext/app/(portal)/workflow/page.tsx',
    cutoverWave: 'all',
    status: 'ready',
    blocker: null,
    rollbackScope: 'off',
  },
  {
    route: '/integrations',
    sectionKey: 'integrations',
    nextPagePath: 'app/(portal)/integrations/page.tsx',
    vinextPagePath: 'apps/portal-vinext/app/(portal)/integrations/page.tsx',
    cutoverWave: 'all',
    status: 'ready',
    blocker: null,
    rollbackScope: 'off',
  },
] as const;

const pilotRoutes = vinextRouteParityManifest
  .filter((entry) => entry.cutoverWave === 'pilot' && entry.status === 'ready')
  .map((entry) => entry.route);

const secondWaveRoutes = vinextRouteParityManifest
  .filter((entry) => entry.cutoverWave === 'wave2' && entry.status === 'ready')
  .map((entry) => entry.route);

const allScopeTargetRoutes = vinextRouteParityManifest
  .filter((entry) => entry.cutoverWave === 'all')
  .map((entry) => entry.route);

export const vinextRouteWaves = {
  pilot: [...pilotRoutes],
  wave2: [...secondWaveRoutes],
  all: [...allScopeTargetRoutes],
} as const;

export function getVinextCutoverManifest(): VinextRouteParityEntry[] {
  return vinextRouteParityManifest.map((entry) => ({ ...entry }));
}

function isRouteEnabledForScope(entry: VinextRouteParityEntry, scope: VinextCutoverScope): boolean {
  if (entry.status !== 'ready') {
    return false;
  }

  if (scope === 'pilot') {
    return entry.cutoverWave === 'pilot';
  }

  if (scope === 'wave2') {
    return entry.cutoverWave === 'pilot' || entry.cutoverWave === 'wave2';
  }

  if (scope === 'all') {
    return true;
  }

  return false;
}

export function getVinextCutoverScope(value = process.env.VINEXT_CUTOVER_SCOPE): VinextCutoverScope {
  if (value === 'pilot' || value === 'wave2' || value === 'all') {
    return value;
  }

  return 'off';
}

export function getVinextOwnedRoutes(scope = getVinextCutoverScope()): string[] {
  return vinextRouteParityManifest
    .filter((entry) => isRouteEnabledForScope(entry, scope))
    .map((entry) => entry.route);
}

export function getVinextBlockedRoutes(scope = getVinextCutoverScope()): string[] {
  if (scope !== 'all') {
    return [];
  }

  return vinextRouteParityManifest
    .filter((entry) => entry.cutoverWave === 'all' && entry.status === 'blocked')
    .map((entry) => entry.route);
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

  const routeRewrites = getVinextOwnedRoutes(scope).flatMap((route) => [
    {
      source: route,
      destination: `${origin}${route}`,
    },
    {
      source: `${route}/:path*`,
      destination: `${origin}${route}/:path*`,
    },
  ]);

  if (scope === 'off') {
    return routeRewrites;
  }

  const vinextDevAssetRewrites = [
    {
      source: '/@fs/:path*',
      destination: `${origin}/@fs/:path*`,
    },
    {
      source: '/:path((?:@).*)',
      destination: `${origin}/:path`,
    },
    {
      source: '/app/:path*',
      destination: `${origin}/app/:path*`,
    },
    {
      source: '/node_modules/:path*',
      destination: `${origin}/node_modules/:path*`,
    },
  ];

  return [...routeRewrites, ...vinextDevAssetRewrites];
}
