# TECH_STACK.md

## Runtime

| Layer | Choice | Version | Reason | Alternative considered |
|---|---|---|---|---|
| Platform | macOS | target version in SPEC | TCC behavior matters | web app |
| App shell | SwiftUI / AppKit | project pinned | Native permissions | Electron |
| Package | DMG | current release tool | Tester handoff | zip |

## External Services

| Service | Purpose | Env vars | Owner |
|---|---|---|---|
| none | n/a | n/a | n/a |

## Version Policy

- Record macOS version used for beta QA.

## Constraints

- Bundle id, path, and signing identity must stay stable.
