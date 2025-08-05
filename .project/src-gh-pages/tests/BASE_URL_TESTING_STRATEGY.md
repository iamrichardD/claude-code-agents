# BASE_URL Navigation Testing Strategy

## Executive Summary

The dotagents site uses different BASE_URL configurations for development (`/`) and production (`/dotagents/`). This has led to critical navigation inconsistencies in the built HTML, breaking user journeys and accessibility. This document outlines a comprehensive testing strategy to catch and prevent these BASE_URL-related issues.

## Critical Issues Identified

### 1. **Favicon Loading**
- **Issue**: `href="/favicon.svg"` missing BASE_URL prefix
- **Impact**: Broken favicon in production
- **User Impact**: Visual branding inconsistency

### 2. **CTA Button Navigation**
- **Issue**: Homepage CTA button missing BASE_URL prefix
- **Impact**: Primary user action fails in production
- **User Impact**: Conversion funnel broken

### 3. **Article Links**
- **Issue**: Articles index page links missing BASE_URL prefix
- **Impact**: Content discovery broken
- **User Impact**: Cannot access main content

### 4. **Navigation Inconsistencies**
- **Issue**: Mixed navigation patterns (some have BASE_URL, others don't)
- **Impact**: Broken navigation across site
- **User Impact**: Site becomes unusable

## Test Strategy Framework

### 1. **Test Types and Responsibilities**

#### Unit Tests (Vitest)
- **Purpose**: Test BASE_URL utility functions
- **Scope**: Astro configuration helpers, URL builders
- **Files**: `import.meta.env.BASE_URL` usage validation

#### Integration Tests (Vitest + JSDOM)
- **Purpose**: Test component-level BASE_URL handling
- **Scope**: Navigation components, link generation
- **Focus**: Astro component BASE_URL interpolation

#### End-to-End Tests (Playwright)
- **Purpose**: Test complete user journeys across environments
- **Scope**: Full navigation flows, critical user paths
- **Focus**: User outcomes, not implementation details

### 2. **Environment Testing Strategy**

#### Development Environment (`BASE_URL: /`)
```typescript
// playwright.config.dev.ts
export default defineConfig({
  use: {
    baseURL: 'http://localhost:4321',
  },
  // Test relative paths work correctly
});
```

#### Production Environment (`BASE_URL: /dotagents/`)
```typescript
// playwright.config.prod.ts  
export default defineConfig({
  use: {
    baseURL: 'https://iamrichardd.github.io',
  },
  // Test absolute paths with BASE_URL prefix
});
```

#### GitHub Pages Simulation
```typescript
// playwright.config.gh-pages.ts
export default defineConfig({
  use: {
    baseURL: 'http://localhost:3000/dotagents',
  },
  webServer: {
    command: 'npx serve docs -p 3000',
    url: 'http://localhost:3000/dotagents',
  },
});
```

## Test Scenarios

### 1. **Critical Navigation Paths**

#### Homepage Journey
```gherkin
Scenario: User can navigate from homepage to articles
  Given I am on the homepage
  When I click the "Read Our Story" CTA button
  Then I should be on the correct article page
  And the URL should include the proper BASE_URL prefix
```

#### Article Discovery Flow
```gherkin
Scenario: User can browse articles from articles index
  Given I am on the articles index page
  When I click on any article link
  Then I should navigate to the correct article
  And the URL should be properly formatted
```

#### Navigation Consistency
```gherkin
Scenario: All navigation links work consistently
  Given I am on any page
  When I click any navigation link
  Then I should navigate to the correct destination
  And the URL should maintain BASE_URL consistency
```

### 2. **Asset Loading Tests**

#### Favicon Verification
```gherkin
Scenario: Favicon loads correctly in all environments
  Given I am on any page
  Then the favicon should load successfully
  And should return a 200 status code
```

#### Static Asset Integrity
```gherkin
Scenario: All static assets use correct BASE_URL
  Given I am on any page
  When I inspect all asset URLs
  Then all assets should have the correct BASE_URL prefix
  And all assets should load successfully
```

### 3. **Cross-Environment Validation**

#### URL Pattern Consistency
```gherkin
Scenario: URL patterns are consistent across environments
  Given I test the same user journey in dev and production
  Then the relative navigation behavior should be identical
  But the absolute URLs should respect the BASE_URL configuration
```

## Playwright Test Implementation

### 1. **Base Test Configuration**

```typescript
// tests/base-url.spec.ts
import { test, expect } from '@playwright/test';

// Environment-aware test helper
function getExpectedUrl(path: string, baseUrl?: string): string {
  const base = baseUrl || process.env.BASE_URL || '/';
  return base === '/' ? path : `${base}${path}`;
}
```

### 2. **Navigation Flow Tests**

```typescript
test.describe('BASE_URL Navigation Tests', () => {
  test('homepage CTA button navigates correctly', async ({ page, baseURL }) => {
    await page.goto('/');
    
    // Get the CTA button
    const ctaButton = page.locator('a.cta-button');
    await expect(ctaButton).toBeVisible();
    
    // Click and verify navigation
    await ctaButton.click();
    
    // Assert on user outcome, not implementation details
    await expect(page.getByRole('heading', { level: 1 })).toContainText('dotagents');
    
    // Verify URL is correctly formed
    const currentUrl = page.url();
    expect(currentUrl).toMatch(/\/articles\/dotagents-how-to-expand-your-team/);
  });

  test('articles index links work correctly', async ({ page }) => {
    await page.goto('/articles');
    
    // Get all article links
    const articleLinks = page.locator('a[href*="/articles/"]');
    const count = await articleLinks.count();
    
    expect(count).toBeGreaterThan(0);
    
    // Test first article link
    await articleLinks.first().click();
    
    // Should navigate to article page
    await expect(page.locator('article')).toBeVisible();
  });

  test('navigation consistency across all pages', async ({ page }) => {
    const pages = ['/', '/articles', '/installation', '/contributing'];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      
      // Test each nav link
      const navLinks = page.locator('#main-nav a');
      const linkTexts = await navLinks.allTextContents();
      
      for (let i = 0; i < linkTexts.length; i++) {
        const link = navLinks.nth(i);
        const href = await link.getAttribute('href');
        
        // Verify all nav links have proper format
        expect(href).toBeTruthy();
        
        // Click and verify navigation works
        await link.click();
        await page.waitForLoadState('networkidle');
        
        // Should not be on error page
        await expect(page.locator('body')).not.toContainText('404');
        
        // Return to original page
        await page.goto(pagePath);
      }
    }
  });
});
```

### 3. **Asset Loading Tests**

```typescript
test.describe('Asset Loading Tests', () => {
  test('favicon loads correctly', async ({ page }) => {
    await page.goto('/');
    
    // Get favicon link element
    const faviconLink = page.locator('link[rel="icon"]');
    const faviconUrl = await faviconLink.getAttribute('href');
    
    expect(faviconUrl).toBeTruthy();
    
    // Test favicon actually loads
    const response = await page.request.get(faviconUrl!);
    expect(response.status()).toBe(200);
  });

  test('all static assets load successfully', async ({ page }) => {
    const responses: Response[] = [];
    
    page.on('response', response => {
      if (response.url().match(/\.(css|js|svg|png|jpg|gif|ico)$/)) {
        responses.push(response);
      }
    });
    
    await page.goto('/');
    
    // Wait for all assets to load
    await page.waitForLoadState('networkidle');
    
    // Verify all assets loaded successfully
    for (const response of responses) {
      expect(response.status()).toBe(200);
    }
  });
});
```

### 4. **Accessibility and User Experience Tests**

```typescript
test.describe('UX and Accessibility', () => {
  test('keyboard navigation works across all links', async ({ page }) => {
    await page.goto('/');
    
    // Focus on first focusable element
    await page.keyboard.press('Tab');
    
    // Test Tab navigation through all links
    let tabCount = 0;
    const maxTabs = 20; // Prevent infinite loop
    
    while (tabCount < maxTabs) {
      const focusedElement = page.locator(':focus');
      
      if (await focusedElement.count() === 0) break;
      
      // If it's a link, test Enter key navigation
      if (await focusedElement.evaluate(el => el.tagName === 'A')) {
        const href = await focusedElement.getAttribute('href');
        if (href && !href.startsWith('#')) {
          // Test Enter key navigation
          await page.keyboard.press('Enter');
          await page.waitForLoadState('networkidle');
          
          // Should navigate successfully
          await expect(page.locator('body')).not.toContainText('404');
          
          // Go back
          await page.goBack();
        }
      }
      
      await page.keyboard.press('Tab');
      tabCount++;
    }
  });

  test('screen reader navigation patterns work', async ({ page }) => {
    await page.goto('/');
    
    // Test heading hierarchy
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    const headingCount = await headings.count();
    
    expect(headingCount).toBeGreaterThan(0);
    
    // Test landmark navigation
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });
});
```

## Regression Prevention Strategy

### 1. **Automated CI/CD Integration**

```yaml
# .github/workflows/test-base-url.yml
name: BASE_URL Navigation Tests

on:
  pull_request:
    paths:
      - 'src/**'
      - 'astro.config.mjs'
      - 'tests/**'
  push:
    branches: [main]

jobs:
  test-navigation:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        environment: [development, production]
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build site
        run: npm run build
        env:
          NODE_ENV: ${{ matrix.environment }}
      
      - name: Run Playwright tests
        run: npx playwright test --config=playwright.${{ matrix.environment }}.ts
      
      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report-${{ matrix.environment }}
          path: playwright-report/
```

### 2. **Pre-commit Hooks**

```bash
#!/bin/sh
# .git/hooks/pre-commit

# Run BASE_URL validation tests before commit
npm run test:base-url

# Check for hardcoded BASE_URL issues in source files
grep -r "href=\"/" src/ && echo "ERROR: Found hardcoded absolute paths in src/" && exit 1

echo "BASE_URL validation passed"
```

### 3. **Build-time Validation**

```typescript
// scripts/validate-base-url.ts
import { glob } from 'glob';
import { readFile } from 'fs/promises';

async function validateBuiltFiles() {
  const htmlFiles = await glob('docs/**/*.html');
  const errors: string[] = [];
  
  for (const file of htmlFiles) {
    const content = await readFile(file, 'utf-8');
    
    // Check for missing BASE_URL prefixes
    const faviconMatch = content.match(/href="\/favicon\./);
    if (faviconMatch) {
      errors.push(`${file}: Favicon missing BASE_URL prefix`);
    }
    
    // Check for article links without BASE_URL
    const articleLinkMatches = content.match(/href="\/articles\//g);
    if (articleLinkMatches) {
      errors.push(`${file}: Found ${articleLinkMatches.length} article links missing BASE_URL prefix`);
    }
    
    // Check for inconsistent navigation
    const navLinkMatches = content.match(/href="(?!\/dotagents\/)\/\w+"/g);
    if (navLinkMatches) {
      errors.push(`${file}: Found navigation links missing BASE_URL prefix: ${navLinkMatches.join(', ')}`);
    }
  }
  
  if (errors.length > 0) {
    console.error('BASE_URL validation errors found:');
    errors.forEach(error => console.error(`  - ${error}`));
    process.exit(1);
  }
  
  console.log('✅ BASE_URL validation passed');
}

validateBuiltFiles().catch(console.error);
```

## Testing Tools and Setup

### 1. **Enhanced Playwright Configuration**

```typescript
// playwright.config.ts (updated)
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    ['json', { outputFile: 'test-results.json' }]
  ],
  
  use: {
    baseURL: process.env.NODE_ENV === 'production' 
      ? 'https://iamrichardd.github.io/dotagents'
      : 'http://localhost:4321',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    // Development testing
    {
      name: 'development',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4321',
      },
    },
    
    // Production simulation
    {
      name: 'production-simulation',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:3000/dotagents',
      },
      dependencies: ['build-for-production'],
    },
    
    // Mobile testing
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    }
  ],

  webServer: [
    {
      command: 'npm run dev',
      url: 'http://localhost:4321',
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'npx serve docs -p 3000',
      url: 'http://localhost:3000',
      reuseExistingServer: false,
    }
  ],
});
```

### 2. **Test Data Management**

```typescript
// tests/test-data.ts
export const testPages = [
  { path: '/', title: 'dotagents', hasArticles: false },
  { path: '/articles', title: 'Articles - dotagents', hasArticles: true },
  { path: '/installation', title: 'Installation - dotagents', hasArticles: false },
  { path: '/contributing', title: 'Contributing - dotagents', hasArticles: false },
];

export const criticalUserJourneys = [
  {
    name: 'Homepage to Article',
    steps: [
      { action: 'goto', target: '/' },
      { action: 'click', target: 'a.cta-button' },
      { action: 'expect', target: 'article', condition: 'toBeVisible' }
    ]
  },
  {
    name: 'Articles Index to Specific Article',
    steps: [
      { action: 'goto', target: '/articles' },
      { action: 'click', target: 'a[href*="/articles/"]' },
      { action: 'expect', target: 'h1', condition: 'toBeVisible' }
    ]
  }
];
```

## Monitoring and Alerting

### 1. **Production Monitoring**

```typescript
// tests/production-health.spec.ts  
test.describe('Production Health Checks', () => {
  test('critical paths are accessible', async ({ page }) => {
    const criticalPaths = ['/', '/articles', '/installation'];
    
    for (const path of criticalPaths) {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      
      // Should not have broken links
      await expect(page.locator('body')).not.toContainText('404');
    }
  });
});
```

### 2. **Performance Impact Testing**

```typescript
test('BASE_URL changes do not impact performance', async ({ page }) => {
  // Measure page load times
  const startTime = Date.now();
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  const loadTime = Date.now() - startTime;
  
  expect(loadTime).toBeLessThan(3000); // 3 second threshold
});
```

## Summary

This comprehensive testing strategy addresses the BASE_URL navigation issues through:

1. **Multi-layered Testing**: Unit, integration, and E2E tests
2. **Environment Parity**: Development and production testing
3. **User-Centric Scenarios**: Focus on user outcomes, not implementation
4. **Automated Prevention**: CI/CD integration and pre-commit hooks
5. **Continuous Monitoring**: Production health checks and performance testing

The strategy ensures that BASE_URL-related navigation issues are caught early and prevented from reaching production, maintaining a consistent and reliable user experience across all environments.