# Tool Routing

## 日常選工具

以下 skill 名稱帶 `$` 前綴的是 Codex skill，需要先安裝對應 skill 才能使用。其他 agent runtime 請參考對應技能的安裝方式。

| 情況 | 工具 | 備註 |
|---|---|---|
| 需求、名詞、邊界不清 | `grill-with-docs` | 需安裝 skill |
| 新功能、bugfix、狀態流程 | `tdd` 或 smoke check | 需安裝 skill |
| bug 原因不明、測試反覆掛 | `diagnose` | 需安裝 skill |
| 不熟悉既有 repo / 模組、需要先理解系統脈絡 | `zoom-out`；若已有 `.codegraph/` 再用 CodeGraph | 需安裝 skill |
| UI 方向、狀態模型、domain flow 不確定，正式實作前要先玩一次 | `prototype`；通過後再回正式 repo 實作 | 需安裝 skill |
| 大 repo 查 symbol、route、call graph、impact | CodeGraph，前提是已有 `.codegraph/` | 需安裝 plugin |
| 里程碑 review、交接、壓縮上下文 | repomix | CLI 工具 |
| 常見命令輸出很大、想壓縮 token：`ls/tree/read/grep/git diff/test/lint/tsc/playwright/docker logs` | RTK：`rtk <command>` | CLI 工具；已安裝時優先手動使用，不自動改寫所有命令 |
| 階段完成同步文件 | `neat-freak` | 需安裝 skill |
| 長 thread 或隔天接續 | `handoff` | 需安裝 skill |
| 長任務、大輸出、context 快爆、compaction 後接不上 | 見 `docs/experiments/context-mode.md` | 實驗性 |
| 可跨專案重用的經驗 | LLMwiki | 需安裝 skill |
| 不確定規則、經驗、流程該寫到哪裡 | `workflows/agent-file-structure.md` | 本 repo |
| 論文、文獻、citation | `academic-research` | 需安裝 skill |
| 本機或 preview web UI 自動化測試 | Playwright | 內建或需安裝 |
| React/shadcn animated icons、hover/tap micro-interaction | Its Hover，依 `workflows/ui-ux.md` 使用 | npm 套件 |
| App 截圖 → Design System → 前端初稿 | `workflows/design-system-from-screenshots.md` | 本 repo |
| 既有 UI 像模板、視覺普通、需要 anti-slop polish | `design-taste-frontend` | 需安裝 skill |
| 既有 UI 要重設 hierarchy / spacing / styling | `redesign-existing-projects` | 需安裝 skill |
| 只要產生參考圖 | image generation skill | 需安裝 skill |
| Vercel 部署 | `vercel-deploy` | 需安裝 skill |
| macOS app build、簽名、TCC、DMG、notarization | `workflows/macos-build-release.md` | 本 repo |
| production-facing LLM agent、多步 tool use | `workflows/production-agent.md` | 本 repo |
| RAG、AI agent、MCP、eval、AI 系統設計 | `workflows/ai-system-design.md` | 本 repo |
| PDF 讀取、產出、版面檢查 | `pdf` skill | 需安裝 skill |
| 一頁紙、白皮書、履歷、作品集、landing page | `kami` | 需安裝 skill |
| 技能建立或安裝 | `skill-creator` / `skill-installer` | 需安裝 skill |
| PRD、issue、triage、review | `to-prd` / `to-issues` / `triage`；無 issue tracker 時用 `TASK_CONTRACT.md` | 需安裝 skill |
| 安全審查、靜態分析、依賴風險 | `audit-prep-assistant` / `semgrep` / `codeql` | 需安裝 skill |
| PPT、簡報、slide deck | 見 `workflows/presentation.md` | 本 repo |
| 跨前端/後端/DB/安全/AI/部署任兩類以上 | 先由 lead agent 判斷是否分工 | 視 runtime 而定 |

## RTK 使用規則

- RTK 是 `rtk-ai/rtk` 的 CLI proxy，用途是把常見 shell 輸出在進入 LLM context 前壓縮；先用 `rtk --version` 和 `rtk gain` 確認裝的是 Rust Token Killer，不是同名 Rust Type Kit。
- 適合：`rtk ls`、`rtk tree`、`rtk read`、`rtk grep`、`rtk git status`、`rtk git diff`、`rtk test <cmd>`、`rtk lint`、`rtk tsc`、`rtk playwright`、`rtk docker logs`。
- 不適合：需要完整原文、精確行號、完整 diff、完整測試 log、完整 JSON、完整錯誤堆疊、法務/安全證據保存時；這些情況用原生命令並加範圍限制，例如 `sed -n '1,160p' file`。
- 不在 Codex 全域啟用 Claude hook；Codex 內預設採「手動前綴」策略，只有當輸出可能很大時才加 `rtk`。
- RTK 輸出只能做定位和摘要；真正要改檔前，仍要讀相關原始檔片段。
- 用完可跑 `rtk gain` 看節省統計；沒有 tracking data 不代表不能用，只代表還沒累積資料。
