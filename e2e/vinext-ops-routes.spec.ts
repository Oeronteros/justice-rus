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

test.describe('@ops-routes', () => {
  test('Dashboard page renders with responsive layout', async ({ page }) => {
    test.slow();
    await addAuth(page, memberUser);
    await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Verify the dashboard page loads
    await expect(page.locator('body')).toBeVisible({ timeout: 15000 });
    
    // Check for dashboard signal strip
    await expect(page.locator('[data-testid="dashboard-signal-strip"]')).toBeVisible({ timeout: 10000 });
    
    // Check for dashboard content areas
    await expect(page.locator('[data-testid="dashboard-hero"]')).toBeVisible({ timeout: 10000 });
  });

  test('Schedule page renders with event list', async ({ page }) => {
    test.slow();
    await addAuth(page, memberUser);
    await page.goto(`${baseUrl}/schedule`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Verify the schedule page loads
    await expect(page.locator('body')).toBeVisible({ timeout: 15000 });
    
    // Check for event list
    await expect(page.locator('[data-testid="event-list"]')).toBeVisible({ timeout: 10000 });
  });

  test('Calendar page renders with RSVP view', async ({ page }) => {
    test.slow();
    await addAuth(page, memberUser);
    await page.goto(`${baseUrl}/calendar`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Verify the calendar page loads
    await expect(page.locator('body')).toBeVisible({ timeout: 15000 });
    
    // Check for calendar view
    await expect(page.locator('[data-testid="calendar-view"]')).toBeVisible({ timeout: 10000 });
  });

  test('Analytics page renders with charts for officers', async ({ page }) => {
    test.slow();
    await addAuth(page, officerUser);
    await page.goto(`${baseUrl}/analytics`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Verify the analytics page loads
    await expect(page.locator('body')).toBeVisible({ timeout: 15000 });
    
    // Check for analytics chart elements (may show loading or data)
    // Either chart loading or actual chart should be visible
    const hasChartContent = await Promise.all([
      page.locator('[data-testid="chart-loading"]').isVisible().catch(() => false),
      page.locator('[data-testid="analytics-chart-pvp"]').isVisible().catch(() => false),
      page.locator('[data-testid="analytics-chart-attendance"]').isVisible().catch(() => false),
    ]);
    
    expect(hasChartContent.some(Boolean)).toBe(true);
  });

  test('Analytics page restricts access for non-officers', async ({ page }) => {
    test.slow();
    await addAuth(page, memberUser);
    await page.goto(`${baseUrl}/analytics`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Verify the analytics page loads
    await expect(page.locator('body')).toBeVisible({ timeout: 15000 });
    
    // Check for permission denied message
    await expect(page.locator('[data-testid="permission-error"], text=Officers Only, text=Только для офицеров')).toBeVisible({ timeout: 10000 });
  });

  test('Dashboard charts lazy load without blocking shell render', async ({ page }) => {
    test.slow();
    await addAuth(page, memberUser);
    await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Verify the shell renders immediately
    await expect(page.locator('[data-testid="portal-shell"]')).toBeVisible({ timeout: 10000 });
    
    // Dashboard content should load
    await expect(page.locator('[data-testid="dashboard-signal-strip"]')).toBeVisible({ timeout: 15000 });
  });

  test('Schedule page is responsive on mobile', async ({ page }) => {
    test.slow();
    await page.setViewportSize({ width: 390, height: 844 });
    await addAuth(page, memberUser);
    await page.goto(`${baseUrl}/schedule`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Verify the schedule page loads on mobile
    await expect(page.locator('body')).toBeVisible({ timeout: 15000 });
    
    // Check for event list on mobile
    await expect(page.locator('[data-testid="event-list"]')).toBeVisible({ timeout: 10000 });
  });

  test('Dashboard page is responsive on mobile', async ({ page }) => {
    test.slow();
    await page.setViewportSize({ width: 390, height: 844 });
    await addAuth(page, memberUser);
    await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Verify the dashboard page loads on mobile
    await expect(page.locator('body')).toBeVisible({ timeout: 15000 });
    
    // Check for dashboard content on mobile
    await expect(page.locator('[data-testid="dashboard-signal-strip"]')).toBeVisible({ timeout: 10000 });
  });
});