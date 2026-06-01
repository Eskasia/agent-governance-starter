# codex-project-starter

> Agent-native project bootstrap kit for Codex, Claude Code, and Antigravity.
> Clone → init → let your agent handle the rest.

用途：每次開新專案前，先讓 agent 讀這個資料夾。入口只負責分流，不把所有規則塞進同一個檔案。

## Quick Start

```bash
# 1. Clone this repo (or keep it as a local reference)
git clone https://github.com/your-username/codex-project-starter.git

# 2. Initialize a new project with fixed document templates
node codex-project-starter/scripts/init.mjs ./my-new-project

# 3. Tell your agent the first message (see below)
```

## First Message to Your Agent

```text
This is a new project. Read startup/00-agent-start-here.md, then 01-bootstrap-gates.md,
then 02-required-project-docs.md. List which files you read, which conditional documents
this project needs, and start the Q1-Q9 intake. Do not write code until intake and
documents are complete.
```

For runtime-specific instructions, see `CODEX.md`, `CLAUDE.md`, or use this repo directly with Antigravity.

## How It Works

```text
Q1-Q9 問診 → 固定文件產出 → 條件式文件補齊 → 計畫（5-10 步）→ 實作 → 驗證 → 收尾分流
```

## File Map

### Startup（必讀）

| File | Purpose |
|---|---|
| `startup/00-agent-start-here.md` | 不可跳過的規則、回報格式、問診原則 |
| `startup/01-bootstrap-gates.md` | Q1-Q9 問診、進下一關條件 |
| `startup/02-required-project-docs.md` | 固定文件 + 條件式文件清單 |

### Workflows（按需查閱）

| File | When to Read |
|---|---|
| `workflows/fullstack.md` | 有資料庫、Auth、API、webhook、tenant、部署 |
| `workflows/ui-ux.md` | 有網站、App、後台、dashboard、landing page |
| `workflows/validation-release.md` | 開始實作、驗收或上線前 |
| `workflows/tool-routing.md` | 不知道該用哪個 skill / tool |
| `workflows/recommended-tools.md` | 想引用推薦工具補強流程 |
| `workflows/presentation.md` | 簡報、PPT、slide deck、白皮書、履歷、作品集 |
| `workflows/agent-file-structure.md` | 判斷經驗、規則、流程要寫到哪裡 |
| `workflows/macos-build-release.md` | build / package macOS app |
| `workflows/production-agent.md` | production-facing LLM agent、自動化、多步工具調用 |
| `workflows/stage-routing.md` | 使用者描述「目前做到某階段」時做階段分流 |
| `workflows/ai-system-design.md` | RAG、AI agent、MCP、eval pipeline、AI 系統設計 |
| `workflows/design-system-from-screenshots.md` | 從截圖反推 Design System、生成設計圖或素材 |

### Templates

See `templates/README.md` for the full list. Fixed documents: `PROJECT_BRIEF.md`, `SPEC.md`, `CONTEXT.md`, `TASK_CONTRACT.md`, `OPEN_LOOPS.md`, `AGENTS.md`, `TECH_STACK.md`.

### Scripts

| Script | Purpose |
|---|---|
| `scripts/init.mjs` | Copy templates to a new project directory |
| `scripts/validate-starter.mjs` | Check starter consistency (cross-references, unique prefixes, fixtures) |

## Project Output Documents

固定產出：`PROJECT_BRIEF.md`、`SPEC.md`、`CONTEXT.md`、`TASK_CONTRACT.md`、`OPEN_LOOPS.md`、`AGENTS.md`、`TECH_STACK.md`。

條件式產出：`UI_SPEC.md`、`DESIGN_SYSTEM.md`、`DESIGN_REVIEW.md`、`DATA_MODEL.md`、`API_CONTRACT.md`、`ENV_CHECKLIST.md`、`PRESENTATION_BRIEF.md`、`TESTER_HANDOFF.md`、`MACOS_RELEASE_CHECKLIST.md`、`AGENT_RUNTIME.md`、`RAG_DESIGN.md`、`EVAL_PLAN.md`、`AI_SECURITY_REVIEW.md`、`docs/adr/*.md`。

收尾分流：事實與來源進 `LLMwiki` / 專案 docs；穩定偏好進 `AGENTS.md`；重複流程進 `Skills/`；可機械攔截的風險進 `Hooks/`；獨立角色進 `Subagents/`；跨團隊同步才進 `Plugins/`。

## Validation

```bash
node scripts/validate-starter.mjs .
```

## License

MIT — see `LICENSE`.
