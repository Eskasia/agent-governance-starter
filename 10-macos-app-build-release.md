# 10 macOS App Build And Release

適用：SwiftUI、AppKit、Tauri、Electron、menu bar app、需要 Accessibility / Screen Recording / Input Monitoring / Automation 權限的 macOS app。

## TCC 權限穩定規則

macOS TCC 不只看 app 名稱；會受 bundle id、app 路徑、code signing requirement 影響。開發版最常壞在 ad-hoc signing、DerivedData/build 路徑、重新簽名後舊授權失效。

必做：

- 固定 bundle id，例如 `com.william.AppName.dev`。
- 固定開發版 app 路徑，例如 `~/Applications/AppName.app` 或專案固定 `dist/AppName.app`。
- 不從 Xcode DerivedData、臨時 build 目錄、Downloads 隨機路徑測 TCC。
- 用固定 Apple Development certificate 簽 `.app`；不要每次 `codesign -s -`。
- 每次 bundle id、簽名、路徑變更後，先 reset TCC，再重新授權。

## 開發版標準命令

確認 bundle id：

```bash
mdls -name kMDItemCFBundleIdentifier ~/Applications/AppName.app
```

確認簽名與 Team：

```bash
codesign -dv --verbose=4 ~/Applications/AppName.app 2>&1 | egrep 'Identifier|TeamIdentifier|Authority'
codesign --display -r - ~/Applications/AppName.app
```

找固定簽名 identity：

```bash
security find-identity -v -p codesigning
```

用固定 Apple Development certificate 重簽：

```bash
codesign --force --deep --options runtime --sign "Apple Development: <Name> (<TEAMID>)" ~/Applications/AppName.app
```

重置 TCC：

```bash
tccutil reset Accessibility <bundle-id>
tccutil reset ScreenCapture <bundle-id>
```

授權後完整 quit app 再重開；Screen Recording / ScreenCapture 有時需要登出或重開機才完全刷新。

## MACOS_RELEASE_CHECKLIST 必填

- bundle id：
- 固定 app 路徑：
- signing identity：
- TeamIdentifier：
- entitlements：
- sandbox 狀態：
- 需要的 TCC 權限：Accessibility / ScreenCapture / Input Monitoring / Automation / Apple Events
- reset TCC 命令：
- 啟動方式：
- 驗證步驟：
- package 方式：zip / dmg / appcast / App Store
- notarization 狀態：

## DMG 與 create-dmg 定位

`sindresorhus/create-dmg` 只負責把已 build 好且已簽好的 `.app` 包成 `.dmg`。它不能修 TCC 身分不穩。

正確順序：

1. 固定 bundle id、路徑、簽名。
2. reset TCC，重新授權並驗證 app 行為。
3. archive / export `.app`。
4. notarize `.app` 或 `.dmg`。
5. 用 `create-dmg` 包裝發佈。
6. 在乾淨環境測 Gatekeeper、TCC prompt、第一次啟動。

## 驗收

- 從固定路徑啟動後，Accessibility / ScreenCapture 狀態一致。
- rebuild 後，只要 bundle id、路徑、signing requirement 未變，TCC 不應反覆失效。
- 若改簽名或 bundle id，文件中明確要求 reset TCC。
- 發佈前驗證 codesign、spctl、notarization。
