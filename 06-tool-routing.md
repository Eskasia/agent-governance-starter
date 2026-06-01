# 06 Tool Routing

## 日常選工具

| 情況 | 工具 |
|---|---|
| 需求、名詞、邊界不清 | `$grill-with-docs` |
| 新功能、bugfix、狀態流程 | `$tdd` 或 smoke check |
| bug 原因不明、測試反覆掛 | `$diagnose` |
| 不熟悉既有 repo / 模組、需要先理解系統脈絡 | `zoom-out`；若已有 `.codegraph/` 再用 CodeGraph |
| UI 方向、狀態模型、domain flow 不確定，正式實作前要先玩一次 | `prototype`；通過後再回正式 repo 實作 |
| 大 repo 查 symbol、route、call graph、impact | CodeGraph，前提是已有 `.codegraph/` |
| 里程碑 review、交接、壓縮上下文 | repomix |
| 階段完成同步文件 | `$neat-freak` |
| 長 thread 或隔天接續 | `$handoff` |
| 長任務、大輸出、context 快爆、compaction 後接不上 | `13-context-pressure-workflow.md`；context-mode 先只作實驗 |
| 可跨專案重用的經驗 | LLMwiki |
| 不確定規則、經驗、流程該寫到哪裡 | `09-agent-file-structure.md` |
| 論文、文獻、citation | `academic-research` 或 `academic-research-suite` |
| OpenAI API / ChatGPT Apps / 官方文件 | `openai-docs`，必要時再用 `chatgpt-apps` |
| 本機或 preview web UI 自動化測試 | `playwright` 或 `webapp-testing` |
| React/shadcn animated icons、hover/tap micro-interaction | Its Hover，依 `04-ui-ux-workflow.md` 使用 |
| App 截圖、generated UI、競品畫面反推 Design System、前端 app 初稿、tokens、icon / 背景素材 | `15-design-system-from-screenshots.md` + `ui-ux-pro-max`；實作後用 Browser 做 side-by-side critique，polish 時按 `04-ui-ux-workflow.md` 選 Taste Skill variant |
| 既有 UI 像模板、視覺普通、需要 anti-slop polish | `design-taste-frontend`；Codex/GPT 任務需要更強約束時用 `gpt-taste` |
| 既有 UI 要重設 hierarchy / spacing / styling | `redesign-existing-projects`，先 audit 再改 |
| 只要產生網頁、行動或 brand kit 參考圖 | `imagegen-frontend-web` / `imagegen-frontend-mobile` / `brandkit`，不要直接當代碼交付 |
| Vercel 部署 | `vercel-deploy` |
| macOS app build、簽名、TCC、DMG、notarization | `10-macos-app-build-release.md`，必要時用 Build macOS Apps plugin |
| production-facing LLM agent、多步 tool use、human approval、背景 automation | `11-production-agent-workflow.md` |
| RAG、AI agent、MCP、eval pipeline、多租戶 AI SaaS、文件智能、AI 系統設計 | `14-ai-system-design-workflow.md` |
| PDF 讀取、產出、版面檢查 | `pdf`；需要高質感文件排版時加 `kami` |
| 一頁紙、白皮書、履歷、作品集、letter、landing page、markdown slides | `kami` |
| 技能建立或安裝 | `skill-creator` / `skill-installer` / `write-a-skill` |
| PRD、issue、triage、review | `to-prd` / `to-issues` / `triage` / `review`；只有已有 issue tracker / label vocabulary 時才用，否則用 `TASK_CONTRACT.md` |
| 安全審查、靜態分析、依賴風險 | `audit-prep-assistant` / `differential-review` / `semgrep` / `codeql` / `supply-chain-risk-auditor` |
| KiCad、PCB、BOM、datasheet、SPICE、EMC | `kicad` / `bom` / `datasheets` / `spice` / `emc` |
| 產品命名、客戶研究、客服工單、簡報文件 | `domain-name-brainstormer` / `lead-research-assistant` / `support-ticket-triage` / `paperjsx` |
| PPT、簡報、slide deck、發表頁 | `Presentations` / `paperjsx` / `guizang-ppt-skill` / `kami` |
| 跨前端/後端/DB/安全/AI/部署任兩類以上 | 先讓 `$codex-auto-expert-team` 判斷是否分工 |

## 文件和知識庫

- `docling-project/docling`、`opendatalab/MinerU`：PDF、Office、簡報轉 Markdown/JSON，再進 LLMwiki。
- `sdyckjq-lab/llm-wiki-skill`：沉澱專案流程、錯誤模式、驗證命令。
- `VectifyAI/PageIndex`、`safishamsi/graphify`：先當研究參考；不要放進主流程，除非有明確 RAG/知識圖譜需求。

## Agent / workflow 參考

- `mattpocock/skills`：工程技能補強；可採用的是 `grill-with-docs`、`tdd`、`diagnose`、`prototype`、`zoom-out`、`handoff`，不要全量啟用。
- `addyosmani/agent-skills`：production-grade engineering skill 參考。
- `garrytan/gstack`：交付 checklist 參考。
- `humanlayer/12-factor-agents`：production-facing LLM agent 架構 gate；已整理到 `11-production-agent-workflow.md`。
- `ombharatiya/ai-system-design-guide`：RAG、agent、memory、eval、security、MLOps、tool-use 的 Library checklist；已整理到 `14-ai-system-design-workflow.md`，版本、價格、模型排行必須現查。
- `dkundel GPT-Image + Codex app building`：前端 app building 的穩定採用點是視覺目標、Codex 實作、Browser 截圖、side-by-side critique；模型名稱與 plugin 能力必須現查。
- `Leonxlnx/taste-skill`：前端審美與 image-first workflow 參考；v2 default 仍標示 experimental，使用時按任務選單一 variant，不全量啟用。
- `microsoft/ai-agents-for-beginners`：學習 agent 架構，不直接塞進日常流程。
- `emcie-co/parlant`：客服 / controlled AI 回覆產品的架構參考。
