# Claude Code Agents

This repository provides a curated collection of pre-built, expert subagents for Claude Code, designed to bring consistency and best practices to your software development workflow.

Whether you are a solo developer or part of a team, these agents act as specialized assistants to help with common tasks like project management, software architecture, code review, and more.

## Target Audience

This collection is for solo software engineers and software engineering teams who want to standardize their development environments and enforce consistent, high-quality practices across all their projects.

## Installation

These agents are managed as **user-level agents** using a `git bare` repository, allowing you to "install" them directly into your home directory. This method keeps your configuration clean, makes it easy to receive updates, and allows you to track your own custom agents in the same repository.

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

Run the checkout command. This will place the `.claude/agents` directory from this repository into your home directory.

```bash
claude-agents checkout
```

---

### **Important: Handling Existing Configurations**

If you already have a `~/.claude` directory, the `checkout` command will fail to prevent overwriting your files. Follow these steps to safely merge the repository's agents with your own:

1.  **Temporarily Move Your Existing Directory:**
    ```bash
    mv ~/.claude ~/.claude.backup
    ```

2.  **Run the Checkout Command Again:**
    Now that the path is clear, the checkout will succeed.
    ```bash

    claude-agents checkout
    ```

3.  **Merge Your Backup:**
    Move your original agents into the new, version-controlled directory.
    ```bash
    mv ~/.claude.backup/agents/* ~/.claude/agents/
    ```
    *Note: If you have other files in `~/.claude.backup`, you can move them over as well.*

4.  **Clean Up:**
    Once you've confirmed your agents are merged, you can remove the backup directory.
    ```bash
    rm -rf ~/.claude.backup
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

## Available Agents

- **agile-coach**: An Agile coaching expert, inspired by XP and 'Making Users Awesome', that facilitates workflows, removes impediments, and empowers developers by ensuring smooth project execution.
- **project-manager**: A project management expert for planning, scoping, and organizing software development tasks. Use to create project plans, break down features into tickets, and estimate timelines.

## Contributing

Contributions are welcome! Please see `CONTRIBUTING.md` for guidelines on how to submit new agents or improve existing ones.
