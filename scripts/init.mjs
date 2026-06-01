#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const STARTER_ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const TEMPLATES_DIR = path.join(STARTER_ROOT, 'templates');

const FIXED_DOCS = [
  'PROJECT_BRIEF.md',
  'SPEC.md',
  'CONTEXT.md',
  'TASK_CONTRACT.md',
  'OPEN_LOOPS.md',
  'AGENTS.md',
  'TECH_STACK.md',
];

const PROFILE_DOCS = {
  base: [],
  'fullstack-ai': [
    'DATA_MODEL.md',
    'API_CONTRACT.md',
    'ENV_CHECKLIST.md',
    'AGENT_RUNTIME.md',
    'RAG_DESIGN.md',
    'EVAL_PLAN.md',
    'AI_SECURITY_REVIEW.md',
  ],
  macos: [
    'MACOS_RELEASE_CHECKLIST.md',
    'TESTER_HANDOFF.md',
  ],
  presentation: [
    'PRESENTATION_BRIEF.md',
    'UI_SPEC.md',
    'DESIGN_REVIEW.md',
  ],
  agent: [
    'AGENT_RUNTIME.md',
    'EVAL_PLAN.md',
    'RAG_DESIGN.md',
    'ENV_CHECKLIST.md',
    'AI_SECURITY_REVIEW.md',
  ],
};

const AGENTS = new Set(['codex', 'claude', 'antigravity', 'all']);

function usage() {
  console.log(`Usage: node scripts/init.mjs <target-directory> [--agent codex|claude|antigravity|all] [--profile base|fullstack-ai|macos|presentation|agent] [--all]`);
  console.log();
  console.log('Defaults: --agent codex --profile base');
  console.log('--all copies every markdown template except templates/README.md.');
  console.log();
  console.log('Fixed documents:');
  for (const doc of FIXED_DOCS) console.log(`  - ${doc}`);
  process.exit(0);
}

function parseArgs(argv) {
  const options = {
    targetDir: null,
    agent: 'codex',
    profile: 'base',
    all: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === '--help' || arg === '-h') usage();

    if (arg === '--all') {
      options.all = true;
      continue;
    }

    if (arg === '--agent') {
      options.agent = argv[i + 1];
      i += 1;
      continue;
    }

    if (arg === '--profile') {
      options.profile = argv[i + 1];
      i += 1;
      continue;
    }

    if (arg.startsWith('--')) {
      throw new Error(`Unknown option: ${arg}`);
    }

    if (options.targetDir) {
      throw new Error(`Unexpected extra argument: ${arg}`);
    }

    options.targetDir = arg;
  }

  if (!options.targetDir) usage();
  if (!AGENTS.has(options.agent)) throw new Error(`Invalid --agent: ${options.agent}`);
  if (!Object.hasOwn(PROFILE_DOCS, options.profile)) throw new Error(`Invalid --profile: ${options.profile}`);

  return options;
}

function allTemplateFiles() {
  return fs.readdirSync(TEMPLATES_DIR)
    .filter((f) => f.endsWith('.md') && f !== 'README.md')
    .sort();
}

function unique(items) {
  return [...new Set(items)];
}

function copyTemplate(file, targetDir, stats) {
  const src = path.join(TEMPLATES_DIR, file);
  const dest = path.join(targetDir, file);

  if (!fs.existsSync(src)) {
    console.warn(`  WARN Template not found: ${file}`);
    return;
  }

  if (fs.existsSync(dest)) {
    console.log(`  SKIP Already exists: ${file}`);
    stats.skipped += 1;
    return;
  }

  fs.copyFileSync(src, dest);
  console.log(`  COPY ${file}`);
  stats.copied += 1;
}

function writeGenerated(file, targetDir, content, stats) {
  const dest = path.join(targetDir, file);

  if (fs.existsSync(dest)) {
    console.log(`  SKIP Already exists: ${file}`);
    stats.skipped += 1;
    return;
  }

  fs.writeFileSync(dest, `${content.trim()}\n`);
  console.log(`  GEN  ${file}`);
  stats.generated += 1;
}

