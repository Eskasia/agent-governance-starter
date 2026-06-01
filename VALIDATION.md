# Validation

## Starter Consistency Check

Validates the starter repo itself (cross-references, directory structure, example fixtures):

```bash
node scripts/validate-starter.mjs .
```

Expected: `Starter validation passed.`

## Project Doctor

Validates a new project initialized from the starter templates (fixed documents, content quality, conditional document hints):

```bash
node scripts/doctor.mjs /path/to/your/project
```

## Template Adoption Fixtures

The starter keeps two filled example project packs under `examples/template-adoption/`.

| Fixture | What it validates |
|---|---|
| `fullstack-ai-saas` | Fixed docs plus RAG, eval, and AI security templates. |
| `macos-beta-handoff` | Fixed docs plus macOS release and tester handoff templates. |

These fixtures are not production projects. They are local adoption proofs that required templates can be filled coherently across two different project types.

## CI

GitHub Actions entrypoint:

```text
.github/workflows/validate-starter.yml
```

The workflow runs:

```bash
node scripts/validate-starter.mjs .
```

## Governance

- Git repository initialized on branch `main`.
- `.DS_Store`, `node_modules/`, and env files are ignored by `.gitignore`.
