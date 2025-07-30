# Project: Claude Code Agents GitHub Pages

## Milestone 0: Team & Philosophy
- [x] **Task 0.1:** Define the core project roles (Project Manager, Agile Coach, Designer, Frontend Developer).
- [x] **Task 0.2:** Document the core philosophical influences (`making-users-awesome.md`, `extreme-programming-xp.md`).
- [x] **Task 0.3:** Add proper attribution to the knowledge base documents.
- [x] **Task 0.4:** Create the `designer.md` agent persona.
- [x] **Task 0.5:** Create the `frontend-developer.md` agent persona.

## Milestone 1: Foundational Decisions & Initial Content

### Phase 1.1: Project Scoping (Persona: Project Manager)
- [x] **Task 1.1.1:** Create and save the initial `TASKS.md` to the repository.
- [x] **Task 1.1.2:** Decide on the static site generator technology. **Decision: Astro, with strategic use of Web Components where appropriate.**
- [x] **Task 1.1.3:** Define the specific content requirements for the "Installation" page by extracting information from `README.md`.
- [x] **Task 1.1.4:** Define the specific content requirements for the "Contributing" page by extracting information from `CONTRIBUTING.md`.

### Phase 1.2: Initial Design Elements (Persona: Designer)
- [x] **Task 1.2.1:** Create a simple text-based logo/header concept for the site.
- [x] **Task 1.2.2:** Propose a primary and secondary color for the site's theme.
- [x] **Task 1.2.3:** Select a clean, readable font for body text and headings.
- [x] **Task 1.2.4:** Create a formal `DESIGN_GUIDE.md` to document all design decisions.

## Milestone 2: Development Setup & Landing Page

- [x] **Task 2.1:** Initialize a new Astro project.
- [x] **Task 2.2:** Implement the basic site layout, including a header and footer, following the principles in `DESIGN_GUIDE.md`.
- [x] **Task 2.3:** Create the main landing page (`index.astro`) that lists the "Available Agents" from `README.md`.
- [x] **Task 2.4:** Apply the typography and color styles from `DESIGN_GUIDE.md` to the landing page.

## Milestone 3: Content Pages & Deployment

- [x] **Task 3.1:** Create the "Installation" page (`installation.astro`) using the content plan from Task 1.1.3.
- [x] **Task 3.2:** Create the "Contributing" page (`contributing.astro`) using the content plan from Task 1.1.4.
- [x] **Task 3.3:** Add navigation links to the header for the Home, Installation, and Contributing pages.
- [x] **Task 3.4:** Configure the Astro project to build to the `docs/` directory and deploy the site to GitHub Pages.

## Milestone 5: Project Rebranding to "dotagents"

- [ ] **Task 5.1 (User Task):** Rename the GitHub repository from `claude-code-agents` to `dotagents` on the GitHub website.
- [ ] **Task 5.2 (Agent Task):** Update the local repository's remote URL to point to the new `dotagents` repository.
- [ ] **Task 5.3:** Update the `astro.config.mjs` file with the new `site` URL (`https://iamrichardd.github.io/dotagents/`) and `base` path (`/dotagents/`).
- [ ] **Task 5.4:** Update the `README.md` file, replacing all instances of "Claude Code Agents" with "dotagents" and updating the project description.
- [ ] **Task 5.5:** Update the `package.json` in `src-gh-pages` to reflect the new project name.
- [ ] **Task 5.6:** Update the logotype and titles in all `.astro` files.
- [ ] **Task 5.7:** Update all other supporting documents (`CONTRIBUTING.md`, `LESSONS_LEARNED.md`, ADRs) to use the new "dotagents" name.
- [ ] **Task 5.8:** Run the full test suite (`npx playwright test`) to ensure the rebranding did not break any functionality.

## Milestone 6: Content & Automation

- [ ] **Task 6.1:** Create a new `marketing-expert.md` agent persona.
- [ ] **Task 6.2:** Create a new `technical-writer.md` agent persona.
- [ ] **Task 6.3:** Create the `CONTENT_STRATEGY.md` file to document the article outlines and branding notes.
- [ ] **Task 6.4:** Write the three LinkedIn articles based on the defined strategy.
- [ ] **Task 6.5:** Create a new "Development Insights" page on the website using content from `LESSONS_LEARNED.md`.
- [ ] **Task 6.6:** Dynamically generate the agent list on the homepage using `Astro.glob()` to read from the `.claude/agents` directory.
