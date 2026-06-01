# 07 Starred Repo Addons

這些是從 GitHub starred repos 補進工作流的候選，只在觸發條件出現時使用。

## 已進主流程

| Repo | 放進哪裡 |
|---|---|
| `openai/skills` | 官方 Codex skill catalog；已安裝常用基礎能力：OpenAI docs、Playwright、PDF、Vercel deploy、skill creator/installer、CLI creator、ChatGPT Apps |
| `ComposioHQ/awesome-codex-skills` | 百寶箱清單；只安裝高頻少數：domain、lead、support ticket、webapp testing、MCP builder、deploy pipeline、content、PaperJSX、spreadsheet、meeting notes |
| `mattpocock/skills` | 工程 workflow；既有核心 skill 已保留，新增 PRD、issue、triage、review、ubiquitous language、caveman、grill-me、write-a-skill |
| `trailofbits/skills` | 安全與審查；已安裝 audit prep、differential review、semgrep、codeql、insecure defaults、supply chain、property-based testing、second opinion |
| `aklofas/kicad-happy` | EDA / PCB / KiCad；已安裝完整 12 個 electronics skills |
| `voidful/academic-skills` | 論文與學術研究；已安裝 `academic-research` 總入口 |
| `op7418/guizang-ppt-skill` | 網頁 PPT / 橫向翻頁 / 雜誌風 / 瑞士風簡報；已安裝 `guizang-ppt-skill` |
| `tw93/Kami` | 高質感文件與 landing page 排版；已安裝 `kami`，用於 one-pager、white paper、resume、portfolio、letter、slide deck、static landing page |
| `nextlevelbuilder/ui-ux-pro-max-skill` | UI 設計系統方向 |
| `Leonxlnx/taste-skill` | 防 AI 模板味 |
| `pbakaus/impeccable` | 上線前 UI audit/polish |
| `nexu-io/open-design` | disposable prototype |
| `colbymchenry/codegraph` | 大 repo 結構理解 |
| `sdyckjq-lab/llm-wiki-skill` | 個人知識庫 |

## 建議作為參考，不強制安裝

| Repo | 觸發條件 |
|---|---|
| `VoltAgent/awesome-design-md` | 需要 DESIGN.md、品牌設計語言、landing page 方向 |
| `DavidHDev/react-bits` | 需要高質感 React 動畫或展示元件 |
| `uiverse-io/galaxy` | 需要 Tailwind/CSS 小元件靈感 |
| `itshover/itshover` | 需要 Next.js / shadcn / React animated icons；用於有意圖的 hover/tap icon 動效 |
| `shadcn-ui/ui` | 需要可維護、可客製的正式 app 元件 |
| `projectdiscovery/nuclei` | preview/production URL 上線前 security smoke |
| `docling-project/docling` | 文件轉 Markdown/JSON |
| `opendatalab/MinerU` | 複雜 PDF / Office 文件解析 |
| `emcie-co/parlant` | 客服 AI、受控回覆、policy-driven conversation |
| `ashishps1/awesome-system-design-resources` | 架構設計、scalability、ADR 前置參考 |
| `microsoft/ai-agents-for-beginners` | 學習 agent 架構 |
| `addyosmani/agent-skills` | 工程品質 skill 參考 |
| `RoggeOhta/awesome-codex-cli` | Codex CLI 工具/插件索引；作為找工具參考，不直接安裝 |
| `mksglu/context-mode` | 長任務、大輸出、context/token 壓力、compaction continuity；先作實驗，不放進預設主流程 |

## 暫不放進主流程

- 帳號切換、桌面 agent harness、token 壓縮、模型推理引擎：只有你明確要優化 Codex 使用環境時再看。
- 金融、交易、股票、TTS、內容成長：屬於特定專案 domain，不該污染全端初始流程；履歷/作品集若是排版交付才用 `kami`。
- 多 agent 框架：先用現有 `$codex-auto-expert-team`，不要再疊第二套編排系統。
- context/token 壓縮層：`mksglu/context-mode` 先以 `13-context-pressure-workflow.md` 實驗，不替代 LLMwiki、handoff、OPEN_LOOPS。

## 安裝原則

- 不全量安裝 `ComposioHQ/awesome-codex-skills`，因為可發現 880 個 skill，會讓 skill 清單過度膨脹。
- 官方 `openai/skills` 也只安裝高頻基礎能力，不把所有平台部署與 Figma skill 都裝進全域。
- KiCad 屬於獨立專業領域，安裝完整套件；平常不觸發，只有 EDA/PCB 任務才用。
