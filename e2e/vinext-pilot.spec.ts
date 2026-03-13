import { expect, test, type BrowserContext, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import jwt from 'jsonwebtoken';

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

function getJwtSecret() {
  const envPath = path.join(process.cwd(), '.env.local');
  const envSource = readFileSync(envPath, 'utf8');
  const jwtSecretLine = envSource
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => line.startsWith('JWT_SECRET='));

  if (!jwtSecretLine) {
    throw new Error('JWT_SECRET is missing in .env.local');
  }

  return jwtSecretLine.slice('JWT_SECRET='.length).trim();
}

function createAuthToken(user: typeof authResponse.user) {
  return jwt.sign(
    {
      id: user.id,
      nickname: user.nickname,
      role: user.role,
      isActive: user.isActive,
      authMethod: user.authMethod,
      discordHandle: user.discordHandle,
      className: user.className,
      iss: 'silent-moonfall-portal',
      aud: 'silent-moonfall-users',
      sub: user.id || user.nickname || user.role,
    },
    getJwtSecret(),
    { expiresIn: '24h' }
  );
}

async function addAuthCookie(context: BrowserContext, user: typeof authResponse.user) {
  await context.addCookies([
    {
      name: 'auth_token',
      value: createAuthToken(user),
      domain: '127.0.0.1',
      path: '/',
      httpOnly: false,
      secure: false,
      sameSite: 'Lax',
    },
  ]);
}

test.describe('vinext pilot smoke', () => {
  test('shows PinScreen on /news when session is missing', async ({ page }) => {
    await page.goto('/news');

    await expect(page.getByText('Доступ участника')).toBeVisible();
    await expect(page.getByPlaceholder('Ник в гильдии')).toBeVisible();
    await expect(page.locator('form').getByRole('button', { name: 'Войти' })).toBeVisible();
  });

  test('logs in on /news and renders protected content', async ({ page }) => {
    await addAuthCookie(page.context(), authResponse.user);

    await page.route((url) => url.pathname === '/api/news', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(newsPayload),
      });
    });

    await page.goto('/news');

    await expect(page.getByText('Боевой сбор')).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole('button', { name: 'Выйти' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Новости', exact: true })).toHaveAttribute('aria-current', 'page');
  });

  test('logs out from vinext /news back to PinScreen', async ({ page }) => {
    await addAuthCookie(page.context(), authResponse.user);

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
    await expect(page.getByText('Боевой сбор')).toBeVisible({ timeout: 15000 });

    await page.getByRole('button', { name: 'Выйти' }).click();

    await expect(page.getByText('Доступ участника')).toBeVisible();
    await expect(page.getByPlaceholder('Ник в гильдии')).toBeVisible();
  });

  test('shows officer moderation action on vinext /help', async ({ page }) => {
    await addAuthCookie(page.context(), officerAuthResponse.user);

    await page.route((url) => url.pathname === '/api/help' && url.searchParams.get('status') === 'open', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(helpPayload),
      });
    });

    await page.goto('/help');

    await expect(page.getByText('Нужен лидер на вечерний сбор')).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole('button', { name: 'Закрыть' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Удалить' })).toHaveCount(0);
  });

  test('renders authenticated vinext /guides view', async ({ page }) => {
    await addAuthCookie(page.context(), authResponse.user);

    await page.route((url) => url.pathname === '/api/guide', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(guidesPayload),
      });
    });

    await page.goto('/guides');

    await expect(page.getByText('Гайд по вечернему сбору')).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole('button', { name: 'Выйти' })).toBeVisible();
  });

  test.fixme('supports keyboard-first auth interactions on vinext pilot route', async ({ page }) => {
    await page.goto('/news');

    await page.getByRole('button', { name: 'Показать вход по служебному PIN' }).press('Enter');
    await expect(page.getByPlaceholder('Officer / Head / Sysadmin PIN')).toBeVisible();
  });
});
