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
npm run smoke:base
npm run smoke:fullstack
```

## Template Adoption Fixtures

The starter keeps filled example project packs under `examples/template-adoption/`.

| Fixture | What it validates | Strict check |
|---|---|---|
| `base-minimal` | Fixed docs plus base profile expected doctor JSON | `node scripts/doctor.mjs --strict examples/template-adoption/base-minimal` |
| `fullstack-ai-saas` | Fixed docs plus RAG, eval, and AI security templates | `node scripts/doctor.mjs --strict examples/template-adoption/fullstack-ai-saas` |
| `macos-beta-handoff` | Fixed docs plus macOS release and tester handoff templates | `node scripts/doctor.mjs --strict examples/template-adoption/macos-beta-handoff` |

These fixtures are not production projects. They are local adoption proofs that required templates can be filled coherently across different project types.

Expected doctor JSON is checked with:

```bash
npm run fixtures
```

## CI

GitHub Actions entrypoint:

```text
.github/workflows/validate-starter.yml
```

The workflow runs on Ubuntu, macOS, and Windows:

```bash
npm run ci
```

Runtime proof has a separate manual workflow:

```text
.github/workflows/runtime-proof.yml
```

Public CI runs without secrets. Runtime proof defaults to mock mode, while real runtime proof is opt-in:

```bash
npm run runtime:proof
RUNTIME_PROOF_REAL=1 npm run runtime:proof
```

`RUNTIME_PROOF_REAL=1` attempts the local CLIs named by `CODEX_BIN`, `CLAUDE_BIN`, and `ANTIGRAVITY_BIN` or their default command names. Missing real CLIs must fail clearly instead of falling back to mock output.

## Governance

- Git repository initialized on branch `main`.
- `.DS_Store`, `node_modules/`, build outputs, editor folders, and env files are ignored by `.gitignore`.
- Do not change public readiness wording unless the validation commands above pass.
