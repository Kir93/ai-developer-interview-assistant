import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['html'], ['github']] : 'html',

  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  webServer: {
    command: 'npm run test_build && npm run test_start',
    url: 'http://localhost:3000',
    timeout: 120 * 1000, // 120초 대기
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe', // 서버 로그 출력
    stderr: 'pipe',
    env: {
      ...process.env,
      NODE_ENV: 'test',
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      CI: process.env.CI
    }
  },

  // CI에서는 Chrome만 사용하여 성능 최적화
  projects: process.env.CI
    ? [
        {
          name: 'chromium',
          use: { ...devices['Desktop Chrome'] }
        }
      ]
    : [
        {
          name: 'chromium',
          use: { ...devices['Desktop Chrome'] }
        },
        {
          name: 'firefox',
          use: { ...devices['Desktop Firefox'] }
        },
        {
          name: 'webkit',
          use: { ...devices['Desktop Safari'] }
        }
      ]
});
