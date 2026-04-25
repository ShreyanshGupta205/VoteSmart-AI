import { test, expect } from '@playwright/test';

test.describe('Voting Simulator E2E', () => {
  test('User can complete the EVM simulation', async ({ page }) => {
    // Navigate to simulate page
    await page.goto('/simulate');
    
    // Expect the title to be visible
    await expect(page.locator('text=Voting Simulator')).toBeVisible();

    // Step 0: Pre-explainer -> Click Start
    const startButton = page.locator('button', { hasText: 'I understand — Start Simulation' });
    await expect(startButton).toBeVisible();
    await startButton.click();

    // Step 1: ID Verify -> Click Proceed
    const proceedButton = page.locator('button', { hasText: 'Proceed to Voting Compartment' });
    await expect(proceedButton).toBeVisible();
    await proceedButton.click();

    // Step 2: EVM -> Click a candidate button
    // The EVM has buttons for candidates, let's click the first one (Ravi Kumar)
    // Wait for the Ballot Unit to render
    await expect(page.locator('text=BALLOT UNIT (MOCK EVM)')).toBeVisible();
    
    // Click the first blue button (we can target it by finding the button inside the first candidate row)
    const voteButtons = page.locator('button.bg-blue-600');
    await expect(voteButtons.first()).toBeVisible();
    await voteButtons.first().click();

    // Step 3: VVPAT appears automatically after a short delay
    await expect(page.locator('text=VVPAT MACHINE')).toBeVisible();
    await expect(page.locator('text=VOTE CONFIRMED')).toBeVisible();

    // Step 4: Success screen appears automatically after 3 seconds
    // We can wait for the Success text
    await expect(page.locator('text=Vote Cast Successfully!')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=+25 points added to your Readiness Score!')).toBeVisible();
  });
});
