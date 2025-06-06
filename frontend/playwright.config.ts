import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests/e2e',
  testMatch: /.*\.e2e-spec\.ts$/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: 'http://localhost:50789',
  },
  webServer: {
    command: 'yarn dev:mock',
    url: 'http://localhost:50789',
    reuseExistingServer: !process.env.CI,
  },

  // projects: [
  // { name: 'setup', testMatch: /.*\.setup\.ts/ },
  // {
  //   name: 'chromium',
  //   use: {
  //     ...devices['Desktop Chrome'],
  //     storageState: 'playwright/.auth/user.json',
  //   },
  //   dependencies: ['setup'],
  // },
  // {
  //   name: 'firefox',
  //   use: { ...devices['Desktop Firefox'] },
  // },
  // {
  //   name: 'webkit',
  //   use: { ...devices['Desktop Safari'] },
  // },
  /* Test against mobile viewports. */
  // {
  //   name: 'Mobile Chrome',
  //   use: { ...devices['Pixel 5'] },
  // },
  // {
  //   name: 'Mobile Safari',
  //   use: { ...devices['iPhone 12'] },
  // },
  /* Test against branded browsers. */
  // {
  //   name: 'Microsoft Edge',
  //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
  // },
  // {
  //   name: 'Google Chrome',
  //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
  // },
  // ],
});
