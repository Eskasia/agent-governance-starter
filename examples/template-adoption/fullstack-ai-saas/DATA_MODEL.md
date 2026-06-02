# DATA_MODEL.md

## Core Data Objects

| Entity | Description | Owner | Lifecycle | Notes |
|---|---|---|---|---|
| Workspace | Tenant boundary for a consulting team | owner | created during preview onboarding | every query is scoped here |
| Member | User inside a workspace | owner | invited or removed by owner | role controls upload access |
| Document | Uploaded customer document metadata | member | uploaded, ingested, archived | raw sample data stays synthetic |
| Chunk | Searchable document segment | system | created during ingestion | stores source anchor |
| Question | User query and trace metadata | member | created per ask | stores workspace id |
| Answer | Model output and citations | system | created after validation | citation required |

## Relationships

| Source | Target | Relationship | Notes |
|---|---|---|---|
| Workspace | Member | one-to-many | membership gates access |
| Workspace | Document | one-to-many | document belongs to one workspace |
| Document | Chunk | one-to-many | chunks inherit workspace id |
| Question | Answer | one-to-one | answer must reference citations |
| Answer | Chunk | many-to-many | citations point to supporting chunks |

## Tenant / Multi-tenancy

- Tenant identifier: `workspace_id`.
- Tenant isolation level: row-level policy plus retrieval filter.
- Cross-tenant query: forbidden.

## Users And Roles

| Role | Permissions | Creation | Notes |
|---|---|---|---|
| owner | manage workspace and members | initial setup | can approve destructive actions |
| member | upload and ask questions | owner invite | cannot see other workspaces |

## Auth

- Auth provider: preview auth provider selected during implementation.
- Session / token strategy: session cookie with workspace membership lookup.
- Password / OAuth / magic link: open loop currently tracks final choice.

## Tables

| Table | Main fields | PK | FK | Index | RLS | Notes |
|---|---|---|---|---|---|---|
| workspaces | name, owner_id | id | owner_id | owner_id | yes | tenant root |
| members | workspace_id, user_id, role | id | workspace_id | workspace_id, user_id | yes | membership gate |
| documents | workspace_id, title, status | id | workspace_id | workspace_id, status | yes | no raw secrets in examples |
| chunks | workspace_id, document_id, text, anchor | id | document_id | workspace_id, document_id | yes | retrieval source |
| questions | workspace_id, user_id, text | id | workspace_id | workspace_id, user_id | yes | trace input |
| answers | workspace_id, question_id, text | id | question_id | workspace_id, question_id | yes | validated output |

## RLS

| Table | Policy Name | Condition | Roles | Notes |
|---|---|---|---|---|
| documents | workspace_members_only | session user is a member of document workspace | member, owner | blocks cross-tenant reads |
| chunks | workspace_members_only | session user is a member of chunk workspace | member, owner | must apply before retrieval |
| answers | workspace_members_only | session user is a member of answer workspace | member, owner | protects traces |

## Migration

- Migration tool: project-selected database migration tool.
- Naming convention: timestamp plus short scope.
- Rollback strategy: preview-only reversible migrations.

## Seed / Mock Data

| Scenario | Data Content | Purpose | Source |
|---|---|---|---|
| local development | synthetic workspace, member, document, chunks | smoke test | fixture |
| E2E test | two workspaces with conflicting document facts | tenant isolation | fixture |
| demo | synthetic customer contract excerpt | citation demo | fixture |

## Data Retention

- Delete policy: soft delete during preview.
- Retention days: decide before production.
- Backup frequency: provider default for preview.
- Personal data deletion: no real PII in fixtures; production policy remains open.
