# Recommended Tools

推薦的 skill 和工具來源，按觸發條件選用。

## 核心 Skill 來源

| 來源 Repo | 類別 | 推薦安裝 | 備註 |
|---|---|---|---|
| `openai/skills` | 官方 Codex skill | OpenAI docs, Playwright, PDF, Vercel deploy, skill creator, CLI creator | 不需全量安裝 |
| `mattpocock/skills` | 工程 workflow | grill-with-docs, tdd, diagnose, prototype, zoom-out, handoff, neat-freak | 依需求選裝 |
| `trailofbits/skills` | 安全審查 | audit prep, differential review, semgrep, codeql, supply chain | 安全需求時安裝 |
| `Leonxlnx/taste-skill` | UI/UX 審美 | design-taste-frontend, image-to-code, redesign | 依 UI 方向選 variant |
| `voidful/academic-skills` | 論文研究 | academic-research | 學術任務時安裝 |
| `op7418/guizang-ppt-skill` | 簡報 | guizang-ppt-skill | HTML 網頁簡報用 |
| `tw93/Kami` | 文件排版 | kami | one-pager, resume, portfolio, landing page |

## UI / 前端補強

| Repo | 觸發條件 | 用途 |
|---|---|---|
| `nextlevelbuilder/ui-ux-pro-max-skill` | 需要 UI 設計系統方向 | 設計系統生成 |
| `pbakaus/impeccable` | 上線前 UI 驗收 | audit / polish |
| `nexu-io/open-design` | 方向不確定需要原型 | disposable prototype |
| `VoltAgent/awesome-design-md` | 需要 DESIGN.md 或品牌設計語言 | 設計文件參考 |
| `DavidHDev/react-bits` | 需要高質感 React 元件 | 動畫 / 展示參考 |
| `uiverse-io/galaxy` | 需要 CSS/Tailwind 小元件 | UI 靈感 |
| `itshover/itshover` | 需要 animated icons | hover/tap micro-interaction |
| `shadcn-ui/ui` | 需要可維護 app 元件 | 依 UI_SPEC 客製 |

## 工程 / 知識管理

| Repo | 觸發條件 | 用途 |
|---|---|---|
| `colbymchenry/codegraph` | 大 repo 需要結構理解 | symbol / call graph 查詢 |
| `rtk-ai/rtk` | 常見 CLI 輸出過大、token 壓力高 | `rtk ls/read/grep/git diff/test/lint/tsc/playwright` 壓縮輸出；Codex 內採手動前綴 |
| `sdyckjq-lab/llm-wiki-skill` | 需要沉澱跨專案知識 | 流程、錯誤模式、驗證命令 |
| `docling-project/docling` | 需要文件轉 Markdown/JSON | PDF / Office 轉換 |
| `opendatalab/MinerU` | 複雜 PDF / Office 解析 | 結構化文件抽取 |
| `addyosmani/agent-skills` | 工程品質 skill 參考 | 不直接安裝，作為設計參考 |

## 架構 / AI 系統參考

| Repo | 觸發條件 | 用途 |
|---|---|---|
| `humanlayer/12-factor-agents` | production agent 設計 | 已整理到 `workflows/production-agent.md` |
| `ombharatiya/ai-system-design-guide` | AI 系統設計 | 已整理到 `workflows/ai-system-design.md` |
| `microsoft/ai-agents-for-beginners` | 學習 agent 架構 | 教學參考，不直接進流程 |
| `emcie-co/parlant` | 客服 AI / 受控回覆 | 架構參考 |
| `ashishps1/awesome-system-design-resources` | 系統架構設計 | ADR 前置參考 |

## 安全

| Repo | 觸發條件 | 用途 |
|---|---|---|
| `projectdiscovery/nuclei` | 上線前 security smoke | 只用在自有 URL |

## 專業領域

| Repo | 觸發條件 | 用途 |
|---|---|---|
| `aklofas/kicad-happy` | EDA / PCB / KiCad 任務 | 完整 12 個 electronics skills |

## 安裝原則

- 不全量安裝任何 skill 合集；依任務需求選裝。
- 專業領域 skill 平常不觸發，只在對應任務才啟用。
- 版本、價格、模型排行等資訊必須現查，不依賴文件中的靜態數值。
- context/token 壓力緩解工具（如 `mksglu/context-mode`）先以實驗方式使用，見 `docs/experiments/context-mode.md`。
- RTK 是 CLI 工具，不當成 Codex skill 全量安裝；除非要開發 RTK 本身，否則不安裝它 repo 內的 Rust/TDD/PR triage skills。
