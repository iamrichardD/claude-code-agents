# Claude Code Agents

This repository provides a curated collection of pre-built, expert subagents for Claude Code, designed to bring consistency and best practices to your software development workflow.

Whether you are a solo developer or part of a team, these agents act as specialized assistants to help with common tasks like project management, software architecture, code review, and more.

## Target Audience

This collection is for solo software engineers and software engineering teams who want to standardize their development environments and enforce consistent, high-quality practices across all their projects.

## Installation

### A Note on a Safe, Conflict-Free Installation

This project uses a `git bare` repository to manage your agents, a powerful technique detailed in [this Atlassian article on dotfiles](https://www.atlassian.com/git/tutorials/dotfiles). This method is popular for its precision and control.

To ensure this system **never** conflicts with your own dotfiles setup or other files in your home directory, the installation commands use Git's `sparse-checkout` feature. This guarantees that the `claude-agents` command will **only ever** read from or write to the `~/.claude` directory, making it completely safe to use alongside other tools. For more general information on dotfiles, see [dotfiles.github.io](https://dotfiles.github.io/).

### 1. Clone the Repository

First, clone this repository to a hidden "bare" repository in your home directory.

```bash
git clone --bare https://github.com/iamrichardd/claude-agents.git $HOME/.claude-agents.git
```

### 2. Set Up the Alias

Add the following alias to your shell configuration file (e.g., `~/.zshrc`, `~/.bashrc`, or `~/.config/fish/config.fish`). This gives you a convenient `claude-agents` command to manage your agents.

```bash
alias claude-agents="git --git-dir=$HOME/.claude-agents.git/ --work-tree=$HOME"
```

After adding the alias, restart your shell or source your configuration file (e.g., `source ~/.zshrc`).

### 3. Check Out the Agents

These commands use `sparse-checkout` to ensure only the `.claude` directory is checked out, leaving other files in your home directory untouched.

```bash
claude-agents sparse-checkout init --cone
claude-agents sparse-checkout set .claude
claude-agents checkout
```

---

### **Important: Handling Existing Configurations**

If you already have custom agents in `~/.claude/agents`, the following steps will help you perform a safe merge.

1.  **Back Up Your Existing Agents (If Necessary):**
    If the `~/.claude/agents` directory exists, back it up before running the checkout command.
    ```bash
    [ -d ~/.claude/agents ] && mv ~/.claude/agents ~/.claude/agents.backup
    ```

2.  **Run the Checkout Command:**
    The `claude-agents checkout` command from the previous step should now succeed. If it fails due to local changes, you may need to force it: `claude-agents checkout -f`.

3.  **Merge Your Backup:**
    If you created a backup, move your original agents into the new, version-controlled directory.
    ```bash
    [ -d ~/.claude/agents.backup ] && mv ~/.claude/agents.backup/* ~/.claude/agents/
    ```

4.  **Clean Up:**
    Once you've confirmed your agents are merged, you can remove the backup.
    ```bash
    [ -d ~/.claude/agents.backup ] && rm -rf ~/.claude/agents.backup
    ```
---

## Usage

Once installed, Claude Code will automatically detect and use these agents based on your prompts. You can also invoke them explicitly.

**Example:**
> "Use the project-manager agent to outline the tasks for our new feature."

### Updating the Agents

To pull the latest agents and updates from this repository:

```bash
claude-agents pull
```

### Adding Your Own Agents

You can add your own custom agents and track them in the same repository:

```bash
# Create your new agent file
touch ~/.claude/agents/my-custom-agent.md

# Add it to your repository
claude-agents add ~/.claude/agents/my-custom-agent.md
claude-agents commit -m "Add my custom agent"

# If you forked this repo, you can push your changes
# claude-agents push
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
