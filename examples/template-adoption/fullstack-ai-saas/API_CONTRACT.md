# API_CONTRACT.md

## Overview

- API style: Next.js route handlers.
- Base URL: preview deployment URL.
- Version policy: preview-only routes are versioned by branch.
- Auth method: workspace session cookie.

## Routes / Actions

| Method | Path / Action | Purpose | Auth | Request Body | Response | Error Shape | Idempotent | Notes |
|---|---|---|---|---|---|---|---|---|
| POST | `/api/documents` | Upload a workspace document | member | file + workspace id | document id and status | standard error object | no | stores metadata before ingestion |
| POST | `/api/questions` | Ask a question over workspace docs | member | question + workspace id | answer + citations | standard error object | no | retrieval must filter by workspace |
| GET | `/api/documents/:id` | Read document status | member | none | document metadata | standard error object | yes | workspace ownership required |

## Error Shape

```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": {}
  }
}
```

## Webhook

| Event | Payload | Verification | Retry | Notes |
|---|---|---|---|---|
| none | n/a | n/a | n/a | preview does not expose external webhooks |

## Rate Limiting

- Limit method: per workspace and per user.
- Limit: define during implementation.
- Over-limit response: `429` with retry guidance.

## Pagination

- Method: cursor.
- Default page size: 20.
- Max page size: 100.

## Permission Matrix

| Route / Action | anonymous | member | owner | service | Notes |
|---|---|---|---|---|---|
| POST `/api/documents` | no | yes | yes | no | workspace membership required |
| POST `/api/questions` | no | yes | yes | no | workspace membership required |
| GET `/api/documents/:id` | no | yes | yes | no | document workspace must match session |

## External API Dependencies

| Provider | Purpose | Auth | Rate Limit | Fallback | Notes |
|---|---|---|---|---|---|
| OpenAI | embeddings and answer generation | server env key | provider policy | fallback message | never expose key client-side |
