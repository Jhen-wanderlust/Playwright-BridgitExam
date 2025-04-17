import { test, expect } from '@playwright/test';
import { loginAsBroker } from './loginHelper';
// run this test : npx playwright test invalidApplicationScenarios.spec.ts --project=chrome
// Invalid scenarios array (example)
const invalidScenarios = [
  {
    name: "",
    email: "john.doe@example.com",
    mobile: "0412345678",
    address: "123 Bridge St, Sydney NSW 2000",
    incomingProperty: {
      address: "123 Incoming St, Melbourne VIC 3000",
      deposit: "50000",
      price: "750000",
      stampDuty: "30000"
    },
    outgoingProperty: {
      address: "456 Outgoing Rd, Sydney NSW 2000",
      mortgage: "250000",
      valuation: "700000"
    },
    loanDetails: {
      annualIncome: "120000",
      loanAmount: "600000",
      loanDuration: "30",
      monthlyExpenses: "3500",
      savingsContribution: "20000"
    },
    reason: "Empty name"
  },
  {
    name: "John Doe",
    email: "",
    mobile: "0412345678",
    address: "123 Bridge St, Sydney NSW 2000",
    incomingProperty: {
      address: "123 Incoming St, Melbourne VIC 3000",
      deposit: "50000",
      price: "750000",
      stampDuty: "30000"
    },
    outgoingProperty: {
      address: "456 Outgoing Rd, Sydney NSW 2000",
      mortgage: "250000",
      valuation: "700000"
    },
    loanDetails: {
      annualIncome: "120000",
      loanAmount: "600000",
      loanDuration: "30",
      monthlyExpenses: "3500",
      savingsContribution: "20000"
    },
    reason: "Empty email"
  },
  {
    name: "John Doe",
    email: "john.doe@invalid",
    mobile: "0412345678",
    address: "123 Bridge St, Sydney NSW 2000",
    incomingProperty: {
      address: "123 Incoming St, Melbourne VIC 3000",
      deposit: "50000",
      price: "750000",
      stampDuty: "30000"
    },
    outgoingProperty: {
      address: "456 Outgoing Rd, Sydney NSW 2000",
      mortgage: "250000",
      valuation: "700000"
    },
    loanDetails: {
      annualIncome: "120000",
      loanAmount: "600000",
      loanDuration: "30",
      monthlyExpenses: "3500",
      savingsContribution: "20000"
    },
    reason: "Invalid email format"
  }
  // Add more invalid scenarios if necessary
];

test.describe('Invalid Application Submission Scenarios', () => {
  for (const scenario of invalidScenarios) {
    test(`should fail submission when ${scenario.reason}`, async ({ page }) => {
      await loginAsBroker(page);

      // Wait for dashboard to load
      await expect(page.locator('[data-test-id="open-submit-application"]')).toBeVisible({ timeout: 10000 });

      // Click "Submit application"
      await page.locator('[data-test-id="open-submit-application"]').click();

      // Fill form with scenario data
      await page.locator('[data-test-id="applicant-name"]').fill(scenario.name);
      await page.locator('[data-test-id="applicant-email"]').fill(scenario.email);
      await page.locator('[data-test-id="applicant-mobile-number"]').fill(scenario.mobile);
      await page.locator('[data-test-id="applicant-address"]').fill(scenario.address);

      // Click next button
      await page.locator('[data-test-id="next-button"]').click();

      // Fill Incoming Property Details
      await page.locator('[data-test-id="incoming-property-address"]').fill(scenario.incomingProperty.address);
      await page.locator('[data-test-id="incoming-property-deposit"]').fill(scenario.incomingProperty.deposit);
      await page.locator('[data-test-id="incoming-property-price"]').fill(scenario.incomingProperty.price);
      await page.locator('[data-test-id="incoming-property-stamp-duty"]').fill(scenario.incomingProperty.stampDuty);

      // Fill Outgoing Property Details
      await page.locator('[data-test-id="outgoing-property-address"]').fill(scenario.outgoingProperty.address);
      await page.locator('[data-test-id="outgoing-property-mortgage"]').fill(scenario.outgoingProperty.mortgage);
      await page.locator('[data-test-id="outgoing-property-valuation"]').fill(scenario.outgoingProperty.valuation);

      // Click next button
      await page.locator('[data-test-id="next-button"]').click();

      // Fill Additional Loan Details
      await page.locator('[data-test-id="annual-income"]').fill(scenario.loanDetails.annualIncome);
      await page.locator('[data-test-id="loan-amount"]').fill(scenario.loanDetails.loanAmount);
      await page.locator('[data-test-id="loan-duration"]').fill(scenario.loanDetails.loanDuration);
      await page.locator('[data-test-id="monthly-expenses"]').fill(scenario.loanDetails.monthlyExpenses);
      await page.locator('[data-test-id="savings-contribution"]').fill(scenario.loanDetails.savingsContribution);

      // Try to submit application
      await page.locator('[data-test-id="submit-application"]').click();

    // Wait for the error toast message to be visible
  const errorMessage = page.locator('.p-toast-message-content');

  // Validate the error toast message is visible
  await expect(errorMessage).toBeVisible();

  // Validate the error summary (e.g., "Error") is present
  const errorSummary = errorMessage.locator('.p-toast-summary');
  await expect(errorSummary).toHaveText('Error');

  // Validate the error detail (e.g., "An error occurred") is present
  const errorDetail = errorMessage.locator('.p-toast-detail');
  await expect(errorDetail).toHaveText('An error occurred');
    });
  }
});
