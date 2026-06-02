# Template Adoption Examples

Each subdirectory is a filled example demonstrating how the project templates work together for a specific project type.

These are **not production projects**. They are adoption proofs showing that templates can be coherently filled across different scenarios.

## Fixtures

| Directory | Scenario | Key Templates Demonstrated |
|---|---|---|
| `base-minimal/` | Minimal ready base profile fixture | Fixed docs + expected doctor JSON |
| `fullstack-ai-saas/` | AI-powered SaaS with RAG, eval pipeline, and security review | Required fullstack docs + conditional RAG_DESIGN and EVAL_PLAN |
| `macos-beta-handoff/` | macOS app beta release with tester handoff | Fixed docs + MACOS_RELEASE_CHECKLIST, TESTER_HANDOFF |

## Validation

The CI workflow checks each fixture with its declared profile and compares each `expected/doctor.json` against live `doctor --json` output.

Required docs come from `profiles/*.json`; fixture-specific conditional docs may be present when the scenario enables that gate.
