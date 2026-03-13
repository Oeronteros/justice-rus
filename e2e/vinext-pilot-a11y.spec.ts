import { expect, test } from '@playwright/test';
import { expectNoSeriousA11yViolations } from './utils/axe';
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

test.describe('vinext pilot accessibility smoke', () => {
  test('PinScreen on /news has no serious accessibility violations', async ({ page }) => {
    await page.goto('/news');

    await expect(page.getByText('Доступ участника')).toBeVisible();
    await expectNoSeriousA11yViolations(page);
  });

  test('logged-in /news has no serious accessibility violations', async ({ page }) => {
    await page.context().addCookies([
      {
        name: 'auth_token',
        value: createAuthToken(authResponse.user),
        domain: '127.0.0.1',
        path: '/',
        httpOnly: false,
        secure: false,
        sameSite: 'Lax',
      },
    ]);

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
