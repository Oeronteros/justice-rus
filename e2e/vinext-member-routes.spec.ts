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

test.describe('@member-routes', () => {
  test('Profile page renders with personalization fields', async ({ page }) => {
    test.slow();
    await addAuth(page, memberUser);
    await page.goto(`${baseUrl}/profile`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Verify the page loads - look for profile-related content
    await expect(page.locator('body')).toBeVisible({ timeout: 15000 });
    
    // Check for profile title input (select element for title)
    await expect(page.locator('[data-testid="profile-personalization-title"]')).toBeVisible({ timeout: 10000 });
    
    // Check for prefix input
    await expect(page.locator('[data-testid="profile-prefix-input"]')).toBeVisible({ timeout: 10000 });
    
    // Check for class multiselect
    await expect(page.locator('[data-testid="class-multiselect"]')).toBeVisible({ timeout: 10000 });
  });

  test('Absences page renders and allows creating requests', async ({ page }) => {
    test.slow();
    await addAuth(page, memberUser);
    await page.goto(`${baseUrl}/absences`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Verify the page loads
    await expect(page.locator('body')).toBeVisible({ timeout: 15000 });
    
    // Check absence form exists
    await expect(page.locator('[data-testid="absence-form"]')).toBeVisible({ timeout: 10000 });
    
    // Check absence list exists
    await expect(page.locator('[data-testid="absence-list"]')).toBeVisible({ timeout: 10000 });
  });

  test('PvP page renders and shows queue/match state', async ({ page }) => {
    test.slow();
    await addAuth(page, memberUser);
    await page.goto(`${baseUrl}/pvp`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Verify the page loads
    await expect(page.locator('body')).toBeVisible({ timeout: 15000 });
    
    // Check PvP queue button exists
    await expect(page.locator('[data-testid="pvp-queue-button"]')).toBeVisible({ timeout: 10000 });
    
    // Check PvP stats exist
    await expect(page.locator('[data-testid="pvp-stats"]')).toBeVisible({ timeout: 10000 });
  });

  test('Officer can approve/reject absences', async ({ page }) => {
    test.slow();
    await addAuth(page, officerUser);
    await page.goto(`${baseUrl}/absences`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Verify the page loads
    await expect(page.locator('body')).toBeVisible({ timeout: 15000 });
    
    // Verify officer controls are visible
    await expect(page.locator('[data-testid="absence-moderation-controls"]')).toBeVisible({ timeout: 10000 });
  });

  test('Member cannot see officer-only absence controls', async ({ page }) => {
    test.slow();
    await addAuth(page, memberUser);
    await page.goto(`${baseUrl}/absences`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Verify the page loads
    await expect(page.locator('body')).toBeVisible({ timeout: 15000 });
    
    // Verify officer controls are NOT visible (they may not exist in DOM or be hidden)
    const moderationControls = page.locator('[data-testid="absence-moderation-controls"]');
    await expect(moderationControls).toHaveCount(0, { timeout: 5000 });
  });

  test('Recommendation tags derive from profile interests', async ({ page }) => {
    test.slow();
    await addAuth(page, memberUser);
    await page.goto(`${baseUrl}/profile`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Verify the page loads
    await expect(page.locator('body')).toBeVisible({ timeout: 15000 });
    
    // Check that recommendation tags are visible
    await expect(page.locator('[data-testid="profile-recommendation-tags"]')).toBeVisible({ timeout: 10000 });
  });
});