#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const FIXTURE_DIR = path.join(ROOT, '.tmp/runtime-claude');
const OUTPUT_FILE = path.join(FIXTURE_DIR, 'claude-first-response.json');
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
  return JSON.stringify({
    files_read: ['START_HERE.md', 'AGENTS.md', 'CLAUDE.md'],
    fixed_docs_present: ['README.md', 'PROJECT_BRIEF.md', 'SPEC.md', 'CONTEXT.md', 'TASK_CONTRACT.md', 'OPEN_LOOPS.md', 'AGENTS.md', 'TECH_STACK.md'],
    conditional_docs_likely_needed: ['UI_SPEC.md', 'DATA_MODEL.md'],
    blockers: ['Q1-Q9 intake is not complete.'],
  }, null, 2);
}

function realOutput() {
  const claudeBin = process.env.CLAUDE_BIN || 'claude';
  if (!commandExists(claudeBin)) {
    throw new Error(`RUNTIME_PROOF_REAL=1 requires Claude Code CLI. Set CLAUDE_BIN or install ${claudeBin}.`);
  }
  return run(claudeBin, [
    '-p',
    'Read START_HERE.md, CLAUDE.md, and AGENTS.md. Return only JSON with keys files_read, fixed_docs_present, conditional_docs_likely_needed, blockers. Do not write code.',
    '--output-format',
    'json',
    '--max-turns',
    '1',
    '--no-session-persistence',
  ], { cwd: FIXTURE_DIR });
}

try {
  fs.rmSync(FIXTURE_DIR, { recursive: true, force: true });
  run(process.execPath, ['scripts/init.mjs', FIXTURE_DIR, '--agent', 'claude', '--profile', 'base']);
  fs.writeFileSync(OUTPUT_FILE, REAL_MODE ? realOutput() : mockOutput());
  run(process.execPath, ['scripts/assert-claude-first-response.mjs', OUTPUT_FILE]);
  console.log('claude runtime smoke: PASS');
} catch (error) {
  console.error(`claude runtime smoke: FAIL\n${error.message}`);
  process.exit(1);
}
