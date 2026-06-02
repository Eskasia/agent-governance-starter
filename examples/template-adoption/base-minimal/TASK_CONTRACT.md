# TASK_CONTRACT.md

## 任務總覽

| # | 任務名稱 | 狀態 | 依賴 | 驗證結果 |
|---|---|---|---|---|
| 1 | 建立 base fixture | 完成 | none | doctor JSON ready |

## 任務詳情

| 任務名稱 | 輸入 | 可用工具 | 預期輸出 | 驗證方式 | 不做事項 | 完成標準 | 風險 / 阻塞 |
|---|---|---|---|---|---|---|---|
| 建立 base fixture | base profile and fixed templates | scripts/init.mjs, scripts/doctor.mjs | filled base-minimal fixture | compare doctor JSON with expected output | do not add app code | fixture status is ready | profile changes require expected JSON update |

## 依賴關係

| From | To | Reason | Status |
|---|---|---|---|
| base profile | base fixture | fixture mirrors profile documents | complete |

## 驗收總結

| Check | Status | Evidence |
|---|---|---|
| 所有任務驗證方式已執行 | complete | expected doctor JSON |
| 無未記錄的範圍外修改 | complete | fixture scope |
| OPEN_LOOPS.md 已更新 | complete | closed rows only |
