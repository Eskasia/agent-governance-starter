# agent-governance-starter

> Agent-native project governance starter for Codex, Claude Code, and Antigravity.
> Clone, initialize the project docs, run doctor, then let the agent start from a governed intake instead of a blank prompt.

用途：替新專案建立一組可執行的 agent governance 文件，讓 agent 先完成問診、文件、任務合約與驗證規則，再開始寫 code。它不是單一 PRD 模板，也不是把所有規則塞進 `AGENTS.md` 的 prompt dump。

## Quick Start

```bash
# 1. Clone this repo or keep it as a local reference
git clone https://github.com/Eskasia/agent-governance-starter.git

# 2. Initialize a new project with Codex defaults
node agent-governance-starter/scripts/init.mjs ./my-new-project

# 3. Check the generated project docs
node agent-governance-starter/scripts/doctor.mjs ./my-new-project

# 4. For all supported runtimes and a fullstack AI profile
node agent-governance-starter/scripts/init.mjs ./my-new-project --agent all --profile fullstack-ai
```

## First Message to Your Agent

When using this repo as a reference:

```text
This is a new project. Read startup/00-agent-start-here.md, then startup/01-bootstrap-gates.md,
then startup/02-required-project-docs.md. List which files you read, which conditional documents
this project needs, and start the Q1-Q9 intake. Do not write code until intake and documents
are complete.
```

When using a generated project:

```text
Read START_HERE.md and the runtime instruction file for this agent. List which files you read,
which conditional documents this project needs, and start the Q1-Q9 intake. Do not write code
until intake and documents are complete.
```

Runtime entrypoints:

| Runtime | File |
|---|---|
| Codex | `AGENTS.md` |
| Claude Code | `CLAUDE.md` |
| Antigravity | `ANTIGRAVITY.md` |

## How It Works

```text
Q1-Q9 intake -> fixed documents -> conditional documents -> 5-10 step plan -> implementation -> validation -> handoff
```

## File Map

### Startup

| File | Purpose |
|---|---|
| `startup/00-agent-start-here.md` | Mandatory rules, reporting format, and intake principles |
| `startup/01-bootstrap-gates.md` | Q1-Q9 intake and gate conditions |
| `startup/02-required-project-docs.md` | Fixed and conditional document requirements |

### Workflows

| File | When to Read |
|---|---|
| `workflows/fullstack.md` | Database, Auth, API, webhook, tenant, deployment |
| `workflows/ui-ux.md` | Website, app, dashboard, landing page, product UI |
| `workflows/validation-release.md` | Implementation, acceptance, release checks |
| `workflows/tool-routing.md` | Choosing the right skill, tool, or workflow |
| `workflows/recommended-tools.md` | Candidate skill and tool sources |
| `workflows/presentation.md` | Slides, one-pager, white paper, resume, portfolio |
| `workflows/agent-file-structure.md` | Where agent rules and learned workflows should live |
| `workflows/macos-build-release.md` | macOS build, signing, TCC, packaging, release |
| `workflows/production-agent.md` | Production-facing LLM agent or automation |
| `workflows/stage-routing.md` | Mid-project milestone routing |
| `workflows/ai-system-design.md` | RAG, agent, MCP, eval, AI system design |
| `workflows/design-system-from-screenshots.md` | Screenshot-to-design-system workflow |

### Templates

See `templates/README.md` for the full trigger table.

Fixed project documents:

```text
PROJECT_BRIEF.md
SPEC.md
CONTEXT.md
TASK_CONTRACT.md
OPEN_LOOPS.md
AGENTS.md
TECH_STACK.md
```

Conditional project documents:

```text
UI_SPEC.md
DESIGN_SYSTEM.md
DESIGN_REVIEW.md
DATA_MODEL.md
API_CONTRACT.md
ENV_CHECKLIST.md
PRESENTATION_BRIEF.md
TESTER_HANDOFF.md
MACOS_RELEASE_CHECKLIST.md
AGENT_RUNTIME.md
RAG_DESIGN.md
EVAL_PLAN.md
AI_SECURITY_REVIEW.md
docs/adr/*.md
```

### Scripts

| Script | Purpose |
|---|---|
| `scripts/init.mjs` | Generate project docs and runtime entrypoints |
| `scripts/doctor.mjs` | Check a generated project for missing or unfilled docs |
| `scripts/validate-starter.mjs` | Check starter consistency, links, fixtures, prompts, and smoke paths |

## Init Profiles

| Profile | Copies |
|---|---|
| `base` | Fixed documents only |
| `fullstack-ai` | Fixed docs plus API, data, env, agent, RAG, eval, and AI security docs |
| `macos` | Fixed docs plus macOS release and tester handoff docs |
| `presentation` | Fixed docs plus presentation, UI, and design review docs |
| `agent` | Fixed docs plus production agent, eval, RAG, env, and AI security docs |

## Validation

```bash
node scripts/validate-starter.mjs .

tmp=$(mktemp -d)
node scripts/init.mjs "$tmp/base" --agent codex
node scripts/doctor.mjs "$tmp/base"

node scripts/doctor.mjs --strict examples/template-adoption/fullstack-ai-saas
node scripts/doctor.mjs --strict examples/template-adoption/macos-beta-handoff
```

## Public Release Boundaries

- This starter provides governance documents and workflow routing, not production code.
- External adoption should be described only after there is real external usage evidence.
- Secrets, private user data, raw tester identifiers, and deployment credentials do not belong in generated project docs.

## License

MIT - see `LICENSE`.
