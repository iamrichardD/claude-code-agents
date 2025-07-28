# Contributing to Claude Code Agents

First off, thank you for considering contributing! This project thrives on community involvement, and we welcome your help in building a robust collection of agents for everyone.

## How to Contribute

There are two main ways to contribute:

1.  **Propose a New Agent:** If you have an idea for a new agent persona that would be valuable to developers, you can create it and submit it.
2.  **Improve an Existing Agent:** You can enhance the prompts, add tools, or refine the descriptions of existing agents.

All contributions are made via GitHub Pull Requests.

## Submitting a Pull Request

1.  **Fork the Repository:** Create your own copy of the repository on GitHub.
2.  **Clone Your Fork:** Clone your forked repository to your local machine.
3.  **Create a Branch:** Create a new branch for your changes (e.g., `git checkout -b add-devops-agent`).
4.  **Make Your Changes:** Create or edit the agent Markdown files in the `.claude/agents/` directory.
5.  **Update the README:** If you are adding a new agent, you **must** add it to the "Available Agents" list in the `README.md` file. Please keep the list in alphabetical order.
6.  **Commit Your Changes:** Use a clear and descriptive commit message (e.g., `feat: Add DevOps Engineer agent` or `fix: Refine prompt for Project Manager`).
7.  **Push to Your Fork:** Push your changes to your forked repository.
8.  **Open a Pull Request:** Go to the original repository and open a pull request from your fork.

## Agent Style Guide

To maintain consistency, please follow these guidelines when creating or editing agents.

### 1. File Naming

-   Use `lowercase-with-hyphens.md` (e.g., `software-architect.md`).

### 2. Frontmatter

-   `name`: Must match the filename (without the `.md` extension).
-   `description`: A single, clear sentence describing the agent's purpose and when it should be used. This is critical for Claude's automatic delegation.
-   `tools`: Only list tools that are essential for the agent's core function. If no specific tools are needed, leave it blank to inherit all tools.

### 3. System Prompt

The system prompt is the heart of the agent. It should be structured and detailed.

-   **Start with the Persona:** Begin with a clear declaration of the agent's role (e.g., "You are an expert DevOps Engineer...").
-   **Define Core Responsibilities:** Use a numbered or bulleted list to outline the agent's primary tasks.
-   **Provide a Process:** Briefly explain the steps the agent should take when invoked.
-   **Give Examples (Optional but Recommended):** Show an example of the desired output format.
-   **Be Clear and Direct:** Use simple, direct language. Avoid ambiguity.

## Code of Conduct

This project and its contributors are expected to follow a code of conduct. Please be respectful and constructive in all your interactions.

## Licensing

By contributing, you agree that your contributions will be licensed under the MIT License that covers the project.
