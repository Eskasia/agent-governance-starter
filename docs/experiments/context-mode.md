# 13 Context Pressure Workflow

適用：長任務、大 repo 掃描、多工具輸出、Playwright snapshot 很大、反覆 compaction、需要跨 session continuity 的工作。

## 定位

`mksglu/context-mode` 是 context / token 壓力緩解層，不是 `startup/01-bootstrap-gates.md`、LLMwiki、handoff、OPEN_LOOPS 的替代品。

它只在以下情況列入實驗：

- 單次任務需要大量讀檔、grep、WebFetch、Playwright snapshot 或 log 分析。
- 長 thread 經常因 compaction 失去任務狀態。
- 需要把大型工具輸出放到外部索引，再用 search/fetch 取回重點。
- 已經用了 CodeGraph / repomix / handoff，仍覺得 context 壓力太大。

## 不放進預設主流程

- 不要求每個新專案安裝。
- 不取代專案文件與 memory as files。
- 不取代 `$handoff` 的交接摘要。
- 不取代 LLMwiki 的長期知識沉澱。
- 不用在短任務、小 repo、單檔修改、簡答。

## 實驗前提

- 先確認 Node.js 版本符合 repo 要求。
- 先在 sandbox thread 測，不直接接入主工作流。
- 先驗證 `ctx stats`、`ctx doctor`、大輸出 sandbox、搜尋取回。
- 只在確認 Codex MCP / hooks 支援狀態後再考慮全域安裝。

## 建議測試場景

1. 大 repo 掃描：比較 raw `rg` / `cat` 與 context-mode sandbox 後的 token 使用。
2. Playwright UI debug：比較 snapshot 直接進 context 與 sandbox 後摘要。
3. 長任務 continuity：中途 compaction 後，確認是否能找回最近文件、錯誤、決策。
4. 錯誤排查：將大型 logs index 後，只取相關錯誤片段。

## 驗收

- `ctx doctor` 通過。
- `ctx stats` 能看到 context saving。
- agent 不會因為 context-mode 忘記讀專案 `AGENTS.md`、`TASK_CONTRACT.md`、`OPEN_LOOPS.md`。
- 工作流仍遵守：規格、設計、TDD、實作、驗證、handoff、LLMwiki。
