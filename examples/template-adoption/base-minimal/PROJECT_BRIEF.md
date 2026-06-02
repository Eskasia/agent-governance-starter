# PROJECT_BRIEF.md

## 一句話

讓一個新專案在開始寫 code 前完成最小 governance bootstrap。

## 使用者

- 專案維護者
- Coding agent

## 要解決的問題

空白 prompt 容易讓 agent 在需求、驗證和 open loops 未清楚前直接實作。

## MVP

- 產生固定治理文件。
- 讓 doctor 確認固定文件已填寫。
- 保留未決事項的明確位置。

## 明確不做

- 不提供 app runtime。
- 不提供產品功能範例。
- 不宣稱外部採用。

## 驗收者

- Repo maintainer runs `node scripts/doctor.mjs --json examples/template-adoption/base-minimal`.

## 完成標準

- doctor JSON status is `ready`.
