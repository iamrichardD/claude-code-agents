# Team Standard Operating Procedures

This document outlines the core, project-agnostic principles and practices that govern how the dotagents team collaborates. It is our foundational guide to effective, scalable teamwork.

## Project Workflow Cycle

Our team operates in a clear, two-phase cycle for every major task or work session. This ensures we begin with full context and end with a clean, consolidated state.

### Phase 1: Session Kick-off Procedure

To ensure a seamless continuation of our work and to re-establish our team's culture and context, the first step in any new session is to **rehydrate the team**. This involves:

1.  Reading all agent personas in the `/.claude/agents/` directory.
2.  Reading all knowledge-base documents in the `/.project/knowledge-base/` directory.
3.  Adopting the `project-manager` persona to lead the session with a stand-up meeting simulation.

This ensures the AI assistant is fully aligned with the **dotagents** team's values, expertise, and established philosophies before proceeding with any tasks.

### Phase 2: Housekeeping and Consolidation Procedure

Before beginning any new major creative task (such as writing a new article), and after completing the previous one, the team must perform a housekeeping phase. This ensures our project knowledge remains accurate, consistent, and up-to-date.

1.  **Review Supporting Documents:** The team will identify and review all documents relevant to the just-completed task (e.g., `SIMULATION_HISTORY.md`, `LESSONS_LEARNED.md`, ADRs).
2.  **Update and Refactor:** Any outdated information will be updated, and documents will be refactored as needed to ensure clarity and a single source of truth.
3.  **Identify New Process Learnings:** The team will consider if any new SOPs or process improvements were discovered during the task.
4.  **Commit All Changes:** All housekeeping changes and documentation updates will be committed to the remote repository with a clear, descriptive commit message.

This procedure guarantees that we start new work from a stable, well-documented foundation.

## Continuous Improvement via HMI Feedback

When a user provides feedback on an agent or a documented process (like the installation instructions), this triggers a high-priority workflow.

1.  **Acknowledge and Triage:** Seldon will acknowledge the user's feedback and triage it as a bug, feature request, or documentation issue.
2.  **Initiate Simulation:** Seldon will announce that a simulation is being initiated to triage and workshop the issue. This signals a shift into a collaborative, role-playing mode.
3.  **Assemble the Team:** Seldon will bring in the relevant expert agents (e.g., Ford for documentation, Chopper for bugs) to analyze the issue.
4.  **Root Cause Analysis:** The team will perform a root cause analysis to understand the underlying problem, not just the symptoms.
5.  **Propose and Verify a Solution:** The team will propose a solution and, whenever possible, verify it with the user before committing the changes.
6.  **Update All Relevant Assets:** The fix will be applied to all relevant assets, including the `README.md`, the GitHub Pages site, and any other related documentation.
7.  **Commit and Push:** The changes will be committed with a clear, descriptive message and pushed to the remote repository.

## Architectural Style Guide

To ensure consistency and maintainability, the team has agreed on a preferred architectural style for our frontend code.

### Stateful Logic: Functional Factory Pattern

-   **Preference:** For stateful client-side logic (e.g., interactive UI components), we prefer the **functional factory pattern** over a class-based approach.
-   **Rationale:** This pattern, which uses a function to create and return an object with state and methods, aligns well with the modern JavaScript ecosystem (Vite, Astro, etc.). It provides strong encapsulation via closures and avoids the complexities of the `this` keyword.
-   **Implementation:** The factory function should be paired with an exported TypeScript `type` or `interface` that explicitly defines the contract of the object the factory produces. This ensures type safety and self-documenting code.
-   **Example:** The `createAccordionMachine` in `src/logic/accordion.ts` is our reference implementation for this pattern.

## Version Control

### Commit Messages

-   **Principle:** Commit messages must be plain text to ensure compatibility with shell environments.
-   **Implementation:** Avoid using markdown formatting (like backticks or parentheses) or special characters (like apostrophes) that can be misinterpreted by the shell. Stick to simple, clear text.
-   **Benefit:** This prevents command execution errors and ensures our version history is clean and reliable.