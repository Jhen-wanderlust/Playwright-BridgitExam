// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'http://127.0.0.1:7200', // or your target base URL
    headless: false,
  },
  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        channel: 'chrome', // Uses your local Chrome browser
        headless: false,
      },
    },
  ],
});
