# Project Context

## Repository Type
Collection of Claude Code agent configurations—specialized AI assistant prompts stored as markdown files

## Project Structure
- `.claude/agents/` - Core agent collection with specialized configurations
- `.projects/` - Project documentation
- `CONTRIBUTING.md` - Contribution guidelines
- `META-AGENT-SOP.md` - Meta-agent creation workflow
- `docs/` - dotagents website

## Code Conventions
- Use kebab-case for agent filenames
- All agents stored as `.md` files in `.claude/agents/` directory
- Each agent follows a consistent markdown structure
- Maintain clear role definitions and expertise boundaries

## Working Guidelines
- ALWAYS edit existing agent files rather than creating new ones
- ALWAYS preserve the established Markdown format when modifying agents
- Use Task tool with appropriate `subagent_type` to invoke agents
- Each agent is self-contained with specific domain expertise

## Repository Management
- Git-based version control with main branch
- Agents can be managed using dotfiles methodology
- Configuration files are designed for professional team sharing
- Follow conventional commit format for changes

## Do Not
- Create new agent files without an explicit requirement
- Modify the core structure of existing agents
- Add unnecessary documentation files