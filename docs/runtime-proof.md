# Runtime Proof

Runtime proof checks that generated runtime entrypoints have a minimal first-response contract for Codex, Claude Code, and Antigravity.

This is not a live model benchmark and does not require API keys by default.

## Modes

| Mode | Command | Behavior |
|---|---|---|
| Mock proof | `npm run runtime:proof` | Generates fixtures and writes deterministic mock first responses. |
| Real proof | `RUNTIME_PROOF_REAL=1 npm run runtime:proof` | Attempts real local CLIs and fails clearly when a CLI is missing. |

## Environment Variables

| Variable | Purpose |
|---|---|
| `CODEX_BIN` | Optional Codex CLI command. Defaults to `codex` in real mode. |
| `CLAUDE_BIN` | Optional Claude Code CLI command. Defaults to `claude` in real mode. |
| `ANTIGRAVITY_BIN` | Optional Antigravity CLI command. Defaults to `antigravity` in real mode. |
| `RUNTIME_PROOF_REAL` | Set to `1` to use real CLIs. Any other value uses mock output. |

## Proof Contracts

| Runtime | Fixture | Output | Required signal |
|---|---|---|---|
| Codex | `.tmp/runtime-codex` | `codex-first-response.txt` | `FILES_READ`, `FIXED_DOCS`, `CONDITIONAL_DOCS`, `BLOCKERS`, `START_HERE.md`, `AGENTS.md` |
| Claude Code | `.tmp/runtime-claude` | `claude-first-response.json` | `files_read`, `fixed_docs_present`, `conditional_docs_likely_needed`, `blockers` |
| Antigravity | `.tmp/runtime-antigravity` | `antigravity-first-response.txt` | `SKILL_USED: intake-audit`, `FILES_READ`, `BLOCKERS`, `NEXT_INTAKE_QUESTION` |

## Public CI Boundary

Public CI must be runnable without secrets. The manual runtime proof workflow runs mock proof by default. Real proof is opt-in for maintainers who have the relevant CLIs and credentials configured.

## Commands

```bash
npm run validate:runtime-proof
npm run runtime:proof
RUNTIME_PROOF_REAL=1 npm run runtime:proof
```
