# CONTEXT.md

## Shared language

| Term | Meaning | Do not confuse with |
|---|---|---|
| TCC | macOS privacy permission database | app preference |
| Bundle id | App identity used by macOS | app display name |
| Signing identity | Code signing certificate identity | Team name only |

## Roles

| Role | Goal | Permission / boundary |
|---|---|---|
| Tester | Verify app launch and permissions | Does not debug build system |
| Developer | Prepare package and checklist | Owns signing decisions |

## Data objects

| Object | Meaning | Source of truth |
|---|---|---|
| App bundle | Built `.app` | release output |
| DMG | Package for tester | release output |

## Existing constraints

- App must be launched from fixed path.

## Decisions already made

- Use beta handoff before production release.
