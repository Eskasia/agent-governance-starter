#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.argv[2] ? path.resolve(process.argv[2]) : path.resolve('/Users/william/codex-project-starter');
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
  'AI_SECURITY_REVIEW.md',
  'CONTEXT.md',
  'DESIGN.md',
  'OPEN_LOOPS.md',
  'PROJECT_BRIEF.md',
  'RAG_DESIGN.md',
  'SPEC.md',
  'TECH_STACK.md',
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

function localWorkflowRefs(text) {
  return markdownRefs(text).filter((ref) => /^\d{2}-.+\.md$/.test(ref) || ['README.md', 'BOOTSTRAP.md', 'INDEX.md', 'CHANGELOG.md'].includes(ref));
}

function templateDocNames(text) {
  return markdownRefs(text).filter((ref) => /^[A-Z0-9_]+\.md$/.test(ref));
}

function fail(errors, message) {
  errors.push(message);
}

const errors = [];

if (!exists('README.md')) {
  fail(errors, 'Missing README.md');
} else {
  for (const ref of localWorkflowRefs(readFile('README.md'))) {
    if (!exists(ref)) fail(errors, `README.md references missing file: ${ref}`);
  }
}

if (!exists('templates/README.md')) {
  fail(errors, 'Missing templates/README.md');
} else {
  for (const doc of templateDocNames(readFile('templates/README.md'))) {
    if (!exists(`templates/${doc}`)) fail(errors, `templates/README.md lists missing template: templates/${doc}`);
  }
}

if (exists('12-stage-routing.md')) {
  const routing = readFile('12-stage-routing.md');
  for (const ref of markdownRefs(routing)) {
    if (ref.startsWith('templates/')) {
      if (!exists(ref)) fail(errors, `12-stage-routing.md references missing template path: ${ref}`);
      continue;
    }
    if (/^[A-Z0-9_]+\.md$/.test(ref) && !exists(`templates/${ref}`) && !projectOutputDocs.has(ref)) {
      fail(errors, `12-stage-routing.md output lacks template or project-output allowlist: ${ref}`);
    }
    if (/^\d{2}-.+\.md$/.test(ref) && !exists(ref)) {
      fail(errors, `12-stage-routing.md references missing workflow file: ${ref}`);
    }
  }
} else {
  fail(errors, 'Missing 12-stage-routing.md');
}

const rootFiles = fs.readdirSync(root).filter((file) => /^\d{2}-.+\.md$/.test(file));
const byPrefix = new Map();
for (const file of rootFiles) {
  const prefix = file.slice(0, 2);
  if (!byPrefix.has(prefix)) byPrefix.set(prefix, []);
  byPrefix.get(prefix).push(file);
}
for (const [prefix, files] of byPrefix) {
  if (files.length <= 1) continue;
  fail(errors, `Duplicate workflow prefix ${prefix}: ${files.join(', ')}`);
}

if (!exists('.gitignore')) {
  fail(errors, 'Missing .gitignore');
}

if (!exists('VALIDATION.md')) {
  fail(errors, 'Missing VALIDATION.md');
}

if (!exists('.github/workflows/validate-starter.yml')) {
  fail(errors, 'Missing .github/workflows/validate-starter.yml');
}

const examplesRoot = path.join(root, 'examples/template-adoption');
if (!fs.existsSync(examplesRoot)) {
  fail(errors, 'Missing examples/template-adoption');
} else {
  const exampleDirs = fs.readdirSync(examplesRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name);
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
  for (const ref of localWorkflowRefs(content)) {
    if (!exists(ref)) fail(errors, `${relative} references missing file: ${ref}`);
  }
}

if (errors.length > 0) {
  console.error('Starter validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Starter validation passed.');
