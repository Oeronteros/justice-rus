import { expect, test, type Page } from '@playwright/test';
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

const officerAuthResponse = {
  success: true,
  user: {
    id: '90002',
    nickname: 'Officer Smoke',
    role: 'officer',
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

const helpPayload = [
  {
    id: 'help-1',
    title: 'Нужен лидер на вечерний сбор',
    details: 'Нужен офицер, который сможет координировать группу на вечернем событии.',
    category: 'outer_city_heroic',
    author: 'Smoke Member',
    authorUserId: authResponse.user.id,
    status: 'open',
    createdAt: '2026-03-11T16:00:00.000Z',
    gatheringStart: '2026-03-11T18:00:00.000Z',
    gatheringEnd: '2026-03-11T19:00:00.000Z',
    responders: [],
  },
];

const guidesPayload = [
  {
    id: 'guide-1',
    slug: 'guide-evening-raid',
    ownerAccountId: null,
    title: 'Гайд по вечернему сбору',
    category: 'general',
    author: 'Officer Smoke',
    createdAt: '2026-03-10T18:00:00.000Z',
    updatedAt: '2026-03-10T18:00:00.000Z',
    votes: 5,
    commentsCount: 0,
    linkTargets: [],
  },
];

const absencesPayload = [
  {
    id: 'absence-1',
    member: 'Smoke Member',
    startDate: '2026-03-15',
    endDate: '2026-03-17',
    reason: 'Командировка',
    status: 'approved',
  },
];

const pvpStatePayload = {
  queue: [],
  activeMatch: null,
  recentMatches: [],
  leaderboard: [],
  userInQueue: false,
  userRating: {
    playerId: authResponse.user.id,
    nickname: authResponse.user.nickname,
    prefix: null,
    rating: 1042,
    wins: 7,
    losses: 3,
  },
};

const schedulePayload = [
  {
    id: 'schedule-1',
    date: '2026-03-15',
    registration: 'Evening Raid',
    type: 'Рейды',
    description: '20:00 - 21:00',
    group: 'Рейды',
    dayType: 'sunday',
    time: '20:00 - 21:00',
    titleRu: 'Вечерний рейд',
    titleEn: 'Evening Raid',
    titleZh: '晚间团本',
    orderIndex: 1,
    active: true,
  },
];

async function loginThroughPinScreen(page: Page, user: VinextFixtureUser) {
  await page.route('**/api/auth', async (route) => {
    if (route.request().method() !== 'POST') {
      await route.continue();
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, user }),
    });
  });

  const nicknameField = page.getByPlaceholder('Ник в гильдии');
  await nicknameField.evaluate((input, value) => {
    const element = input as HTMLInputElement;
    element.value = value;
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
  }, user.nickname);
  const passwordField = page.getByPlaceholder('Пароль');
  await passwordField.evaluate((input, value) => {
    const element = input as HTMLInputElement;
    element.value = value;
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
  }, 'very-secret-password');
  await page.locator('form').getByRole('button', { name: 'Войти' }).click();
}

