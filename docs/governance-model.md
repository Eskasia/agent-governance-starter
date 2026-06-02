# Governance Model

`agent-governance-starter` separates source truth, generated project truth, and optional workflow guidance.

| Layer | Source | Role |
|---|---|---|
| Profile manifests | `profiles/*.json` | Only source of truth for generated document lists and required status |
| Source rules | `AGENTS.md` | Canonical maintenance rules for this starter |
| Generated rules | generated `AGENTS.md` | Canonical agent rules for initialized projects |
| Thin adapters | `CLAUDE.md`, `.agents/AGENTS.md` | Runtime-specific pointers back to `AGENTS.md` |
| Human docs | `docs/`, `startup/`, `workflows/` | Explanation, routing, and conditional playbooks |
| Validation scripts | `scripts/*.mjs` | Mechanical checks for starter and generated projects |

## Flow

| Step | Gate |
|---|---|
| `init` | Copy profile documents and runtime entrypoints |
| Fill docs | Complete Q1-Q9, product route, technical route, and open loops |
| `doctor` | Check required docs are present and filled |
| Agent plan | Convert confirmed docs into task contract steps |
| Implementation | Execute one verified step at a time |
| Validation | Run project-specific checks and runtime proof where relevant |
| Handoff | Record blockers, validation evidence, and next owner |
