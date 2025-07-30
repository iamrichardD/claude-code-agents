# Simulation History

This document archives the key simulated team discussions that have shaped the project's direction. It serves as a historical record and as source material for articles, documentation, and onboarding new contributors or agents.

## 1. The Initial Website: Deployment Strategy

**Context:** The team needed to decide how to structure the project for deployment to GitHub Pages.

**Key Dialogue:**

> **Frontend Developer:** "From a development workflow perspective, the `docs/` directory is simpler. We can work on the site code directly within our main branch, which makes for a faster feedback loop."

> **Designer:** "I agree. Keeping the site's source code in `docs/` makes the project structure more intuitive. It ensures that when we update an agent, the corresponding documentation update is part of the same context."

**Outcome:** The team unanimously agreed to use a `/docs` directory on the `main` branch, prioritizing a simple and cohesive development experience.

---

## 2. The Testing Saga: Finding the Right Path

**Context:** A lengthy and challenging series of discussions to establish a robust, automated testing framework.

### 2.1. The `base` Path Problem

**Problem:** Our initial tests failed because the Astro dev server used a ` /claude-code-agents/` base path, creating a mismatch with the test's expected URLs.

**Key Dialogue on the Solution:**

> **Frontend Developer:** "Using an environment variable to set the `base` path to `/` in development and `/claude-code-agents/` in production is the clean, standard way to handle this. It means our dev server will run at the root, just like any other web app."

> **e2e-tester:** "This is perfect. This simplifies my tests immensely. If the dev server runs at the root, I can write simple, clean assertions like `expect(page).toHaveURL('/installation/')`."

**Outcome:** The team adopted Astro's idiomatic solution of using `import.meta.env.MODE` to set the configuration conditionally, solving the root cause of the problem.

### 2.2. What Makes a Test Valuable?

**Problem:** Even with the configuration fixed, tests were failing due to minor URL differences (like a trailing slash). This forced a discussion about what is truly important to test.

**Key Dialogue:**

> **Designer:** "The user never sees the `href` attribute. They click a link that says 'Installation,' and they expect to be taken to a page that is clearly and unambiguously the Installation page. The most obvious confirmation of this is seeing a large heading that says 'Installation.'"

> **Frontend Developer:** "Testing the `href` is fragile. What if we decide to refactor our routing? The test would break, even though the user experience is identical. However, the `<h1>Installation</h1>` heading is very unlikely to change. It tests the *contract* with the user, not the implementation."

**Outcome:** The team made a crucial decision to **stop testing URL strings** and instead focus on **testing for the visibility of unique, stable content** (like the `<h1>` of a page). This made the tests more robust and user-centric.

---

## 3. The Rebranding Pivot

**Context:** A strategic discussion, prompted by the user, about the project's name just as we were about to write public-facing articles.

**Key Dialogue:**

> **Project Manager:** "The risk of building and then abandoning brand equity is immense. It's wasteful and confusing to our potential audience. While it will cause a significant amount of rework, I believe the long-term value of getting the brand right *before* we go public is incalculable."

> **Designer:** "I'm actually excited by this. 'Claude Code Agents' is descriptive, but 'dotagents' is a *brand*. It's short, clever, and memorable. It perfectly encapsulates our core value proposition."

**Outcome:** The team unanimously agreed to pause all other work and execute a complete project rebrand to **"dotagents"** before any content was written, recognizing the long-term value of a stronger brand identity.

---

## 5. The Great Refactoring: Source vs. Product

**Context:** As a final cleanup before committing the rebranding, the team re-evaluated the project's directory structure, leading to a profound insight into the nature of the project itself.

**Key Dialogue & The "Kitchen Analogy":**

> **Initial Question:** "Should internal documents like `LESSONS_LEARNED.md` be moved into the `.project` directory?" (Consensus: Yes, this is good hygiene.)

> **Deeper Question:** "Should the website's source code (`src-gh-pages`) also be moved into `.project`?"

> **Designer's Analogy:** "Think of a restaurant. The `.claude/agents` files are the unique, high-quality ingredients. The `src-gh-pages` directory is the kitchen—it's where we have all our tools and recipes. The `docs` directory is the final, plated dish that we serve to the customer. The kitchen is essential, but it's not what the customer consumes. It's a behind-the-scenes workspace."

> **Frontend Developer's Conclusion:** "Given that analogy, I'm changing my vote. The `src-gh-pages` directory feels more like a 'making of' artifact now. Moving it to `.project` would make the root directory exceptionally clean, focusing purely on the 'products': the agents and the final docs."

**Outcome:** The team reached a new, more precise understanding of the project. The **products** are the `/.claude/agents` and `/docs` directories. The **workspaces** and **internal documents** belong in the `/.project` directory. This led to the final decision to move `src-gh-pages` into `.project` to create an exceptionally clean and logical repository root.
