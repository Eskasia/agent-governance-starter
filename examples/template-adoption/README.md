# Template Adoption Examples

Each subdirectory is a filled example demonstrating how the project templates work together for a specific project type.

These are **not production projects**. They are adoption proofs showing that templates can be coherently filled across different scenarios.

## Fixtures

| Directory | Scenario | Key Templates Demonstrated |
|---|---|---|
| `base-minimal/` | Minimal ready base profile fixture | Fixed docs + expected doctor JSON |
| `fullstack-ai-saas/` | AI-powered SaaS with RAG, eval pipeline, and security review | Fixed docs + RAG_DESIGN, EVAL_PLAN, AI_SECURITY_REVIEW |
| `macos-beta-handoff/` | macOS app beta release with tester handoff | Fixed docs + MACOS_RELEASE_CHECKLIST, TESTER_HANDOFF |

## Validation

The CI workflow checks that each fixture contains all 7 required fixed documents and compares `base-minimal/expected/doctor.json` against live `doctor --json` output.

`PROJECT_BRIEF.md`, `SPEC.md`, `CONTEXT.md`, `TASK_CONTRACT.md`, `OPEN_LOOPS.md`, `AGENTS.md`, `TECH_STACK.md`.
