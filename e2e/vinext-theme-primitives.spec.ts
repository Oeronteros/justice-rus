import { expect, test, type Page } from '@playwright/test';
import { addVinextAuthCookie, type VinextFixtureUser } from './utils/vinext-auth';

const blockedConsolePatterns = [
  'Failed to fetch dynamically imported module',
  '/@id/__x00__virtual:vite-rsc/entry-browser',
  '/node_modules/',
  '/.vite/',
  'A tree hydrated but some attributes of the server rendered HTML didn\'t match the client properties',
  '/app/(portal)/news/page.tsx',
] as const;

const assetProbePaths = [
  '/node_modules/vite/dist/client/env.mjs',
  '/node_modules/@vitejs/plugin-rsc/dist/browser.js',
] as const;

const fixtureUser: VinextFixtureUser = {
  id: 'pin-member',
  nickname: 'Smoke Member',
  role: 'member',
  isActive: true,
  authMethod: 'pin',
  discordHandle: null,
  className: 'Numina',
};

const newsPayload = [
  {
    id: 'news-1',
    title: 'Боевой сбор',
    content: 'Сегодня идем в рейд. Сбор в 21:00 по Москве.',
    author: 'Officer',
    date: '2026-03-11T18:00:00.000Z',
    pinned: true,
    messageUrl: 'https://discord.com/channels/1/2/3',
  },
];

async function openAuthenticatedNews(page: Page) {
  process.env.PLAYWRIGHT_VINEXT_BASE_URL = process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3000';
  await addVinextAuthCookie(page.context(), fixtureUser);

  await page.route('**/api/news', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(newsPayload),
    });
  });

  await page.goto('/news');
  await expect(page.getByTestId('theme-toggle-visual')).toBeVisible({ timeout: 60000 });
}

async function readThemeProbeState(page: Page) {
  return await page.evaluate(() => {
    const getState = (testId: string) => {
      const node = document.querySelector(`[data-testid="${testId}"]`) as HTMLElement | null;

      return {
        className: node?.className ?? '',
        primitive: node?.getAttribute('data-theme-probe-primitive') ?? '',
      };
    };

    const probeRoot = document.querySelector('[data-testid="theme-primitives-probe"]') as HTMLElement | null;

    return {
      currentTheme: probeRoot?.getAttribute('data-theme-current') ?? '',
      currentMode: probeRoot?.getAttribute('data-theme-mode') ?? '',
      ready: probeRoot?.getAttribute('data-theme-ready') ?? '',
      contract: (probeRoot?.getAttribute('data-theme-primitives') ?? '').split(',').filter(Boolean),
      boundary: getState('theme-boundary'),
      page: getState('theme-probe-page'),
      card: getState('theme-probe-card'),
      panel: getState('theme-probe-panel'),
      button: getState('theme-probe-button'),
      input: getState('theme-probe-input'),
      overlay: getState('theme-probe-overlay'),
    };
  });
}

async function switchThemeMode(page: Page, nextMode: 'light' | 'dark') {
  const toggle = page.getByTestId('theme-toggle');
  await expect
    .poll(
      () =>
        page.evaluate(() => {
          const harnessNode = document.querySelector('[data-testid="theme-toggle"]') as
            | (HTMLDivElement & { setThemeMode?: unknown })
            | null;

          return {
            ready: harnessNode?.dataset.themeReady ?? 'false',
            hasSetter: typeof harnessNode?.setThemeMode === 'function',
          };
        }),
      { timeout: 10000 }
    )
    .toEqual({ ready: 'true', hasSetter: true });
  await expect(toggle).toHaveAttribute('data-theme-current', /light|dark/);

  for (let attempt = 0; attempt < 3; attempt += 1) {
    await page.evaluate((mode) => {
      const harnessNode = document.querySelector('[data-testid="theme-toggle"]') as
        | (HTMLDivElement & { setThemeMode?: (nextMode: 'system' | 'dark' | 'light') => void })
        | null;

      if (!harnessNode || harnessNode.dataset.themeReady !== 'true' || typeof harnessNode.setThemeMode !== 'function') {
        throw new Error('Theme harness is not hydrated');
      }

      harnessNode.setThemeMode(mode);
    }, nextMode);

    try {
      await expect(toggle).toHaveAttribute('data-theme-current', nextMode, { timeout: 5000 });
      return;
    } catch (error) {
      if (attempt === 2) {
        throw error;
      }
    }
  }
}

async function readAssetProbeStatuses(page: Page) {
  return await page.evaluate(async (paths) => {
    return await Promise.all(
      paths.map(async (url) => {
        const response = await fetch(url);

        return {
          url,
          status: response.status,
          contentType: response.headers.get('content-type') ?? '',
        };
      })
    );
  }, [...assetProbePaths]);
}

