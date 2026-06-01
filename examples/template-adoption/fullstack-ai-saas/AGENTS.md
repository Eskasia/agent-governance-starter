# AGENTS.md

## Project Rules

- Never bypass tenant filters in retrieval.

## Commands

| Purpose | Command |
|---|---|
| Install | `pnpm install` |
| Test | `pnpm test` |
| Lint | `pnpm lint` |
| Build | `pnpm build` |
| Dev server | `pnpm dev` |

## Verification

- Run tenant isolation smoke before preview handoff.

## Do Not

- Do not store raw customer documents in chat logs.

## File Ownership

- Shared auth and data model files stay with the main agent.

## Subdirectory Rules

- `docs/` contains source decisions and evidence.
