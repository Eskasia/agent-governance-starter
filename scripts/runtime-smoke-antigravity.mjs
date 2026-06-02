#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const FIXTURE_DIR = path.join(ROOT, '.tmp/runtime-antigravity');
const OUTPUT_FILE = path.join(FIXTURE_DIR, 'antigravity-first-response.txt');
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

function installSkillFixture() {
  const target = path.join(FIXTURE_DIR, '.agents/skills/intake-audit/SKILL.md');
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(path.join(ROOT, 'tests/runtime/antigravity/skill-template/SKILL.md'), target);
}

function mockOutput() {
  return `SKILL_USED: intake-audit
FILES_READ:
- START_HERE.md
- AGENTS.md
- .agents/AGENTS.md
BLOCKERS:
- Q1-Q9 intake is not complete.
NEXT_INTAKE_QUESTION:
Q1. 這個東西要解決誰的什麼問題？
`;
}

function realOutput() {
  const antigravityBin = process.env.ANTIGRAVITY_BIN || 'antigravity';
  if (!commandExists(antigravityBin)) {
    throw new Error(`RUNTIME_PROOF_REAL=1 requires Antigravity CLI. Set ANTIGRAVITY_BIN or install ${antigravityBin}.`);
  }
  return run(antigravityBin, [
    '-p',
    'Use the intake-audit skill. Read START_HERE.md, AGENTS.md, and .agents/AGENTS.md. Output SKILL_USED: intake-audit, FILES_READ:, BLOCKERS:, NEXT_INTAKE_QUESTION:. Do not write code.',
  ], { cwd: FIXTURE_DIR });
}

function assertIncludes(content, needle) {
  if (!content.includes(needle)) {
    throw new Error(`antigravity-first-response.txt missing ${needle}`);
  }
}

try {
  fs.rmSync(FIXTURE_DIR, { recursive: true, force: true });
  run(process.execPath, ['scripts/init.mjs', FIXTURE_DIR, '--agent', 'all', '--profile', 'base']);
  installSkillFixture();
  fs.writeFileSync(OUTPUT_FILE, REAL_MODE ? realOutput() : mockOutput());
  const content = fs.readFileSync(OUTPUT_FILE, 'utf8');
  for (const needle of ['SKILL_USED: intake-audit', 'FILES_READ:', 'BLOCKERS:', 'NEXT_INTAKE_QUESTION:']) {
    assertIncludes(content, needle);
  }
  console.log('antigravity runtime smoke: PASS');
} catch (error) {
  console.error(`antigravity runtime smoke: FAIL\n${error.message}`);
  process.exit(1);
}
