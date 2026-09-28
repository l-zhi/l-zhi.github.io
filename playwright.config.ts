import { defineConfig } from '@playwright/test';
const port = process.env.PLAYWRIGHT_PORT || '4321';
const baseURL = `http://127.0.0.1:${port}`;
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  use: { baseURL, browserName: 'chromium' },
  webServer: { command: `npm run preview -- --host 127.0.0.1 --port ${port} --ignore-lock`, url: baseURL, reuseExistingServer: !process.env.CI },
});
