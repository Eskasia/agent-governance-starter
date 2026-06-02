# Fullstack AI SaaS Fixture

This fixture demonstrates a filled fullstack AI profile with required data, API, environment, and AI security documents, plus scenario-enabled RAG and eval conditional docs.

## Start Here

1. Read `START_HERE.md` in generated projects.
2. Read `AGENTS.md`.
3. Review fixed and fullstack AI profile documents.
4. Run strict doctor from the starter repo.

## Runtime

- Initialized agent: codex
- Init profile: fullstack-ai

## Required Documents

- README.md: Every project
- PROJECT_BRIEF.md: Every project
- SPEC.md: Every project
- CONTEXT.md: Every project
- TASK_CONTRACT.md: Every project
- OPEN_LOOPS.md: Every project
- AGENTS.md: Every project
- TECH_STACK.md: Every project
- DATA_MODEL.md: Fullstack AI profile
- API_CONTRACT.md: Fullstack AI profile
- ENV_CHECKLIST.md: Fullstack AI profile
- AI_SECURITY_REVIEW.md: Fullstack AI profile

## Included Profile Documents

- AGENT_RUNTIME.md: Fullstack AI profile

## Conditional Documents Enabled By This Scenario

- RAG_DESIGN.md: RAG is enabled for document Q&A
- EVAL_PLAN.md: LLM/RAG output needs regression checks

## Validation

```bash
node scripts/doctor.mjs --strict --json examples/template-adoption/fullstack-ai-saas
```
