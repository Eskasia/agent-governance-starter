# Project README

This project was initialized with `agent-governance-starter`.

## Start Here

1. Read `START_HERE.md`.
2. Read the runtime entrypoint for the active agent.
3. Complete Q1-Q9 and the product shape / technology route gate.
4. Fill the required documents before implementation starts.
5. Run `doctor` from the starter repo after the documents are filled.

## Runtime

- Initialized agent: codex
- Init profile: base

## Required Documents

- README.md: Every project
- PROJECT_BRIEF.md: Every project
- SPEC.md: Every project
- CONTEXT.md: Every project
- TASK_CONTRACT.md: Every project
- OPEN_LOOPS.md: Every project
- AGENTS.md: Every project
- TECH_STACK.md: Every project

## Included Profile Documents

- None

## Conditional Documents

- UI_SPEC.md: Has UI / website / dashboard / landing page
- DESIGN_SYSTEM.md: Has screenshots / existing UI to extract design rules from
- DESIGN_REVIEW.md: Has UI review / beta / launch / visual QA
- DATA_MODEL.md: Has DB / Auth / tenant / permissions
- API_CONTRACT.md: Has API routes / server actions / webhooks
- ENV_CHECKLIST.md: Has deployment / third-party API keys
- PRESENTATION_BRIEF.md: Has presentation / slide deck / one-pager deliverable
- TESTER_HANDOFF.md: Has beta / tester handoff requirement
- MACOS_RELEASE_CHECKLIST.md: Has macOS app build / TCC / signing
- AGENT_RUNTIME.md: Has production-facing LLM agent / automation
- RAG_DESIGN.md: Has retrieval / knowledge base / document Q&A
- EVAL_PLAN.md: Has LLM/RAG/agent output needing regression testing
- AI_SECURITY_REVIEW.md: Has prompt injection / tenant data / PII risks

## Validation

```bash
node agent-governance-starter/scripts/doctor.mjs <this-project>
```

Treat warnings as unfinished governance work, not as approval to start implementation.
