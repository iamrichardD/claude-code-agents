# Meta-Agent Standard Operating Procedure (SOP)

This document defines the process for the Gemini agent to act as a "Meta-Agent," an expert consultant that guides a user through the creation of a new, high-quality sub-agent.

## Invocation

To begin this process, the user should issue a command referencing this document, such as:

> "Let's create a new agent using the process in `META-AGENT-SOP.md`."

Upon receiving this command, the agent will read this file and execute the following workflow.

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

#### Automatic delegation
To encourage more proactive subagent use, include phrases like “use PROACTIVELY” or “MUST BE USED” in your description field.

#### The Agent Definition MUST Contain the Following front matter Fields:
- name:
- description:
- tools:

#### Optional front matter Fields:
- tags:
- status:
- type:
- created:
- modified:
- model:
- contributors:
- related:
- references: 

#### List of Available Subagent Types:
- `tool`
- `process`
- `workflow`
- `service`
- `system`
- `product`
- `project`
- `organization`
- `community`
- `devops-engineer`: Specializes in automating infrastructure and deployment processes.
- `product-manager`: Specializes in product strategy and execution.
- `project-manager`: Specializes in project management and planning.
- `community-manager`: Specializes in community management and engagement.
- `manager`: Specializes in managing multiple teams and projects.
- `consultant`: Expertise in any area of expertise.
- `expert`: Expertise in any area of expertise.
- `specialist`: Expertise in any area of expertise.
- `associate`: Expertise in any area of expertise.
- `beginner`: Expertise in any area of expertise.
- `frontend-developer`: Focuses on building user interfaces using frameworks like React or Vue, and handling client-side state management.
- `backend-developer`: Handles server-side logic, API development, and database interactions, emphasizing scalability and security.
- `mobile-developer`: Specializes in building applications for iOS and Android, using platforms like React Native or Flutter.
- `python-pro`: Expertise in advanced Python features, frameworks like Django or FastAPI, data processing, and automation.
- `javascript-pro`: Focuses on modern JavaScript features, async patterns, Node.js, and browser APIs.
- `golang-pro`: Specializes in Go concurrency, goroutines, channels, and idiomatic Go programming.
- `rust-pro`: Expertise in memory-safe Rust, ownership patterns, and trait implementations.
- `c-pro`: Focuses on efficient C code, memory management, and pointer arithmetic.
- `cpp-pro`: Specializes in modern C++ features, RAII, smart pointers, and STL algorithms.
- `sql-pro`: Expertise in complex SQL queries, execution plans, and schema design.
- `graphql-architect`: Focuses on GraphQL schema design, resolvers, federation, and query optimization.
- `api-documenter`: Specializes in creating API documentation using OpenAPI/Swagger specs and generating SDKs.
- `legacy-modernizer`: Focuses on refactoring legacy codebases, migrating frameworks, and reducing technical debt.
- `code-reviewer`: Focuses on quality assurance, best practices, and code style.
- `security-auditor`: Specializes in security vulnerability assessments and compliance.
- `performance-engineer`: Focuses on optimizing code and identifying performance bottlenecks.
- `debugger`: Specialized in analyzing and resolving code errors.
- `qa-expert`: Expertise in test automation and quality assurance strategies.
- `architect-reviewer`: Reviews code changes for architectural consistency and adherence to patterns.
- `data-analyst`: Expertise in data insights and visualization.
- `data-engineer`: Focuses on designing and building data pipelines.
- `data-scientist`: Specializes in analytics and extracting insights from data.
- `mlops-engineer`: Expertise in MLOps and machine learning model deployment.
- `nlp-engineer`: Specializes in natural language processing tasks.
- `prompt-engineer`: Focuses on optimizing prompts for effective AI interaction.
- `dx-optimizer`: Specializes in improving developer experience, tools, and workflows.
- `build-engineer`: Focuses on building and maintaining build systems.
- `dependency-manager`: Specializes in managing packages and dependencies.
- `git-workflow-manager`: Expertise in Git workflows, branching strategies, and collaboration.
- `tooling-engineer`: Focuses on creating and maintaining developer tools.
- `agent-organizer`: Specialized in coordinating multiple subagents.
- `context-manager`: Focuses on optimizing context windows and managing AI conversations effectively.
- `documentation-engineer`: Specializes in technical documentation and knowledge management.

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
