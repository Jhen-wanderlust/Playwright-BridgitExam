// tests/login.test.ts
import { test, expect } from '@playwright/test';


test('Login as broker1', async ({ page }) => {

  // Go to the login page
  await page.goto('/login'); // Assuming this is the homepage or login page

  // Fill the login form
  await page.fill('#email', 'broker1@tech-test.bridgit.com.au');
  await page.fill('#password', 'password');

  // Click the login button
  await page.click('[aria-label="Sign in"]');

  // Verify successful login by checking the dashboard or home page text
  const title = await page.locator('[class="p-card-title"]').textContent();
  console.log('Card Title:', title);

});
