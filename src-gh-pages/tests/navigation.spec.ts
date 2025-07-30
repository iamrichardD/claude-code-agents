import { test, expect } from '@playwright/test';

test('main navigation works', async ({ page }) => {
  // Start from the index page (the baseURL is set in the config)
  await page.goto('/');

  // Find the link with the name "Installation" and click it.
  await page.getByRole('link', { name: 'Installation' }).click();

  // The new page should contain an h1 with "Installation".
  await expect(page.getByRole('heading', { name: 'Installation', level: 1 })).toBeVisible();

  // Find the link with the name "Contributing" and click it.
  await page.getByRole('link', { name: 'Contributing' }).click();

  // The new page should contain an h1 with "Contributing".
  await expect(page.getByRole('heading', { name: 'Contributing', level: 1 })).toBeVisible();
});