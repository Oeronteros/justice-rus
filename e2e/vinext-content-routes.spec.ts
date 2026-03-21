import { expect, test, type Page, type Route } from '@playwright/test';
import { addVinextAuthCookie, type VinextFixtureUser } from './utils/vinext-auth';

const baseUrl = process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3000';
const officerAccountId = '90021';

const officerUser: VinextFixtureUser = {
  id: 'pin-officer',
  nickname: 'Content Officer',
  role: 'officer',
  isActive: true,
  authMethod: 'pin',
  discordHandle: null,
  className: 'Numina',
};

const dashboardSchedule = [
  {
    id: 'schedule-1',
    date: '2099-03-15T20:00:00.000Z',
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

const dashboardRegistrations = [
  {
    id: 'registration-1',
    nickname: 'Content Officer',
    discord: 'Content Officer#90021',
    discordHandle: '@content-officer',
    class: 'Numina',
    className: 'Numina',
    guild: 'Silent Moonfall',
    joinDate: '2026-03-01T00:00:00.000Z',
    kpi: 8,
    status: 'active',
    rank: 'elite',
    elo: 1200,
    mmr20: 0,
    bounty: 0,
    marks: 0,
    outerHeroic: 0,
    innerHeroic: 0,
    crimsonSands: 0,
    abyss: 0,
    gvg: 0,
    secretRealm: 0,
    duelWins: 0,
    duelLosses: 0,
    prefix: 'SM',
  },
];

const newsPayload = [
  {
    id: 'news-1',
    title: 'Боевой сбор Silent Moonfall',
    content: 'Сегодня идем в рейд. Сбор в 21:00 по Москве.',
    author: 'Officer',
    date: '2099-03-11T18:00:00.000Z',
    pinned: true,
    messageUrl: 'https://discord.com/channels/1/2/3',
  },
  {
    id: 'news-2',
    title: 'Обновление тактик для рейда',
    content: 'Подробности опубликованы в сводке офицеров.',
    author: 'Officer',
    date: '2099-03-10T18:00:00.000Z',
    pinned: false,
  },
];

const helpPayload = [
  {
    id: 'help-1',
    title: 'Нужен лидер на вечерний сбор',
    details: 'Нужен офицер, который сможет координировать группу на вечернем событии.',
    category: 'outer_city_heroic',
    author: 'Content Officer',
    authorUserId: officerAccountId,
    status: 'open',
    createdAt: '2099-03-11T16:00:00.000Z',
    gatheringStart: '2099-03-11T18:00:00.000Z',
    gatheringEnd: '2099-03-11T19:00:00.000Z',
    responders: [],
  },
];

const guidesPayload = [
  {
    id: 'guide-1',
    slug: 'guide-evening-raid',
    ownerAccountId: officerAccountId,
    title: 'Гайд по вечернему сбору',
    category: 'general',
    author: 'Content Officer',
    createdAt: '2099-03-10T18:00:00.000Z',
    updatedAt: '2099-03-10T18:00:00.000Z',
    votes: 5,
    commentsCount: 1,
    linkTargets: [],
  },
];

const guideDetailPayload = {
  guide: {
    id: 'guide-1',
    slug: 'guide-evening-raid',
    ownerAccountId: officerAccountId,
    title: 'Гайд по вечернему сбору',
    category: 'general',
    author: 'Content Officer',
    content: '# Вечерний сбор\n\nПодготовь состав, расходники и голосовой канал.',
    createdAt: '2099-03-10T18:00:00.000Z',
    updatedAt: '2099-03-10T18:00:00.000Z',
    votes: 5,
    commentsCount: 1,
    linkTargets: [],
  },
  comments: [
    {
      id: 'comment-1',
      author: 'Officer',
      content: 'Проверь список баффов перед стартом.',
      createdAt: '2099-03-10T19:00:00.000Z',
    },
  ],
  votes: 5,
  voted: false,
};

const absencesPayload = [
  {
    id: 'absence-1',
    member: 'Scout Nova',
    startDate: '2099-03-12',
    endDate: '2099-03-14',
    reason: 'Командировка',
    status: 'pending',
  },
];

const pvpStatePayload = {
  queue: [],
  activeMatch: null,
  recentMatches: [],
  leaderboard: [],
  userInQueue: false,
  userRating: null,
};

async function fulfillJson(route: Route, body: unknown, status = 200) {
  await route.fulfill({
    status,
    contentType: 'application/json',
    body: JSON.stringify(body),
  });
}

async function addAuth(page: Page, user: VinextFixtureUser) {
  process.env.PLAYWRIGHT_VINEXT_BASE_URL = baseUrl;
  await addVinextAuthCookie(page.context(), user);
}

async function waitForAuthenticatedShell(page: Page, route: string) {
  const portalShell = page.getByTestId('portal-shell');

  await page.goto(route, { waitUntil: 'domcontentloaded' });
  await expect(portalShell).toBeVisible({ timeout: 15000 });
  await expect
    .poll(async () => portalShell.getAttribute('data-auth-state'), {
      timeout: 15000,
      intervals: [200, 500, 1000],
      message: 'Waiting for portal shell to become authenticated',
    })
    .toBe('authenticated');
}

async function mockSharedContentApis(page: Page, options?: { empty?: boolean }) {
  const empty = options?.empty ?? false;

  await page.route('**/api/schedule**', async (route) => {
    if (route.request().method() !== 'GET') {
      await route.continue();
      return;
    }

    await fulfillJson(route, empty ? [] : dashboardSchedule);
  });

  await page.route('**/api/help**', async (route) => {
    if (route.request().method() !== 'GET') {
      await route.continue();
      return;
    }

    await fulfillJson(route, empty ? [] : helpPayload);
  });

  await page.route('**/api/discord-proxy/registration**', async (route) => {
    if (route.request().method() !== 'GET') {
      await route.continue();
      return;
    }

    await fulfillJson(route, empty ? [] : dashboardRegistrations);
  });

  await page.route('**/api/news**', async (route) => {
    if (route.request().method() !== 'GET') {
      await route.continue();
      return;
    }

    await fulfillJson(route, empty ? [] : newsPayload);
  });

  await page.route('**/api/discord-proxy/absences**', async (route) => {
    if (route.request().method() !== 'GET') {
      await route.continue();
      return;
    }

    await fulfillJson(route, empty ? [] : absencesPayload);
  });

  await page.route('**/api/pvp**', async (route) => {
    if (route.request().method() !== 'GET') {
      await route.continue();
      return;
    }

    await fulfillJson(route, pvpStatePayload);
  });

  await page.route('**/api/guide', async (route) => {
    if (route.request().method() !== 'GET') {
      await route.continue();
      return;
    }

    await fulfillJson(route, empty ? [] : guidesPayload);
  });

  await page.route('**/api/guide/*', async (route) => {
    if (route.request().method() !== 'GET') {
      await route.continue();
      return;
    }

    await fulfillJson(route, guideDetailPayload);
  });
}

test.describe('vinext content routes', () => {
  test('@content-routes renders the migrated content family on Vinext happy paths', async ({ page }) => {
    await addAuth(page, officerUser);
    await mockSharedContentApis(page);

    await waitForAuthenticatedShell(page, '/');
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Дашборд гильдии')).toBeVisible({ timeout: 20000 });
    await expect(page.getByText('Боевой сбор Silent Moonfall')).toBeVisible({ timeout: 20000 });

    await page.goto('/about', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Дашборд гильдии')).toBeVisible({ timeout: 20000 });
    await expect(page.getByText('Нижняя панель решений')).toBeVisible({ timeout: 20000 });

    await page.goto('/news', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId('news-list')).toBeVisible();
    await expect(page.getByTestId('news-list')).toContainText('Боевой сбор Silent Moonfall');

    await page.goto('/help', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { name: 'Запросы помощи' })).toBeVisible();
    await expect(page.getByText('Нужен лидер на вечерний сбор')).toBeVisible();

    await page.goto('/guides', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { name: 'Гайды гильдии' })).toBeVisible();
    await page.getByRole('button', { name: /Гайд по вечернему сбору/ }).click();
    const guideDialog = page.getByRole('dialog');
    await expect(guideDialog).toBeVisible();
    await expect(guideDialog.getByRole('heading', { name: 'Гайд по вечернему сбору' })).toBeVisible();
    await expect(guideDialog.getByText('Подготовь состав, расходники и голосовой канал.')).toBeVisible();
  });

  test('@content-routes renders intentional empty states across Vinext content routes', async ({ page }) => {
    await addAuth(page, officerUser);
    await mockSharedContentApis(page, { empty: true });

    await waitForAuthenticatedShell(page, '/');
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Дашборд гильдии')).toBeVisible({ timeout: 20000 });
    await expect(page.getByText('Нет свежих объявлений для вывода на главный экран.')).toBeVisible({ timeout: 20000 });
    await expect(page.getByText('Пока нет событий для отображения')).toBeVisible({ timeout: 20000 });
    await expect(page.getByText('Открытых запросов без движения сейчас нет.')).toBeVisible({ timeout: 20000 });

    await page.goto('/news', { waitUntil: 'domcontentloaded' });
    await expect(page.getByText('Новостей пока нет')).toBeVisible();

    await page.goto('/help', { waitUntil: 'domcontentloaded' });
    await expect(page.getByText('Тишина в зале ритуалов')).toBeVisible();

    await page.goto('/guides', { waitUntil: 'domcontentloaded' });
    await expect(page.getByText('Ничего не найдено')).toBeVisible();
    await expect(page.getByText('Измени фильтр или напиши новый гайд.')).toBeVisible();
  });
});
