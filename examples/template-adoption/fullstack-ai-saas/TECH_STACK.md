# TECH_STACK.md

## Runtime

| Layer | Choice | Version | Reason | Alternative considered |
|---|---|---|---|---|
| Language | TypeScript | pinned in repo | Frontend/backend shared types | Python |
| Framework | Next.js | pinned in repo | Preview deployment path | Remix |
| Package manager | pnpm | pinned in repo | Existing local default | npm |
| Database | Supabase Postgres | current cloud version | RLS and auth fit | SQLite |
| Deployment | Vercel preview | current platform | Shareable preview URL | local only |

## External Services

| Service | Purpose | Env vars | Owner |
|---|---|---|---|
| OpenAI | embeddings / answering | `OPENAI_API_KEY` | owner |

## Version Policy

- Verify current API behavior before model or SDK changes.

## Constraints

- No tenant data in unnecessary model context.
