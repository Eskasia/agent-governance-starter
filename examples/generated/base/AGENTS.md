# AGENTS.md

## Project Rules

- Start by reading `START_HERE.md` when it exists.
- Do not write code before `PROJECT_BRIEF.md`, `SPEC.md`, `CONTEXT.md`, `TASK_CONTRACT.md`, `OPEN_LOOPS.md`, and `TECH_STACK.md` are reviewed.
- Do not write code before the product shape / technology route gate is complete: use `user-declared route` when the user names the route, or `ai-recommended route` when the user needs a recommendation.
- Keep every task tied to input, tools, expected output, verification, and explicit non-goals.
- Do not treat `OPEN_LOOPS.md` items as decided.
- Do not add a new framework, SDK, provider, database, queue, agent framework, or MCP server without checking `TECH_STACK.md`.
- Do not adopt external repos, skills, plugins, agent packs, or SDKs unless they fit `TECH_STACK.md` and the project adoption gate.
- Record only stable project-specific rules here.

## Commands

| Purpose | Command |
|---|---|
| Install |  |
| Test |  |
| Lint |  |
| Build |  |
| Dev server |  |

## Verification

- Every implementation task must name its verification command or manual check.
- Final delivery must report checks passed, checks skipped, and blockers.

## Coding Discipline

- Think before coding: state assumptions, surface tradeoffs, and ask when multiple interpretations would change the implementation.
- Keep changes simple: solve the current request with the minimum code and avoid speculative abstraction or configurability.
- Make surgical edits: touch only files and lines tied to the request, preserve existing style, and only remove unused code created by your change.
- Define success before implementation: for non-trivial work, use a short plan with verification for each step, then loop until checks pass or blockers are explicit.

## Do Not

- Do not commit secrets or private tester data.
- Do not expand scope without updating `SPEC.md` and `TASK_CONTRACT.md`.
- Do not add permanent agent rules before deciding whether they belong here, in docs, in skills, in hooks, or in issue templates.

## File Ownership

- Product and scope: `PROJECT_BRIEF.md`, `SPEC.md`
- Shared language: `CONTEXT.md`
- Work execution: `TASK_CONTRACT.md`
- Risks and unresolved items: `OPEN_LOOPS.md`
- Local agent rules and commands: `AGENTS.md`
- Technologies and versions: `TECH_STACK.md`
- Product shape / technology route decision: `PROJECT_BRIEF.md`, `TECH_STACK.md`, and high-cost `docs/adr/*.md`

## Subdirectory Rules

- Add nested `AGENTS.md` files only when a subsystem has different commands, constraints, or ownership.
