# SPEC.md

## Scope

- macOS beta handoff package and TCC validation.

## Non-goals

- 不做正式上架。
- 不做新功能。
- 不做 crash reporter 整合。

## User flows

1. Tester 下載 app。
2. Tester 移到指定路徑。
3. Tester 授權並完成核心操作。

## Acceptance criteria

- [ ] App 從固定路徑啟動。
- [ ] Accessibility prompt 可被測試者找到並授權。
- [ ] ScreenCapture 權限狀態可被記錄。

## Edge cases

- 舊 bundle id 權限殘留。
- Tester 從 Downloads 啟動 app。

## Failure conditions

- 重建後 bundle id 或 signing identity 改變但文件未更新。

## Open questions

- 是否需要乾淨使用者帳號驗證。
