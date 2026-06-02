# Codex Adapter

Codex uses `AGENTS.md` as the canonical runtime entrypoint.

| Surface | Role |
|---|---|
| Root `AGENTS.md` | Canonical source rules for this starter |
| Generated `AGENTS.md` | Canonical project rules after `init` |
| `START_HERE.md` | First-read project bootstrap sequence |
| `CODEX.md` | Not used; do not add it |

Codex should read `START_HERE.md`, then `AGENTS.md`, then the profile-required project docs before implementation.
