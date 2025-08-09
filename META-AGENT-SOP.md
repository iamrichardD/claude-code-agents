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

Based on the persona, the agent will recommend a set of tools and explain its reasoning using the following optimization guidelines:

**Tool Selection Guidelines by Agent Type:**
- **Strategic Agents** (project-manager, agile-coach): `Read, Write, Glob, Grep, TodoWrite, Bash`
- **Development Agents** (frontend-developer, astro-expert): `Read, Write, Edit, MultiEdit, Bash, Grep, Glob, WebFetch`
- **Design/Content Agents** (designer, marketing-expert, technical-writer): `Read, Write, Grep, Glob, WebFetch`
- **Documentation Agents** (context-fetcher, technical-writer): `Read, Grep, Glob, WebFetch`
- **Testing/QA Agents** (e2e-tester): `Bash, Read, Glob, Write, browser_*`

**Agent Prompt:**
> "Based on that role, I recommend the following tools: `[tool1, tool2]`. This will allow it to `[reason for tools]`. These tools are optimized for `[agent_type]` roles. Does that sound right, or would you like to add or remove any?"

### Step 3: Generate the Agent Definition

Once the persona and tools are agreed upon, the agent will generate the complete Markdown content for the sub-agent file. This draft will follow all best practices defined in `CONTRIBUTING.md`, including a structured system prompt.

**Required Agent Structure:**
1. **YAML Frontmatter** with all required fields
2. **Core Philosophy & Influences** section (optional but recommended)
3. **Core Responsibilities** section
4. **Specialized expertise areas** relevant to the role
5. **Team Integration** section (see Step 3a)
6. **Communication style and methodology** sections

#### Step 3a: Determine Team Integration Position

Every agent MUST include a team integration section that defines its position in the collaboration hierarchy:

**Strategic Leadership Tier:**
- **project-manager** (Seldon) → **agile-coach** (Herbie) lead all workflows

**Foundational Intelligence Tier:**  
- **context-fetcher** (Fletcher) **MUST BE USED FIRST** in strategic workflows

**Specialized Execution Tiers:**
- **Development Pipeline**: context-fetcher → designer → frontend-developer → e2e-tester
- **Content Pipeline**: context-fetcher → marketing-expert → technical-writer
- **Strategy Pipeline**: context-fetcher → project-manager → agile-coach → execution agents

**Integration Requirements:**
- Define where the agent fits in existing workflows
- Specify which agents it collaborates with directly
- Indicate if it should be invoked proactively by leadership agents
- Clarify handoff protocols with related agents

#### Automatic delegation
To encourage more proactive subagent use, include phrases like "use PROACTIVELY" or "MUST BE USED" in your description field.

#### The Agent Definition MUST Contain the Following front matter Fields:
- name:
- description:
- tools:
- type:
- created: (use `git log --follow --reverse --pretty=format:"%ai" -- <file_path> | head -1` to get first commit date or use current date for new agents)
- modified: (use current date for new agents)
- contributors: (use `git config user.name` to get current contributor)

#### Optional front matter Fields:
- alias: (human-like name for the agent)
- hook_tagline: (catchy description for UI display)
- deep_dive_snippet: (longer description explaining the agent's approach)
- tags:
- status:
- model:
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

Before saving, the agent must verify that the final draft conforms to all requirements:

**Verification Checklist:**
- [ ] All required YAML frontmatter fields present (name, description, tools, type, created, modified, contributors)
- [ ] Tools optimized for agent type and role
- [ ] Team Integration section defines collaboration patterns
- [ ] Proper proactive delegation triggers in description
- [ ] Clear positioning in strategic hierarchy (project-manager → agile-coach → specialized agents)
- [ ] Considers context-fetcher integration where applicable

Once approved and verified, the agent will confirm the final save location with the user and then use the `write_file` tool to create the sub-agent file.

**Agent Prompt:**
> "The agent looks good and conforms to all required format standards and collaboration patterns. I will now save it to `/path/to/project/.claude/agents/[agent-name].md`. Is that correct?"

### Step 6: Generate Metadata and Update Repository

After saving the new agent file, the agent will:

1. **Generate Metadata** (for new agents, use current date for both created and modified):
   ```bash
   # For created date (if existing file):
   git log --follow --reverse --pretty=format:"%ai" -- .claude/agents/[agent-name].md | head -1
   
   # For contributors:
   git config user.name
   
   # For modified: use current date (YYYY-MM-DD)
   ```

2. **Update Repository**:
   - Update the "Available Agents" list in `README.md`
   - Use `git` to add, commit, and push the new agent file and `README.md` changes
   - Ensure commit message follows conventional format: "feat: add [agent-name] subagent with [key capabilities]"

3. **Validate Integration**:
   - Confirm the agent appears in collaboration workflows of related agents
   - Verify tool assignments are optimal for the agent's role and responsibilities