test.describe('vinext theme primitives @theme-primitives', () => {
  test.setTimeout(60000);

  test('toggles shared light and dark themes without dropping the legacy boundary contract', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', (message) => {
      if (message.type() !== 'error') {
        return;
      }

      consoleErrors.push(message.text());
    });

    await openAuthenticatedNews(page);

    const boundary = page.getByTestId('theme-boundary');
    const primitivesProbe = page.getByTestId('theme-primitives-probe');
    const toggle = page.getByTestId('theme-toggle');
    const lightButton = toggle.locator('button[data-theme-mode="light"]');
    const darkButton = toggle.locator('button[data-theme-mode="dark"]');

    await expect(primitivesProbe).toBeAttached();
    await expect(primitivesProbe).toHaveAttribute('data-theme-primitives', 'pageChrome,card,panel,button,input,overlayPanelNarrow');
    await expect(boundary).toHaveClass(/theme-wuxia/);
    await expect(boundary).toHaveAttribute('data-theme-mode', 'system');

    const initialAssetStatuses = await readAssetProbeStatuses(page);
    expect(initialAssetStatuses).toEqual(
      expect.arrayContaining(
        assetProbePaths.map((url) =>
          expect.objectContaining({
            url,
            status: 200,
          })
        )
      )
    );

    await switchThemeMode(page, 'light');

    await expect(toggle).toHaveAttribute('data-theme-current', 'light');
    await expect(boundary).toHaveAttribute('data-theme', 'light');
    await expect(boundary).toHaveAttribute('data-theme-mode', 'light');
    await expect(boundary).toHaveClass(/theme-light/);
    await expect(lightButton).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await expect(page.locator('body')).toHaveAttribute('data-theme', 'light');

    const lightState = await page.evaluate(() => ({
      storageMode: window.localStorage.getItem('silent-moonfall-theme-mode'),
      documentTheme: document.documentElement.dataset.theme,
      bodyTheme: document.body.dataset.theme,
    }));
    const lightProbe = await readThemeProbeState(page);

    expect(lightState.storageMode).toBe('light');
    expect(lightState.documentTheme).toBe('light');
    expect(lightState.bodyTheme).toBe('light');
    expect(lightProbe.ready).toBe('true');
    expect(lightProbe.currentTheme).toBe('light');
    expect(lightProbe.currentMode).toBe('light');
    expect(lightProbe.contract).toEqual(['pageChrome', 'card', 'panel', 'button', 'input', 'overlayPanelNarrow']);
    expect(lightProbe.page.primitive).toBe('pageChrome');
    expect(lightProbe.card.primitive).toBe('card');
    expect(lightProbe.panel.primitive).toBe('panel');
    expect(lightProbe.button.primitive).toBe('button');
    expect(lightProbe.input.primitive).toBe('input');
    expect(lightProbe.overlay.primitive).toBe('overlayPanelNarrow');
    expect(lightProbe.page.className).toContain('primitives__appShellStyles.page');
    expect(lightProbe.card.className).toContain('primitives__surfaceStyles.card');
    expect(lightProbe.panel.className).toContain('primitives__surfaceStyles.panel');
    expect(lightProbe.button.className).toContain('primitives__buttonStyles.secondary');
    expect(lightProbe.input.className).toContain('primitives__formStyles.field');
    expect(lightProbe.overlay.className).toContain('primitives__overlayStyles.panel');

    await switchThemeMode(page, 'dark');

    await expect(toggle).toHaveAttribute('data-theme-current', 'dark');
    await expect(boundary).toHaveAttribute('data-theme', 'dark');
    await expect(boundary).toHaveAttribute('data-theme-mode', 'dark');
    await expect(boundary).toHaveClass(/theme-dark/);
    await expect(darkButton).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await expect(page.locator('body')).toHaveAttribute('data-theme', 'dark');

    const darkState = await page.evaluate(() => ({
      storageMode: window.localStorage.getItem('silent-moonfall-theme-mode'),
      documentTheme: document.documentElement.dataset.theme,
      bodyTheme: document.body.dataset.theme,
      boundaryClasses: document.querySelector('[data-testid="theme-boundary"]')?.className ?? '',
    }));
    const darkProbe = await readThemeProbeState(page);

    expect(darkState.storageMode).toBe('dark');
    expect(darkState.documentTheme).toBe('dark');
    expect(darkState.bodyTheme).toBe('dark');
    expect(darkState.boundaryClasses).toContain('theme-wuxia');
    expect(darkProbe.ready).toBe('true');
    expect(darkProbe.currentTheme).toBe('dark');
    expect(darkProbe.currentMode).toBe('dark');
    expect(darkProbe.contract).toEqual(lightProbe.contract);
    expect(darkProbe.page.className).toContain('primitives__appShellStyles.page');
    expect(darkProbe.card.className).toContain('primitives__surfaceStyles.card');
    expect(darkProbe.panel.className).toContain('primitives__surfaceStyles.panel');
    expect(darkProbe.button.className).toContain('primitives__buttonStyles.secondary');
    expect(darkProbe.input.className).toContain('primitives__formStyles.field');
    expect(darkProbe.overlay.className).toContain('primitives__overlayStyles.panel');

    const relevantConsoleErrors = consoleErrors.filter((entry) => blockedConsolePatterns.some((pattern) => entry.includes(pattern)));
    expect(relevantConsoleErrors).toEqual([]);
  });
});
