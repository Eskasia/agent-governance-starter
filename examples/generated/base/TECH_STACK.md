# TECH_STACK.md

## 技術路線決策

| Field | Decision |
|---|---|
| 決策模式 |  |
| 唯一主路線 |  |
| 選擇理由 |  |
| 排除路線 |  |
| 後期風險 |  |
| 重評估條件 |  |
| 新技術引入 gate |  |

## Runtime

| Layer | Choice | Version | Reason | Alternative considered |
|---|---|---|---|---|
| Frontend |  |  |  |  |
| Backend |  |  |  |  |
| Database |  |  |  |  |
| Main framework / SDK |  |  |  |  |
| Package manager |  |  |  |  |
| Deployment |  |  |  |  |

## External Services

| Service | Purpose | Owner | Env checklist reference |
|---|---|---|---|
|  |  |  | `ENV_CHECKLIST.md` |

## Version Policy

| Area | Policy |
|---|---|
| Runtime versions |  |
| Package versions |  |
| Upgrade cadence |  |

## Constraints

| Constraint | Source | Impact |
|---|---|---|
|  |  |  |

## Rule

| Rule | Detail |
|---|---|
| Missing layer | 沒有某一層時填 `n/a` 並寫原因 |
| New technology gate | 每次引入新框架、SDK、provider、資料庫、queue、agent framework 或 MCP server，都要回到本文件檢查是否符合唯一主路線 |
| Env boundary | Env vars、secrets、service accounts、provider credentials 只寫入 `ENV_CHECKLIST.md` |
