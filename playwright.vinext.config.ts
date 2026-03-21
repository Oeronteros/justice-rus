import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3000';

export default defineConfig({
  testDir: './e2e',
  testMatch: [
    'vinext-pilot.spec.ts',
    'vinext-pilot-a11y.spec.ts',
    'vinext-route-parity.spec.ts',
    'vinext-content-routes.spec.ts',
    'vinext-theme-primitives.spec.ts',
    'vinext-nav.spec.ts',
    'vinext-data-adapter.spec.ts',
    'vinext-member-routes.spec.ts',
  ],
  timeout: 120000,
  fullyParallel: false,
  retries: 1,
  workers: 1,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL,
    trace: 'off',
    screenshot: 'off',
    video: 'off',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
  webServer: {
    command: 'set NODE_OPTIONS=--max-old-space-size=4096 && set JWT_SECRET=e2e-secret && npm run dev:cutover:all',
    url: `${baseURL}/news`,
    reuseExistingServer: true,
    stdout: 'ignore',
    stderr: 'pipe',
    timeout: 120000,
  },
});
