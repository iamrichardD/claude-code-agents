import { test, expect } from '@playwright/test';

test('homepage displays the correct agent list', async ({ page }) => {
  await page.goto('/');

  // Check that the main heading is visible
  await expect(page.getByRole('heading', { name: 'Welcome to Claude Code Agents' })).toBeVisible();

  // Check that all five agents are listed
  await expect(page.getByText('agile-coach')).toBeVisible();
  await expect(page.getByText('designer')).toBeVisible();
  await expect(page.getByText('e2e-tester')).toBeVisible();
  await expect(page.getByText('frontend-developer')).toBeVisible();
  await expect(page.getByText('project-manager')).toBeVisible();
});