function startHereContent(agent, profile) {
  return `# START_HERE.md

## Purpose

This project was initialized from codex-project-starter. The agent must complete intake, project documents, and a task contract before implementation starts.

## Read Order

1. This file.
2. The runtime instruction file for the active agent: AGENTS.md, CLAUDE.md, or ANTIGRAVITY.md.
3. PROJECT_BRIEF.md.
4. SPEC.md.
5. CONTEXT.md.
6. TASK_CONTRACT.md.
7. OPEN_LOOPS.md.
8. TECH_STACK.md.
9. Conditional documents when the project type requires them.

## Runtime

- Initialized agent: ${agent}
- Init profile: ${profile}

## Q1-Q9 Intake

Q1. What user and problem does this solve? One sentence, no "and".
Q2. What observable behavior means version one succeeded?
Q3. What outcomes mean the project was done wrong?
Q4. What is explicitly out of scope for version one? List at least three.
Q5. Which existing systems, frameworks, APIs, or constraints cannot be changed?
Q6. Who verifies this and how?
Q7. Where will this run: local, preview, or production?
Q8. Which tools or technologies are already decided?
Q9. Are there hard requirements for performance, scale, privacy, or compliance?

## Fixed Documents

- PROJECT_BRIEF.md
- SPEC.md
- CONTEXT.md
- TASK_CONTRACT.md
- OPEN_LOOPS.md
- AGENTS.md
- TECH_STACK.md

## Conditional Documents

- UI_SPEC.md: UI, website, app, dashboard, landing page
- DESIGN_SYSTEM.md: screenshots, existing UI, competitor UI, design tokens
- DESIGN_REVIEW.md: UI review, beta, launch, visual QA
- DATA_MODEL.md: database, Auth, tenant, permissions, core entities
- API_CONTRACT.md: API routes, server actions, webhooks, adapters
- ENV_CHECKLIST.md: deployment, third-party APIs, env vars, secrets
- PRESENTATION_BRIEF.md: slides, one-pager, white paper, resume, portfolio
- TESTER_HANDOFF.md: beta, tester handoff, preview sharing
- MACOS_RELEASE_CHECKLIST.md: macOS build, signing, TCC, DMG, notarization
- AGENT_RUNTIME.md: production-facing LLM agent, automation, tool use
- RAG_DESIGN.md: retrieval, knowledge base, document Q&A, citation
- EVAL_PLAN.md: LLM, RAG, agent regression testing
- AI_SECURITY_REVIEW.md: prompt injection, tenant data, PII, tool risk

## Gate

Do not write code until Q1-Q9 are answered, required documents are filled, open loops are explicit, and the user confirms the task plan.`;
}

function agentsContent() {
  return `# AGENTS.md

## Project Rules

- Start by reading START_HERE.md.
- Do not write code before Q1-Q9 intake, required project docs, and TASK_CONTRACT.md are confirmed.
- Keep every task tied to input, tools, expected output, verification, and explicit non-goals.
- Do not treat OPEN_LOOPS.md items as decided.
- Record project-specific commands here after they are verified.

## Required Documents

- PROJECT_BRIEF.md
- SPEC.md
- CONTEXT.md
- TASK_CONTRACT.md
- OPEN_LOOPS.md
- TECH_STACK.md

## Commands

| Purpose | Command |
|---|---|
| Install |  |
| Test |  |
| Lint |  |
| Build |  |
| Dev server |  |

## Verification

- Every implementation task must name its verification command or manual check.
- Final delivery must report which checks passed and which checks remain blocked.

## Do Not

- Do not commit secrets or private tester data.
- Do not expand scope without updating SPEC.md and TASK_CONTRACT.md.
- Do not add permanent agent rules before deciding whether they belong in AGENTS.md, docs, skills, hooks, or issue templates.

## File Ownership

- Product and scope: PROJECT_BRIEF.md, SPEC.md
- Shared language: CONTEXT.md
- Work execution: TASK_CONTRACT.md
- Risks and unresolved items: OPEN_LOOPS.md
- Local agent rules and commands: AGENTS.md
- Technologies and versions: TECH_STACK.md`;
}

function claudeContent() {
  return `# CLAUDE.md

## Claude Code Start

Read START_HERE.md, AGENTS.md, and this file before making changes.

## First Response

Report:
- files read
- fixed documents present
- conditional documents likely needed
- open blockers
- why code cannot start yet

Then start Q1-Q9 intake. Ask one question at a time.`;
}

function antigravityContent() {
  return `# ANTIGRAVITY.md

## Antigravity Start

Read START_HERE.md, AGENTS.md, and this file before implementing app code.

## First Response

Report:
- files read
- fixed documents present
- conditional documents likely needed
- open blockers
- why implementation cannot start yet

Then start Q1-Q9 intake. Ask one question at a time.`;
}

function runtimeFiles(agent) {
  if (agent === 'all') {
    return [
      ['AGENTS.md', agentsContent()],
      ['CLAUDE.md', claudeContent()],
      ['ANTIGRAVITY.md', antigravityContent()],
    ];
  }

  if (agent === 'codex') {
    return [
      ['AGENTS.md', agentsContent()],
    ];
  }

  if (agent === 'claude') {
    return [
      ['AGENTS.md', agentsContent()],
      ['CLAUDE.md', claudeContent()],
    ];
  }

  return [
    ['AGENTS.md', agentsContent()],
    ['ANTIGRAVITY.md', antigravityContent()],
  ];
}

let options;
try {
  options = parseArgs(process.argv.slice(2));
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

const targetDir = path.resolve(options.targetDir);
const stats = { copied: 0, generated: 0, skipped: 0 };

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log(`Created directory: ${targetDir}`);
}

const templateDocs = options.all
  ? allTemplateFiles()
  : unique([...FIXED_DOCS, ...PROFILE_DOCS[options.profile]]);

for (const file of templateDocs.filter((file) => file !== 'AGENTS.md')) {
  copyTemplate(file, targetDir, stats);
}

writeGenerated('START_HERE.md', targetDir, startHereContent(options.agent, options.profile), stats);

for (const [file, content] of runtimeFiles(options.agent)) {
  writeGenerated(file, targetDir, content, stats);
}

console.log();
console.log(`Done. Copied ${stats.copied} template file(s), generated ${stats.generated} file(s), skipped ${stats.skipped} existing file(s).`);
console.log();
console.log('Next steps:');
console.log('  1. Fill PROJECT_BRIEF.md with the one-line project direction and target user.');
console.log('  2. Ask the agent to read START_HERE.md and its runtime instruction file.');
console.log('  3. Run: node codex-project-starter/scripts/doctor.mjs <target-directory>');
