import { expect, test } from '@playwright/test';

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

test.describe('portal auth smoke', () => {
  test('redirects protected route visitors to PinScreen when session is missing', async ({ page }) => {
    await page.goto('/news');

    await expect(page.getByText('Доступ участника')).toBeVisible();
    await expect(page.getByPlaceholder('Ник в гильдии')).toBeVisible();
    await expect(page.locator('form').getByRole('button', { name: 'Войти' })).toBeVisible();
  });

  test('logs in from PinScreen, renders protected news route, and logs out', async ({ page }) => {
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

    await page.route('**/api/logout', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto('/news');
    await page.getByPlaceholder('Ник в гильдии').fill('Smoke Member');
    await page.getByPlaceholder('Пароль').fill('very-secret-password');
    await page.locator('form').getByRole('button', { name: 'Войти' }).click();

    await expect(page.getByText('Боевой сбор')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Выйти' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Новости', exact: true })).toHaveAttribute('aria-current', 'page');

    await page.getByRole('button', { name: 'Выйти' }).click();

    await expect(page.getByText('Доступ участника')).toBeVisible();
    await expect(page.getByPlaceholder('Ник в гильдии')).toBeVisible();
  });

  test('shows officer-only moderation action on help requests', async ({ page }) => {
    await page.route('**/api/auth', async (route) => {
      if (route.request().method() !== 'POST') {
        await route.continue();
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
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
        }),
      });
    });

    await page.route('**/api/help?status=open', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(helpPayload),
      });
    });

    await page.goto('/help');
    await page.getByPlaceholder('Ник в гильдии').fill('Officer Smoke');
    await page.getByPlaceholder('Пароль').fill('very-secret-password');
    await page.locator('form').getByRole('button', { name: 'Войти' }).click();

    await expect(page.getByText('Нужен лидер на вечерний сбор')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Закрыть' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Удалить' })).toHaveCount(0);
  });
});
