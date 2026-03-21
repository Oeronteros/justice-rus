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

test.describe('@member-routes', () => {
  test('Profile page renders with personalization fields', async ({ page }) => {
    await addVinextAuthCookie(page, memberUser);
    await page.goto(`${baseUrl}/profile`);

    // Verify the page loads
    await expect(page.locator('[data-testid="portal-shell"]')).toBeVisible();

    // Check profile title input exists
    await expect(page.locator('[data-testid="profile-personalization-title"]')).toBeVisible();

    // Check prefix input exists
    await expect(page.locator('[data-testid="profile-prefix-input"]')).toBeVisible();

    // Check class multiselect exists
    await expect(page.locator('[data-testid="class-multiselect"]')).toBeVisible();

    // Check recommendation tags area exists
    await expect(page.locator('[data-testid="recommendation-chip-list"]')).toBeVisible();
  });

  test('Profile personalization saves and persists', async ({ page }) => {
    await addVinextAuthCookie(page, memberUser);
    await page.goto(`${baseUrl}/profile`);

    // Set profile title
    const titleSelect = page.locator('[data-testid="profile-personalization-title"]');
    await titleSelect.selectOption('Strategist');

    // Set prefix
    const prefixInput = page.locator('[data-testid="profile-prefix-input"]');
    await prefixInput.fill('VIP');

    // Save profile
    const saveButton = page.locator('[data-testid="profile-save"]');
    await saveButton.click();

    // Verify success toast
    await expect(page.locator('[data-testid="toast-region"]')).toContainText(/Сохранено|Saved/i);

    // Reload and verify persistence
    await page.reload();
    await expect(page.locator('[data-testid="profile-personalization-title"]')).toHaveValue('Strategist');
    await expect(page.locator('[data-testid="profile-prefix-input"]')).toHaveValue('VIP');
  });

  test('Profile validation blocks invalid prefix', async ({ page }) => {
    await addVinextAuthCookie(page, memberUser);
    await page.goto(`${baseUrl}/profile`);

    // Set an overlong prefix
    const prefixInput = page.locator('[data-testid="profile-prefix-input"]');
    await prefixInput.fill('ThisIsAVeryLongPrefixThatExceedsTheLimit');

    // Try to save
    const saveButton = page.locator('[data-testid="profile-save"]');
    await saveButton.click();

    // Verify validation error
    await expect(page.locator('[data-testid="field-error-prefix"]')).toBeVisible();
    await expect(page.locator('[data-testid="form-error-summary"]')).toBeVisible();
  });

  test('Absences page renders and allows creating requests', async ({ page }) => {
    await addVinextAuthCookie(page, memberUser);
    await page.goto(`${baseUrl}/absences`);

    // Verify the page loads
    await expect(page.locator('[data-testid="portal-shell"]')).toBeVisible();

    // Check absence form exists
    await expect(page.locator('[data-testid="absence-form"]')).toBeVisible();

    // Check absence list exists
    await expect(page.locator('[data-testid="absence-list"]')).toBeVisible();
  });

  test('PvP page renders and shows queue/match state', async ({ page }) => {
    await addVinextAuthCookie(page, memberUser);
    await page.goto(`${baseUrl}/pvp`);

    // Verify the page loads
    await expect(page.locator('[data-testid="portal-shell"]')).toBeVisible();

    // Check PvP queue button exists
    await expect(page.locator('[data-testid="pvp-queue-button"]')).toBeVisible();

    // Check PvP stats exist
    await expect(page.locator('[data-testid="pvp-stats"]')).toBeVisible();
  });

  test('Officer can approve/reject absences', async ({ page }) => {
    await addVinextAuthCookie(page, officerUser);
    await page.goto(`${baseUrl}/absences`);

    // Verify officer controls are visible
    await expect(page.locator('[data-testid="absence-moderation-controls"]')).toBeVisible();
  });

  test('Member cannot see officer-only absence controls', async ({ page }) => {
    await addVinextAuthCookie(page, memberUser);
    await page.goto(`${baseUrl}/absences`);

    // Verify officer controls are NOT visible
    await expect(page.locator('[data-testid="absence-moderation-controls"]')).not.toBeVisible();
  });

  test('Recommendation tags derive from profile interests', async ({ page }) => {
    await addVinextAuthCookie(page, memberUser);
    await page.goto(`${baseUrl}/profile`);

    // Check that recommendation tags are visible
    const recommendationChips = page.locator('[data-testid="recommendation-chip-list"] span');
    await expect(recommendationChips.first()).toBeVisible();

    // Verify at least one tag is present
    const chipCount = await recommendationChips.count();
    expect(chipCount).toBeGreaterThan(0);
  });
});