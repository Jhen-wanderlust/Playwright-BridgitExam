import { test, expect } from '@playwright/test';
import { loginAsBroker } from './loginHelper';
//run test:  npx playwright test ValidSubmitApplication.spec.ts --project=chrome
test('An application can be successfully submitted with valid data', async ({ page }) => {

  
  await loginAsBroker(page);

  // Wait for dashboard to load
  await expect(page.locator('[data-test-id="open-submit-application"]')).toBeVisible({ timeout: 10000 });

  // Click "Submit application"
  await page.locator('[data-test-id="open-submit-application"]').click();

  // Fill form
  await page.locator('[data-test-id="applicant-name"]').fill('John Doe');
  await page.locator('[data-test-id="applicant-email"]').fill('john.doe@example.com');
  await page.locator('[data-test-id="applicant-mobile-number"]').fill('0412345678');
  await page.locator('[data-test-id="applicant-address"]').fill('123 Bridge St, Sydney NSW 2000');

  // next button
  await page.locator('[data-test-id="next-button"]').click();

  // Fill Incoming Property Details
  await page.locator('[data-test-id="incoming-property-address"]').fill('123 Incoming St, Melbourne VIC 3000');
  await page.locator('[data-test-id="incoming-property-deposit"]').fill('50000'); // e.g., $50,000
  await page.locator('[data-test-id="incoming-property-price"]').fill('750000'); // e.g., $750,000
  await page.locator('[data-test-id="incoming-property-stamp-duty"]').fill('30000'); // e.g., $30,000

  // Fill Outgoing Property Details
  await page.locator('[data-test-id="outgoing-property-address"]').fill('456 Outgoing Rd, Sydney NSW 2000');
  await page.locator('[data-test-id="outgoing-property-mortgage"]').fill('250000'); // e.g., $250,000
  await page.locator('[data-test-id="outgoing-property-valuation"]').fill('700000'); // e.g., $700,000

  // next button
  await page.locator('[data-test-id="next-button"]').click();

  // Fill Additional Loan Details
  await page.locator('[data-test-id="annual-income"]').fill('120000');           // e.g., $120,000 annual income
  await page.locator('[data-test-id="loan-amount"]').fill('600000');             // e.g., $600,000 loan
  await page.locator('[data-test-id="loan-duration"]').fill('30');               // e.g., 30 years
  await page.locator('[data-test-id="monthly-expenses"]').fill('3500');          // e.g., $3,500 monthly expenses
  await page.locator('[data-test-id="savings-contribution"]').fill('20000');     // e.g., $20,000 savings

  await page.locator('[data-test-id="submit-application"]').click(); //submit application 

  // Wait for the table to be attached and visible
  await page.locator('table').waitFor({ state: 'attached', timeout: 60000 });


  // Wait for table to appear
  await page.locator('table').waitFor({ state: 'attached', timeout: 60000 });

  // Get table content
  const tableContent = await page.locator('table').textContent();
  console.log('Table Content:', tableContent);

  // Validate presence of specific expected strings
  expect(tableContent).toContain('123 Incoming St, Melbourne VIC 3000');
  expect(tableContent).toContain('456 Outgoing Rd, Sydney NSW 2000');
  expect(tableContent).toContain('John Doe');
  expect(tableContent).toContain('Application under review');

});
