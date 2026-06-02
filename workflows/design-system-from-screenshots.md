# Design System From Screenshots

用途：已有 App 截圖、generated UI、現有 UI 或競品畫面時，先從畫面反推可落地的 Design System，再產生一致的 UI 設計圖、圖片素材或前端 app 初稿。

## 觸發條件

- 使用者提供截圖，要求「根據目前界面整理設計規範」。
- 使用者提供 generated UI 或設計圖，要求 Codex 做成可互動前端。
- 要把既有 App 風格交給設計師、前端或另一個 agent 延續。
- 要完整補齊 tabs、彈窗、狀態頁、空狀態、錯誤狀態。
- 要生成圖標、背景圖、插畫等素材，並保存到專案 `assets/` 或既有靜態資源目錄。

不適用：只有一句產品概念、沒有截圖或既有視覺參考時；此時先走 `workflows/ui-ux.md` 的 UI_SPEC 與 Open Design prototype。

## 工具分流

| 階段 | 使用工具 / skill | 產出 |
|---|---|---|
| 截圖分析、產品氣質判斷、設計系統規範 | `ui-ux-pro-max` | `DESIGN_SYSTEM.md` |
| 避免 AI 模板味、修正視覺一致性 | `design-taste-frontend` 或對應 Taste Skill variant | design critique / polish direction |
| 正式前端落地前的可視化原型 | Open Design / Figma / HTML prototype | design preview URL 或本機 HTML |
| 根據視覺目標建立可互動 app 初稿 | `image-to-code` / Codex + Build Web Apps / Browser | implemented app、Browser 截圖、side-by-side critique |
| 生成透明背景 icon、背景圖、插畫 | image generation / local asset pipeline | `assets/icons/*.png`、`assets/images/*.png` |
| 上線前驗收 | Browser / Chrome / `impeccable` | `DESIGN_REVIEW.md` |

## 三段式流程

1. 先萃取規範：從截圖或 generated UI 歸納產品氣質、使用者、場景、視覺語言、不一致處，不先重畫。
2. 再產生設計圖：根據 `DESIGN_SYSTEM.md` 補齊每個 tab、彈窗、狀態和核心流程。
3. 再實作可互動初稿：Codex 把視覺目標當規格，必要時補查真實資料或標明 demo data。
4. 最後回看驗證：用 Browser 截圖和原始視覺目標做 side-by-side critique，列出差異後修正。
5. 需要素材時才產出：只為設計圖中真實需要的 icon、背景圖、插畫輸出檔案，保存到 `assets/`，並建立 asset manifest。

## DESIGN_SYSTEM.md 必填

每一節都必須包含「適用場景」和「不要怎麼用」。

- 產品氣質：商務、工具、創作、社群、內容、金融、醫療、教育、遊戲等；說明為什麼。
- 目標用戶：角色、熟練度、使用壓力、設備。
- 核心使用場景：高頻任務、低頻但高風險任務、瀏覽型或操作型。
- 視覺語言：色彩、字體、間距、柵格、圓角、邊框、陰影、圖標、插畫、動效、互動狀態。
- 設計原則：3-7 條，必須能指導取捨。
- 色彩系統：背景、前景、primary、secondary、accent、muted、border、success、warning、danger、info。
- 字體系統：display、heading、body、label、caption、number/code；包含字重、行高、使用限制。
- 間距與柵格：base unit、section gap、component gap、form gap、modal padding、mobile/desktop breakpoint。
- 圓角、邊框、陰影：token、層級、使用限制。
- 核心組件：button、input、select、tabs、sidebar/navbar、card/table/list、modal/drawer、toast、empty/error/loading。
- 狀態規範：default、hover、active、focus、disabled、loading、selected、error、success、empty。
- 圖標/插畫規範：尺寸、線寬、填色、透明背景、命名、禁止混用風格。
- 文案語氣：按鈕、錯誤、空狀態、提示、成功訊息。
- 禁用規則 / 設計紅線：從截圖問題和產品氣質推導，不寫泛泛而談。
- 當前不一致處：逐條指出截圖中不一致的顏色、間距、圓角、字級、icon、狀態或元件行為。
- Design tokens：提供 CSS variables；若專案用 Tailwind，也提供 `theme.extend` 對應。

