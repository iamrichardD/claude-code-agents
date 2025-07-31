# 003: Final Implemented Testing Strategy

**Date:** 2025-07-31
**Status:** Accepted

## Context

This ADR documents the final, implemented testing strategy that emerged from the initial plan in ADR-002. Through a series of simulations and technical discoveries (documented in the "Testing Saga" and "Playwright Chronicles" of our `SIMULATION_HISTORY.md`), the initial strategy evolved into a more practical and robust solution.

## Decision

Our final, successful testing strategy is as follows:

1.  **Tooling:** We use the standard **`@playwright/test`** test runner. The initial plan to use `@playwright/mcp` for interactive, agent-driven execution proved to be non-functional in our environment. The standard test runner, driven by the `npx playwright test` command, provides a reliable and effective way to automate our tests.

2.  **Philosophy:** Our testing philosophy remains the same, but has been refined through practice:
    *   **Test for User Outcomes:** We do not test for fragile implementation details like URL strings. Instead, we assert against stable, user-visible content, such as the `<h1>` heading of a page. This makes our tests more resilient.
    *   **Framework Idioms First:** We prioritize using the built-in, idiomatic solutions provided by our framework (Astro) to solve environment-specific problems, such as using `import.meta.env.MODE` to handle the `base` path configuration.

3.  **Personnel:** The **`e2e-tester`** agent is responsible for writing and maintaining the test files, but execution is handled via the standard `npx` command, not through an interactive protocol.

## Consequences

### Positive:

-   **A Functional Test Suite:** We have a working, reliable, and automated end-to-end test suite.
-   **Increased Confidence:** The suite provides a strong safety net, allowing for confident refactoring and development.
-   **Robust and Maintainable Tests:** Our testing philosophy ensures that the tests are easy to understand and resilient to change.

### Negative:

-   **Loss of Interactivity:** The original vision of a fully interactive, agent-driven testing process was not realized. The current process is more traditional, relying on static test files.
