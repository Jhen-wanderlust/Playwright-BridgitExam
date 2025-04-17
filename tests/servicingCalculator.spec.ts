import { test, expect } from '@playwright/test';
import { loginAsBroker } from './loginHelper';
// run test :  npx playwright test servicingCalculator.spec.ts --project=chrome
test.describe('Servicing Calculator', async () => {
  const passingData = {
    incomingPrice: 100000,
    incomingStampDuty: 5000,
    incomingDeposit: 20000,
    outgoingValuation: 5000,
    outgoingMortgage: 30000,
    savingsContribution: 10000,
  };

  const failingData = {
    incomingPrice: 100000,
    incomingStampDuty: 5000,
    incomingDeposit: 80000,
    outgoingValuation: 10000,
    outgoingMortgage: 70000,
    savingsContribution: 2000,
  };

  const loanScenarios = [
    {
      data: passingData,
      expectedResult: '✅ Good Loan',
      description: 'should return a positive result for a passing scenario',
    },
    {
      data: failingData,
      expectedResult: '❌ Bad Loan',
      description: 'should return a negative result for a failing scenario',
    }
  ];

  loanScenarios.forEach((scenario, index) => {
    test(scenario.description, async ({ page }) => {
      if (index === 1) {
        // Wait before the second test
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds
      }

      await loginAsBroker(page);

      const button = page.locator('[aria-label="Calculate now"]');
      await expect(button).toBeVisible();
      await button.click();

      await page.fill('[data-test-id="incoming-deposit"]', scenario.data.incomingDeposit.toString());
      await page.fill('[data-test-id="incoming-price"]', scenario.data.incomingPrice.toString());
      await page.fill('[data-test-id="incoming-stamp-duty"]', scenario.data.incomingStampDuty.toString());
      await page.fill('[data-test-id="outgoing-valuation"]', scenario.data.outgoingValuation.toString());
      await page.fill('[data-test-id="outgoing-mortgage"]', scenario.data.outgoingMortgage.toString());
      await page.fill('[data-test-id="savings-contribution"]', scenario.data.savingsContribution.toString());

      await page.click('[data-test-id="calculate-loan"]');

      const resultText = await page.innerText('[data-test-id="calculation-result"]');
          //  Log expected and actual result
          console.log(`Expected: ${scenario.expectedResult}, Actual: ${resultText}`);

          expect(resultText).toBe(scenario.expectedResult);
    });
  });
});
