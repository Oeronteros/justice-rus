import { expect, test, type Page, type Route } from '@playwright/test';

test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

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
  },
  {
    id: 'reg-2',
    discord: 'portal:member-2',
    discordHandle: '@fox',
    nickname: 'Night Fox',
    class: 'Sylph',
    guild: 'Silent Moonfall',
    elo: 2080,
    mmr20: 1880,
    bounty: 55,
    outerHeroic: 5,
    innerHeroic: 5,
    crimsonSands: 4,
    abyss: 3,
    gvg: 2,
    secretRealm: 1,
    marks: 19,
    joinDate: '2026-02-10T12:00:00.000Z',
    lastUpdated: '2026-03-11T12:00:00.000Z',
    joinedAt: '2026-02-10T12:00:00.000Z',
    status: 'active',
    rank: 'officer',
    kpi: 8,
    prefix: 'Vanguard',
  },
];

const registrationColumnLabels = {
  index: '#',
  discord: 'Discord',
  nickname: 'Ник',
  rank: 'Ранг',
  class: 'Класс',
  guild: 'Гильдия',
  elo: 'ELO',
  mmr20: 'MMR 2v2',
  bounty: 'Bounty',
  outerHeroic: 'Outer heroic',
  innerHeroic: 'Inner heroic',
  crimsonSands: 'Crimson Sands',
  abyss: 'Abyss',
  gvg: 'GvG',
  secretRealm: 'Secret Realm',
  marks: 'Marks',
  kpi: 'KPI',
  status: 'Статус',
  actions: 'Действия',
};

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
  queue: [
    {
      playerId: 'member-1',
      nickname: 'Smoke Member',
      prefix: 'Raid Lead',
      className: 'Numina',
      joinedAt: '2026-03-12T12:00:00.000Z',
    },
  ],
  leaderboard: [
    {
      playerId: 'member-2',
      nickname: 'Night Fox',
      prefix: 'Vanguard',
      rating: 1260,
      wins: 7,
      losses: 2,
    },
  ],
  recentMatches: [
    {
      id: 'match-1',
      status: 'completed',
      createdAt: '2026-03-12T10:00:00.000Z',
      updatedAt: '2026-03-12T10:10:00.000Z',
      confirmedAt: '2026-03-12T10:10:00.000Z',
      winnerId: 'member-1',
      playerOne: { id: 'member-1', nickname: 'Smoke Member', prefix: 'Raid Lead', className: 'Numina' },
      playerTwo: { id: 'member-2', nickname: 'Night Fox', prefix: 'Vanguard', className: 'Sylph' },
      yourReport: null,
      opponentReport: null,
      confirmationStatus: 'confirmed',
    },
  ],
  activeMatch: null,
  userInQueue: true,
  userRating: null,
};

async function installPortalMocks(page: Page) {
  await page.route('**/api/auth', async (route: Route) => {
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

  await page.route('**/api/schedule?language=*', async (route: Route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(schedulePayload) });
  });
  await page.route('**/api/help?status=open', async (route: Route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(helpPayload) });
  });
  await page.route('**/api/registrations', async (route: Route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(registrationsPayload) });
  });
  await page.route('**/api/registration/column-labels', async (route: Route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(registrationColumnLabels) });
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

test.describe('mobile dashboard and nav flow', () => {
  test('logs in on mobile, shows refreshed dashboard, and opens PvP from immersive menu', async ({ page }) => {
    await installPortalMocks(page);
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await page.goto('/');
    await page.getByPlaceholder('Ник в гильдии').fill('Smoke Member');
    await page.getByPlaceholder('Пароль').fill('very-secret-password');
    await page.locator('form').getByRole('button', { name: 'Войти' }).click();

    await expect(page.getByText('Операционная сводка')).toBeVisible();
    await expect(page.getByText('Readiness')).toBeVisible();
    await expect(page.getByText('Raid Lead').first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Дашборд', exact: true })).toHaveAttribute('aria-current', 'page');

    const quickNav = page.getByRole('navigation', { name: 'Быстрая навигация' });
    await expect(quickNav.getByRole('link', { name: 'Дашборд', exact: true })).toBeVisible();
    await expect(quickNav.getByRole('link', { name: 'Новости', exact: true })).toBeVisible();
    await expect(quickNav.getByRole('link', { name: 'Расписание', exact: true })).toBeVisible();
    await expect(quickNav.getByRole('link', { name: 'Помощь', exact: true })).toBeVisible();

    const moreButton = page.getByRole('button', { name: 'Еще' });
    await moreButton.click();
    await expect(moreButton).toHaveAttribute('aria-expanded', 'true');
    await expect.poll(async () => page.evaluate(() => document.body.style.position)).toBe('fixed');
    await expect.poll(async () => page.evaluate(() => document.body.style.overflow)).toBe('hidden');

    const moreNav = page.getByRole('navigation', { name: 'Дополнительная навигация' });
    await expect(moreNav).toBeVisible();
    await expect(moreNav.getByText('Оставшиеся маршруты сгруппированы по роли и задаче')).toBeVisible();
    await expect(moreNav.getByText('Раздел')).toBeVisible();
    await expect(moreNav.getByText('Дашборд')).toBeVisible();
    await expect(moreNav.getByText('Ядро')).toBeVisible();
    const pvpLink = page.locator('nav[aria-label="Дополнительная навигация"] a[href="/pvp"]').first();
    await expect(pvpLink).toBeVisible();
    await pvpLink.scrollIntoViewIfNeeded();
    await pvpLink.tap();
    await expect(page).toHaveURL(/\/pvp$/);

    await expect.poll(async () => page.evaluate(() => document.body.style.position)).toBe('');
    await expect(moreButton).toHaveAttribute('aria-expanded', 'false');
    await expect(page.getByText(/Топ рейтинга/i).first()).toBeVisible();
    await expect(page.getByText(/Последние подтвержденные матчи/i).first()).toBeVisible();
    await expect(page.getByText('Vanguard').first()).toBeVisible();
    await expect(page.getByText('Raid Lead').first()).toBeVisible();

    await moreButton.click();
    await expect(moreButton).toHaveAttribute('aria-expanded', 'true');
    const activePvpLink = page.locator('nav[aria-label="Дополнительная навигация"] a[href="/pvp"]').first();
    await expect(activePvpLink).toHaveAttribute('aria-current', 'page');
    await expect(activePvpLink.getByText('Текущий')).toBeVisible();
  });
});
