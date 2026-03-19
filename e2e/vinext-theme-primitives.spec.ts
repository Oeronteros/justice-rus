import { expect, test, type Page } from '@playwright/test';

const authResponse = {
  success: true,
  user: {
    id: '90001',
    nickname: 'Smoke Member',
    role: 'member',
    isActive: true,
    authMethod: 'account',
    discordHandle: null,
    className: 'Numina',
  },
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

async function loginThroughPinScreen(page: Page) {
  await page.route('**/api/auth', async (route) => {
    if (route.request().method() !== 'POST') {
      await route.continue();
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(authResponse),
    });
  });

  await page.route('**/api/news', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(newsPayload),
    });
  });

  await page.goto('/news');

  const nicknameField = page.getByPlaceholder('Ник в гильдии');
  await nicknameField.evaluate((input, value) => {
    const element = input as HTMLInputElement;
    element.value = value;
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
  }, authResponse.user.nickname);

  const passwordField = page.getByPlaceholder('Пароль');
  await passwordField.evaluate((input, value) => {
    const element = input as HTMLInputElement;
    element.value = value;
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
  }, 'very-secret-password');

  await page.locator('form').getByRole('button', { name: 'Войти' }).click();
  await expect(page.getByTestId('theme-toggle')).toBeVisible({ timeout: 60000 });
}

test.describe('vinext theme primitives @theme-primitives', () => {
  test.setTimeout(60000);

  test('toggles shared light and dark themes without dropping the legacy boundary contract', async ({ page }) => {
    await loginThroughPinScreen(page);

    const boundary = page.getByTestId('theme-boundary');
    const toggle = page.getByTestId('theme-toggle');
    const lightButton = toggle.locator('button[data-theme-mode="light"]');
    const darkButton = toggle.locator('button[data-theme-mode="dark"]');

    await expect(boundary).toHaveClass(/theme-wuxia/);
    await expect(boundary).toHaveAttribute('data-theme-mode', 'system');

    await lightButton.click();

    await expect(boundary).toHaveAttribute('data-theme', 'light');
    await expect(boundary).toHaveClass(/theme-light/);
    await expect(lightButton).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await expect(page.locator('body')).toHaveAttribute('data-theme', 'light');

    const lightState = await page.evaluate(() => {
      const boundaryNode = document.querySelector('[data-testid="theme-boundary"]') as HTMLElement | null;
      const computed = boundaryNode ? window.getComputedStyle(boundaryNode) : null;

      return {
        storageMode: window.localStorage.getItem('silent-moonfall-theme-mode'),
        documentTheme: document.documentElement.dataset.theme,
        bodyTheme: document.body.dataset.theme,
        backgroundImage: computed?.backgroundImage ?? '',
      };
    });

    expect(lightState.storageMode).toBe('light');
    expect(lightState.documentTheme).toBe('light');
    expect(lightState.bodyTheme).toBe('light');
    expect(lightState.backgroundImage).not.toBe('none');

    await darkButton.click();

    await expect(boundary).toHaveAttribute('data-theme', 'dark');
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

    expect(darkState.storageMode).toBe('dark');
    expect(darkState.documentTheme).toBe('dark');
    expect(darkState.bodyTheme).toBe('dark');
    expect(darkState.boundaryClasses).toContain('theme-wuxia');
  });
});
