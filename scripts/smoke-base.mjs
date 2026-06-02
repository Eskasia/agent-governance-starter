#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const target = path.join(root, '.tmp/base');

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: 'inherit',
    shell: false,
  });
  if (result.status !== 0) process.exit(result.status || 1);
}

fs.rmSync(target, { recursive: true, force: true });
run(process.execPath, ['scripts/init.mjs', target, '--agent', 'codex']);

const startHere = fs.readFileSync(path.join(target, 'START_HERE.md'), 'utf8');
if (!startHere.includes('Q9.')) {
  console.error('smoke:base failed: START_HERE.md does not include Q9.');
  process.exit(1);
}

run(process.execPath, ['scripts/doctor.mjs', target]);
