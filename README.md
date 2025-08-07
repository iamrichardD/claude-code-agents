# dotagents: Manage Your Subagents the dotfiles Way

*A practical guide to version controlling and syncing Claude Code subagents using git bare repositories*

The [dotfiles](https://www.atlassian.com/git/tutorials/dotfiles) method is a proven approach for managing configuration files across development environments. This guide shows how to apply the same technique to Claude Code subagents, giving you version control, team sharing, and consistent AI assistance across all your machines.

## Prerequisites

- Git installed on your system
- Claude Code with existing subagents in `~/.claude/agents/`
- Basic command line familiarity

## Step 1: Create the Bare Repository

A bare repository stores git data without a working directory, perfect for managing files in your home directory without conflicts.

```bash
# Create the bare repository
git init --bare $HOME/.dotagents

# Configure to hide untracked files
dotagents config --local status.showUntrackedFiles no

# Configure exclude patterns to only track .claude directory
cat > ~/.dotagents/info/exclude << 'EOF'
# Exclude everything in home directory by default
*

# But include .claude directory and contents
!/.claude/
!/.claude/agents/
!/.claude/agents/**
EOF
```

## Step 1.1: Create the `dotagents` Alias Command
Create a `dotagents` alias command that manages your subagents using git, with your home directory as the working tree.

```bash
# Create a convenient alias
echo 'alias dotagents="/usr/bin/git --git-dir=$HOME/.dotagents/ --work-tree=$HOME"' >> ~/.bashrc
source ~/.bashrc

```

## Step 2: Configure Your Remote Repository

Set up a remote repository for team collaboration:

```bash
# Add remote repository (create this on GitHub/GitLab first)
dotagents remote add origin git@github.com:yourteam/dotagents.git

# Push to remote
dotagents push -u origin main
```

## Step 3: Add Your Existing Subagents

Find and add your current subagents to version control:

```bash
# Check what subagents you currently have
ls -la ~/.claude/agents/

# Add specific agent files
dotagents add ~/.claude/agents/code-reviewer.md
dotagents add ~/.claude/agents/documentation-writer.md
dotagents add ~/.claude/agents/project-manager.md

# Or add the entire agents directory
dotagents add ~/.claude/agents/

# Create your first commit
dotagents commit -m "Initial subagents setup"
```

## Step 4: Daily Workflow

### Adding New Agents

```bash
# After creating a new agent in Claude Code
dotagents add ~/.claude/agents/new-agent.md
dotagents commit -m "Add new security auditor agent"
dotagents push
```

### Updating Existing Agents

```bash
# After modifying an agent
dotagents add ~/.claude/agents/code-reviewer.md
dotagents commit -m "Update code reviewer with TypeScript rules"
dotagents push
```

### Syncing Across Machines

```bash
# Pull latest changes on any machine
dotagents pull

# Check what's changed
dotagents status
dotagents log --oneline -5
```

## Common Use Cases

### Personal Multi-Machine Sync
Keep the same agents available on your laptop, desktop, and any cloud development environments.

### Team Standardization
Share proven agent configurations across your development team, ensuring consistent AI assistance for code reviews, documentation, and project management.

### Backup and Recovery
Your agents are safely stored in git with full history. Never lose a carefully crafted agent configuration again.

## Next Steps

The dotfiles approach brings professional configuration management to AI tools. Your subagents are now treated with the same care as your code—version controlled, shareable, and continuously improved.

---

*For more advanced patterns and community-shared agents, explore the growing ecosystem of Claude Code Subagents on GitHub.*