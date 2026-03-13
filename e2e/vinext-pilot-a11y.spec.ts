import { expect, test } from '@playwright/test';
import { expectNoSeriousA11yViolations } from './utils/axe';
import { addVinextAuthCookie, type VinextFixtureUser } from './utils/vinext-auth';

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
  test('PinScreen on /news has no serious accessibility violations', async ({ page }) => {
    await page.goto('/news');

    await expect(page.getByText('Доступ участника')).toBeVisible();
    await expectNoSeriousA11yViolations(page);
  });

  test('logged-in /news has no serious accessibility violations', async ({ page }) => {
    await addVinextAuthCookie(page.context(), authResponse.user);

    await page.route((url) => url.pathname === '/api/news', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(newsPayload),
      });
    });

    await page.goto('/news');

    await expect(page.getByText('Боевой сбор')).toBeVisible({ timeout: 15000 });
    await expectNoSeriousA11yViolations(page);
  });
});
