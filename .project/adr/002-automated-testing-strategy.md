# 002: Automated Testing Strategy Selection

**Date:** 2025-07-31
**Status:** Superseded

*This ADR reflects the initial decision. The actual implementation evolved based on technical discoveries. See ADR-003 for the final, implemented strategy.*

## Context

As the project grows, ensuring the quality, reliability, and accessibility of the website becomes increasingly critical. To maintain a high standard and enable rapid, confident development, we need a robust automated testing strategy. The strategy must align with our core team philosophies of Simplicity, Communication, Feedback, and Making Users Awesome. The goal is to create a safety net that empowers developers, rather than a gatekeeping process that slows them down.

## Decision

After a series of simulated team discussions, we have reached a consensus on a multi-faceted testing strategy:

1.  **Tooling:** We will adopt **Playwright** as our core browser automation technology. We will specifically use the **`@playwright/mcp`** package, which provides a Model Context Protocol (MCP) server. This allows our AI agents to interact with and test the website directly using a structured, tool-based approach.

2.  **Philosophy:** Our testing approach will be formally guided by the principles documented in the `knowledge-base/quality-and-testing-philosophy.md` file. This incorporates:
    *   **Specification by Example:** Using tests as living, executable documentation.
    *   **WCAG:** Making accessibility a primary, testable measure of quality.
    *   **Modern Testing Principles:** Viewing testing as a collaborative activity that empowers the team.

3.  **Personnel:** We will introduce a new, specialized **`e2e-tester`** agent. This agent will be responsible for writing, executing, and maintaining the end-to-end test suite based on the defined philosophy.

## Consequences

### Positive:

-   **Increased Confidence:** A comprehensive, automated test suite will give the team high confidence to refactor code and ship updates quickly.
-   **Automated Quality Gates:** Core accessibility and functionality requirements will be enforced automatically.
-   **Living Documentation:** The tests themselves will serve as a clear, always-up-to-date specification of how the site is intended to behave.
-   **Faster Feedback:** Developers will get fast, reliable feedback on their changes without requiring manual testing for every commit.

### Negative:

-   **Increased Complexity:** The new strategy introduces another moving part (the MCP server) into our development and deployment workflow.
-   **Implementation Blockage:** The interactive execution of the browser tools is currently blocked due to limitations in the agent's environment. This prevents the full realization of this strategy until the technical hurdles are overcome.
-   **Learning Curve:** The team and the agents will need to become proficient with the new testing philosophy and the specifics of the Playwright toolset.

## Options Considered

-   **Manual Testing:** Considered and rejected as being too slow, prone to human error, and unscalable. It does not provide the rapid feedback required by our XP-influenced process.
-   **Traditional Test Runner (`@playwright/test`):** This approach involves writing static test scripts in files. It was rejected because it does not align with our goal of having an interactive, agent-driven testing process where the `e2e-tester` can dynamically explore and validate the application.