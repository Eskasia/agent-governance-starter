# Claude Code Adapter

Claude Code uses root `CLAUDE.md` as a thin adapter that points to `AGENTS.md`.

| Surface | Role |
|---|---|
| Root `CLAUDE.md` | Thin adapter for Claude Code in this source repo |
| Generated `CLAUDE.md` | Thin adapter generated when `--agent claude` or `--agent all` is used |
| `AGENTS.md` | Canonical rule source |

Claude-specific files must not duplicate the full governance rules. They should point back to `AGENTS.md`.
