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