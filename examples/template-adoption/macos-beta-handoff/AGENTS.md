# AGENTS.md

## Project Rules

- Do not test TCC from random build paths.

## Commands

| Purpose | Command |
|---|---|
| Verify signing | `codesign -dv --verbose=4 /path/to/App.app` |
| Verify Gatekeeper | `spctl --assess --verbose /path/to/App.app` |

## Verification

- Fixed path launch and permission prompts must be documented.

## Do Not

- Do not reset tester permissions without telling them.

## File Ownership

- Release checklist stays with the main agent.

## Subdirectory Rules

- `release/` contains package artifacts and QA notes.
