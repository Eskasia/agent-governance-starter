# AGENTS.md

## Project Rules

- Start by reading `START_HERE.md` when it exists.
- Do not write code before `PROJECT_BRIEF.md`, `SPEC.md`, `CONTEXT.md`, `TASK_CONTRACT.md`, `OPEN_LOOPS.md`, and `TECH_STACK.md` are reviewed.
- Keep every task tied to input, tools, expected output, verification, and explicit non-goals.
- Do not treat `OPEN_LOOPS.md` items as decided.
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

## Subdirectory Rules

- Add nested `AGENTS.md` files only when a subsystem has different commands, constraints, or ownership.
