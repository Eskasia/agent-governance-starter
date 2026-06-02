# SPEC.md

## Scope

The base-minimal fixture demonstrates only the base profile output.

## Acceptance Criteria

| # | Criterion | yes/no check |
|---|---|---|
| 1 | All required base documents exist | yes |
| 2 | `doctor --json` returns `ready` | yes |
| 3 | No conditional documents are required by the fixture | yes |

## Non-goals

- No generated app code.
- No runtime framework.
- No external service configuration.

## Risks

- Fixture drift if base profile required documents change.

## Verification

- `node scripts/doctor.mjs --json examples/template-adoption/base-minimal`
