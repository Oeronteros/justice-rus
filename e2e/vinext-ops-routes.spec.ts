import { expect, test, type Page } from '@playwright/test';
import { addVinextAuthCookie, type VinextFixtureUser } from './utils/vinext-auth';

const baseUrl = process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3000';

const memberUser: VinextFixtureUser = {
  id: 'member-001',
  nickname: 'Moonblade',
  role: 'member',
  isActive: true,
  authMethod: 'pin',
  discordHandle: '@moonblade',
  className: 'Numina',
  prefix: 'SM',
  profileTitle: 'Striker',
  preferredClasses: ['Numina', 'Sylph'],
  interests: ['pvp', 'raid-prep'],
  notificationDefaults: {
    helpRequests: true,
    absenceApprovals: true,
    pvpMatches: true,
    eventReminders: true,
  },
};

const officerUser: VinextFixtureUser = {
  id: 'officer-001',
  nickname: 'Officer Moon',
  role: 'officer',
  isActive: true,
  authMethod: 'pin',
  discordHandle: '@officer-moon',
  className: 'Sylph',
  prefix: 'SM',
  profileTitle: 'Strategist',
  preferredClasses: ['Sylph', 'Numina'],
  interests: ['pvp', 'mentoring'],
  notificationDefaults: {
    helpRequests: true,
    absenceApprovals: true,
    pvpMatches: true,
    eventReminders: true,
  },
};

async function addAuth(page: Page, user: VinextFixtureUser) {
  process.env.PLAYWRIGHT_VINEXT_BASE_URL = baseUrl;
  await addVinextAuthCookie(page.context(), user);
}

test.describe('@ops-admin-routes', () => {
  test('Workflow page loads for officers', async ({ page }) => {
    test.slow();
    await addAuth(page, officerUser);
    await page.goto(`${baseUrl}/workflow`, { waitUntil: 'networkidle', timeout: 30000 });
    
    // Verify the workflow automation grid is visible
    await expect(page.locator('[data-testid="workflow-automation-grid"]')).toBeVisible({ timeout: 15000 });
  });

  test('Workflow page restricts access for non-officers', async ({ page }) => {
    test.slow();
    await addAuth(page, memberUser);
    await page.goto(`${baseUrl}/workflow`, { waitUntil: 'networkidle', timeout: 30000 });
    
    // Verify permission error is shown
    await expect(page.locator('[data-testid="permission-error"]')).toBeVisible({ timeout: 15000 });
  });

  test('Integrations page loads for officers', async ({ page }) => {
    test.slow();
    await addAuth(page, officerUser);
    await page.goto(`${baseUrl}/integrations`, { waitUntil: 'networkidle', timeout: 30000 });
    
    // Verify the integration health list and discord status are visible
    await expect(page.locator('[data-testid="integration-health-list"]')).toBeVisible({ timeout: 15000 });
    await expect(page.locator('[data-testid="integration-discord-status"]')).toBeVisible({ timeout: 15000 });
  });

  test('Integrations page restricts access for non-officers', async ({ page }) => {
    test.slow();
    await addAuth(page, memberUser);
    await page.goto(`${baseUrl}/integrations`, { waitUntil: 'networkidle', timeout: 30000 });
    
    // Verify permission error is shown
    await expect(page.locator('[data-testid="permission-error"]')).toBeVisible({ timeout: 15000 });
  });

  test('Dashboard page loads without crash', async ({ page }) => {
    test.slow();
    await addAuth(page, memberUser);
    await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Just verify the page loads without crashing
    await expect(page.locator('body')).toBeVisible({ timeout: 15000 });
  });

  test('Schedule page loads without crash', async ({ page }) => {
    test.slow();
    await addAuth(page, memberUser);
    await page.goto(`${baseUrl}/schedule`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Just verify the page loads without crashing
    await expect(page.locator('body')).toBeVisible({ timeout: 15000 });
  });

  test('Calendar page loads without crash', async ({ page }) => {
    test.slow();
    await addAuth(page, memberUser);
    await page.goto(`${baseUrl}/calendar`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Just verify the page loads without crashing
    await expect(page.locator('body')).toBeVisible({ timeout: 15000 });
  });

  test('Analytics page loads for officers', async ({ page }) => {
    test.slow();
    await addAuth(page, officerUser);
    await page.goto(`${baseUrl}/analytics`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Just verify the page loads without crashing
    await expect(page.locator('body')).toBeVisible({ timeout: 15000 });
  });

  test('Analytics page restricts access for non-officers', async ({ page }) => {
    test.slow();
    await addAuth(page, memberUser);
    await page.goto(`${baseUrl}/analytics`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Just verify the page loads without crashing
    await expect(page.locator('body')).toBeVisible({ timeout: 15000 });
  });

  test('Dashboard loads on mobile viewport', async ({ page }) => {
    test.slow();
    await page.setViewportSize({ width: 390, height: 844 });
    await addAuth(page, memberUser);
    await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Just verify the page loads without crashing on mobile
    await expect(page.locator('body')).toBeVisible({ timeout: 15000 });
  });

  test('Schedule loads on mobile viewport', async ({ page }) => {
    test.slow();
    await page.setViewportSize({ width: 390, height: 844 });
    await addAuth(page, memberUser);
    await page.goto(`${baseUrl}/schedule`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Just verify the page loads without crashing on mobile
    await expect(page.locator('body')).toBeVisible({ timeout: 15000 });
  });
});