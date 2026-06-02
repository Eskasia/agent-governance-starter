# ADR 0001: Governance Bootstrap Model

## Status

| Field | Value |
|---|---|
| Status | accepted |
| Date | 2026-06-02 |
| Owner | maintainer |

## Context

| Topic | Detail |
|---|---|
| Problem | The starter must be reusable across agents without becoming an app runtime or agent framework |
| Constraint | `AGENTS.md` remains the Codex runtime entrypoint; root `CODEX.md` is not used |
| Constraint | Generated document lists must not drift across README, startup docs, templates, and scripts |

## Decision

| Field | Decision |
|---|---|
| Source of truth | `profiles/*.json` owns document inclusion and required status |
| Runtime entrypoints | Codex uses `AGENTS.md`; Claude uses thin `CLAUDE.md`; Antigravity uses generated `.agents/AGENTS.md` |
| Human docs | Source explanations live under `docs/`, `startup/`, and `workflows/` |
| Mechanical checks | `doctor.mjs`, `validate-starter.mjs`, and `validate-project.mjs` enforce readiness signals |

## Consequences

| Area | Impact |
|---|---|
| Maintainability | Profile changes can be validated without editing multiple hidden lists |
| Public trust | External reviewers can see init, doctor, runtime proof, and generated project validation |
| Risk | Static docs can still drift, so validators must check key references |

## Reevaluation Triggers

| Trigger | Action |
|---|---|
| A new runtime adapter becomes canonical | Add adapter docs, runtime proof, and validator checks |
| Generated docs need a new required file | Update `profiles/*.json` first, then templates and examples |
| This starter starts generating app code | Reassess public positioning and governance boundaries |
