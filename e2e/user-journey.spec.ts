import { test, expect } from '@playwright/test';

test.describe('Core User Journey', () => {
  test('should navigate through main sections and interact with tools', async ({ page }) => {
    // 1. Home Page
    await page.goto('/');
    await expect(page).toHaveTitle(/VoteSmart AI/);
    await expect(page.getByText('Empowering the Next Generation of Voters')).toBeVisible();

    // 2. Navigation to Assistant
    await page.click('text=AI Assistant');
    await expect(page).toHaveURL(/\/assistant/);
    await expect(page.getByText('Civic Assistant')).toBeVisible();

    // 3. Interact with AI Assistant (Quick Reply)
    await page.click('text=How to vote?');
    await expect(page.getByText('Here\'s the complete voting process in India')).toBeVisible();

    // 4. Navigation to Problem Solver
    await page.click('text=Solve');
    await expect(page).toHaveURL(/\/solve/);
    await expect(page.getByText('What issues are you facing?')).toBeVisible();

    // 5. Test a Problem Solver item
    await page.click('text=My name is missing');
    await expect(page.getByText('Verify your details')).toBeVisible();
  });
});
