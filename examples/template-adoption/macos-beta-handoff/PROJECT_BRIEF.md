# PROJECT_BRIEF.md

## 一句話

讓內測者驗證一個固定簽名與固定路徑的 macOS menu bar app。

## 使用者

- 內測者
- 開發者

## 要解決的問題

開發版 app 因 TCC 身分不穩，常出現重建後授權失效。

## MVP

- 提供 DMG 或 app path。
- 測 Accessibility 與 ScreenCapture 權限。
- 回報啟動與權限狀態。

## 明確不做

- 不做 App Store 發佈。
- 不做自動更新。
- 不做正式 notarization gate 以外的功能擴張。

## 驗收者

- 內測者回報 TESTER_HANDOFF 指定流程。

## 完成標準

- 測試者可不用讀開發文件完成測試。
