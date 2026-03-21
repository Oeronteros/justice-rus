import { expect, test, type Locator, type Page, type Route } from '@playwright/test';
import { addVinextAuthCookie, type VinextFixtureUser } from './utils/vinext-auth';

const baseUrl = process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3000';

process.env.JWT_SECRET ??= 'e2e-secret';

const authResponse = {
  success: true,
  user: {
    id: 'pin-member',
    nickname: 'Smoke Member',
    role: 'member',
    isActive: true,
    authMethod: 'pin',
    discordHandle: null,
    className: 'Numina',
  } satisfies VinextFixtureUser,
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

const pvpPayload = {
  queue: [],
  activeMatch: null,
  recentMatches: [],
  leaderboard: [],
  userInQueue: false,
  userRating: null,
};

const blockedConsolePatterns = ['Failed to fetch dynamically imported module', '/@fs/'] as const;

function createRuntimeFailureCapture(page: Page) {
  const consoleErrors: string[] = [];
  const requestFailures: string[] = [];

  page.on('console', (message) => {
    if (message.type() !== 'error') {
      return;
    }

    consoleErrors.push(message.text());
  });

  page.on('requestfailed', (request) => {
    requestFailures.push(`${request.method()} ${request.url()} :: ${request.failure()?.errorText ?? 'unknown error'}`);
  });

  return {
    assertHealthy() {
      const relevantConsoleErrors = consoleErrors.filter((entry) =>
        blockedConsolePatterns.some((pattern) => entry.includes(pattern))
      );
      const relevantRequestFailures = requestFailures.filter((entry) => entry.includes('/@fs/'));

      expect(relevantConsoleErrors).toEqual([]);
      expect(relevantRequestFailures).toEqual([]);
    },
  };
}

async function installVinextNavMocks(page: Page) {
  await page.route('**/api/news', async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(newsPayload),
    });
  });

  await page.route('**/api/pvp', async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(pvpPayload),
    });
  });
}

async function openAuthenticatedNews(page: Page) {
  process.env.PLAYWRIGHT_VINEXT_BASE_URL = baseUrl;
  await addVinextAuthCookie(page.context(), authResponse.user);

  await page.goto('/news');
  await expect(page.getByTestId('portal-shell')).toHaveAttribute('data-auth-state', 'authenticated');
  await expect(page.getByTestId('runtime-badge')).toHaveAttribute('data-auth-state', 'authenticated');
  await page.waitForTimeout(1200);
}

async function clickUntilSatisfied(page: Page, locator: Locator, assertion: () => Promise<void>) {
  let lastError: unknown;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    await locator.evaluate((node: HTMLButtonElement) => node.click());

    try {
      await assertion();
      return;
    } catch (error) {
      lastError = error;
      await page.waitForTimeout(500);
    }
  }

  throw lastError;
}

test.describe('vinext navigation shell', () => {
  test('@vinext-nav renders grouped desktop navigation from the canonical registry', async ({ page }) => {
    const runtimeCapture = createRuntimeFailureCapture(page);
    await installVinextNavMocks(page);
    await openAuthenticatedNews(page);
    runtimeCapture.assertHealthy();

    const horizontalNav = page.getByTestId('nav-horizontal');
    await expect(horizontalNav).toBeVisible();
    await expect(horizontalNav.getByRole('link', { name: 'Новости', exact: true })).toBeVisible();

    const guildTrigger = horizontalNav.getByRole('button', { name: 'Гильдия' });
    await expect(guildTrigger).toHaveAttribute('aria-expanded', 'false');
    await clickUntilSatisfied(page, guildTrigger, () =>
      expect(guildTrigger).toHaveAttribute('aria-expanded', 'true', { timeout: 1500 })
    );

    const guildPanel = page.getByLabel('Командная навигация: Гильдия');
    await expect(guildPanel).toBeVisible();
    await expect(guildPanel.locator('a[href="/guides"]').first()).toBeVisible();
    await expect(guildPanel.locator('a[href="/absences"]').first()).toBeVisible();
    await expect(guildPanel.locator('a[href="/pvp"]').first()).toBeVisible();
  });
});

test.describe('vinext mobile navigation shell', () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

  test('@vinext-nav renders drawer disclosures and keeps reduced-motion flow usable', async ({ page }) => {
    const runtimeCapture = createRuntimeFailureCapture(page);
    await installVinextNavMocks(page);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await openAuthenticatedNews(page);
    runtimeCapture.assertHealthy();

    const moreButton = page.getByRole('button', { name: 'Еще' });
    const drawer = page.getByTestId('nav-mobile-drawer');
    await clickUntilSatisfied(page, moreButton, () => expect(drawer).toBeVisible({ timeout: 1500 }));

    await expect(drawer).toBeVisible();
    await expect(page.getByRole('button', { name: 'Закрыть меню' })).toBeFocused();

    const commandDisclosure = drawer.getByRole('button', { name: 'Управление' });
    await clickUntilSatisfied(page, commandDisclosure, () =>
      expect(commandDisclosure).toHaveAttribute('aria-expanded', 'true', { timeout: 1500 })
    );
    await expect(drawer.locator('a[href="/workflow"]').first()).toBeVisible();
    await expect(drawer.locator('a[href="/integrations"]').first()).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(drawer).toBeHidden();
    await expect(moreButton).toBeFocused();
  });
});
