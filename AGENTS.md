# AGENTS.md

## Role

This repository is the source starter for agent-native project governance. Maintain it as a reusable open-source starter, not as one specific product project.

## Required Read Order

1. `README.md` for positioning and public usage.
2. `startup/00-agent-start-here.md` for mandatory agent behavior.
3. `startup/01-bootstrap-gates.md` for Q1-Q9 intake gates.
4. `startup/02-required-project-docs.md` for fixed and conditional output docs.
5. Relevant files in `workflows/` only when the task touches that area.

## Commands

| Purpose | Command |
|---|---|
| Validate starter | `node scripts/validate-starter.mjs .` |
| Initialize Codex smoke project | `tmp=$(mktemp -d); node scripts/init.mjs "$tmp/base" --agent codex; node scripts/doctor.mjs "$tmp/base"` |
| Initialize all-runtime smoke project | `tmp=$(mktemp -d); node scripts/init.mjs "$tmp/fullstack" --agent all --profile fullstack-ai; node scripts/doctor.mjs "$tmp/fullstack"` |
| Strict fullstack example doctor | `node scripts/doctor.mjs --strict examples/template-adoption/fullstack-ai-saas` |
| Strict macOS example doctor | `node scripts/doctor.mjs --strict examples/template-adoption/macos-beta-handoff` |

## Editing Rules

- Preserve existing user changes; do not revert dirty files unless explicitly asked.
- Keep public positioning conservative: this is a governance starter, not proof of external adoption.
- Do not add root numbered workflow files. Workflow docs live under `startup/` or `workflows/`.
- Do not add a root `codex_mvp_prd_pack.md`; PRD/MVP material belongs in templates or workflow docs.
- When adding a template, update `templates/README.md`, `startup/02-required-project-docs.md` if needed, and `scripts/validate-starter.mjs` if the template becomes required.
- When adding a runtime instruction file, update `README.md`, `scripts/init.mjs`, and `scripts/validate-starter.mjs`.

## Verification

Before reporting complete, run the validation commands relevant to the changed surface. For public-ready changes, run the full command set listed above.
