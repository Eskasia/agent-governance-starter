# MACOS_RELEASE_CHECKLIST.md

## App 識別

- App 名稱：
- Bundle ID：
- 固定 App 路徑：
- Signing identity：
- TeamIdentifier：

## Entitlements

| Entitlement | 需要 | 備註 |
|---|---|---|
| com.apple.security.app-sandbox |  |  |
| com.apple.security.automation.apple-events |  |  |
| com.apple.security.device.audio-input |  |  |
| com.apple.security.device.camera |  |  |

## TCC 權限

| 權限 | 需要 | Reset 命令 | 驗證方式 | 備註 |
|---|---|---|---|---|
| Accessibility | [ ] | `tccutil reset Accessibility <bundle-id>` |  |  |
| ScreenCapture | [ ] | `tccutil reset ScreenCapture <bundle-id>` |  |  |
| Input Monitoring | [ ] |  |  |  |
| Automation | [ ] |  |  |  |
| Apple Events | [ ] |  |  |  |

## Sandbox 狀態

- sandbox 啟用：是 / 否
- 需要的 sandbox exception：

## Build & Sign

- [ ] Bundle ID 已固定，不隨 build 變動
- [ ] App 從固定路徑啟動（非 DerivedData / Downloads）
- [ ] 使用固定 Apple Development certificate 簽名
- [ ] `codesign -dv --verbose=4` 驗證通過
- [ ] `codesign --display -r -` 顯示正確 requirement

## 驗證命令

```bash
# 確認 bundle id
mdls -name kMDItemCFBundleIdentifier ~/Applications/<AppName>.app

# 確認簽名
codesign -dv --verbose=4 ~/Applications/<AppName>.app 2>&1 | egrep 'Identifier|TeamIdentifier|Authority'

# 確認 Gatekeeper
spctl -a -vvv ~/Applications/<AppName>.app
```

## Package & Distribution

- Package 方式：zip / dmg / App Store
- Notarization 狀態：未提交 / 進行中 / 通過 / 失敗
- DMG 工具：`sindresorhus/create-dmg` 或其他

## 發佈前 Checklist

- [ ] TCC 權限在 reset 後重新授權仍正常
- [ ] Rebuild 後 TCC 不反覆失效
- [ ] Notarization 通過（若需要）
- [ ] 乾淨環境測試 Gatekeeper prompt
- [ ] 第一次啟動行為正確
- [ ] 已知限制已記錄
