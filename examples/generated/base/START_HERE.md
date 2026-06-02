# START_HERE.md

## Purpose

This project was initialized from agent-governance-starter. The agent must complete intake, project documents, and a task contract before implementation starts.

## Read Order

1. This file.
2. The runtime instruction file for the active agent: `AGENTS.md`, `CLAUDE.md`, or `.agents/AGENTS.md`.
3. Required documents listed below.
4. Included profile documents listed below.
5. Conditional documents when the project type requires them.

## Runtime

- Initialized agent: codex
- Init profile: base

## Q1-Q9 Intake

Q1-Q9 的意義是確認需求、限制、驗收、部署與技術偏好，支撐後續產品形態與技術路線決策；不是要求使用者一開始就懂技術。

Q1. 這個東西要解決誰的什麼問題？一句話，不能有「和」。  
Q2. 第一版成功的樣子是什麼？用可以觀察到的行為描述。  
Q3. 哪些情況出現，就代表做錯了？  
Q4. 第一版明確不做哪些事？至少三個。  
Q5. 有沒有不能動的現有系統、框架、或 API？  
Q6. 誰來驗收、怎麼驗？自己點、跑測試、給別人用。  
Q7. 要部署在哪裡？本機、preview、正式上線。  
Q8. 有沒有已經決定要用的技術或工具？  
Q9. 對效能或規模有沒有硬性要求？

## Product Shape / Tech Route Gate

After Q1-Q9 and before implementation, decide one route mode:

- `user-declared route`: the user already named the product shape or technology route; check it against Q1-Q9 and document gaps or risks.
- `ai-recommended route`: the user does not know the route; recommend one first-version product shape and one main technology route from Q1-Q9.

Write the product shape decision in `PROJECT_BRIEF.md` and the technology route decision in `TECH_STACK.md`. Do not write code while either decision is still an open loop.

## Required Documents

- README.md: Every project
- PROJECT_BRIEF.md: Every project
- SPEC.md: Every project
- CONTEXT.md: Every project
- TASK_CONTRACT.md: Every project
- OPEN_LOOPS.md: Every project
- AGENTS.md: Every project
- TECH_STACK.md: Every project

## Included Profile Documents

- None

## Conditional Documents

- UI_SPEC.md: Has UI / website / dashboard / landing page
- DESIGN_SYSTEM.md: Has screenshots / existing UI to extract design rules from
- DESIGN_REVIEW.md: Has UI review / beta / launch / visual QA
- DATA_MODEL.md: Has DB / Auth / tenant / permissions
- API_CONTRACT.md: Has API routes / server actions / webhooks
- ENV_CHECKLIST.md: Has deployment / third-party API keys
- PRESENTATION_BRIEF.md: Has presentation / slide deck / one-pager deliverable
- TESTER_HANDOFF.md: Has beta / tester handoff requirement
- MACOS_RELEASE_CHECKLIST.md: Has macOS app build / TCC / signing
- AGENT_RUNTIME.md: Has production-facing LLM agent / automation
- RAG_DESIGN.md: Has retrieval / knowledge base / document Q&A
- EVAL_PLAN.md: Has LLM/RAG/agent output needing regression testing
- AI_SECURITY_REVIEW.md: Has prompt injection / tenant data / PII risks

## Gate

Do not write code until Q1-Q9 are answered, the product shape / technology route gate is complete, required documents are filled, open loops are explicit, and the user confirms the task plan.
