# 02 Document Catalog

本檔是 `profiles/*.json` 的人類可讀說明；文件清單的唯一來源是 profile manifest。新增、刪除或改 required 狀態時，先改 `profiles/*.json`，再讓本檔保持同步。

## Profile Manifest Contract

| Field | Meaning |
|---|---|
| `documents` | Files copied or generated for the selected profile |
| `required: true` | Doctor treats the file as required for readiness |
| `required: false` | Profile includes the file, but doctor reports presence separately |
| `conditionalHints` | Files not copied by default; agent decides from Q1-Q9 and route gates |
| `template` | Source path under `templates/` |

## Base Profile Documents

| File | Required | Template | Purpose |
|---|---|---|---|
| `README.md` | yes | `runtime/README.md` | Generated project entrypoint |
| `PROJECT_BRIEF.md` | yes | `fixed/PROJECT_BRIEF.md` | User, problem, MVP, product shape |
| `SPEC.md` | yes | `fixed/SPEC.md` | Scope, non-goals, yes/no acceptance |
| `CONTEXT.md` | yes | `fixed/CONTEXT.md` | Shared language and constraints |
| `TASK_CONTRACT.md` | yes | `fixed/TASK_CONTRACT.md` | Executable tasks and verification |
| `OPEN_LOOPS.md` | yes | `fixed/OPEN_LOOPS.md` | Unresolved decisions and blockers |
| `AGENTS.md` | yes | `runtime/AGENTS.md` | Canonical project agent rules |
| `TECH_STACK.md` | yes | `fixed/TECH_STACK.md` | Product route and technology decisions |

## 文件結構分流

收尾時判斷新經驗該寫到哪裡，詳見 `workflows/agent-file-structure.md`。

## Conditional Gates

| File | Required when |
|---|---|
| `UI_SPEC.md` | UI, website, App, dashboard, or landing page |
| `DESIGN_SYSTEM.md` | Screenshots or existing UI must become reusable design rules |
| `DESIGN_REVIEW.md` | UI review, beta, launch, or visual QA is needed |
| `DATA_MODEL.md` | DB, Auth, tenant, permissions, or core entities exist |
| `API_CONTRACT.md` | API routes, server actions, webhooks, or adapters exist |
| `ENV_CHECKLIST.md` | Deployment, third-party APIs, env vars, secrets, or service accounts exist |
| `MACOS_RELEASE_CHECKLIST.md` | macOS build, TCC, signing, DMG, or notarization exists |
| `AGENT_RUNTIME.md` | Production-facing LLM agent, automation, tool use, or human approval exists |
| `RAG_DESIGN.md` | Retrieval, knowledge base, document Q&A, citation, or permission-aware search exists |
| `EVAL_PLAN.md` | LLM / RAG / agent output needs regression testing or golden sets |
| `AI_SECURITY_REVIEW.md` | Prompt injection, tenant data, PII, external actions, HTML / SQL / shell output exist |
| `docs/adr/*.md` | Architecture, data model, deployment, provider, or external-service decisions are costly to reverse |

## Profile-Specific Rules

| Profile | Required additions | Conditional gates |
|---|---|---|
| `base` | none beyond base required docs | all base `conditionalHints` |
| `fullstack-ai` | `DATA_MODEL.md`, `API_CONTRACT.md`, `ENV_CHECKLIST.md`, `AI_SECURITY_REVIEW.md` | `RAG_DESIGN.md`, `EVAL_PLAN.md` when RAG or LLM eval is enabled |
| `macos` | none beyond base required docs | `MACOS_RELEASE_CHECKLIST.md`, `TESTER_HANDOFF.md` when release or tester handoff is needed |

## Template Rules

| Rule | Detail |
|---|---|
| Source of truth | `profiles/*.json` owns document inclusion and required status |
| Fixed templates | Base project documents must remain generic and profile-neutral |
| Conditional templates | Copied only by profile or `--all`, or selected manually when Q1-Q9 triggers them |
| ADR template | `templates/docs/adr/0001-template.md` is copied only when the project needs an ADR |
