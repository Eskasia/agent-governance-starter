# AGENT_RUNTIME.md

## Agent 目標

- 使用者：
- 要完成的工作：
- 不做事項：

## 觸發入口

- UI：
- cron：
- webhook：
- Slack / Gmail / connector：
- CLI / manual：

## State

- 業務狀態：
- 執行狀態：
- 儲存位置：
- 是否可從事件重建：

## Event

- 事件類型：
- 事件來源：
- 推進規則：

## Context Window

- 格式：
- 來源：
- 壓縮方式：
- 禁止放入：

## Prompts

- 儲存位置：
- 版本管理：
- 修改規則：

## Structured Outputs

- action schema：
- done / pause / ask_human：
- invalid output handling：

## Tools

| Tool | 權限 | 副作用 | idempotency | rollback |
|---|---|---|---|---|

## Control Flow

- 程式掌控：
- 模型判斷：
- 最大步數：

## Human Approval

- 必須問人的 action：
- approver：
- timeout：
- fallback：

## Launch / Pause / Resume

- launch：
- pause：
- resume：
- retry：
- cancel：

## Error Compaction

- 錯誤來源：
- 壓縮格式：
- 重試上限：

## Verifier

- tests：
- eval：
- replay：
- E2E：
- 人工抽查：

## Agent Boundary

- 預期步數：
- 是否小而聚焦：
- 拆分建議：

## Stateless Reducer

```text
state + event -> next action
```
