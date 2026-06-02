#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.argv[2] ? path.resolve(process.argv[2]) : path.resolve('.');
const errors = [];

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function fail(message) {
  errors.push(message);
}

for (const file of [
  'docs/runtime-proof.md',
  'tests/runtime/codex/expected-headings.txt',
  'tests/runtime/claude/first-response.schema.json',
  'tests/runtime/antigravity/skill-template/SKILL.md',
  'scripts/validate-runtime-proof.mjs',
  'scripts/assert-claude-first-response.mjs',
  'scripts/runtime-smoke-codex.mjs',
  'scripts/runtime-smoke-claude.mjs',
  'scripts/runtime-smoke-antigravity.mjs',
  '.github/workflows/runtime-proof.yml',
]) {
  if (!exists(file)) fail(`Missing runtime proof file: ${file}`);
}

if (exists('tests/runtime/claude/first-response.schema.json')) {
  try {
    JSON.parse(read('tests/runtime/claude/first-response.schema.json'));
  } catch (error) {
    fail(`tests/runtime/claude/first-response.schema.json is invalid JSON: ${error.message}`);
  }
}

if (exists('tests/runtime/antigravity/skill-template/SKILL.md')) {
  const skill = read('tests/runtime/antigravity/skill-template/SKILL.md');
  if (!/^---\n[\s\S]*?\n---/m.test(skill)) fail('Antigravity skill template missing frontmatter');
  if (!/^name:\s*intake-audit$/m.test(skill)) fail('Antigravity skill template frontmatter missing name');
  if (!/^description:\s*\S+/m.test(skill)) fail('Antigravity skill template frontmatter missing description');
}

if (exists('package.json')) {
  const pkg = JSON.parse(read('package.json'));
  for (const script of [
    'runtime:proof',
    'runtime:proof:codex',
    'runtime:proof:claude',
    'runtime:proof:antigravity',
    'validate:runtime-proof',
  ]) {
    if (!pkg.scripts || !pkg.scripts[script]) fail(`package.json missing script: ${script}`);
  }
}

if (exists('.github/workflows/runtime-proof.yml')) {
  const workflow = read('.github/workflows/runtime-proof.yml');
  if (!workflow.includes('workflow_dispatch')) fail('runtime-proof.yml must use workflow_dispatch');
  if (!workflow.includes('npm run runtime:proof')) fail('runtime-proof.yml must run npm run runtime:proof');
}

if (errors.length > 0) {
  console.error('Runtime proof validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Runtime proof validation passed.');
