# 01 Bootstrap Gates

## 主流程

新專案固定走：

1. 規格：Q1-Q9、追問、PROJECT_BRIEF、SPEC、CONTEXT
2. 設計：TASK_CONTRACT、AGENTS、TECH_STACK、必要 ADR
3. 條件文件：UI、全端、環境、API、資料模型、Agent runtime
4. 計畫：5-10 步，每步有驗證
5. 實作：一次只做一個步驟
6. 驗證：測試、Browser/Chrome、Playwright、DB、部署檢查
7. 收尾：handoff、neat-freak、repomix、LLMwiki、文件結構分流、gstack-style checklist

## Q1-Q9

Q1. 這個東西要解決誰的什麼問題？一句話，不能有「和」。  
Q2. 第一版成功的樣子是什麼？用可以觀察到的行為描述。  
Q3. 哪些情況出現，就代表做錯了？  
Q4. 第一版明確不做哪些事？至少三個。  
Q5. 有沒有不能動的現有系統、框架、或 API？  
Q6. 誰來驗收、怎麼驗？自己點、跑測試、給別人用。  
Q7. 要部署在哪裡？本機、preview、正式上線。  
Q8. 有沒有已經決定要用的技術或工具？  
Q9. 對效能或規模有沒有硬性要求？

## 進下一關條件

- Q1-Q9 都已回答。
- SPEC 的驗收標準都是 yes/no。
- TASK_CONTRACT 每個任務都有驗證方式。
- OPEN_LOOPS 明確列出尚未決定的事。
- 若包含 production-facing LLM agent / automation / tool use，`AGENT_RUNTIME.md` 已完成。
- 收尾時已判斷新經驗該進 LLMwiki、AGENTS、Skills、Hooks、Subagents、Plugins 或不回寫。
- 使用者明確說「確認」。
