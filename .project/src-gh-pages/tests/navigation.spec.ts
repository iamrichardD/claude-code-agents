import { test, expect } from '@playwright/test';

test('smoke test for basic navigation', async ({ page }) => {
  // Start from the index page
  await page.goto('/');

  // A simple check to ensure the main heading is there
  await expect(page.getByRole('heading', { name: /Your AI Teammates/ })).toBeVisible();

  // Click a single link to ensure routing is alive
  await page.getByRole('link', { name: 'Articles' }).click();

  // Verify we landed on the correct page
  await expect(page.getByRole('heading', { name: 'Articles', level: 1 })).toBeVisible();
});
