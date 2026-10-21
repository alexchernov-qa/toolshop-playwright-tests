import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    baseURL: 'https://practicesoftwaretesting.com',
    testIdAttribute: 'data-test',
  },
  projects: [
  { name: 'setup', testMatch: /.*\.setup\.ts/ },
  {
    name: 'api', 
    testMatch: /.*\.api\.spec\.ts/,
    use: { baseURL: 'https://api.practicesoftwaretesting.com' }
  },
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'],  storageState: 'playwright/.auth/user.json' },
    dependencies: ['setup'],
    testIgnore: /.*\.api\.spec\.ts/,
  },
],

});
