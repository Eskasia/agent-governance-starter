# agent-governance-starter

> Agent-native project governance starter for Codex, Claude Code, and Antigravity.

[![CI](https://github.com/Eskasia/agent-governance-starter/actions/workflows/validate-starter.yml/badge.svg)](https://github.com/Eskasia/agent-governance-starter/actions/workflows/validate-starter.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node >=20](https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg)](package.json)

`agent-governance-starter` is a governance bootstrap generator. It creates project intake docs, task contracts, runtime entrypoints, and doctor checks before an AI coding agent starts implementation.

It is not a runtime framework, not an app template, not a PRD prompt pack, and not a multi-agent orchestrator.

## Fit

| Good fit | Not a fit |
|---|---|
| New projects that need intake, docs, task contracts, and agent guardrails before code | Projects looking for a web/app/backend runtime scaffold |
| Teams that want profile-driven required docs and doctor checks | Teams that want a large multi-agent orchestration framework |
| Codex, Claude Code, and Antigravity workflows that need thin runtime adapters | Projects that want root `CODEX.md` or duplicated per-agent rule files |

## Flow

```text
init -> fill docs -> doctor -> agent plan -> implementation -> validation -> handoff
```

## 60-second start

```bash
git clone https://github.com/Eskasia/agent-governance-starter.git

node agent-governance-starter/scripts/init.mjs ./my-new-project --agent codex --profile base
node agent-governance-starter/scripts/doctor.mjs ./my-new-project
```

For all supported runtime adapters and the fullstack AI profile:

```bash
node agent-governance-starter/scripts/init.mjs ./my-new-project --agent all --profile fullstack-ai
```

Generated base project tree:

```text
my-new-project/
  README.md
  START_HERE.md
  PROJECT_BRIEF.md
  SPEC.md
  CONTEXT.md
  TASK_CONTRACT.md
  OPEN_LOOPS.md
  TECH_STACK.md
  AGENTS.md
  .agent-governance.json
```

First agent prompt:

```text
Read START_HERE.md and the runtime entrypoint for this agent. List files read, fixed documents present, conditional documents likely needed, product shape / technology route mode, and current blockers. Start Q1-Q9 intake one question at a time. Do not write code until intake, product shape / technology route, required docs, TASK_CONTRACT.md, and OPEN_LOOPS.md are confirmed.
```

Expected doctor signal on a fresh project:

```text
Project doctor: my-new-project
Profile: base
Required documents:
  OK README.md
  WARN Unfilled template: PROJECT_BRIEF.md
  WARN Unfilled template: SPEC.md
```

Fresh templates produce warnings until the project documents are filled.

Doctor pass/fail standard:

| Signal | Meaning |
|---|---|
| `ready` | Required docs are present and filled; implementation may proceed if `OPEN_LOOPS.md` has no blocker |
| `warning` | Required docs exist but at least one template, route decision, task contract, or open loop still needs review |
| `missing` | A required profile document is absent; implementation must not start |
| `--strict` failure | Warnings count as failures for release or handoff checks |

## What it generates

| Output | Purpose |
|---|---|
| `README.md` | Generated project entrypoint with read order and doctor command |
| `START_HERE.md` | Read order, Q1-Q9 intake, profile documents, and gate before code |
| `.agent-governance.json` | Machine-readable profile metadata for `doctor` |
| `PROJECT_BRIEF.md`, `SPEC.md`, `CONTEXT.md` | Problem, product shape, scope, acceptance criteria, and shared language |
| `TASK_CONTRACT.md`, `OPEN_LOOPS.md`, `TECH_STACK.md` | Executable task plan, unresolved decisions, product technology route, and verified commands |
| `AGENTS.md` | Canonical project rule source |
| Conditional docs | API, data, env, RAG, eval, AI security, macOS release, tester handoff |
| Runtime adapters | Claude thin adapter and Antigravity `.agents/` skills when requested |

## Supported agents

| Agent | Generated entrypoint | Rule boundary |
|---|---|---|
| Codex | `AGENTS.md` | canonical source of truth |
| Claude Code | `CLAUDE.md` with `@AGENTS.md` | thin adapter only |
| Antigravity | `.agents/AGENTS.md` and `.agents/skills/*/SKILL.md` | thin adapter and skills only |

Antigravity source guidance lives in `docs/adapters/antigravity.md`; generated projects use `.agents/AGENTS.md`.

## Profiles

| Profile | Copies |
|---|---|
| `base` | Fixed governance documents only |
| `fullstack-ai` | Base plus required data, API, env, and AI security docs; RAG and eval are conditional gates |
| `macos` | Base plus macOS release and tester handoff docs |

Profiles live in `profiles/*.json`; scripts read those manifests instead of hardcoding document lists.

## Validation

```bash
npm run check
npm run validate
npm run smoke:base
npm run smoke:fullstack
npm run fixtures
npm run ci
```

Fixture examples live under `examples/template-adoption/` and include expected doctor JSON for the base-minimal case.

## Runtime Proof

Runtime proof commands validate generated Codex, Claude Code, and Antigravity entrypoints in mock mode by default. Real runtime proof is opt-in and only runs when `RUNTIME_PROOF_REAL=1` is set with the matching local CLI available.

```bash
npm run runtime:proof
RUNTIME_PROOF_REAL=1 npm run runtime:proof
```

## Source repo map

| Path | Purpose |
|---|---|
| `.github/` | CI workflows, issue templates, PR template, and release notes config |
| `AGENTS.md` | Canonical maintenance rules for this starter |
| `docs/governance-model.md` | Governance layer model |
| `docs/runtime-proof.md` | Mock and opt-in real runtime proof contract |
| `docs/adapters/` | Codex, Claude Code, and Antigravity adapter notes |
| `startup/00-source-agent-start-here.md` | Source-agent behavior and reporting format |
| `startup/01-bootstrap-gates.md` | Q1-Q9 intake gates |
| `startup/02-document-catalog.md` | Profile-derived document catalog |
| `workflows/product-shape-tech-route.md` | Product shape and technology route decision gate |
| `workflows/skill-and-plugin-adoption.md` | External repo, skill, plugin, and SDK adoption gate |
| `templates/fixed/` | Always generated governance docs |
| `templates/conditional/` | Profile- or project-type-specific docs |
| `templates/runtime/` | Canonical runtime template material |
| `profiles/` | Profile manifests |
| `schemas/` | JSON Schemas for profile, project config, task contract, and doctor output |
| `scripts/` | `init`, `doctor`, starter validation, generated-project validation, and lint checks |
| `prompts/` | Pasteable first prompts for supported runtime adapters |
| `tests/runtime/` | Runtime proof expected headings, schema, and skill fixture |
| `workflows/` | Human-readable workflow routing |
| `examples/template-adoption/` | Filled fixtures and expected doctor output |
| `examples/generated/` | Generated base and fullstack-ai examples |
| `examples/transcripts/` | First-run transcript examples for supported agents |

## Community

| Area | Link |
|---|---|
| Issues | `.github/ISSUE_TEMPLATE/` |
| Pull requests | `.github/pull_request_template.md` |
| Security | `SECURITY.md` |
| Contributing | `CONTRIBUTING.md` |
| Code of conduct | `CODE_OF_CONDUCT.md` |
| Release notes | `.github/release.yml` |

## Public boundaries

- Keep public positioning conservative: this is a governance bootstrap generator.
- Do not add app example code or runtime framework behavior.
- Do not claim external adoption without evidence.
- Do not store secrets, raw tester identifiers, or deployment credentials in generated docs.

## License

MIT - see `LICENSE`.
