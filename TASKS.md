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

## Milestone 5: Automation & Refinement

- [ ] **Task 5.1:** Dynamically generate the agent list on the homepage using `Astro.glob()` to read from the `.claude/agents` directory.
