# TASK_CONTRACT.md

## 任務總覽

| # | 任務名稱 | 狀態 | 依賴 | 驗證結果 |
|---|---|---|---|---|
| 1 | macOS beta tester handoff | complete | SPEC, MACOS_RELEASE_CHECKLIST, TESTER_HANDOFF | checklist ready |
| 2 | First-run permission QA | blocked | tester environment | open loop recorded |

## 任務詳情

| 任務名稱 | 輸入 | 可用工具 | 預期輸出 | 驗證方式 | 不做事項 | 完成標準 | 風險 / 阻塞 |
|---|---|---|---|---|---|---|---|
| macOS beta tester handoff | SPEC, MACOS_RELEASE_CHECKLIST, TESTER_HANDOFF | codesign, spctl, manual tester flow | beta handoff package and checklist | fixed path launch, TCC permission checks, tester report format | new feature work, App Store release | handoff checklist complete | signing path still open |
| First-run permission QA | MACOS_RELEASE_CHECKLIST, TESTER_HANDOFF, TECH_STACK | tccutil reset, codesign, manual tester account | privacy-safe first-run QA notes and permission prompt results | fresh account launch shows expected prompts and app remains usable after granting permissions | notarization automation, auto-update channel, crash reporting backend | privacy-safe QA notes captured | physical-device-QA blocked |

## 依賴關係

| From | To | Reason | Status |
|---|---|---|---|
| MACOS_RELEASE_CHECKLIST.md | macOS beta tester handoff | package evidence before tester handoff | complete |
| tester environment | First-run permission QA | fresh TCC proof requires separate environment | blocked |

## 驗收總結

| Check | Status | Evidence |
|---|---|---|
| 所有任務驗證方式已執行 | partial | beta handoff ready; first-run QA blocked |
| 無未記錄的範圍外修改 | complete | fixture docs only |
| OPEN_LOOPS.md 已更新 | complete | physical-device-QA and signing rows open |
