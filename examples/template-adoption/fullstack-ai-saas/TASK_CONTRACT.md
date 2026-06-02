# TASK_CONTRACT.md

## 任務總覽

| # | 任務名稱 | 狀態 | 依賴 | 驗證結果 |
|---|---|---|---|---|
| 1 | RAG preview thin slice | complete | profile docs | citation smoke ready |
| 2 | Tenant isolation evidence | complete | DATA_MODEL, AI_SECURITY_REVIEW | cross-tenant retrieval blocked |

## 任務詳情

| 任務名稱 | 輸入 | 可用工具 | 預期輸出 | 驗證方式 | 不做事項 | 完成標準 | 風險 / 阻塞 |
|---|---|---|---|---|---|---|---|
| RAG preview thin slice | PROJECT_BRIEF, SPEC, CONTEXT, RAG_DESIGN, EVAL_PLAN, AI_SECURITY_REVIEW | local tests, Browser/Chrome, Playwright smoke | workspace login, document upload, question answer with citation | tenant isolation smoke, citation smoke, fallback smoke | billing, external OAuth, production migration | answer includes citation and fallback behavior | RAG cost and citation correctness |
| Tenant isolation evidence | DATA_MODEL, RAG_DESIGN, AI_SECURITY_REVIEW | unit test, seed fixtures, manual preview account check | two-tenant fixture with blocked cross-tenant retrieval | tenant A query cannot return tenant B document; failed access is logged without document text | enterprise SSO, admin analytics, paid plan limits | cross-tenant retrieval blocked | auth scheme still open |

## 依賴關係

| From | To | Reason | Status |
|---|---|---|---|
| DATA_MODEL.md | Tenant isolation evidence | tenant boundary must exist before retrieval checks | complete |
| RAG_DESIGN.md | RAG preview thin slice | retrieval path defines citation behavior | complete |

## 驗收總結

| Check | Status | Evidence |
|---|---|---|
| 所有任務驗證方式已執行 | complete | smoke checklist |
| 無未記錄的範圍外修改 | complete | fixture docs only |
| OPEN_LOOPS.md 已更新 | complete | auth/eval rows tracked |
