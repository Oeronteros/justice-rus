import { expect, test, type Page, type Route } from '@playwright/test';

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
    prefix: 'Raid Lead',
  },
};

const registrationsPayload = [
  {
    id: 'reg-1',
    discord: 'portal:member-1',
    discordHandle: '@smoke',
    nickname: 'Smoke Member',
    class: 'Numina',
    guild: 'Silent Moonfall',
    elo: 2150,
    mmr20: 1980,
    bounty: 80,
    outerHeroic: 7,
    innerHeroic: 6,
    crimsonSands: 5,
    abyss: 4,
    gvg: 3,
    secretRealm: 2,
    marks: 27,
    joinDate: '2026-03-01T12:00:00.000Z',
    lastUpdated: '2026-03-12T12:00:00.000Z',
    joinedAt: '2026-03-01T12:00:00.000Z',
    status: 'active',
    rank: 'member',
    kpi: 9,
    prefix: 'Raid Lead',
    duelWins: 5,
    duelLosses: 2,
  },
];

const schedulePayload = [
  {
    id: 'event-1',
    title: 'Рейд на цитадель',
    date: '2026-03-13T18:00:00.000Z',
    description: 'Сбор основных составов.',
    participants: [],
    rsvps: [],
    type: 'raid',
  },
];

const helpPayload = [
  {
    id: 'help-1',
    title: 'Нужен лидер на вечерний сбор',
    details: 'Нужен координационный офицер.',
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
  leaderboard: [],
  recentMatches: [],
  activeMatch: null,
  userInQueue: false,
  userRating: null,
};

async function installPortalMocks(page: Page) {
  await page.route('**/api/auth', async (route: Route) => {
    if (route.request().method() !== 'POST') {
      await route.continue();
      return;
    }
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(authResponse) });
  });

  await page.route('**/api/schedule?language=*', async (route: Route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(schedulePayload) });
  });
  await page.route('**/api/help?status=*', async (route: Route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(helpPayload) });
  });
  await page.route('**/api/registrations', async (route: Route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(registrationsPayload) });
  });
  await page.route('**/api/registration/column-labels', async (route: Route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ nickname: 'Ник' }) });
  });
  await page.route('**/api/news', async (route: Route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(newsPayload) });
  });
  await page.route('**/api/absences', async (route: Route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([]) });
  });
  await page.route('**/api/pvp', async (route: Route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(pvpPayload) });
  });
  await page.route('**/api/discord-proxy/absences', async (route: Route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([]) });
  });
  await page.route('**/api/discord-proxy/registration', async (route: Route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(registrationsPayload) });
  });
}

test.describe('desktop core route regression', () => {
  test('logs in and reaches news, help, and profile from the refreshed shell', async ({ page }) => {
    await installPortalMocks(page);

    await page.goto('/');
    await page.getByPlaceholder('Ник в гильдии').fill('Smoke Member');
    await page.getByPlaceholder('Пароль').fill('very-secret-password');
    await page.locator('form').getByRole('button', { name: 'Войти' }).click();

    const primaryNav = page.getByRole('navigation', { name: 'Основная навигация' });

    await expect(primaryNav).toBeVisible();
    await expect(page.getByRole('button', { name: 'Разделы' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Обновить данные' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Открыть кабинет' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Открыть уведомления' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Выйти' })).toBeVisible();

    await expect(primaryNav.getByRole('link', { name: 'Дашборд', exact: true })).toBeVisible();
    await expect(primaryNav.getByRole('link', { name: 'Новости', exact: true })).toBeVisible();
    await expect(primaryNav.getByRole('link', { name: 'Расписание', exact: true })).toBeVisible();
    await expect(primaryNav.getByRole('link', { name: 'Помощь', exact: true })).toBeVisible();
    await expect(primaryNav.getByRole('link', { name: 'Кабинет', exact: true })).toBeVisible();

    await page.getByRole('button', { name: 'Разделы' }).click();
    const commandNav = page.getByLabel('Командная навигация');
    await expect(commandNav).toBeVisible();
    await expect(commandNav.getByRole('link', { name: 'Участники', exact: true })).toBeVisible();
    await expect(commandNav.getByRole('link', { name: 'Гайды', exact: true })).toBeVisible();

    await primaryNav.getByRole('link', { name: 'Новости', exact: true }).click();
    await expect(page).toHaveURL(/\/news$/);
    await expect(page.getByRole('heading', { name: 'Боевой сбор' }).first()).toBeVisible();

    await primaryNav.getByRole('link', { name: 'Помощь', exact: true }).click();
    await expect(page).toHaveURL(/\/help$/);
    await expect(page.getByRole('heading', { name: 'Нужен лидер на вечерний сбор' }).first()).toBeVisible();

    await primaryNav.getByRole('link', { name: 'Кабинет', exact: true }).click();
    await expect(page).toHaveURL(/\/profile$/);
    await expect(page.getByText('Raid Lead').first()).toBeVisible();
  });
});
