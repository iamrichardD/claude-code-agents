# Lessons Learned

This document captures key insights and solutions discovered during the development of this project. Its purpose is to help future contributors (including our future selves) avoid common pitfalls and understand the reasoning behind our technical decisions.

## 1. The Astro `base` Configuration and Testing

**Problem:** When setting up our Playwright end-to-end tests, we encountered persistent failures. The tests expected the development server to be at the root (`/`), but Astro's dev server was running with a ` /claude-code-agents/` base path, causing URL mismatches.

**Incorrect Paths Explored:**
- We initially tried to make our tests more complex by adding logic to handle the different URL structures.
- We considered removing the `base` configuration for development, which would have made the dev environment inaccurate.

**The "Aha!" Moment & Correct Solution:**
The breakthrough came when we discovered the standard, idiomatic Astro solution for this exact problem: **conditional configuration using `import.meta.env.MODE`**.

By updating our `astro.config.mjs` to the following, we solved the problem cleanly:

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  // ... other config
  base: import.meta.env.MODE === 'production' ? '/claude-code-agents/' : '/',
});
```

**Key Takeaway:**
Always look for the framework's idiomatic solution first. Our initial workarounds were more complex and less robust than the built-in feature Astro provides for handling environment-specific configurations. This approach keeps our development environment simple and our tests clean.

## 2. Robust Test Assertions

**Problem:** Even after fixing the base path, our tests were still fragile because they were asserting against the exact URL string in the browser's address bar. This failed due to subtle differences in how trailing slashes were handled.

**The Lesson:**
We learned that testing the URL is an implementation detail. A much more robust and user-centric approach is to **test for a unique and stable element on the destination page.**

**The Correct Solution:**
We updated our tests to rely on checking for the `<h1>` heading of the page. This is a much stronger assertion because it directly validates the user's primary confirmation that they have arrived in the right place.

```typescript
// Example from navigation.spec.ts

// Fragile assertion (BAD):
// await expect(page).toHaveURL(/.*\/installation\//);

// Robust assertion (GOOD):
await expect(page.getByRole('heading', { name: 'Installation', level: 1 })).toBeVisible();
```

**Key Takeaway:**
Write tests that verify the user's expected outcome, not the technical implementation. This makes tests more resilient to refactoring and minor configuration changes.
