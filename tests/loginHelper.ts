// tests/loginHelper.ts
import { Page, expect } from '@playwright/test';

export async function loginAsBroker(page: Page) {
  await page.goto('/login');

  await page.fill('#email', 'broker1@tech-test.bridgit.com.au');
  await page.fill('#password', 'password');
  await page.click('[aria-label="Sign in"]');

  // Wait for dashboard title to confirm login success
  const cardTitle = page.locator('[class="p-card-title"]');
  await expect(cardTitle).toBeVisible({ timeout: 10000 });

  const titleText = await cardTitle.textContent();
  console.log('Card Title:', titleText);
}
