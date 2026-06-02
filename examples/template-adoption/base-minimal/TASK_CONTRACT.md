# TASK_CONTRACT.md

## 任務總覽

| # | 任務名稱 | 狀態 | 依賴 | 驗證結果 |
|---|---|---|---|---|
| 1 | 建立 base fixture | 完成 | none | doctor JSON ready |

## 任務詳情

### 任務：建立 base fixture

- 輸入：base profile and fixed templates
- 可用工具：scripts/init.mjs, scripts/doctor.mjs
- 預期輸出：filled base-minimal fixture
- 驗證方式：compare doctor JSON with expected output
- 不做事項：do not add app code
- 完成標準：fixture status is ready
- 風險 / 阻塞：profile changes require expected JSON update

## 驗收總結

- [x] 所有任務驗證方式已執行
- [x] 無未記錄的範圍外修改
- [x] OPEN_LOOPS.md 已更新
