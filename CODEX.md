# Codex Bootstrap

This project is an agent-native project bootstrap kit. When starting a new project with Codex, follow this sequence:

1. Read `startup/00-agent-start-here.md` — mandatory rules and reporting format.
2. Read `startup/01-bootstrap-gates.md` — Q1-Q9 intake questions and gate conditions.
3. Read `startup/02-required-project-docs.md` — fixed and conditional document requirements.
4. Based on the project type, read the relevant files from `workflows/`.
5. Do not write code until Q1-Q9 are answered and documents are confirmed.

## First Message to Codex

```text
This is a new project. Read startup/00-agent-start-here.md, then 01-bootstrap-gates.md, then 02-required-project-docs.md. List which files you read, which conditional documents this project needs, and start the Q1-Q9 intake. Do not write code until intake and documents are complete.
```

## Skill References

Workflow docs reference skills like `$handoff`, `$neat-freak`, `$tdd`, `$diagnose`. These require the corresponding Codex skills to be installed. See `workflows/tool-routing.md` for the full mapping and `workflows/recommended-tools.md` for installation sources.

## Project Output Documents

Fixed: `PROJECT_BRIEF.md`, `SPEC.md`, `CONTEXT.md`, `TASK_CONTRACT.md`, `OPEN_LOOPS.md`, `AGENTS.md`, `TECH_STACK.md`.

Conditional: See `startup/02-required-project-docs.md` for the full list and trigger conditions.
