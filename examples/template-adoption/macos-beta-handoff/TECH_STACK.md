# TECH_STACK.md

## 技術路線決策

| Field | Decision |
|---|---|
| 決策模式 | user-declared route |
| 唯一主路線 | native macOS app beta package with stable bundle identity |
| 選擇理由 | 第一版風險是 TCC、簽名與 app path 穩定性，必須用 native macOS release surface 驗證 |
| 排除路線 | 不採 web app、iOS app、小程序、純 API、Electron，因為它們不能代表目標 TCC 行為，或會引入非必要 runtime |
| 後期風險 | 簽名身份、bundle id、build path、macOS 版本差異會讓 tester evidence 失真 |
| 重評估條件 | 若測試目標改成跨平台 UI 或不再需要 TCC 權限，再重新評估 |
| 新技術引入 gate | 新增 packaging、notarization、自動更新或 telemetry 工具前，必須更新 MACOS_RELEASE_CHECKLIST 與 TESTER_HANDOFF |

## Runtime

| Layer | Choice | Version | Reason | Alternative considered |
|---|---|---|---|---|
| Frontend | SwiftUI / AppKit | project pinned | Native permissions and menu bar behavior | Web app |
| Backend | n/a | n/a | Beta handoff only validates local app behavior | API service |
| Database | n/a | n/a | No persistent shared data in fixture | SQLite |
| Main framework / SDK | macOS SDK | target version in SPEC | TCC behavior matters | Electron |
| Package manager | n/a | n/a | Native project tooling owns dependencies | npm |
| Deployment | DMG / app path | current release tool | Tester handoff | zip |

## External Services

| Service | Purpose | Owner | Env checklist reference |
|---|---|---|---|
| none | n/a | n/a | n/a |

## Version Policy

| Area | Policy |
|---|---|
| macOS version | Record macOS version used for beta QA |
| Package versions | Native project tooling owns dependencies |
| Upgrade cadence | Re-check before each beta package |

## Constraints

| Constraint | Source | Impact |
|---|---|---|
| Bundle id, path, and signing identity must stay stable | MACOS_RELEASE_CHECKLIST | tester evidence stays comparable |

## Rule

| Rule | Detail |
|---|---|
| Missing layer | Fill unavailable runtime layers with `n/a` |
| New technology gate | New packaging, notarization, auto-update, telemetry, or SDK tools must update release docs |
| Env boundary | Env vars, secrets, service accounts, and credentials belong in `ENV_CHECKLIST.md` |
