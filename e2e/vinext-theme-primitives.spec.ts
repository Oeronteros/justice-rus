import { expect, test, type Page } from '@playwright/test';
import { addVinextAuthCookie, type VinextFixtureUser } from './utils/vinext-auth';

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
  await expect(page.getByTestId('theme-toggle')).toBeVisible({ timeout: 60000 });
}

async function readThemeProbeState(page: Page) {
  return await page.evaluate(() => {
    const getState = (testId: string) => {
      const node = document.querySelector(`[data-testid="${testId}"]`) as HTMLElement | null;
      const computed = node ? window.getComputedStyle(node) : null;

      return {
        backgroundColor: computed?.backgroundColor ?? '',
        backgroundImage: computed?.backgroundImage ?? '',
        borderColor: computed?.borderColor ?? '',
        borderRadius: computed?.borderRadius ?? '',
        boxShadow: computed?.boxShadow ?? '',
        color: computed?.color ?? '',
      };
    };

    return {
      boundary: getState('theme-boundary'),
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
  const button = toggle.locator(`button[data-theme-mode="${nextMode}"]`);

  for (let attempt = 0; attempt < 3; attempt += 1) {
    await button.click();

    try {
      await expect(toggle).toHaveAttribute('data-theme-current', nextMode, { timeout: 5000 });
      return;
    } catch (error) {
      await button.dispatchEvent('click');

      try {
        await expect(toggle).toHaveAttribute('data-theme-current', nextMode, { timeout: 5000 });
        return;
      } catch (dispatchError) {
        if (attempt === 2) {
          throw dispatchError;
        }
      }

      if (attempt === 2) {
        throw error;
      }
    }
  }
}

test.describe('vinext theme primitives @theme-primitives', () => {
  test.setTimeout(60000);

  test('toggles shared light and dark themes without dropping the legacy boundary contract', async ({ page }) => {
    await openAuthenticatedNews(page);

    const boundary = page.getByTestId('theme-boundary');
    const primitivesProbe = page.getByTestId('theme-primitives-probe');
    const toggle = page.getByTestId('theme-toggle');
    const lightButton = toggle.locator('button[data-theme-mode="light"]');
    const darkButton = toggle.locator('button[data-theme-mode="dark"]');

    await expect(primitivesProbe).toBeAttached();
    await expect(boundary).toHaveClass(/theme-wuxia/);
    await expect(boundary).toHaveAttribute('data-theme-mode', 'system');

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
    expect(lightProbe.boundary.backgroundImage).not.toBe('none');
    expect(lightProbe.card.backgroundImage).not.toBe('none');
    expect(lightProbe.panel.backgroundImage).not.toBe('none');
    expect(lightProbe.button.backgroundImage).not.toBe('none');
    expect(lightProbe.input.borderColor).not.toBe('rgba(0, 0, 0, 0)');
    expect(lightProbe.overlay.boxShadow).not.toBe('none');
    expect(lightProbe.overlay.borderRadius).toBe('30px');

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
    expect(darkProbe.boundary.backgroundImage).not.toBe(lightProbe.boundary.backgroundImage);
    expect(darkProbe.card.backgroundImage).not.toBe(lightProbe.card.backgroundImage);
    expect(darkProbe.panel.backgroundImage).not.toBe(lightProbe.panel.backgroundImage);
    expect(darkProbe.button.backgroundImage).not.toBe(lightProbe.button.backgroundImage);
    expect(darkProbe.input.backgroundColor).not.toBe(lightProbe.input.backgroundColor);
    expect(darkProbe.overlay.backgroundImage).not.toBe(lightProbe.overlay.backgroundImage);
  });
});
