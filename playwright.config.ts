import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:4321', browserName: 'chromium' },
  webServer: { command: 'npm run preview -- --host 127.0.0.1 --port 4321 --ignore-lock', url: 'http://127.0.0.1:4321', reuseExistingServer: !process.env.CI },
});
