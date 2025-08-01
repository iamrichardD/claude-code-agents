import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Include all test files in the src/tests directory
    include: ['src/tests/**/*.test.ts'],
    // Exclude the Playwright E2E tests
    exclude: ['tests/**/*.spec.ts'],
  },
});