import { test, expect } from '@playwright/test';

/**
 * BASE_URL Navigation Tests
 * 
 * These tests validate that navigation works correctly across different
 * BASE_URL configurations (development: '/', production: '/dotagents/')
 * 
 * Focus: User outcomes, not implementation details
 */

// Helper function to get expected URL based on environment
function getExpectedUrl(path: string, baseUrl?: string): string {
  const base = baseUrl || process.env.BASE_URL || '/';
  if (base === '/') return path;
  return path.startsWith('/') ? `${base}${path}` : `${base}/${path}`;
}

test.describe('Critical Navigation Paths', () => {
  test('homepage CTA button navigates to correct article', async ({ page }) => {
    await page.goto('/');
    
    // Verify homepage loaded correctly
    await expect(page.getByRole('heading', { name: /Your AI Teammates/ })).toBeVisible();
    
    // Find and click the CTA button
    const ctaButton = page.locator('a.cta-button');
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toContainText('Read Our Story');
    
    // Click CTA and verify navigation
    await ctaButton.click();
    await page.waitForLoadState('networkidle');
    
    // Should navigate to the dotagents article
    await expect(page.getByRole('heading', { level: 1 })).toContainText('dotagents');
    
    // URL should contain the article path (regardless of BASE_URL)
    const currentUrl = page.url();
    expect(currentUrl).toMatch(/\/articles\/dotagents-how-to-expand-your-team/);
    
    // Should not be on error page
    await expect(page.locator('body')).not.toContainText('404');
    await expect(page.locator('body')).not.toContainText('Page not found');
  });

  test('articles index page links work correctly', async ({ page }) => {
    await page.goto('/articles');
    
    // Verify articles page loaded
    await expect(page.getByRole('heading', { name: 'Articles', level: 1 })).toBeVisible();
    
    // Get all article links
    const articleLinks = page.locator('a[href*="/articles/"]');
    const count = await articleLinks.count();
    
    expect(count).toBeGreaterThan(0);
    
    // Test each article link
    for (let i = 0; i < count; i++) {
      // Go back to articles page for each test
      await page.goto('/articles');
      
      const link = articleLinks.nth(i);
      const linkText = await link.textContent();
      const href = await link.getAttribute('href');
      
      console.log(`Testing article link: "${linkText}" -> ${href}`);
      
      // Click the article link
      await link.click();
      await page.waitForLoadState('networkidle');
      
      // Should navigate to an article page (not 404)
      await expect(page.locator('body')).not.toContainText('404');
      await expect(page.locator('body')).not.toContainText('Page not found');
      
      // Should have article content (heading)
      await expect(page.locator('h1')).toBeVisible();
      
      // URL should be correct
      const currentUrl = page.url();
      expect(currentUrl).toMatch(/\/articles\/[\w-]+/);
    }
  });

  test('main navigation links work consistently', async ({ page }) => {
    const testPages = [
      { path: '/', expectedHeading: /Your AI Teammates/ },
      { path: '/articles', expectedHeading: 'Articles' },
      { path: '/installation', expectedHeading: /Installation|Getting Started/ },
      { path: '/contributing', expectedHeading: /Contributing|How to Contribute/ }
    ];
    
    for (const testPage of testPages) {
      await page.goto(testPage.path);
      
      // Verify page loaded correctly
      await page.waitForLoadState('networkidle');
      await expect(page.locator('body')).not.toContainText('404');
      
      // Test navigation links from this page
      const navLinks = page.locator('#main-nav a');
      const navCount = await navLinks.count();
      
      expect(navCount).toBeGreaterThan(0);
      
      // Test each navigation link
      for (let i = 0; i < navCount; i++) {
        // Get link info before clicking (elements become stale after navigation)
        const linkText = await navLinks.nth(i).textContent();
        const href = await navLinks.nth(i).getAttribute('href');
        
        console.log(`From ${testPage.path}, testing nav link: "${linkText}" -> ${href}`);
        
        // Click navigation link
        await navLinks.nth(i).click();
        await page.waitForLoadState('networkidle');
        
        // Should not be on error page
        await expect(page.locator('body')).not.toContainText('404');
        await expect(page.locator('body')).not.toContainText('Page not found');
        
        // Should have main content
        await expect(page.locator('main')).toBeVisible();
        
        // Go back to original page for next test
        await page.goto(testPage.path);
      }
    }
  });
});

