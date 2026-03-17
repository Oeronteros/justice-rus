import { expect, test, type Page } from '@playwright/test';
import { expectNoSeriousA11yViolations } from './utils/axe';
import type { VinextFixtureUser } from './utils/vinext-auth';

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

test.describe('vinext pilot accessibility smoke', () => {
  test.setTimeout(60000);

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
  }

  test('PinScreen on /news has no serious accessibility violations', async ({ page }) => {
    await page.goto('/news');

    await expect(page.getByText('Доступ участника')).toBeVisible();
    await expectNoSeriousA11yViolations(page);
  });

  test.fixme('logged-in /news has no serious accessibility violations', async ({ page }) => {
    await page.route((url) => url.pathname === '/api/news', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(newsPayload),
      });
    });

    await page.goto('/news');
    await loginThroughPinScreen(page);

    await expect(page.getByText('Боевой сбор').first()).toBeVisible({ timeout: 60000 });
    await expectNoSeriousA11yViolations(page);
  });
});
