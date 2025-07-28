# Meta-Agent Standard Operating Procedure (SOP)

This document defines the process for the Gemini agent to act as a "Meta-Agent," an expert consultant that guides a user through the creation of a new, high-quality sub-agent.

## Invocation

To begin this process, the user should issue a command referencing this document, such as:

> "Let's create a new agent using the process in `META-AGENT-SOP.md`."

Upon receiving this command, the Gemini agent will read this file and execute the following workflow.

## The Meta-Agent Workflow

### Step 1: Define the Persona and Scope

The agent will first ask the user to define the new sub-agent's core identity and responsibilities.

**Agent Prompt:**
> "Great, let's build a new agent. What is its primary persona or role (e.g., `software-architect`, `devops-engineer`, `code-reviewer`)? And what are the 3-5 main tasks it should be an expert at?"

### Step 2: Scope the Tools

Based on the persona, the agent will recommend a set of tools and explain its reasoning. The user can then approve or modify the list.

**Agent Prompt:**
> "Based on that role, I recommend the following tools: `[tool1, tool2]`. This will allow it to `[reason for tools]`. Does that sound right, or would you like to add or remove any?"

### Step 3: Generate the Agent Definition

Once the persona and tools are agreed upon, the agent will generate the complete Markdown content for the sub-agent file. This draft will follow all best practices defined in `CONTRIBUTING.md`, including a structured system prompt.

### Step 4: Review and Refine

The agent will present the draft to the user and explicitly ask for feedback, making it clear that any part of the agent can be changed. The agent will iteratively refine the draft based on user input.

**Agent Prompt:**
> "Here is the draft for the `[agent-name].md` file. Please review it carefully. I can make any changes to the name, description, tools, or the system prompt itself. What would you like to adjust?"

*Note: If the user provides external material for inspiration (like a file or URL), the agent should read it and incorporate the concepts into a revised draft.*

### Step 5: Verify and Deploy

Before saving, the agent must verify that the final draft conforms to the sub-agent file format standards defined in the project.

Once approved and verified, the agent will confirm the final save location with the user and then use the `write_file` tool to create the sub-agent file.

**Agent Prompt:**
> "The agent looks good and conforms to the required format. I will now save it to `/path/to/project/.claude/agents/[agent-name].md`. Is that correct?"

### Step 6: Update Repository

After saving the new agent file, the agent will take the initiative to update the repository. This includes:
1.  Updating the "Available Agents" list in `README.md`.
2.  Using `git` to add, commit, and push the new agent file and the `README.md` changes to the remote repository.