test.describe('Asset Loading Tests', () => {
  test('favicon loads successfully', async ({ page }) => {
    await page.goto('/');
    
    // Get favicon link element
    const faviconLink = page.locator('link[rel="icon"]');
    await expect(faviconLink).toHaveCount(1);
    
    const faviconHref = await faviconLink.getAttribute('href');
    expect(faviconHref).toBeTruthy();
    
    console.log(`Testing favicon URL: ${faviconHref}`);
    
    // Test that favicon actually loads
    const faviconResponse = await page.request.get(faviconHref!);
    expect(faviconResponse.status()).toBe(200);
    
    // Should be an SVG file
    const contentType = faviconResponse.headers()['content-type'];
    expect(contentType).toContain('svg');
  });

  test('all static assets load successfully', async ({ page }) => {
    const assetResponses: Array<{url: string, status: number}> = [];
    
    // Monitor all asset requests
    page.on('response', response => {
      const url = response.url();
      if (url.match(/\.(css|js|svg|png|jpg|gif|ico|woff|woff2)$/)) {
        assetResponses.push({
          url: url,
          status: response.status()
        });
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    console.log(`Found ${assetResponses.length} static assets`);
    
    // Verify all assets loaded successfully
    const failedAssets = assetResponses.filter(asset => asset.status !== 200);
    
    if (failedAssets.length > 0) {
      console.error('Failed assets:', failedAssets);
    }
    
    expect(failedAssets).toHaveLength(0);
    
    // Should have loaded at least some assets (CSS, JS, favicon)
    expect(assetResponses.length).toBeGreaterThan(0);
  });
});

test.describe('Cross-Environment URL Validation', () => {
  test('relative navigation behavior is consistent', async ({ page, baseURL }) => {
    // Test that clicking navigation behaves the same regardless of BASE_URL
    await page.goto('/');
    
    // Click Articles link
    await page.getByRole('link', { name: 'Articles' }).click();
    await page.waitForLoadState('networkidle');
    
    // Should be on articles page
    await expect(page.getByRole('heading', { name: 'Articles' })).toBeVisible();
    
    // URL should end with /articles (regardless of BASE_URL prefix)
    const articlesUrl = page.url();
    expect(articlesUrl).toMatch(/\/articles\/?$/);
    
    // Click Home link  
    await page.getByRole('link', { name: 'Home' }).click();
    await page.waitForLoadState('networkidle');
    
    // Should be back on homepage
    await expect(page.getByRole('heading', { name: /Your AI Teammates/ })).toBeVisible();
    
    // URL should be homepage (regardless of BASE_URL prefix)
    const homeUrl = page.url();
    expect(homeUrl).toMatch(/\/$|\/dotagents\/?$/);
  });

  test('absolute URLs respect BASE_URL configuration', async ({ page, baseURL }) => {
    await page.goto('/');
    
    // Get the base URL from the current page context
    const currentUrl = page.url();
    const hasBaseUrl = currentUrl.includes('/dotagents');
    
    console.log(`Testing with baseURL: ${baseURL}, current URL: ${currentUrl}`);
    
    // Check navigation links have correct format
    const navLinks = page.locator('#main-nav a');
    const navCount = await navLinks.count();
    
    for (let i = 0; i < navCount; i++) {
      const href = await navLinks.nth(i).getAttribute('href');
      const linkText = await navLinks.nth(i).textContent();
      
      console.log(`Nav link "${linkText}": ${href}`);
      
      if (hasBaseUrl) {
        // In production, links should include /dotagents prefix or be relative
        expect(href).toMatch(/^\/dotagents\/|^\/$/);
      } else {
        // In development, links should be simple paths
        expect(href).toMatch(/^\//);
      }
    }
  });
});

test.describe('User Experience and Accessibility', () => {
  test('keyboard navigation works for all interactive elements', async ({ page }) => {
    await page.goto('/');
    
    // Start keyboard navigation
    await page.keyboard.press('Tab');
    
    let tabCount = 0;
    const maxTabs = 15; // Reasonable limit to prevent infinite loops
    const testedLinks: string[] = [];
    
    while (tabCount < maxTabs) {
      const focusedElement = page.locator(':focus');
      
      if (await focusedElement.count() === 0) break;
      
      // If focused element is a link, test Enter key navigation
      if (await focusedElement.evaluate(el => el.tagName === 'A')) {
        const href = await focusedElement.getAttribute('href');
        const linkText = await focusedElement.textContent();
        
        if (href && !href.startsWith('#') && !testedLinks.includes(href)) {
          console.log(`Testing keyboard navigation for: "${linkText}" -> ${href}`);
          testedLinks.push(href);
          
          // Test Enter key navigation
          await page.keyboard.press('Enter');
          await page.waitForLoadState('networkidle');
          
          // Should navigate successfully (not 404)
          await expect(page.locator('body')).not.toContainText('404');
          
          // Should have main content
          await expect(page.locator('main')).toBeVisible();
          
          // Go back to continue testing
          await page.goBack();
          await page.waitForLoadState('networkidle');
          
          // Re-focus on the same element (may need to re-tab)
          await page.keyboard.press('Tab');
        }
      }
      
      await page.keyboard.press('Tab');
      tabCount++;
    }
    
    // Should have tested at least some links
    expect(testedLinks.length).toBeGreaterThan(0);
  });

  test('page structure supports screen readers', async ({ page }) => {
    await page.goto('/');
    
    // Test semantic HTML structure
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    
    // Test heading hierarchy
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1); // Should have exactly one h1
    
    // Test navigation has proper labels
    const navElement = page.locator('nav');
    await expect(navElement).toBeVisible();
    
    // Hamburger menu should have proper aria-label
    const hamburgerButton = page.locator('#hamburger-menu');
    await expect(hamburgerButton).toHaveAttribute('aria-label');
  });

  test('responsive navigation works on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // On mobile, main nav should be hidden initially
    const mainNav = page.locator('#main-nav');
    const isVisible = await mainNav.isVisible();
    
    if (!isVisible) {
      // Test hamburger menu functionality
      const hamburgerButton = page.locator('#hamburger-menu');
      await expect(hamburgerButton).toBeVisible();
      
      // Click hamburger to open menu
      await hamburgerButton.click();
      
      // Nav should now be visible
      await expect(mainNav).toBeVisible();
      
      // Test navigation links work in mobile menu
      const firstNavLink = mainNav.locator('a').first();
      await firstNavLink.click();
      await page.waitForLoadState('networkidle');
      
      // Should navigate successfully
      await expect(page.locator('body')).not.toContainText('404');
    }
  });
});