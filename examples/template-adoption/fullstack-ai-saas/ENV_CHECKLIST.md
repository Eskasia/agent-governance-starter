# ENV_CHECKLIST.md

## Environment Variables

| Variable | Purpose | Local | Preview | Production | Sensitivity | Source |
|---|---|---|---|---|---|---|
| `OPENAI_API_KEY` | embeddings and answer generation | required | required | required | secret | provider dashboard |
| `DATABASE_URL` | application database | required | required | required | secret | database provider |
| `VECTOR_STORE_URL` | retrieval index | required | required | required | secret | vector provider |
| `AUTH_SECRET` | session signing | required | required | required | secret | generated secret |
| `NEXT_PUBLIC_APP_URL` | browser callback URL | required | required | required | public | deployment URL |

## Sensitivity Rules

- public: may appear in the client bundle.
- secret: server-side only; never commit, log, or send to the model context.

## Do Not Commit

- [x] `.env` / `.env.local` / `.env.production` are gitignored.
- [x] No API key appears in fixture content.
- [x] Synthetic workspace data only.

## Provider Setup

| Provider | Setup Steps | Dashboard URL | Notes |
|---|---|---|---|
| OpenAI | create API key and set server env | provider dashboard | verify current model behavior before implementation |
| Database provider | create preview database | provider dashboard | enable row-level security |
| Vector provider | create workspace-scoped index | provider dashboard | include workspace id metadata |

## Pre-deploy Check

- [ ] Local smoke: all required env vars are set and app starts.
- [ ] Preview: env vars are set in deployment platform.
- [ ] Production: not in scope for fixture.
- [ ] No env var uses an undocumented fallback.