test.describe('vinext pilot smoke', () => {
  test.setTimeout(60000);

  test('shows PinScreen on /news when session is missing', async ({ page }) => {
    await page.goto('/news');

    await expect(page.getByText('Доступ участника')).toBeVisible();
    await expect(page.getByPlaceholder('Ник в гильдии')).toBeVisible();
    await expect(page.locator('form').getByRole('button', { name: 'Войти' })).toBeVisible();
  });

  test.fixme('logs in on /news and renders protected content', async ({ page }) => {
    await page.route((url) => url.pathname === '/api/news', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(newsPayload),
      });
    });

    await page.goto('/news');
    await loginThroughPinScreen(page, authResponse.user);

    await expect(page.getByText('Боевой сбор').first()).toBeVisible({ timeout: 60000 });
    await expect(page.getByRole('navigation', { name: 'Основная навигация' })).toBeVisible();
    await expect(
      page.getByRole('navigation', { name: 'Основная навигация' }).getByRole('link', { name: 'Новости', exact: true })
    ).toHaveAttribute('aria-current', 'page');
  });

  test.fixme('logs out from vinext /news back to PinScreen', async ({ page }) => {
    await page.route((url) => url.pathname === '/api/news', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(newsPayload),
      });
    });

    await page.route((url) => url.pathname === '/api/logout', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto('/news');
    await loginThroughPinScreen(page, authResponse.user);
    await expect(page.getByText('Боевой сбор').first()).toBeVisible({ timeout: 60000 });

    await page.getByRole('button', { name: 'Выйти' }).click();

    await expect(page.getByText('Доступ участника')).toBeVisible();
    await expect(page.getByPlaceholder('Ник в гильдии')).toBeVisible();
  });

  test.fixme('shows officer moderation action on vinext /help', async ({ page }) => {
    await page.route((url) => url.pathname === '/api/help' && url.searchParams.get('status') === 'open', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(helpPayload),
      });
    });

    await page.goto('/help');
    await loginThroughPinScreen(page, officerAuthResponse.user);

    await expect(page.getByText('Нужен лидер на вечерний сбор').first()).toBeVisible({ timeout: 60000 });
    await expect(page.getByRole('button', { name: 'Закрыть' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Удалить' })).toHaveCount(0);
  });

  test.fixme('renders authenticated vinext /guides view', async ({ page }) => {
    await page.route((url) => url.pathname === '/api/guide', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(guidesPayload),
      });
    });

    await page.goto('/guides');
    await loginThroughPinScreen(page, authResponse.user);

    await expect(page.getByText('Гайд по вечернему сбору').first()).toBeVisible({ timeout: 60000 });
    await expect(page.getByRole('navigation', { name: 'Основная навигация' })).toBeVisible();
  });

  test.fixme('renders authenticated vinext /absences view', async ({ page }) => {
    await page.route((url) => url.pathname === '/api/discord-proxy/absences', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(absencesPayload),
      });
    });

    await page.goto('/absences');
    await loginThroughPinScreen(page, authResponse.user);

    await expect(page.getByText('Командировка').first()).toBeVisible({ timeout: 60000 });
    await expect(page.getByRole('heading', { name: 'Smoke Member' })).toBeVisible();
  });

  test.fixme('renders authenticated vinext /pvp view', async ({ page }) => {
    await page.route((url) => url.pathname === '/api/pvp', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(pvpStatePayload),
      });
    });

    await page.goto('/pvp');
    await loginThroughPinScreen(page, authResponse.user);

    await expect(page.getByRole('heading', { name: 'PvP-комната' })).toBeVisible({ timeout: 60000 });
    await expect(page.getByRole('button', { name: 'Встать в очередь' })).toBeVisible();
  });

  test.fixme('renders authenticated vinext /schedule view', async ({ page }) => {
    await page.route((url) => url.pathname === '/api/schedule', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(schedulePayload),
      });
    });

    await page.goto('/schedule');
    await loginThroughPinScreen(page, authResponse.user);

    await expect(page.getByRole('heading', { name: /Расписание —/ })).toBeVisible({ timeout: 60000 });
    await expect(page.getByRole('button', { name: /Воскресенье 1 событий/ })).toBeVisible();
  });

  test.fixme('renders authenticated vinext /calendar empty-state shell', async ({ page }) => {
    await page.route((url) => url.pathname === '/api/schedule', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(schedulePayload),
      });
    });

    await page.route((url) => url.pathname === '/api/schedule/rsvp' && url.searchParams.get('userId') === authResponse.user.id, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      });
    });

    await page.goto('/calendar');
    await loginThroughPinScreen(page, authResponse.user);

    await expect(page.getByRole('heading', { name: 'Мой календарь' }).first()).toBeVisible({ timeout: 60000 });
  });

  test.fixme('supports keyboard-first auth interactions on vinext pilot route', async ({ page }) => {
    await page.goto('/news');

    await page.getByRole('button', { name: 'Показать вход по служебному PIN' }).press('Enter');
    await expect(page.getByPlaceholder('Officer / Head / Sysadmin PIN')).toBeVisible();
  });
});
