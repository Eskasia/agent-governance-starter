# 04 UI UX Workflow

## 四層 UI 工具選擇

| 情況 | 用什麼 | 產出 |
|---|---|---|
| 方向不確定，需要先看畫面感 | Open Design | disposable prototype / HTML demo |
| UI 方向、互動流程、狀態模型或資料模型還不確定 | `prototype` | 可丟棄互動原型、UI variants 或 terminal state-model demo |
| 要定產品類型、設計系統、配色、字體、版面 | `ui-ux-pro-max` | UI_SPEC 的 design direction |
| 有截圖、generated UI 或現有 App，要反推可交付設計規範、設計圖、素材或可互動初稿 | `workflows/design-system-from-screenshots.md` + `ui-ux-pro-max` | DESIGN_SYSTEM、screen map、assets manifest、side-by-side critique |
| 畫面能跑但像 AI 模板、太普通 | `design-taste-frontend` | anti-slop 改版方向 |
| 已決定視覺方向，需要更強前端審美規則 | Taste Skill variants | 高質感 UI 語言、動效、密度與版面約束 |
| 要上線或給人試用前 | `impeccable audit/polish` | DESIGN_REVIEW |

## UI_SPEC 必填

- register：brand/marketing 或 product/app。
- 使用情境：誰在什麼設備、什麼壓力下使用。
- 主流程：最多 3 條核心路徑。
- 核心畫面：頁面、主要元件、資料密度。
- 狀態：loading、empty、error、disabled、focus、hover/tap。
- 響應式：mobile、tablet、desktop。
- 設計來源：Open Design、awesome-design-md、shadcn/ui、React Bits、Uiverse、Its Hover。
- 明確不要：模板味、過度卡片、AI 紫藍漸層、無意義動畫、看不懂的 icon。

## AI 前端 App Building Loop

- 若只是要探索方向，先做 `prototype`；選定方向後再回到正式 repo 實作，不把原型當 production code。
- 只要任務是 website、dashboard、prototype、互動工具、mobile/native app 初稿，先建立視覺目標：screenshot、wireframe、generated UI 或明確 design spec。
- Codex 實作時要把視覺目標當規格，不只是靈感；必要時補查真實資料來源或標明 demo data。
- 完成後用 Browser/Chrome 截圖，和原始視覺目標做 side-by-side critique。
- 差異要分成 layout、spacing、typography、color、assets、interaction、data realism，再逐項修正。
- 不要只交付靜態仿圖；至少完成核心流程中的可操作狀態。

## Taste Skill 分流

| 情況 | 使用 |
|---|---|
| 一般前端 anti-slop、版面/字體/間距/動效補強 | `design-taste-frontend` |
| Codex / GPT 任務需要更強 layout variance、GSAP、動效與審美約束 | `gpt-taste` |
| 已有截圖或生成圖，要走 image -> analyze -> code | `image-to-code` |
| 既有專案要先 audit 再重設 layout、spacing、hierarchy、styling | `redesign-existing-projects` |
| 已確定高端、安靜、premium 方向 | `high-end-visual-design` |
| 已確定 editorial / Notion / Linear 式簡潔產品方向 | `minimalist-ui` |
| 已確定 Swiss / industrial / brutalist 方向 | `industrial-brutalist-ui` |
| 只需要生成設計參考圖，不要代碼 | `imagegen-frontend-web`、`imagegen-frontend-mobile`、`brandkit` |

使用規則：

- 不同 taste variants 不能同時全開；先用 `UI_SPEC.md` 或 `DESIGN_SYSTEM.md` 決定一個主方向。
- image generation skills 只產生參考圖；實作仍要回到 Codex + Browser side-by-side critique。
- `full-output-enforcement` 只在 agent 反覆輸出半成品或 placeholder 時使用，不是一般 UI 預設。

## 截圖反推 Design System

- 只要使用者提供 App 截圖、generated UI、現有 UI 或競品畫面，並要求設計規範、設計圖、design tokens、icon、背景素材或前端初稿，就讀 `workflows/design-system-from-screenshots.md`。
- 先產出 `DESIGN_SYSTEM.md`，不要直接重畫 UI。
- 規範必須從截圖歸納具體規則，並指出不一致處；每條規範都要寫「適用場景」和「不要怎麼用」。
- 設計圖要覆蓋每個 tab、彈窗、核心狀態；素材要保存到 `assets/` 或專案既有靜態資源目錄，並建立 manifest。

## GitHub starred UI 補強

- `Leonxlnx/taste-skill`：前端 anti-slop、image-to-code、redesign、品牌/網頁/行動參考圖技能集合；按上方分流選單一 variant。
- `VoltAgent/awesome-design-md`：拿來建立 `DESIGN.md` 或設計語言參考。
- `DavidHDev/react-bits`：landing page、展示頁、互動效果參考。
- `uiverse-io/galaxy`：CSS/Tailwind 小元件參考。
- `itshover/itshover`：animated icon / micro-interaction 參考；適合 Next.js、shadcn、React UI，需要有意圖的 hover/tap icon 動效時用。
- `shadcn-ui/ui`：正式 app 元件基礎，但必須依 UI_SPEC 客製，不直接套預設。

## Its Hover 使用規則

- 官網：https://www.itshover.com
- GitHub：https://github.com/itshover/itshover
- shadcn registry 安裝格式：`npx shadcn@latest add https://itshover.com/r/[icon-name].json`
- 手動安裝需要 `motion`：`npm install motion`
- 只用在 icon 動效能幫助辨識狀態或操作意圖時；不要為了裝飾把每個 icon 都做動畫。
- 使用前先檢查專案是否已使用 shadcn/ui、Tailwind、React/Next.js，以及是否接受 `motion/react` 依賴。
- 實作後檢查 keyboard focus、reduced motion、mobile tap feedback；不能只有 hover 才看得懂。

## DESIGN_REVIEW 必填

- Chrome desktop/mobile 已檢查。
- console error 已檢查。
- 核心流程已點完。
- loading/empty/error/disabled/focus 已覆蓋。
- 文字沒有溢出、重疊、被遮擋。
- 視覺是否仍像 AI 模板：是/否，理由。
- 若有原始截圖或 generated UI，已完成 side-by-side critique，並記錄設計差異。
