# Templates

這裡只放新專案常用文件骨架。文件清單、required 狀態與 profile inclusion 的唯一來源是 `profiles/*.json`；本檔只是 profile manifest 的人類可讀說明。建立專案文件時可以複製模板，但不要把空模板當成完成狀態。

## Layout

- `fixed/`: every generated project should receive these governance docs.
- `conditional/`: profile- or project-type-specific docs.
- `runtime/`: canonical AGENTS template material. Claude and Antigravity adapters must stay thin.
- `docs/`: optional docs templates copied when a project needs ADRs.
- `github/`: optional GitHub community and task templates.

## Profile-Derived Template Map

| Template | Manifest role | Related workflow |
|---|---|---|
| `runtime/README.md` | required by `base` | `startup/00-source-agent-start-here.md` |
| `runtime/START_HERE.md` | generated runtime entrypoint | `startup/00-source-agent-start-here.md` |
| `runtime/AGENTS.md` | required by `base` | `workflows/agent-file-structure.md` |
| `runtime/CLAUDE.md` | generated when `--agent claude` or `--agent all` | `docs/adapters/claude-code.md` |
| `runtime/antigravity/AGENTS.md` | generated when `--agent antigravity` or `--agent all` | `docs/adapters/antigravity.md` |
| `fixed/PROJECT_BRIEF.md` | required by `base` | `workflows/product-shape-tech-route.md` |
| `fixed/SPEC.md` | required by `base` | `startup/01-bootstrap-gates.md` |
| `fixed/CONTEXT.md` | required by `base` | `startup/01-bootstrap-gates.md` |
| `fixed/TASK_CONTRACT.md` | required by `base` | `startup/01-bootstrap-gates.md` |
| `fixed/OPEN_LOOPS.md` | required by `base` | `startup/01-bootstrap-gates.md` |
| `fixed/TECH_STACK.md` | required by `base` | `workflows/product-shape-tech-route.md` |
| `conditional/DATA_MODEL.md` | required by `fullstack-ai` | `workflows/fullstack.md` |
| `conditional/API_CONTRACT.md` | required by `fullstack-ai` | `workflows/fullstack.md` |
| `conditional/ENV_CHECKLIST.md` | required by `fullstack-ai` | `workflows/fullstack.md` |
| `conditional/AI_SECURITY_REVIEW.md` | required by `fullstack-ai` | `workflows/ai-system-design.md` |
| `conditional/RAG_DESIGN.md` | conditional gate when RAG is enabled | `workflows/ai-system-design.md` |
| `conditional/EVAL_PLAN.md` | conditional gate when LLM eval is enabled | `workflows/ai-system-design.md` |
| `conditional/AGENT_RUNTIME.md` | included by `fullstack-ai`, required when production-facing agent behavior exists | `workflows/production-agent.md` |
| `conditional/UI_SPEC.md` | conditional gate for UI surfaces | `workflows/ui-ux.md` |
| `conditional/DESIGN_SYSTEM.md` | conditional gate for screenshot-derived design systems | `workflows/design-system-from-screenshots.md` |
| `conditional/DESIGN_REVIEW.md` | conditional gate for UI review / launch QA | `workflows/ui-ux.md` |
| `conditional/PRESENTATION_BRIEF.md` | conditional gate for slides / one-pagers | `workflows/presentation.md` |
| `conditional/TESTER_HANDOFF.md` | included by `macos`, required when beta handoff exists | `workflows/stage-routing.md` |
| `conditional/MACOS_RELEASE_CHECKLIST.md` | included by `macos`, required for macOS release | `workflows/macos-build-release.md` |
| `templates/docs/adr/0001-template.md` | optional ADR source | `startup/02-document-catalog.md` |
| `templates/github/ISSUE_TEMPLATE/agent-task.yml` | optional GitHub task intake | `scripts/validate-project.mjs` |
| `templates/github/pull_request_template.md` | optional GitHub PR template | `scripts/validate-project.mjs` |

## Update Rule

| Change | Required update |
|---|---|
| Add or remove a generated document | Update `profiles/*.json` first |
| Make a document required | Update `profiles/*.json`, examples, and validator expectations |
| Add a template folder | Update this file and `scripts/validate-starter.mjs` |
| Add a runtime adapter template | Update `scripts/init.mjs`, runtime proof, and adapter docs |
