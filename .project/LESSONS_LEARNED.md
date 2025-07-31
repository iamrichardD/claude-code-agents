# Lessons Learned

This document captures the key, actionable insights and established best practices from our project. It serves as a quick-reference guide for all team members to ensure we consistently apply our hard-won knowledge.

## 1. Astro Environment Configuration

- **Principle:** Use Astro's built-in, idiomatic solution for environment-specific settings.
- **Implementation:** The `base` path in `astro.config.mjs` is set conditionally using `import.meta.env.MODE` to ensure the dev server runs at the root (`/`) while the production build uses the correct subdirectory (`/dotagents/`).
- **Benefit:** This keeps our development environment simple, our tests clean, and our production builds accurate without complex workarounds.

## 2. Robust Test Assertions

- **Principle:** Tests should verify the user's expected outcome, not the technical implementation details.
- **Implementation:** Instead of asserting against fragile URL strings, our Playwright tests verify the visibility of a unique and stable element on the page, typically the `<h1>` heading.
- **Benefit:** This makes our tests more resilient to refactoring and minor configuration changes, reducing false negatives and maintenance overhead.

## 3. Git Commit Messages

- **Principle:** Commit messages must be plain text to ensure compatibility with shell environments.
- **Implementation:** Avoid using markdown formatting (like backticks or parentheses) or special characters (like apostrophes) that can be misinterpreted by the shell. Stick to simple, clear text.
- **Benefit:** This prevents command execution errors and ensures our version history is clean and reliable.