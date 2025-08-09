# Lessons Learned

This document captures key, project-specific insights and solutions discovered during the development of this project. Its purpose is to help future contributors avoid pitfalls unique to this repository's technology stack.

For our team's general philosophies and best practices, please refer to the agent persona files in `.claude/agents/` and our `TEAM_SOP.md`.

## 1. Astro Environment Configuration

-   **Principle:** Use Astro's built-in, idiomatic solution for environment-specific settings.
-   **Implementation:** The `base` path in `astro.config.mjs` is set conditionally using `import.meta.env.MODE` to ensure the dev server runs at the root (`/`) while the production build uses the correct subdirectory (`/dotagents/`).
-   **Benefit:** This keeps our development environment simple, our tests clean, and our production builds accurate without complex workarounds.