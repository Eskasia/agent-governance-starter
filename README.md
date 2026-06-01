# Codex Project Starter

用途：每次開新專案前，先讓 agent 讀這個資料夾。入口只負責分流，不把所有規則塞進同一個檔案。

## Agent 必讀順序

1. 永遠先讀 `00-agent-start-here.md`
2. 永遠讀 `01-bootstrap-gates.md`
3. 永遠讀 `02-required-project-docs.md`
4. 有網站、App、後台、dashboard、landing page 時讀 `04-ui-ux-workflow.md`
5. 有資料庫、Auth、API、webhook、tenant、部署時讀 `03-fullstack-saas.md`
6. 開始實作、驗收或上線前讀 `05-validation-release.md`
7. 不知道該用哪個 skill / tool 時讀 `06-tool-routing.md`
8. 想引用我 GitHub star 的工具補強流程時讀 `07-starred-repo-addons.md`
9. 要做簡報、PPT、slide deck、發表頁、一頁紙、白皮書、履歷、作品集、landing page、PDF 排版時讀 `08-presentation-workflow.md`
10. 需要判斷經驗、規則、流程要寫到哪裡時讀 `09-agent-file-structure.md`
11. 要 build / package macOS app，尤其涉及 Accessibility、Screen Recording、Input Monitoring 時讀 `10-macos-app-build-release.md`
12. 要做 production-facing LLM agent、自動化、多步工具調用或 human approval 時讀 `11-production-agent-workflow.md`
13. 使用者用自然語言描述「目前做到某階段、要交付某種對象或產出某種包」時讀 `12-stage-routing.md`
14. 長任務、大輸出、context 快爆或 compaction 後容易接不上時讀 `13-context-pressure-workflow.md`
15. 要做 RAG、AI agent、MCP、eval pipeline、多租戶 AI SaaS、文件智能或 AI 系統設計時讀 `14-ai-system-design-workflow.md`
16. 有 App 截圖、generated UI、現有 UI 或競品畫面，要反推 Design System、生成設計圖、素材或前端 app 初稿時讀 `15-design-system-from-screenshots.md`

## 給 Agent 的第一句話

```text
這是一個新專案。請先讀 /Users/william/codex-project-starter/README.md，依照任務類型讀取必要子文件。讀完後先列出你讀了哪些檔、判斷這個專案需要哪些條件式文件，然後從 01-bootstrap-gates.md 的問診流程開始。沒有完成問診與文件前，不要寫 code。
```

## 專案內應產出的核心文件

固定產出：`PROJECT_BRIEF.md`、`SPEC.md`、`CONTEXT.md`、`TASK_CONTRACT.md`、`OPEN_LOOPS.md`、`AGENTS.md`、`TECH_STACK.md`。

條件式產出：`UI_SPEC.md`、`DESIGN_SYSTEM.md`、`DESIGN_REVIEW.md`、`DATA_MODEL.md`、`API_CONTRACT.md`、`ENV_CHECKLIST.md`、`PRESENTATION_BRIEF.md`、`TESTER_HANDOFF.md`、`MACOS_RELEASE_CHECKLIST.md`、`AGENT_RUNTIME.md`、`RAG_DESIGN.md`、`EVAL_PLAN.md`、`AI_SECURITY_REVIEW.md`、`docs/adr/*.md`。

收尾分流：事實與來源進 `LLMwiki` / 專案 docs；穩定偏好進 `AGENTS.md`；重複流程進 `Skills/`；可機械攔截的風險進 `Hooks/`；獨立角色進 `Subagents/`；跨團隊同步才進 `Plugins/`。
