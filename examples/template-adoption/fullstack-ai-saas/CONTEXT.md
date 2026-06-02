# CONTEXT.md

## Shared language

| Term | Meaning | Do not confuse with |
|---|---|---|
| Workspace | 一個顧問團隊的資料邊界 | 使用者帳號 |
| Document | 被 ingestion 的來源文件 | 回答內容 |
| Citation | 回答引用的來源位置 | 一般參考連結 |

## Roles

| Role | Goal | Permission / boundary |
|---|---|---|
| Owner | 管理 workspace | 可邀請成員 |
| Member | 上傳與查詢文件 | 只可看本 workspace |

## Data objects

| Object | Meaning | Source of truth |
|---|---|---|
| Workspace | tenant boundary | database |
| Chunk | retrievable unit | vector store + database |

## Existing constraints

| Constraint | Source | Impact | Owner |
|---|---|---|---|
| Tenant permission filter must happen before retrieval | AI_SECURITY_REVIEW | Prevents cross-tenant leakage | maintainer |

## Decisions already made

| Decision | Source | Date | Revisit condition |
|---|---|---|---|
| First preview uses demo credentials and seed data | PROJECT_BRIEF | 2026-06-02 | external beta starts |
