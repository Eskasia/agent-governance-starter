#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const FIXTURE_DIR = path.join(ROOT, '.tmp/runtime-codex');
const OUTPUT_FILE = path.join(FIXTURE_DIR, 'codex-first-response.txt');
const REAL_MODE = process.env.RUNTIME_PROOF_REAL === '1';

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd || ROOT,
    encoding: 'utf8',
    shell: false,
  });
  if (result.status !== 0) {
    const stderr = result.stderr ? `\n${result.stderr}` : '';
    throw new Error(`${command} ${args.join(' ')} failed with exit ${result.status}${stderr}`);
  }
  return result.stdout || '';
}

function commandExists(command) {
  const checker = process.platform === 'win32' ? 'where' : 'command';
  const args = process.platform === 'win32' ? [command] : ['-v', command];
  const result = spawnSync(checker, args, { encoding: 'utf8', shell: process.platform !== 'win32' });
  return result.status === 0;
}

function mockOutput() {
  return `FILES_READ:
- START_HERE.md
- AGENTS.md
FIXED_DOCS:
- README.md
- PROJECT_BRIEF.md
- SPEC.md
- CONTEXT.md
- TASK_CONTRACT.md
- OPEN_LOOPS.md
- AGENTS.md
- TECH_STACK.md
CONDITIONAL_DOCS:
- UI_SPEC.md
- DATA_MODEL.md
BLOCKERS:
- Q1-Q9 intake is not complete.
`;
}

function realOutput() {
  const codexBin = process.env.CODEX_BIN || 'codex';
  if (!commandExists(codexBin)) {
    throw new Error(`RUNTIME_PROOF_REAL=1 requires Codex CLI. Set CODEX_BIN or install ${codexBin}.`);
  }
  return run(codexBin, [
    'exec',
    '--sandbox',
    'read-only',
    '--ask-for-approval',
    'never',
    'Read START_HERE.md and AGENTS.md. Output FILES_READ:, FIXED_DOCS:, CONDITIONAL_DOCS:, BLOCKERS:. Under each heading, use bullet items. Do not write code. Do not modify files.',
  ], { cwd: FIXTURE_DIR });
}

function assertIncludes(content, needle) {
  if (!content.includes(needle)) {
    throw new Error(`codex-first-response.txt missing ${needle}`);
  }
}

try {
  fs.rmSync(FIXTURE_DIR, { recursive: true, force: true });
  run(process.execPath, ['scripts/init.mjs', FIXTURE_DIR, '--agent', 'codex', '--profile', 'base']);
  const output = REAL_MODE ? realOutput() : mockOutput();
  fs.writeFileSync(OUTPUT_FILE, output);

  const expected = fs.readFileSync(path.join(ROOT, 'tests/runtime/codex/expected-headings.txt'), 'utf8')
    .split(/\r?\n/)
    .filter(Boolean);
  const content = fs.readFileSync(OUTPUT_FILE, 'utf8');
  for (const heading of expected) assertIncludes(content, heading);
  assertIncludes(content, 'START_HERE.md');
  assertIncludes(content, 'AGENTS.md');
  console.log('codex runtime smoke: PASS');
} catch (error) {
  console.error(`codex runtime smoke: FAIL\n${error.message}`);
  process.exit(1);
}
