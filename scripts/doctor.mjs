#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const projectDir = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();

function exists(relativePath) {
  return fs.existsSync(path.join(projectDir, relativePath));
}

function readFile(relativePath) {
  return fs.readFileSync(path.join(projectDir, relativePath), 'utf8');
}

function hasContent(relativePath) {
  if (!exists(relativePath)) return false;
  const content = readFile(relativePath).trim();
  const lines = content.split('\n').filter((l) => l.trim() && !l.startsWith('#') && !l.startsWith('|---'));
  const filledLines = lines.filter((l) => {
    const t = l.trim();
    // Skip empty label lines: "- 輸入：" or "- key: "
    if (/^-\s+\S+[：:]\s*$/.test(t)) return false;
    // Skip table rows where all data cells are empty: "| text |  |  |"
    if (t.startsWith('|') && t.endsWith('|')) {
      const cells = t.split('|').slice(1, -1);
      const emptyCells = cells.filter((c) => c.trim() === '');
      if (emptyCells.length >= cells.length - 1 && cells.length > 1) return false;
    }
    // Skip table header rows
    if (/^\|.*\|$/.test(t) && /^\|\s*(檔案|#|Token|File|Method|Entity|Role|Table|Component|State|場景|規則|Screen|原則)\s*\|/.test(t)) return false;
    // Skip markdown code fence
    if (t.startsWith('```')) return false;
    // Skip template placeholders
    if (t === '- ' || t === '-' || t.endsWith('：') || /^-\s+[^:：]+[：:]\s*$/.test(t)) return false;
    return true;
  });
  return filledLines.length > 5;
}

const checks = [];
const warnings = [];

// --- Fixed documents ---
const fixedDocs = [
  'PROJECT_BRIEF.md',
  'SPEC.md',
  'CONTEXT.md',
  'TASK_CONTRACT.md',
  'OPEN_LOOPS.md',
  'AGENTS.md',
  'TECH_STACK.md',
];

for (const doc of fixedDocs) {
  if (!exists(doc)) {
    checks.push(`✗ Missing: ${doc}`);
  } else if (!hasContent(doc)) {
    checks.push(`⚠ Unfilled template: ${doc}`);
    warnings.push(`⚠ ${doc} exists but appears to be an unfilled template`);
  } else {
    checks.push(`✓ ${doc}`);
  }
}

// --- SPEC acceptance criteria ---
if (exists('SPEC.md')) {
  const spec = readFile('SPEC.md');
  if (!spec.includes('yes') && !spec.includes('no') && !spec.includes('是') && !spec.includes('否') && !spec.includes('[ ]') && !spec.includes('[x]')) {
    warnings.push('⚠ SPEC.md: acceptance criteria should be yes/no testable');
  }
}

// --- TASK_CONTRACT verification ---
if (exists('TASK_CONTRACT.md')) {
  const tc = readFile('TASK_CONTRACT.md');
  if (!tc.includes('驗證') && !tc.includes('verif') && !tc.includes('test')) {
    warnings.push('⚠ TASK_CONTRACT.md: tasks should each have a verification method');
  }
}

// --- Conditional document hints ---
const conditionalHints = [
  { file: 'UI_SPEC.md', trigger: 'Has UI / website / dashboard / landing page' },
  { file: 'DATA_MODEL.md', trigger: 'Has DB / Auth / tenant / permissions' },
  { file: 'API_CONTRACT.md', trigger: 'Has API routes / server actions / webhooks' },
  { file: 'ENV_CHECKLIST.md', trigger: 'Has deployment / third-party API keys' },
  { file: 'AGENT_RUNTIME.md', trigger: 'Has production-facing LLM agent / automation' },
  { file: 'RAG_DESIGN.md', trigger: 'Has retrieval / knowledge base / document Q&A' },
  { file: 'EVAL_PLAN.md', trigger: 'Has LLM/RAG/agent output needing regression testing' },
  { file: 'AI_SECURITY_REVIEW.md', trigger: 'Has prompt injection / tenant data / PII risks' },
  { file: 'MACOS_RELEASE_CHECKLIST.md', trigger: 'Has macOS app build / TCC / signing' },
  { file: 'DESIGN_SYSTEM.md', trigger: 'Has screenshots / existing UI to extract design rules from' },
  { file: 'PRESENTATION_BRIEF.md', trigger: 'Has presentation / slide deck / one-pager deliverable' },
  { file: 'TESTER_HANDOFF.md', trigger: 'Has beta / tester handoff requirement' },
];

const presentConditional = [];
const absentConditional = [];
for (const { file, trigger } of conditionalHints) {
  if (exists(file)) {
    presentConditional.push(`  ✓ ${file}`);
  } else {
    absentConditional.push(`  · ${file} — needed if: ${trigger}`);
  }
}

// --- Output ---
console.log(`\nProject doctor: ${projectDir}\n`);

console.log('Fixed documents:');
for (const c of checks) console.log(`  ${c}`);
console.log();

if (presentConditional.length > 0) {
  console.log('Conditional documents (present):');
  for (const c of presentConditional) console.log(c);
  console.log();
}

if (absentConditional.length > 0) {
  console.log('Conditional documents (not present — check if needed):');
  for (const c of absentConditional) console.log(c);
  console.log();
}

if (warnings.length > 0) {
  console.log('Warnings:');
  for (const w of warnings) console.log(`  ${w}`);
  console.log();
}

const missing = checks.filter((c) => c.startsWith('✗'));
if (missing.length > 0) {
  console.log(`Result: ${missing.length} required document(s) missing. Not ready to proceed.`);
  process.exit(1);
} else if (warnings.length > 0) {
  console.log(`Result: All fixed documents present. ${warnings.length} warning(s) to review.`);
} else {
  console.log('Result: All fixed documents present and filled. Ready to proceed.');
}
