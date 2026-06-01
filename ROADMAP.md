# Roadmap

## v1 Public Release

- Keep the starter positioning clear: project governance starter for Codex, Claude Code, and Antigravity.
- Maintain root runtime entrypoints: `AGENTS.md`, `CLAUDE.md`, and `ANTIGRAVITY.md`.
- Keep `scripts/init.mjs`, `scripts/doctor.mjs`, and `scripts/validate-starter.mjs` covered by CI smoke checks.
- Keep examples filled enough to pass strict doctor checks.

## Agent Runtime Refinement

- Improve generated runtime prompts after real usage shows repeated gaps.
- Add only stable workflow rules to root files; project-specific rules belong in generated project docs.
- Keep Antigravity guidance executable without assuming Codex-specific skills.

## Examples Expansion

- Add one UI-heavy project fixture.
- Add one production agent fixture.
- Add one presentation or one-pager fixture.
- Keep all example data synthetic and privacy-safe.

## Out of Scope

- No claims of external adoption without evidence.
- No root `codex_mvp_prd_pack.md`.
- No bundled secrets, generated app code, or deployment credentials.
