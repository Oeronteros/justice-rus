import { expect, test } from '@playwright/test';
import { expectNoSeriousA11yViolations } from './utils/axe';

const authResponse = {
  success: true,
  user: {
    id: 'member-1',
    nickname: 'Smoke Member',
    role: 'member',
    isActive: true,
    authMethod: 'account',
    discordHandle: null,
    className: 'Numina',
  },
};

const officerAuthResponse = {
  success: true,
  user: {
    id: 'officer-1',
    nickname: 'Officer Smoke',
    role: 'officer',
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

const helpPayload = [
  {
    id: 'help-1',
    title: 'Нужен лидер на вечерний сбор',
    details: 'Нужен офицер, который сможет координировать группу на вечернем событии.',
    category: 'outer_city_heroic',
    author: 'Smoke Member',
    authorUserId: 'member-1',
    status: 'open',
    createdAt: '2026-03-11T16:00:00.000Z',
    gatheringStart: '2026-03-11T18:00:00.000Z',
    gatheringEnd: '2026-03-11T19:00:00.000Z',
    responders: [],
  },
];

test.describe('portal accessibility smoke', () => {
  test('PinScreen has no serious accessibility violations', async ({ page }) => {
    await page.goto('/news');
    await expect(page.getByText('Доступ участника')).toBeVisible();

    await expectNoSeriousA11yViolations(page);
  });

  test('logged-in news page has no serious accessibility violations', async ({ page }) => {
    await page.route('**/api/auth', async (route) => {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(authResponse) });
    });
    await page.route('**/api/news', async (route) => {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(newsPayload) });
    });

    await page.goto('/news');
    await page.getByPlaceholder('Ник в гильдии').fill('Smoke Member');
    await page.getByPlaceholder('Пароль').fill('very-secret-password');
    await page.locator('form').getByRole('button', { name: 'Войти' }).click();

    await expect(page.getByText('Боевой сбор')).toBeVisible();
    await expectNoSeriousA11yViolations(page);
  });

  test('officer help view has no serious accessibility violations', async ({ page }) => {
    await page.route('**/api/auth', async (route) => {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(officerAuthResponse) });
    });
    await page.route('**/api/help?status=open', async (route) => {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(helpPayload) });
    });

    await page.goto('/help');
    await page.getByPlaceholder('Ник в гильдии').fill('Officer Smoke');
    await page.getByPlaceholder('Пароль').fill('very-secret-password');
    await page.locator('form').getByRole('button', { name: 'Войти' }).click();

    await expect(page.getByText('Нужен лидер на вечерний сбор')).toBeVisible();
    await expectNoSeriousA11yViolations(page);
  });
});
