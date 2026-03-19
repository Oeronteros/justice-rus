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

const blockedConsolePatterns = [
  'Refused to apply style from',
  "MIME type ('text/html')",
  'Failed to fetch dynamically imported module',
  '/@id/__x00__virtual:vite-rsc/entry-browser',
  '/@fs/',
];

test('@route-parity validates vinext route manifest against live availability', async ({ page }, testInfo) => {
  const manifest = getVinextCutoverManifest();
  const routeEntries = targetRoutes.map((route) => {
    const entry = manifest.find((item) => item.route === route);

    expect(entry, `Route is missing in parity manifest: ${route}`).toBeDefined();

    return entry!;
  });

  const ownedRoutes = new Set(getVinextOwnedRoutes('all'));
  const blockedRoutes = new Set(getVinextBlockedRoutes('all'));
  const consoleErrors: string[] = [];
  const requestFailures: string[] = [];
  const routeResults: Array<{
    route: string;
    sectionKey: string;
    status: number;
    expectedStatus: number;
    expectedOwner: 'vinext' | 'next';
    ok: boolean;
  }> = [];

  page.on('console', (message) => {
    if (message.type() !== 'error') {
      return;
    }

    consoleErrors.push(message.text());
  });

  page.on('requestfailed', (request) => {
    requestFailures.push(`${request.method()} ${request.url()} :: ${request.failure()?.errorText ?? 'unknown error'}`);
  });

  for (const entry of routeEntries) {
    const response = await page.goto(entry.route, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle');

    const status = response?.status() ?? 0;
    const expectedOwner = ownedRoutes.has(entry.route) ? 'vinext' : 'next';
    const expectedStatus = expectedOwner === 'vinext' ? 200 : entry.nextPagePath ? 200 : 404;

    routeResults.push({
      route: entry.route,
      sectionKey: entry.sectionKey,
      status,
      expectedStatus,
      expectedOwner,
      ok: status === expectedStatus,
    });

    expect(
      status,
      `Route ${entry.route} expected status ${expectedStatus} when owner is ${expectedOwner}`
    ).toBe(expectedStatus);
  }

  await page.goto('/news', { waitUntil: 'networkidle' });

  const relevantConsoleErrors = consoleErrors.filter((entry) => blockedConsolePatterns.some((pattern) => entry.includes(pattern)));
  const relevantRequestFailures = requestFailures.filter(
    (entry) => entry.includes('/@id/') || entry.includes('/@fs/') || entry.includes('/@vite/') || entry.includes('/@react-refresh')
  );

  expect(relevantConsoleErrors).toEqual([]);
  expect(relevantRequestFailures).toEqual([]);

  await expect(page.getByText('Доступ участника')).toBeVisible();

  const analyticsResponse = await page.goto('/analytics', { waitUntil: 'networkidle' });
  expect(analyticsResponse?.status() ?? 0).toBe(200);
  await expect(page.getByText('Доступ участника')).toBeVisible();

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
        consoleErrors,
        requestFailures,
        routes: routeResults,
      },
      null,
      2
    ),
    'utf8'
  );

  expect(routeResults.every((result) => result.ok)).toBe(true);
});
