#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.argv[2] ? path.resolve(process.argv[2]) : path.resolve('.');

const requiredExampleDocs = [
  'PROJECT_BRIEF.md',
  'SPEC.md',
  'CONTEXT.md',
  'TASK_CONTRACT.md',
  'OPEN_LOOPS.md',
  'AGENTS.md',
  'TECH_STACK.md',
];

const projectOutputDocs = new Set([
  'AGENTS.md',
  'AGENT_RUNTIME.md',
  'AI_SECURITY_REVIEW.md',
  'API_CONTRACT.md',
  'CONTEXT.md',
  'DATA_MODEL.md',
  'DESIGN_REVIEW.md',
  'DESIGN_SYSTEM.md',
  'ENV_CHECKLIST.md',
  'EVAL_PLAN.md',
  'MACOS_RELEASE_CHECKLIST.md',
  'OPEN_LOOPS.md',
  'PRESENTATION_BRIEF.md',
  'PROJECT_BRIEF.md',
  'RAG_DESIGN.md',
  'SPEC.md',
  'TASK_CONTRACT.md',
  'TECH_STACK.md',
  'TESTER_HANDOFF.md',
  'UI_SPEC.md',
  'assets/ASSET_MANIFEST.md',
  'docs/adr/*.md',
]);

function readFile(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function markdownRefs(text) {
  const refs = new Set();
  const regex = /`([^`\n]+\.md|docs\/adr\/\*\.md|assets\/ASSET_MANIFEST\.md)`/g;
  let match;
  while ((match = regex.exec(text))) {
    refs.add(match[1]);
  }
  return [...refs];
}

function fail(errors, message) {
  errors.push(message);
}

function requireFile(errors, file) {
  if (!exists(file)) fail(errors, `Missing ${file}`);
}

function requireIncludes(errors, file, snippets) {
  if (!exists(file)) {
    fail(errors, `Missing ${file}`);
    return;
  }
  const content = readFile(file);
  for (const snippet of snippets) {
    if (!content.includes(snippet)) fail(errors, `${file} missing required text: ${snippet}`);
  }
}

const errors = [];

for (const file of [
  'README.md',
  'AGENTS.md',
  'CLAUDE.md',
  'ANTIGRAVITY.md',
  'LICENSE',
  'CONTRIBUTING.md',
  'SECURITY.md',
  'ROADMAP.md',
  '.gitignore',
  'VALIDATION.md',
  'docs/index.md',
]) {
  requireFile(errors, file);
}

for (const dir of ['startup', 'workflows', 'templates', 'scripts', 'docs', 'prompts', 'examples/template-adoption']) {
  if (!exists(dir)) fail(errors, `Missing directory: ${dir}`);
}

for (const file of ['startup/00-agent-start-here.md', 'startup/01-bootstrap-gates.md', 'startup/02-required-project-docs.md']) {
  requireFile(errors, file);
}

for (const file of [
  'prompts/codex-new-project.md',
  'prompts/claude-new-project.md',
  'prompts/antigravity-new-project.md',
]) {
  requireIncludes(errors, file, [
    'START_HERE.md',
    'PROJECT_BRIEF.md',
    'SPEC.md',
    'CONTEXT.md',
    'TASK_CONTRACT.md',
    'OPEN_LOOPS.md',
    'TECH_STACK.md',
    'Q1-Q9',
  ]);
}

requireIncludes(errors, 'README.md', [
  'Agent-native project governance starter for Codex, Claude Code, and Antigravity',
  'startup/01-bootstrap-gates.md',
  'startup/02-required-project-docs.md',
  'node codex-project-starter/scripts/doctor.mjs ./my-new-project',
]);

for (const file of ['README.md', 'CLAUDE.md', 'ANTIGRAVITY.md']) {
  if (exists(file)) {
    const content = readFile(file);
    if (content.includes('then 01-bootstrap-gates.md') || content.includes('then 02-required-project-docs.md')) {
      fail(errors, `${file} has ambiguous startup path in first-message text`);
    }
  }
}

requireIncludes(errors, 'scripts/init.mjs', ['--agent', '--profile', '--all', 'START_HERE.md']);
requireIncludes(errors, 'scripts/doctor.mjs', ['--strict', 'warnings as failures']);
requireIncludes(errors, '.github/workflows/validate-starter.yml', [
  'node scripts/validate-starter.mjs .',
  'node scripts/init.mjs "$RUNNER_TEMP/base" --agent codex',
  'node scripts/doctor.mjs --strict examples/template-adoption/fullstack-ai-saas',
  'node scripts/doctor.mjs --strict examples/template-adoption/macos-beta-handoff',
]);

if (!exists('templates/README.md')) {
  fail(errors, 'Missing templates/README.md');
} else {
  const templateReadme = readFile('templates/README.md');
  const templateRefs = markdownRefs(templateReadme).filter((ref) => /^[A-Z0-9_]+\.md$/.test(ref));
  for (const doc of templateRefs) {
    if (!exists(`templates/${doc}`)) fail(errors, `templates/README.md lists missing template: templates/${doc}`);
  }
}

const examplesRoot = path.join(root, 'examples/template-adoption');
if (fs.existsSync(examplesRoot)) {
  const exampleDirs = fs.readdirSync(examplesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  if (exampleDirs.length < 2) {
    fail(errors, `Expected at least 2 template-adoption examples, found ${exampleDirs.length}`);
  }
  for (const dir of exampleDirs) {
    for (const doc of requiredExampleDocs) {
      const examplePath = `examples/template-adoption/${dir}/${doc}`;
      if (!exists(examplePath)) fail(errors, `Example ${dir} missing required doc: ${doc}`);
    }
  }
}

if (exists('workflows/stage-routing.md')) {
  const routing = readFile('workflows/stage-routing.md');
  for (const ref of markdownRefs(routing)) {
    if (ref.startsWith('templates/')) {
      if (!exists(ref)) fail(errors, `stage-routing.md references missing template path: ${ref}`);
      continue;
    }
    if (ref.startsWith('workflows/') || ref.startsWith('startup/') || ref.startsWith('docs/')) {
      if (!exists(ref)) fail(errors, `stage-routing.md references missing file: ${ref}`);
      continue;
    }
    if (/^[A-Z0-9_]+\.md$/.test(ref) && !exists(`templates/${ref}`) && !projectOutputDocs.has(ref)) {
      fail(errors, `stage-routing.md output lacks template or project-output allowlist: ${ref}`);
    }
  }
} else {
  fail(errors, 'Missing workflows/stage-routing.md');
}

const allMarkdown = [];
function collectMarkdown(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '.git' || entry.name === 'node_modules') continue;
      collectMarkdown(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      allMarkdown.push(fullPath);
    }
  }
}
collectMarkdown(root);

for (const filePath of allMarkdown) {
  const relative = path.relative(root, filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  for (const ref of markdownRefs(content)) {
    if (ref.includes('*')) continue;
    if (ref.startsWith('workflows/') || ref.startsWith('startup/') || ref.startsWith('docs/')) {
      if (!exists(ref)) fail(errors, `${relative} references missing file: ${ref}`);
    }
  }
}

const rootFiles = fs.readdirSync(root).filter((file) => /^\d{2}-.+\.md$/.test(file));
if (rootFiles.length > 0) {
  fail(errors, `Old numbered workflow files still in root: ${rootFiles.join(', ')}`);
}

if (errors.length > 0) {
  console.error('Starter validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Starter validation passed.');
