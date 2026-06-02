# CONTEXT.md

## Shared language

| Term | Meaning | Do not confuse with |
|---|---|---|
| governance bootstrap generator | A small tool that creates project governance documents before implementation | Runtime framework |
| base profile | Minimal profile containing only required governance documents | Fullstack AI profile |
| doctor JSON | Machine-readable verification output from `scripts/doctor.mjs --json` | CI log |

## Roles

| Role | Goal | Permission / boundary |
|---|---|---|
| maintainer | Verify the starter repo | Owns profiles and scripts |
| agent | Read generated documents before implementation | Must not write code before gates pass |
| reviewer | Check fixture drift | Does not change profile source of truth |

## Data objects

| Object | Meaning | Source of truth |
|---|---|---|
| Profile | JSON manifest under `profiles/` | `profiles/*.json` |
| Required document | File that must exist and be filled for the profile | profile manifest |
| Conditional document | File suggested only when the project surface needs it | profile `conditionalHints` |

## Existing constraints

| Constraint | Source | Impact | Owner |
|---|---|---|---|
| This fixture is an adoption proof, not a product example | README boundary | No app code | maintainer |

## Decisions already made

| Decision | Source | Date | Revisit condition |
|---|---|---|---|
| Base fixture stays governance-only | profile manifest | 2026-06-02 | profile scope changes |
