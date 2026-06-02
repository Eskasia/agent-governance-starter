# Prompts

Pasteable first prompts for initialized projects.

| Prompt | Use when | Runtime |
|---|---|---|
| `codex-new-project.md` | Starting a generated project in Codex | Codex reads `START_HERE.md` and `AGENTS.md` |
| `claude-new-project.md` | Starting a generated project in Claude Code | Claude reads `START_HERE.md`, `CLAUDE.md`, and `AGENTS.md` |
| `antigravity-new-project.md` | Starting a generated project in Antigravity | Antigravity reads `START_HERE.md`, `.agents/AGENTS.md`, and generated skills |

| Rule | Detail |
|---|---|
| No code first | Prompts must keep agents before implementation until Q1-Q9, product route, required docs, task contract, and open loops are confirmed |
| Thin adapters | Runtime-specific prompt text must point back to canonical `AGENTS.md` |
| Profile-aware | Agents should report required, included, and conditional docs from generated project files |
