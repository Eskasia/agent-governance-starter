# Skill and Plugin Adoption Workflow

適用：想把外部 GitHub repo、skill、plugin、agent pack、security pack、SDK、MCP server 或工具包引入專案前。

## 核心原則

- 先把外部能力當候選來源，不當成已採用規則。
- 不全量導入大型 skill pack、agent catalog、plugin pack、hooks 或 install system。
- 每次只能選一條符合當前任務的主路由；不能因為工具有名就疊加進專案。
- 引入前必須回查 `TECH_STACK.md`、`workflows/product-shape-tech-route.md`、`workflows/agent-file-structure.md`。
- 採用決策寫進既有文件：`TECH_STACK.md`、`docs/adr/*.md` 或 `OPEN_LOOPS.md`；不新增 required document。

## 採用前檢查

| 檢查項 | 必填判斷 |
|---|---|
| 來源 | 官方、社群、個人 repo，或未確認 |
| License | 是否允許專案用途 |
| 維護狀態 | 最近是否仍可用，是否有明顯 abandoned 風險 |
| 任務匹配 | 是否直接支撐第一版驗收或當前 workflow |
| 技術路線 | 是否符合 `TECH_STACK.md` 的唯一主路線 |
| 邊界 | 是否會引入第二套 runtime、framework、agent system 或部署方式 |
| 驗證 | 採用後用什麼命令、測試或人工檢查證明有效 |

## 採用層級

| 層級 | 寫入位置 | 何時使用 |
|---|---|---|
| `reference-only` | `LLMwiki`、專案 docs、ADR 背景 | 只吸收概念、架構、風險分類或文件格式 |
| `conditional workflow` | `workflows/*.md` | 只在特定任務觸發，例如 UI polish、安全審查、研究 |
| `project doc` | `TECH_STACK.md`、`OPEN_LOOPS.md`、ADR | 專案已決定使用某工具或仍待確認 |
| `runtime adapter` | `AGENTS.md`、Claude / Antigravity adapter | 只放薄規則，不複製工具系統 |
| `skill` | 專案或使用者的 skills 目錄 | 每週會重複、有明確觸發條件與驗證方式 |
| `plugin` | plugin / connector manifest | 團隊需要一致分發且已在多個專案證明穩定 |

## 禁止全量導入

| 來源類型 | 可吸收 | 不做 |
|---|---|---|
| ECC 類 cross-harness 系統 | 單一路線、分層規則、薄 adapter | 不複製 install system、hooks、agent catalog、skills catalog |
| Anthropic skills 類樣板 | `SKILL.md` 結構、觸發條件、驗證欄位 | 不把全部示例技能變成專案規則 |
| knowledge-work-plugins 類 role pack | plugin manifest、commands、skills 分層 | 不把 11 個角色 plugin 變成預設流程 |
| Cybersecurity skills 類大型安全包 | MITRE / NIST taxonomy、任務路由參考 | 不導入數百個技能或全域安全代理 |
| Taste / frontend design variants | UI 任務選一個主 variant | 不同審美技能不可同時全開 |
| Academic research skills | 研究、論文、citation 任務路由 | 不放進日常 coding path |

## 新能力採用 Gate

引入任何外部能力前，先回答：

- 這是 `reference-only`、`conditional workflow`、`project doc`、`runtime adapter`、`skill` 還是 `plugin`？
- 是否符合目前的產品形態與唯一技術路線？
- 是否解決第一版驗收或當前任務需要的問題？
- 是否讓專案從單一路線變成多套框架、runtime 或 agent system 疊加？
- 是否需要寫入 `TECH_STACK.md`、ADR 或 `OPEN_LOOPS.md`？
- 驗證方式是命令、測試、Browser / device check，還是人工 review？

## 暫不採用條件

出現以下任一情況，先列入 `OPEN_LOOPS.md` 或外部候選清單，不進主線：

- repo 指向不清、名稱有多個同名候選，或 license 未確認。
- 只能帶來泛用「效率提升」但不能支撐當前驗收。
- 需要安裝整套 agent framework、hook system 或第二套 plugin runtime。
- 會繞過 `TECH_STACK.md`、`TASK_CONTRACT.md` 或既有驗證命令。
- 導入後沒有可重複的測試、doctor、smoke check 或人工驗收方式。
