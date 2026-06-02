# DESIGN_SYSTEM.md

## 產品判斷

- 產品氣質：
- 目標用戶：
- 核心使用場景：
- 使用設備與壓力：
- 截圖 / 參考來源：

## 視覺語言萃取

| 類別 | 從截圖觀察到的規則 | 適用場景 | 不要怎麼用 | 不一致處 |
|---|---|---|---|---|
| 色彩 |  |  |  |  |
| 字體 |  |  |  |  |
| 間距 |  |  |  |  |
| 柵格 |  |  |  |  |
| 圓角 |  |  |  |  |
| 邊框 |  |  |  |  |
| 陰影 |  |  |  |  |
| 組件 |  |  |  |  |
| 互動狀態 |  |  |  |  |
| 圖標 / 插畫 |  |  |  |  |

## 設計原則

| 原則 | 適用場景 | 不要怎麼用 |
|---|---|---|
|  |  |  |

## 色彩系統

| Token | 值 | 用途 | 適用場景 | 不要怎麼用 |
|---|---|---|---|---|
| `--color-bg` |  |  |  |  |
| `--color-surface` |  |  |  |  |
| `--color-text` |  |  |  |  |
| `--color-muted` |  |  |  |  |
| `--color-border` |  |  |  |  |
| `--color-primary` |  |  |  |  |
| `--color-success` |  |  |  |  |
| `--color-warning` |  |  |  |  |
| `--color-danger` |  |  |  |  |

## 字體系統

| Token | 值 | 用途 | 適用場景 | 不要怎麼用 |
|---|---|---|---|---|
| `--font-display` |  |  |  |  |
| `--font-sans` |  |  |  |  |
| `--font-mono` |  |  |  |  |

## 間距與柵格

| Token / Rule | 值 | 適用場景 | 不要怎麼用 |
|---|---|---|---|
| Base unit |  |  |  |
| Page padding |  |  |  |
| Section gap |  |  |  |
| Component gap |  |  |  |
| Form gap |  |  |  |
| Modal padding |  |  |  |
| Breakpoints |  |  |  |

## 圓角、邊框、陰影

| Token | 值 | 適用場景 | 不要怎麼用 |
|---|---|---|---|
| `--radius-sm` |  |  |  |
| `--radius-md` |  |  |  |
| `--radius-lg` |  |  |  |
| `--shadow-sm` |  |  |  |
| `--shadow-md` |  |  |  |

## 核心組件規範

| Component | 結構 | 狀態 | 適用場景 | 不要怎麼用 |
|---|---|---|---|---|
| Button |  |  |  |  |
| Input |  |  |  |  |
| Select |  |  |  |  |
| Tabs |  |  |  |  |
| Sidebar / Navbar |  |  |  |  |
| Card / Panel |  |  |  |  |
| Table / List |  |  |  |  |
| Modal / Drawer |  |  |  |  |
| Toast / Alert |  |  |  |  |
| Empty / Error / Loading |  |  |  |  |

## 狀態規範

| State | 視覺規則 | 適用場景 | 不要怎麼用 |
|---|---|---|---|
| default |  |  |  |
| hover |  |  |  |
| active |  |  |  |
| focus |  |  |  |
| disabled |  |  |  |
| loading |  |  |  |
| selected |  |  |  |
| error |  |  |  |
| success |  |  |  |
| empty |  |  |  |

## 圖標 / 插畫規範

- 圖標尺寸：
- 線寬：
- 填色：
- 背景：
- 命名：
- 適用場景：
- 不要怎麼用：

## 文案語氣規範

| 場景 | 語氣 | 範例 | 不要怎麼寫 |
|---|---|---|---|
| Button |  |  |  |
| Error |  |  |  |
| Empty state |  |  |  |
| Success |  |  |  |
| Helper text |  |  |  |

## 禁用規則 / 設計紅線

| 規則 | 原因 | 適用場景 | 不要怎麼用 |
|---|---|---|---|
|  |  |  |  |

## Screen Map

| Screen / Tab / Modal | 入口 | 主要操作 | 必備狀態 | 備註 |
|---|---|---|---|---|
|  |  |  |  |  |

## Component Inventory

| Component | 使用畫面 | Token 依賴 | Asset 依賴 | 前端備註 |
|---|---|---|---|---|
|  |  |  |  |  |

## Asset Manifest

| File | 用途 | 尺寸 | 透明背景 | 來源 prompt / 來源 | 使用畫面 |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## Design Tokens

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
module.exports = {
  theme: {
    extend: {
      colors: {},
      fontFamily: {},
      spacing: {},
      borderRadius: {},
      boxShadow: {},
    },
  },
};
```
