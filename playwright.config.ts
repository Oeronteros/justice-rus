import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3001';
const vinextBaseURL = process.env.PLAYWRIGHT_VINEXT_BASE_URL || 'http://127.0.0.1:3101';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      testIgnore: ['**/vinext-pilot.spec.ts', '**/vinext-pilot-a11y.spec.ts'],
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'vinext-chromium',
      testMatch: ['**/vinext-pilot.spec.ts', '**/vinext-pilot-a11y.spec.ts'],
      use: {
        ...devices['Desktop Chrome'],
        baseURL: vinextBaseURL,
      },
    },
  ],
  webServer: [
    {
      command: 'npm run dev -- --hostname 127.0.0.1 --port 3001',
      url: baseURL,
      reuseExistingServer: !process.env.CI,
      stdout: 'ignore',
      stderr: 'pipe',
      timeout: 120000,
    },
    {
      command: 'npm run dev:vinext',
      url: `${vinextBaseURL}/news`,
      reuseExistingServer: !process.env.CI,
      stdout: 'ignore',
      stderr: 'pipe',
      timeout: 120000,
    },
  ],
});
