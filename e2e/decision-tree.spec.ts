import { test, expect } from '@playwright/test';

test.describe('Decision Tree E2E', () => {
  test('User can navigate the Decision Tree to solve missing name issue', async ({ page }) => {
    // Navigate to solve page
    await page.goto('/solve');
    
    // Expect the title to be visible
    await expect(page.locator('text=Electoral Problem Solver')).toBeVisible();

    // Select the problem "My name is not on the voter list"
    const missingNameCard = page.locator('text=My name is missing from the list');
    await expect(missingNameCard).toBeVisible();
    await missingNameCard.click();

    // Verify it navigates to the decision tree for that problem
    await expect(page).toHaveURL(/\/decision-tree\?problem=no-name/);
    
    // First question should be about age
    await expect(page.locator('text=Are you 18 years or older')).toBeVisible();

    // Click "Yes"
    await page.locator('button', { hasText: 'Yes' }).click();

    // Next question should be about address proof
    await expect(page.locator('text=Do you have valid address proof')).toBeVisible();
    
    // Click "Yes"
    await page.locator('button', { hasText: 'Yes' }).click();

    // Should reach the solution: Form 6
    await expect(page.locator('text=File Form 6')).toBeVisible();
    await expect(page.locator('text=Mark as Solved (+5 pts)')).toBeVisible();
  });
});
