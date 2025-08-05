---
title: "dotagents: How to Expand Your Team with AI Agents using Subagents and Git"
description: "A guide to managing and versioning your AI subagents using a dotfiles-based approach."
publishDate: "2025-07-20"
author: "The dotagents team"
---

Last week's release of subagents by Anthropic was a significant moment for AI-assisted development. Like many developers, I was immediately excited by the potential to create specialized AI collaborators, moving beyond generic prompts to build a truly bespoke development team.

This initial excitement, however, quickly led to a practical question: **How do we manage these agents effectively?**

As the community rushed to create and share new subagents on GitHub, it became clear that we were on the verge of a new configuration management challenge. How do we version these agents? How do we share them across a team or even across our own development environments to ensure consistency?

The answer lies in a pattern developers have trusted for years: `dotfiles`. By treating our subagents not as disposable prompts but as critical pieces of our development environment, we can use a simple, bare git repository to manage, version, and share them.

This approach looks beyond the initial hype to solve the next-order problem that enables real-world, scalable adoption. It's how we move from experimenting with subagents to operationalizing them.

### The `dotagents` Solution: A Practical Guide

The beauty of the `dotfiles` pattern is its simplicity and the fact that it uses a tool developers already know and trust: `git`. Here’s how to apply this pattern to create a shared, version-controlled repository for your AI subagents.

**A Note on Safety and Trust**

Before we dive in, it's important to highlight a key design principle of this approach. The following commands use `git sparse-checkout`. This is a deliberate choice to ensure that our agent management system *only* ever interacts with the `~/.claude` directory. It will never conflict with your existing dotfiles or other files in your home directory. This isn't just a clever hack; it's a professional, safely-designed system that respects your development environment.

**Step 1: Initialize the Bare Repository**

First, we create a "bare" git repository in our home directory. A bare repository has no working directory, which means it keeps the git history neatly tucked away and never interferes with your home folder's files.

```bash
git clone --bare https://github.com/iamrichardd/dotagents.git $HOME/.dotagents.git
```

**Step 2: Create a Convenient Alias**

Next, we set up a simple alias in our shell's configuration file (`.zshrc`, `.bashrc`, etc.) to make managing our agents easy.

```bash
alias dotagents="git --git-dir=$HOME/.dotagents.git/ --work-tree=$HOME"
```

*(Pro-Tip: After adding this alias, you'll need to restart your shell or source your configuration file (e.g., `source ~/.zshrc`) for the new `dotagents` command to become available in your terminal. However, the good news is that once you've checked out your agents, you don't need to restart Claude Code. It will automatically detect any new subagents in the `~/.claude/agents` directory.)*

**Step 3: Configure Sparse Checkout**
  
Configure the repository to only track the agents directory:

```bash
dotagents sparse-checkout init --no-cone
dotagents sparse-checkout set .claude/agents
dotagents sparse-checkout reapply
dotagents checkout
```

**Step 4: Configure Git Exclude Patterns (Critical Step)**

This step is essential to prevent `dotagents status` from showing thousands of files from your entire home directory:

```bash
cat > ~/.dotagents.git/info/exclude << 'EOF'
# Exclude everything in home directory by default
*

# But include .claude directory and its contents  
!/.claude/
!/.claude/agents/
!/.claude/agents/**
EOF
```

**Verify the setup works:**
```bash
# This should show only your agent files, not your entire home directory
dotagents status
```

And that's it. Your subagents are now installed and ready to use with a clean, manageable git interface.

**A Note on Team Adoption**

While the technical steps are simple, the most important part of this process is the human one. Before implementing this system, have a conversation with your team. Discuss which agents you want to standardize and why. By agreeing on a shared set of tools, you're not just managing files; you're building a shared culture of quality and consistency.

### Conclusion: Dev Parity for Your AI Teammates

Think about the last time a new developer joined your team. Did you set them up with the standard edition of your code editor when the rest of the team was using the pro version with a specific set of shared extensions? Of course not. As leaders and team members, we know that a consistent development environment is crucial for collaboration, efficiency, and quality.

Why should our AI agents be any different?

The `dotagents` pattern isn't just a clever way to manage files; it's a way to ensure that every developer on your team has the same set of AI collaborators. It's how we achieve "dev parity" for our AI teammates.

When you and your teammates all use the same `project-manager` subagent, you're not just sharing a prompt; you're sharing a process. You're building a shared culture of quality and consistency, where the AI-assisted code generated on one machine is the same as the code generated on another.

This is the future of AI-assisted development: not just a collection of individual tools, but a shared, version-controlled, and consistent team of AI collaborators, working alongside us to build better software, faster.