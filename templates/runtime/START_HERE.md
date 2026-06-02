# START_HERE.md

## Purpose

This project was initialized from agent-governance-starter. The agent must complete intake, project documents, and a task contract before implementation starts.

## Read Order

1. This file.
2. The runtime instruction file for the active agent: `AGENTS.md`, `CLAUDE.md`, or `.agents/AGENTS.md`.
3. Required documents listed below.
4. Included profile documents listed below.
5. Conditional documents when the project type requires them.

## Runtime

- Initialized agent: {{AGENT}}
- Init profile: {{PROFILE_NAME}}

## Q1-Q9 Intake

{{INTAKE_QUESTIONS}}

## Product Shape / Tech Route Gate

After Q1-Q9 and before implementation, decide one route mode:

- `user-declared route`: the user already named the product shape or technology route; check it against Q1-Q9 and document gaps or risks.
- `ai-recommended route`: the user does not know the route; recommend one first-version product shape and one main technology route from Q1-Q9.

Write the product shape decision in `PROJECT_BRIEF.md` and the technology route decision in `TECH_STACK.md`. Do not write code while either decision is still an open loop.

## Required Documents

{{REQUIRED_DOCUMENTS}}

## Included Profile Documents

{{INCLUDED_PROFILE_DOCUMENTS}}

## Conditional Documents

{{CONDITIONAL_DOCUMENTS}}

## Gate

Do not write code until Q1-Q9 are answered, the product shape / technology route gate is complete, required documents are filled, open loops are explicit, and the user confirms the task plan.
