# Validation

## Starter Consistency Check

Validates the starter repo itself: root entrypoints, public docs, prompt library, cross-references, CLI flags, CI smoke path, and example fixtures.

```bash
node scripts/validate-starter.mjs .
```

Expected: `Starter validation passed.`

## Project Doctor

Validates a project initialized from the starter: fixed documents, content quality, and conditional document hints.

```bash
node scripts/doctor.mjs /path/to/your/project
```

For filled fixtures or release checks, use strict mode:

```bash
node scripts/doctor.mjs --strict /path/to/your/project
```

Strict mode treats missing documents and warnings as failures. Normal mode allows placeholder warnings so a freshly initialized project can still be inspected.

## Init Smoke Checks

```bash
tmp=$(mktemp -d)
node scripts/init.mjs "$tmp/base" --agent codex
node scripts/doctor.mjs "$tmp/base"

tmp=$(mktemp -d)
node scripts/init.mjs "$tmp/fullstack" --agent all --profile fullstack-ai
node scripts/doctor.mjs "$tmp/fullstack"
```

## Template Adoption Fixtures

The starter keeps two filled example project packs under `examples/template-adoption/`.

| Fixture | What it validates | Strict check |
|---|---|---|
| `fullstack-ai-saas` | Fixed docs plus RAG, eval, and AI security templates | `node scripts/doctor.mjs --strict examples/template-adoption/fullstack-ai-saas` |
| `macos-beta-handoff` | Fixed docs plus macOS release and tester handoff templates | `node scripts/doctor.mjs --strict examples/template-adoption/macos-beta-handoff` |

These fixtures are not production projects. They are local adoption proofs that required templates can be filled coherently across different project types.

## CI

GitHub Actions entrypoint:

```text
.github/workflows/validate-starter.yml
```

The workflow runs:

```bash
node scripts/validate-starter.mjs .
node scripts/init.mjs "$RUNNER_TEMP/base" --agent codex
node scripts/doctor.mjs "$RUNNER_TEMP/base"
node scripts/init.mjs "$RUNNER_TEMP/fullstack" --agent all --profile fullstack-ai
node scripts/doctor.mjs "$RUNNER_TEMP/fullstack"
node scripts/doctor.mjs --strict examples/template-adoption/fullstack-ai-saas
node scripts/doctor.mjs --strict examples/template-adoption/macos-beta-handoff
```

## Governance

- Git repository initialized on branch `main`.
- `.DS_Store`, `node_modules/`, build outputs, editor folders, and env files are ignored by `.gitignore`.
- Do not change public readiness wording unless the validation commands above pass.
