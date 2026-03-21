import { appendFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { expect, test, type Page, type Route } from '@playwright/test';
import { addVinextAuthCookie, type VinextFixtureUser } from './utils/vinext-auth';

const baseUrl = process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3000';
const evidencePath = path.join(process.cwd(), '.sisyphus', 'evidence', 'task-5-vinext-adapter.txt');

const officerUser: VinextFixtureUser = {
  id: '90011',
  nickname: 'Adapter Officer',
  role: 'officer',
  isActive: true,
  authMethod: 'account',
  discordHandle: null,
  className: 'Numina',
};

const memberUser: VinextFixtureUser = {
  id: '90012',
  nickname: 'Adapter Member',
  role: 'member',
  isActive: true,
  authMethod: 'account',
  discordHandle: null,
  className: 'Numina',
};

function appendEvidence(line: string) {
  mkdirSync(path.dirname(evidencePath), { recursive: true });
  appendFileSync(evidencePath, `${line}\n`, 'utf8');
}

async function waitForPortalShell(page: Page) {
  const portalShell = page.getByTestId('portal-shell');

  await page.goto('/news', { waitUntil: 'domcontentloaded' });
  await expect(portalShell).toBeVisible({ timeout: 15000 });
  await expect
    .poll(async () => portalShell.getAttribute('data-auth-state'), {
      timeout: 15000,
      intervals: [200, 500, 1000],
      message: 'Waiting for portal shell to become authenticated',
    })
    .toBe('authenticated');
}

test.describe('vinext shared data adapter seam', () => {
  test('@vinext-data-adapter reuses shared query/mutation contract for news route', async ({ page }) => {
    process.env.PLAYWRIGHT_VINEXT_BASE_URL = baseUrl;
    await addVinextAuthCookie(page.context(), officerUser);

    const rows: Array<{
      id: string;
      title: string;
      content: string;
      author: string;
      date: string;
      pinned: boolean;
      discordDeliveryStatus?: 'pending' | 'sent' | 'failed';
    }> = [
      {
        id: 'news-1',
        title: 'Pinned update',
        content: 'Initial content',
        author: 'Officer',
        date: '2026-03-11T18:00:00.000Z',
        pinned: true,
      },
    ];

    await page.route('**/api/news', async (route: Route) => {
      const method = route.request().method();
      if (method === 'GET') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(rows),
        });
        return;
      }

      if (method === 'POST') {
        const payload = route.request().postDataJSON() as { title: string; content: string; pinned?: boolean; author?: string };
        rows.unshift({
          id: 'news-created',
          title: payload.title,
          content: payload.content,
          author: payload.author ?? 'Officer',
          date: '2026-03-12T18:00:00.000Z',
          pinned: Boolean(payload.pinned),
          discordDeliveryStatus: 'sent',
        });
        await route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify(rows[0]),
        });
        return;
      }

      await route.continue();
    });

    await waitForPortalShell(page);
    await expect(page.getByTestId('portal-shell')).toHaveAttribute('data-auth-state', 'authenticated');
    await expect(page.getByTestId('news-list')).toBeVisible({ timeout: 15000 });
    await expect(page.getByTestId('news-list')).toContainText('Pinned update');

    await page.getByLabel('Заголовок').fill('Adapter create');
    await page.getByLabel('Текст новости').fill('Mutation path is shared');
    await page.getByTestId('news-create-button').click();

    await expect(page.getByTestId('news-list')).toContainText('Adapter create');
    appendEvidence('happy-path: vinext /news used shared adapter fetch + create mutation');
  });

  test('@vinext-data-adapter surfaces permission handling for member consumer', async ({ page }) => {
    process.env.PLAYWRIGHT_VINEXT_BASE_URL = baseUrl;
    await addVinextAuthCookie(page.context(), memberUser);

    await page.route('**/api/news', async (route: Route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      });
    });

    await waitForPortalShell(page);
    await expect(page.getByTestId('portal-shell')).toHaveAttribute('data-auth-state', 'authenticated');
    await expect(page.getByTestId('news-list')).toBeVisible({ timeout: 15000 });
    await expect(page.getByTestId('permission-error')).toContainText('Недостаточно прав');
    await expect(page.getByTestId('news-create-button')).toHaveCount(0);
    appendEvidence('failure-path: member sees normalized permission state on vinext /news');
  });
});
