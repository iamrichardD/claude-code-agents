# 003: Final Implemented Testing Strategy

**Date:** 2025-07-31
**Status:** Superseded

**This ADR is superseded by the testing philosophies and strategies now codified directly in the `e2e-tester.md` agent persona.**

## Context

This ADR documents the final, implemented testing strategy that emerged from the initial plan in ADR-002. Through a series of simulations and technical discoveries (documented in the "Testing Saga" and "Playwright Chronicles" of our `SIMULATION_HISTORY.md`), the initial strategy evolved into a more practical and robust solution.

## Decision

Our final, successful testing strategy is as follows:

1.  **Tooling:** We use the standard **`@playwright/test`** test runner. The initial plan to use `@playwright/mcp` for interactive, agent-driven execution proved to be non-functional in our environment. The standard test runner, driven by the `npx playwright test` command, provides a reliable and effective way to automate our tests.

2.  **Philosophy:** Our testing philosophy has been significantly refined through practice:
    *   **Focus on Custom Interactivity:** Our E2E tests are not intended to test static content or Astro's basic routing, which are assumed to work. Their primary purpose is to validate the custom, client-side JavaScript interactivity that we build.
    *   **Test User Goals, Not Implementation:** We assert against the final, user-visible outcomes of an interaction (e.g., an element becomes visible), not the fragile implementation details (e.g., specific class names or URL strings).
    *   **Framework Idioms First:** We prioritize using the built-in, idiomatic solutions provided by our framework (Astro) to solve environment-specific problems.

3.  **Personnel:** The **`e2e-tester`** agent is responsible for writing and maintaining the test files, but execution is handled via the standard `npx` command, not through an interactive protocol.

## Consequences

### Positive:

-   **A Functional Test Suite:** We have a working, reliable, and automated end-to-end test suite.
-   **Increased Confidence:** The suite provides a strong safety net, allowing for confident refactoring and development.
-   **Robust and Maintainable Tests:** Our testing philosophy ensures that the tests are easy to understand and resilient to change.

### Negative:

-   **Loss of Interactivity:** The original vision of a fully interactive, agent-driven testing process was not realized. The current process is more traditional, relying on static test files.