# Templates

這裡只放新專案常用文件骨架。建立專案文件時可以複製，但不要把空模板當成完成狀態。

| Template | Required | Trigger | Related workflow |
|---|---|---|---|
| `PROJECT_BRIEF.md` | Yes | Every project | `startup/01-bootstrap-gates.md` |
| `SPEC.md` | Yes | Every project | `startup/01-bootstrap-gates.md` |
| `CONTEXT.md` | Yes | Every project | `startup/01-bootstrap-gates.md` |
| `TASK_CONTRACT.md` | Yes | Every project | `startup/01-bootstrap-gates.md` |
| `OPEN_LOOPS.md` | Yes | Every project | `startup/01-bootstrap-gates.md` |
| `AGENTS.md` | Yes | Every project | `workflows/agent-file-structure.md` |
| `TECH_STACK.md` | Yes | Every project | `startup/02-required-project-docs.md` |
| `UI_SPEC.md` | Conditional | UI, website, app, dashboard, landing page | `workflows/ui-ux.md` |
| `DESIGN_SYSTEM.md` | Conditional | Existing screenshots, competitor UI, design tokens | `workflows/design-system-from-screenshots.md` |
| `DESIGN_REVIEW.md` | Conditional | UI review, beta, launch, visual QA | `workflows/ui-ux.md` |
| `DATA_MODEL.md` | Conditional | Database, Auth, tenant, permissions, core entities | `workflows/fullstack.md` |
| `API_CONTRACT.md` | Conditional | API routes, server actions, webhooks, adapters | `workflows/fullstack.md` |
| `ENV_CHECKLIST.md` | Conditional | Deployment, third-party APIs, env vars, secrets | `workflows/fullstack.md` |
| `PRESENTATION_BRIEF.md` | Conditional | Slides, one-pager, white paper, resume, portfolio | `workflows/presentation.md` |
| `TESTER_HANDOFF.md` | Conditional | Beta, tester handoff, preview sharing | `workflows/stage-routing.md` |
| `MACOS_RELEASE_CHECKLIST.md` | Conditional | macOS build, signing, TCC, DMG, notarization | `workflows/macos-build-release.md` |
| `AGENT_RUNTIME.md` | Conditional | Production-facing LLM agent, automation, tool use | `workflows/production-agent.md` |
| `RAG_DESIGN.md` | Conditional | Retrieval, knowledge base, document Q&A, citation | `workflows/ai-system-design.md` |
| `EVAL_PLAN.md` | Conditional | LLM, RAG, agent regression testing | `workflows/ai-system-design.md` |
| `AI_SECURITY_REVIEW.md` | Conditional | Prompt injection, tenant data, PII, tool risk | `workflows/ai-system-design.md` |
