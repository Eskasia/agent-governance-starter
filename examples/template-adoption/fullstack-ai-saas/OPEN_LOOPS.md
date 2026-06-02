# OPEN_LOOPS.md

| Status | Blocker | Question / Risk | Impact | Owner | Next Step | Due |
|---|---|---|---|---|---|---|
| open | auth-blocked | Preview login 是否用 magic link | medium | owner | 選擇 auth 方案 | before implementation |
| open | eval-blocked | Golden set 是否包含中英雙語文件 | medium | maintainer | 補 10 筆 synthetic fixture | before RAG smoke |
| closed | security-reviewed | PII 不進 examples，全部使用 synthetic workspace data | high | maintainer | 已記錄於 AI_SECURITY_REVIEW | before public demo |

## Rules

| Rule | Detail |
|---|---|
| Unknowns stay open | Do not treat open items as decided |
| Evidence closes loops | Close an item only after the decision or evidence is recorded in project docs |
| Review cadence | Re-check this file after each implementation phase |
