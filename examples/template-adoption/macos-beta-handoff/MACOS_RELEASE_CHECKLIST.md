# MACOS_RELEASE_CHECKLIST.md

- App name: ExampleMenuBar
- Bundle id: com.example.menubar.beta
- 固定 app 路徑: `/Applications/ExampleMenuBar.app`
- Build configuration: Release
- Signing identity: Apple Development or Developer ID
- TeamIdentifier: to be filled from codesign output
- Entitlements: Accessibility / ScreenCapture relevant entitlements
- Sandbox: documented in project
- 需要的 TCC 權限: Accessibility / ScreenCapture
- TCC reset 命令: `tccutil reset Accessibility com.example.menubar.beta`
- 啟動方式: open fixed app path
- codesign 驗證: required
- spctl 驗證: required
- notarization: beta status recorded
- package 方式: dmg
- create-dmg 是否使用: yes if app is already signed
- 乾淨環境驗證: required before release
- 已知限制: beta only
