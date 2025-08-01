# dotagents

This repository provides a curated collection of pre-built, expert subagents for Claude Code, designed to bring consistency and best practices to your software development workflow.

Whether you are a solo developer or part of a team, these agents act as specialized assistants to help with common tasks like project management, software architecture, code review, and more.

## Target Audience

This collection is for solo software engineers and software engineering teams who want to standardize their development environments and enforce consistent, high-quality practices across all their projects.

## Installation

### A Note on a Safe, Conflict-Free Installation

This project uses a `git bare` repository to manage your agents, a powerful technique detailed in [this Atlassian article on dotfiles](https://www.atlassian.com/git/tutorials/dotfiles). This method is popular for its precision and control.

To ensure this system **never** conflicts with your own dotfiles setup or other files in your home directory, the installation commands use Git's `sparse-checkout` feature. This guarantees that the `dotagents` command will **only ever** read from or write to the `~/.claude` directory, making it completely safe to use alongside other tools. For more general information on dotfiles, see [dotfiles.github.io](https://dotfiles.github.io/).

### 1. Clone the Repository

First, clone this repository to a hidden "bare" repository in your home directory.

```bash
git clone --bare https://github.com/iamrichardd/dotagents.git $HOME/.dotagents.git
```

### 2. Set Up the Alias

Add the following alias to your shell configuration file (e.g., `~/.zshrc`, `~/.bashrc`, or `~/.config/fish/config.fish`). This gives you a convenient `dotagents` command to manage your agents.

```bash
alias dotagents="git --git-dir=$HOME/.dotagents.git/ --work-tree=$HOME"
```

After adding the alias, restart your shell or source your configuration file (e.g., `source ~/.zshrc`).

### 3. Check Out the Agents

Run the following commands from anywhere in your terminal to check out the agent files into your home directory.

1.  **Initialize sparse-checkout and define the target directory:**
    ```bash
    cd ~/
    dotagents sparse-checkout init --no-cone
    dotagents sparse-checkout set .claude/agents
    ```

2.  **Check out the agent files:**
    ```bash
    dotagents checkout
    ```

3.  **Troubleshooting:**
    If the `~/.claude/agents` directory was not created, it's likely because you have an existing `~/.claude` directory that Git is hesitant to modify. You can safely force the checkout to create the `agents` subdirectory and populate it:
    ```bash
    dotagents checkout -f
    ```

---

### **Merging Your Existing Custom Agents**

If you already have your own agents in `~/.claude/agents`, the checkout command above will replace them. To safely merge them, follow these steps:

1.  **Back up your agents BEFORE running checkout:**
    ```bash
    mv ~/.claude/agents ~/.claude/agents.backup
    ```
2.  **Run the checkout command from step 2 above (with `-f` if needed).**
3.  **Move your custom agents back:**
    ```bash
    mv ~/.claude/agents.backup/* ~/.claude/agents/
    ```
4.  **Clean up the backup:**
    ```bash
    rm -rf ~/.claude/agents.backup
    ```
---

## Usage

Once installed, Claude Code will automatically detect and use these agents based on your prompts. You can also invoke them explicitly.

**Example:**
> "Use the project-manager agent to outline the tasks for our new feature."

### Updating the Agents

To pull the latest agents and updates from this repository:

```bash
dotagents pull
```

### Adding Your Own Agents

You can add your own custom agents and track them in the same repository:

```bash
# Create your new agent file
touch ~/.claude/agents/my-custom-agent.md

# Add it to your repository
dotagents add ~/.claude/agents/my-custom-agent.md
dotagents commit -m "Add my custom agent"

# If you forked this repo, you can push your changes
# dotagents push
```

## Project Structure

- **`.claude/agents/`**: Contains the markdown definitions for all available agent personas.
- **`knowledge-base/`**: Holds the philosophical documents that guide the agents.
- **`src-gh-pages/`**: The source code for the project's GitHub Pages website, built with Astro.
- **`docs/`**: The compiled, static output of the website. This directory is what is served by GitHub Pages.

## Available Agents

- **agile-coach**: An Agile coaching expert, inspired by XP and 'Making Users Awesome', that facilitates workflows, removes impediments, and empowers developers by ensuring smooth project execution.
- **designer**: A web design expert focused on creating clean, modern, and intuitive interfaces using HTML First and Mobile First principles.
- **e2e-tester**: An expert in Quality Assurance who writes and maintains end-to-end tests using Playwright, guided by a strong testing philosophy.
- **frontend-developer**: An expert frontend developer who translates design into high-quality, performant, and accessible code, following XP and 'Making Users Awesome' principles.
- **project-manager**: A project management expert for planning, scoping, and organizing software development tasks. Use to create project plans, break down features into tickets, and estimate timelines.

## Deployment

The GitHub Pages site is built into and deployed from the `docs/` directory on the `main` branch.

## Contributing

Contributions are welcome! Please see `CONTRIBUTING.md` for guidelines on how to submit new agents or improve existing ones.