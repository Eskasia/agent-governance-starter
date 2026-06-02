#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.argv[2] ? path.resolve(process.argv[2]) : path.resolve('.');

function readFile(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function readJson(relativePath) {
  return JSON.parse(readFile(relativePath));
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

function lineCount(relativePath) {
  return readFile(relativePath).split(/\r?\n/).length;
}

function requireRealNewlines(errors, file) {
  if (!exists(file)) {
    fail(errors, `Missing ${file}`);
    return;
  }
  if (lineCount(file) < 2) {
    fail(errors, `${file} appears to be single-line; keep generated files with real newlines`);
  }
}

function collectFiles(relativeDir, predicate) {
  const absoluteDir = path.join(root, relativeDir);
  if (!fs.existsSync(absoluteDir)) return [];

  const files = [];
  for (const entry of fs.readdirSync(absoluteDir, { withFileTypes: true })) {
    const relativePath = path.join(relativeDir, entry.name);
    const absolutePath = path.join(root, relativePath);
    if (entry.isDirectory()) {
      files.push(...collectFiles(relativePath, predicate));
    } else if (entry.isFile() && predicate(relativePath, absolutePath)) {
      files.push(relativePath);
    }
  }
  return files;
}

function templateMarkdownFiles() {
  return collectFiles('templates', (relativePath) => relativePath.endsWith('.md'));
}

function templateExists(doc) {
  return templateMarkdownFiles().some((file) => path.basename(file) === doc);
}

function uniqueByFile(items) {
  const byFile = new Map();
  for (const item of items) byFile.set(item.file, item);
  return [...byFile.values()];
}

function loadProfile(name, seen = new Set()) {
  const profilePath = `profiles/${name}.json`;
  if (!exists(profilePath)) {
    throw new Error(`Missing profile: ${profilePath}`);
  }
  if (seen.has(name)) {
    throw new Error(`Profile extends cycle: ${[...seen, name].join(' -> ')}`);
  }

  const profile = readJson(profilePath);
  if (!profile.extends) {
    return {
      ...profile,
      documents: profile.documents || [],
      conditionalHints: profile.conditionalHints || [],
    };
  }

  const parent = loadProfile(profile.extends, new Set([...seen, name]));
  return {
    ...parent,
    ...profile,
    documents: uniqueByFile([...(parent.documents || []), ...(profile.documents || [])]),
    conditionalHints: uniqueByFile([...(parent.conditionalHints || []), ...(profile.conditionalHints || [])]),
  };
}

function profileFiles() {
  return collectFiles('profiles', (relativePath) => relativePath.endsWith('.json'));
}

function validateProjectDoc(errors, profileFile, doc) {
  for (const key of ['file', 'template', 'category', 'required', 'trigger']) {
    if (!Object.hasOwn(doc, key)) fail(errors, `${profileFile} document missing ${key}`);
  }
  if (doc.template && !exists(`templates/${doc.template}`)) {
    fail(errors, `${profileFile} references missing template: templates/${doc.template}`);
  }
  if (doc.category && !['fixed', 'conditional', 'runtime'].includes(doc.category)) {
    fail(errors, `${profileFile} has invalid document category for ${doc.file}: ${doc.category}`);
  }
}

function validateProfile(errors, profileFile) {
  let profile;
  try {
    profile = readJson(profileFile);
  } catch (error) {
    fail(errors, `${profileFile} is not valid JSON: ${error.message}`);
    return;
  }

  for (const key of ['schemaVersion', 'name', 'description', 'documents']) {
    if (!Object.hasOwn(profile, key)) fail(errors, `${profileFile} missing required key: ${key}`);
  }

  for (const doc of profile.documents || []) validateProjectDoc(errors, profileFile, doc);
  for (const doc of profile.conditionalHints || []) validateProjectDoc(errors, profileFile, doc);

  if (profile.extends && !exists(`profiles/${profile.extends}.json`)) {
    fail(errors, `${profileFile} extends missing profile: profiles/${profile.extends}.json`);
  }
}

const errors = [];

for (const file of [
  'README.md',
  'package.json',
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
  'profiles/base.json',
  'profiles/fullstack-ai.json',
  'profiles/macos.json',
  'schemas/project-doc.schema.json',
  'schemas/doctor-output.schema.json',
]) {
  requireFile(errors, file);
}

for (const dir of ['startup', 'workflows', 'templates', 'scripts', 'docs', 'prompts', 'profiles', 'schemas', 'examples/template-adoption']) {
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
  'node agent-governance-starter/scripts/doctor.mjs ./my-new-project',
]);

requireIncludes(errors, 'AGENTS.md', [
  'canonical source of truth',
  'thin adapters',
]);

requireIncludes(errors, 'CLAUDE.md', [
  '@AGENTS.md',
  'thin Claude Code adapter',
]);

requireIncludes(errors, 'ANTIGRAVITY.md', [
  'not the official Antigravity runtime entrypoint',
  '.agents/AGENTS.md',
  '.agents/skills/*/SKILL.md',
]);

requireIncludes(errors, 'package.json', [
  '"check"',
  '"validate"',
  '"smoke:base"',
  '"smoke:fullstack"',
  '"fixtures"',
  '"ci"',
]);

for (const file of ['README.md', 'CLAUDE.md', 'ANTIGRAVITY.md']) {
  if (exists(file)) {
    const content = readFile(file);
    if (content.includes('then 01-bootstrap-gates.md') || content.includes('then 02-required-project-docs.md')) {
      fail(errors, `${file} has ambiguous startup path in first-message text`);
    }
  }
}

requireIncludes(errors, 'scripts/init.mjs', ['--agent', '--profile', '--all', 'START_HERE.md', '.agents/AGENTS.md', '.agents/skills/bootstrap-intake/SKILL.md']);
requireIncludes(errors, 'scripts/doctor.mjs', ['--strict', '--json', 'warnings as failures']);
requireIncludes(errors, '.github/workflows/validate-starter.yml', [
  'node scripts/validate-starter.mjs .',
  'node --check scripts/init.mjs',
  'node scripts/init.mjs "$RUNNER_TEMP/base" --agent codex',
  'node scripts/doctor.mjs --strict examples/template-adoption/fullstack-ai-saas',
  'node scripts/doctor.mjs --strict examples/template-adoption/macos-beta-handoff',
]);

for (const file of [
  'scripts/init.mjs',
  'scripts/doctor.mjs',
  'scripts/validate-starter.mjs',
  '.github/workflows/validate-starter.yml',
]) {
  requireRealNewlines(errors, file);
}

for (const file of templateMarkdownFiles()) {
  requireRealNewlines(errors, file);
}

for (const file of profileFiles()) {
  requireRealNewlines(errors, file);
  validateProfile(errors, file);
}

for (const file of collectFiles('schemas', (relativePath) => relativePath.endsWith('.json'))) {
  requireRealNewlines(errors, file);
  try {
    readJson(file);
  } catch (error) {
    fail(errors, `${file} is not valid JSON: ${error.message}`);
  }
}

if (!exists('templates/README.md')) {
  fail(errors, 'Missing templates/README.md');
} else {
  const templateReadme = readFile('templates/README.md');
  const templateRefs = markdownRefs(templateReadme).filter((ref) => /^[A-Z0-9_]+\.md$/.test(ref));
  for (const doc of templateRefs) {
    if (!templateExists(doc)) fail(errors, `templates/README.md lists missing template: ${doc}`);
  }
}

const examplesRoot = path.join(root, 'examples/template-adoption');
if (fs.existsSync(examplesRoot)) {
  let requiredExampleDocs = [];
  try {
    requiredExampleDocs = loadProfile('base').documents
      .filter((doc) => doc.required)
      .map((doc) => doc.file);
  } catch (error) {
    fail(errors, error.message);
  }

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

let projectOutputDocs = new Set(['assets/ASSET_MANIFEST.md', 'docs/adr/*.md']);
try {
  const docs = profileFiles().flatMap((profileFile) => {
    const profileName = path.basename(profileFile, '.json');
    const profile = loadProfile(profileName);
    return [...(profile.documents || []), ...(profile.conditionalHints || [])].map((doc) => doc.file);
  });
  projectOutputDocs = new Set([...projectOutputDocs, ...docs]);
} catch (error) {
  fail(errors, error.message);
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
    if (/^[A-Z0-9_]+\.md$/.test(ref) && !templateExists(ref) && !projectOutputDocs.has(ref)) {
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