## 設計圖產出要求

- 先列出所有要覆蓋的 screen map：每個 tab、彈窗、drawer、設定頁、空狀態、錯誤狀態、loading、success。
- 設計圖必須使用 `DESIGN_SYSTEM.md` 的 tokens，不得新增未記錄的顏色、字級、圓角或陰影。
- 每個畫面都要標註：目的、入口、主要操作、狀態、響應式要求。
- 需要設計師接手時，優先輸出 Figma / Open Design / HTML preview；需要前端接手時，附 component inventory。
- 若設計圖和截圖風格衝突，先更新 `DESIGN_SYSTEM.md` 的規則或列為 open question，不直接憑感覺改。

## 前端實作與回看要求

- 實作前明確指定視覺目標路徑或來源：screenshot、generated UI、Figma、Open Design 或 HTML prototype。
- 若使用 Taste Skill，先選一個主 variant：一般 anti-slop 用 `design-taste-frontend`，image-first 用 `image-to-code`，既有專案改版用 `redesign-existing-projects`，不要同時混用多個互相衝突的風格 skill。
- Codex 不得把視覺目標只當靈感；layout、spacing、typography、color、assets 和 interaction 都要可對照。
- 若需要真實感，資料必須來自正式來源、fixture 或明確標記的 demo data。
- 完成後用 Browser/Chrome 截圖，和原始視覺目標做 side-by-side critique。
- critique 必須分成 layout、spacing、typography、color、assets、interaction、data realism。
- 修正後更新 `DESIGN_REVIEW.md`，記錄已修正項與保留差異。

## 素材產出要求

- 只要產生參考圖而非代碼時，使用 `imagegen-frontend-web`、`imagegen-frontend-mobile` 或 `brandkit`；完成後把圖片作為視覺目標交給實作流程。
- 圖標必須是透明背景 PNG；每個圖標獨立一個檔案。
- 背景圖、插畫、empty state 圖應按用途分目錄：`assets/icons/`、`assets/images/`、`assets/illustrations/`。
- 若專案已有靜態資源慣例，例如 `public/assets/` 或 `src/assets/`，沿用既有慣例。
- 檔名使用 kebab-case，包含用途和狀態，例如 `ticket-empty-state.png`、`icon-ticket-open.png`。
- 產出 `assets/ASSET_MANIFEST.md`，記錄檔名、用途、尺寸、透明背景、來源 prompt、使用畫面。
- 不生成沒有出現在 screen map 或 component inventory 的裝飾素材。

## Design Tokens 範本

```css
:root {
  --color-bg: ;
  --color-surface: ;
  --color-text: ;
  --color-muted: ;
  --color-border: ;
  --color-primary: ;
  --color-primary-fg: ;
  --color-success: ;
  --color-warning: ;
  --color-danger: ;

  --font-display: ;
  --font-sans: ;
  --font-mono: ;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;

  --radius-sm: ;
  --radius-md: ;
  --radius-lg: ;
  --shadow-sm: ;
  --shadow-md: ;
}
```

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        text: 'var(--color-text)',
        muted: 'var(--color-muted)',
        border: 'var(--color-border)',
        primary: 'var(--color-primary)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        danger: 'var(--color-danger)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      spacing: {
        1: 'var(--space-1)',
        2: 'var(--space-2)',
        3: 'var(--space-3)',
        4: 'var(--space-4)',
        6: 'var(--space-6)',
        8: 'var(--space-8)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
      },
    },
  },
};
```

## 驗收

- `DESIGN_SYSTEM.md` 的每條規範都有「適用場景」和「不要怎麼用」。
- 所有結論都能追溯到截圖、現有 UI 或明確產品判斷。
- 明確列出當前 App 設計不一致處。
- UI 設計圖覆蓋每個 tab、彈窗和核心狀態。
- `assets/` 內素材有 manifest，icon 為透明背景 PNG 且一個 icon 一個檔案。
- Browser/Chrome 已檢查 desktop/mobile、文字溢出、圖片載入、console error。
- 若已進入前端實作，Browser 截圖和原始視覺目標已完成 side-by-side critique。
