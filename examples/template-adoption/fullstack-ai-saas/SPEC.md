# SPEC.md

## Scope

- 建立一個 tenant-aware RAG preview。
- 支援文件上傳、提問、citation 顯示。

## Non-goals

- 不做 production billing。
- 不做外部 OAuth。
- 不做批次資料遷移。

## User flows

1. Owner 建立 workspace。
2. Member 上傳文件。
3. Member 提問並查看引用來源。

## Acceptance criteria

- [ ] 使用者只能看到自己 workspace 的文件。
- [ ] 問答結果必須至少顯示一個 citation。
- [ ] 無法回答時必須回傳 fallback message。

## Edge cases

- 空文件。
- 沒有檢索結果。
- 使用者跨 tenant 存取文件。

## Failure conditions

- 回答沒有 citation。
- retrieval 前沒有套用 tenant filter。

## Open questions

- 第一版是否需要 PDF OCR。
