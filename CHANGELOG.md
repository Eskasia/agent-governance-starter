# Changelog

## 2026-06-01 — Major Restructure

### Directory Reorganization
- Moved startup files (00–02) into `startup/`.
- Moved conditional workflow files (03–15) into `workflows/` with semantic names.
- Moved `13-context-pressure-workflow.md` to `docs/experiments/context-mode.md`.
- Deleted `BOOTSTRAP.md` (was a 3-line redirect) and `INDEX.md` (merged into README).
- Created `docs/adr/` with ADR template.

### New Files
- `LICENSE` (MIT).
- `CONTRIBUTING.md` — how to add workflows, templates, and fixtures.
- `CLAUDE.md` — bootstrap instructions for Claude Code users.
- `CODEX.md` — bootstrap instructions for Codex users.
- `scripts/init.mjs` — copies templates to a new project directory.
- `scripts/doctor.mjs` — checks if a project satisfies bootstrap gate conditions.
- `examples/template-adoption/README.md` — explains fixture scenarios.

### Template Quality
- Expanded `templates/DATA_MODEL.md` from 4 lines to full schema with entities, relations, RLS, migration, seed data.
- Expanded `templates/API_CONTRACT.md` from 4 lines to full spec with routes, error shape, webhooks, pagination, permission matrix.
- Expanded `templates/TASK_CONTRACT.md` with task overview table, dependency graph, and acceptance checklist.

### De-personalization
- Renamed `07-starred-repo-addons.md` → `workflows/recommended-tools.md`.
- Removed `$` Codex-specific prefixes from skill names in `workflows/tool-routing.md`; added "需安裝" column.
- Removed hardcoded `/Users/william/...` paths from README.
- Consolidated tool reference sections to reduce overlap with `recommended-tools.md`.

### Cross-reference Updates
- Updated all internal references to use new `startup/`, `workflows/`, `docs/` paths.
- Eliminated triple-definition of file structure routing in 02/05/09; 02 and 05 now point to `workflows/agent-file-structure.md`.
- Rewrote `scripts/validate-starter.mjs` for new directory structure.

---

## 2026-06-01 — Initial Baseline

- Renumbered workflow docs from `09-agent-file-structure.md` through `15-design-system-from-screenshots.md` to remove the old duplicate `08-*` prefix.
- Added GitHub Actions validation workflow and `.gitignore`.
- Added two template-adoption examples under `examples/template-adoption/`.
- Added `VALIDATION.md` to record local validation, CI entrypoint, and template-adoption fixtures.
- Updated `scripts/validate-starter.mjs` to require CI workflow, unique prefixes, and at least two example fixtures.
- Added `BOOTSTRAP.md` compatibility redirect and updated active references to `01-bootstrap-gates.md`.
- Added fixed-document templates for `PROJECT_BRIEF.md`, `SPEC.md`, `CONTEXT.md`, `OPEN_LOOPS.md`, `AGENTS.md`, and `TECH_STACK.md`.
- Added high-risk conditional templates for `PRESENTATION_BRIEF.md`, `RAG_DESIGN.md`, `EVAL_PLAN.md`, and `AI_SECURITY_REVIEW.md`.
- Added `INDEX.md` as the canonical read order.
- Added `scripts/validate-starter.mjs` for local starter consistency checks.
