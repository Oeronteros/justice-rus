import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { expect, test } from '@playwright/test';
import { getVinextBlockedRoutes, getVinextCutoverManifest, getVinextOwnedRoutes } from '../lib/platform/vinext-cutover';

const targetRoutes = [
  '/',
  '/about',
  '/news',
  '/help',
  '/guides',
  '/profile',
  '/absences',
  '/pvp',
  '/schedule',
  '/calendar',
  '/analytics',
  '/workflow',
  '/integrations',
] as const;

test('@route-parity validates vinext route manifest against live availability', async ({ page }, testInfo) => {
  const manifest = getVinextCutoverManifest();
  const routeEntries = targetRoutes.map((route) => {
    const entry = manifest.find((item) => item.route === route);

    expect(entry, `Route is missing in parity manifest: ${route}`).toBeDefined();

    return entry!;
  });

  const ownedRoutes = new Set(getVinextOwnedRoutes('all'));
  const blockedRoutes = new Set(getVinextBlockedRoutes('all'));
  const routeResults: Array<{
    route: string;
    sectionKey: string;
    status: number;
    expectedStatus: number;
    expectedOwner: 'vinext' | 'next';
    observedOwner: 'vinext' | 'next';
    ok: boolean;
  }> = [];

  for (const entry of routeEntries) {
    const response = await page.goto(entry.route, { waitUntil: 'domcontentloaded' });
    const status = response?.status() ?? 0;
    const expectedOwner = ownedRoutes.has(entry.route) ? 'vinext' : 'next';
    const observedOwner = status === 200 ? 'vinext' : 'next';
    const expectedStatus = expectedOwner === 'vinext' ? 200 : 404;

    routeResults.push({
      route: entry.route,
      sectionKey: entry.sectionKey,
      status,
      expectedStatus,
      expectedOwner,
      observedOwner,
      ok: status === expectedStatus,
    });

    expect(
      status,
      `Route ${entry.route} expected status ${expectedStatus} when owner is ${expectedOwner}`
    ).toBe(expectedStatus);
  }

  const evidencePath = path.resolve(process.cwd(), '.sisyphus/evidence/task-1-route-parity.json');
  await mkdir(path.dirname(evidencePath), { recursive: true });
  await writeFile(
    evidencePath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        project: testInfo.project.name,
        baseURL: testInfo.project.use.baseURL ?? null,
        parityScope: 'all',
        blockedRoutes: Array.from(blockedRoutes),
        ownedRoutes: Array.from(ownedRoutes),
        routes: routeResults,
      },
      null,
      2
    ),
    'utf8'
  );

  expect(routeResults.every((result) => result.ok)).toBe(true);
});
