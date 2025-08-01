import { test, expect } from '@playwright/test';

test.describe('Homepage Accordion', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the homepage before each test
    await page.goto('/');
  });

  test('should open an agent\'s content on click', async ({ page }) => {
    // Find the first agent header and click it
    const firstAgentHeader = page.locator('.agent-header').first();
    await firstAgentHeader.click();

    // The content for the first agent should now be visible
    const firstAgentContent = page.locator('.agent-content').first();
    await expect(firstAgentContent).toBeVisible();

    // The GitHub link inside should be visible
    await expect(firstAgentContent.getByRole('link', { name: 'View on GitHub' })).toBeVisible();
  });

  test('should close an open agent when another agent is clicked', async ({ page }) => {
    const agentHeaders = page.locator('.agent-header');
    const firstAgentHeader = agentHeaders.first();
    const secondAgentHeader = agentHeaders.nth(1);

    // Click the first agent to open it
    await firstAgentHeader.click();
    const firstAgentContent = page.locator('.agent-content').first();
    await expect(firstAgentContent).toBeVisible();

    // Click the second agent
    await secondAgentHeader.click();

    // Now, the first agent's content should NOT be visible
    await expect(firstAgentContent).not.toBeVisible();

    // And the second agent's content SHOULD be visible
    const secondAgentContent = page.locator('.agent-content').nth(1);
    await expect(secondAgentContent).toBeVisible();
  });

  test('should toggle an agent\'s content closed on a second click', async ({ page }) => {
    const firstAgentHeader = page.locator('.agent-header').first();
    const firstAgentContent = page.locator('.agent-content').first();

    // First click opens it
    await firstAgentHeader.click();
    await expect(firstAgentContent).toBeVisible();

    // Second click should close it
    await firstAgentHeader.click();
    await expect(firstAgentContent).not.toBeVisible();
  });
});
