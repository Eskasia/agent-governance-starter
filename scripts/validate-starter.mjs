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

function fail(errors, message) {
  errors.push(message);
}

const errors = [];

// Check required root files
for (const file of ['README.md', 'LICENSE', 'CONTRIBUTING.md', '.gitignore', 'VALIDATION.md']) {
  if (!exists(file)) fail(errors, `Missing ${file}`);
}

// Check required directories
for (const dir of ['startup', 'workflows', 'templates', 'scripts', 'examples/template-adoption']) {
  if (!exists(dir)) fail(errors, `Missing directory: ${dir}`);
}

// Check startup files
for (const file of ['startup/00-agent-start-here.md', 'startup/01-bootstrap-gates.md', 'startup/02-required-project-docs.md']) {
  if (!exists(file)) fail(errors, `Missing startup file: ${file}`);
}

// Check templates/README.md
if (!exists('templates/README.md')) {
  fail(errors, 'Missing templates/README.md');
} else {
  const templateReadme = readFile('templates/README.md');
  const templateRefs = markdownRefs(templateReadme).filter((ref) => /^[A-Z0-9_]+\.md$/.test(ref));
  for (const doc of templateRefs) {
    if (!exists(`templates/${doc}`)) fail(errors, `templates/README.md lists missing template: templates/${doc}`);
  }
}

// Check CI workflow
if (!exists('.github/workflows/validate-starter.yml')) {
  fail(errors, 'Missing .github/workflows/validate-starter.yml');
}

// Check example fixtures
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

// Check stage-routing cross-references
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

// Check all markdown cross-references
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
    // Skip glob patterns
    if (ref.includes('*')) continue;
    // Check workflow/startup/docs references
    if (ref.startsWith('workflows/') || ref.startsWith('startup/') || ref.startsWith('docs/')) {
      if (!exists(ref)) fail(errors, `${relative} references missing file: ${ref}`);
    }
  }
}

// Check no old numbered files remain in root
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
