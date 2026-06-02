#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const tmpDir = path.join(root, '.tmp');

const fixtures = [
  'base-minimal',
  'fullstack-ai-saas',
  'macos-beta-handoff',
];

function runDoctor(fixture) {
  const result = spawnSync(process.execPath, [
    'scripts/doctor.mjs',
    '--json',
    `examples/template-adoption/${fixture}`,
  ], {
    cwd: root,
    encoding: 'utf8',
    shell: false,
  });
  if (result.status !== 0) {
    const stderr = result.stderr ? `\n${result.stderr}` : '';
    throw new Error(`doctor failed for ${fixture} with exit ${result.status}${stderr}`);
  }
  return JSON.stringify(JSON.parse(result.stdout), null, 2) + '\n';
}

function firstMismatch(expected, actual) {
  const expectedLines = expected.split(/\r?\n/);
  const actualLines = actual.split(/\r?\n/);
  const max = Math.max(expectedLines.length, actualLines.length);
  for (let i = 0; i < max; i += 1) {
    if (expectedLines[i] !== actualLines[i]) {
      return {
        line: i + 1,
        expected: expectedLines[i] ?? '<missing>',
        actual: actualLines[i] ?? '<missing>',
      };
    }
  }
  return null;
}

try {
  fs.mkdirSync(tmpDir, { recursive: true });
  for (const fixture of fixtures) {
    const actual = runDoctor(fixture);
    const actualPath = path.join(tmpDir, `${fixture}-doctor.json`);
    const expectedPath = path.join(root, `examples/template-adoption/${fixture}/expected/doctor.json`);
    fs.writeFileSync(actualPath, actual);

    const expected = fs.readFileSync(expectedPath, 'utf8');
    if (actual !== expected) {
      const mismatch = firstMismatch(expected, actual);
      console.error(`Fixture doctor JSON mismatch: ${fixture}`);
      console.error(`Expected: ${expectedPath}`);
      console.error(`Actual: ${actualPath}`);
      if (mismatch) {
        console.error(`First mismatch at line ${mismatch.line}`);
        console.error(`- expected: ${mismatch.expected}`);
        console.error(`+ actual:   ${mismatch.actual}`);
      }
      process.exit(1);
    }
  }
  console.log('Fixture doctor JSON checks passed.');
} catch (error) {
  console.error(`Fixture checks failed:\n${error.message}`);
  process.exit(1);
}
