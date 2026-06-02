#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const files = [
  'templates/fixed/CONTEXT.md',
  'templates/fixed/TASK_CONTRACT.md',
  'templates/fixed/OPEN_LOOPS.md',
  'templates/fixed/TECH_STACK.md',
];
const errors = [];

function read(file) {
  return fs.readFileSync(path.join(root, file), 'utf8');
}

function lintStrictTables(file) {
  const lines = read(file).split(/\r?\n/);
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim();
    if (!line || line.startsWith('#')) continue;
    if (!line.startsWith('|')) {
      errors.push(`${file}:${i + 1} must be a markdown pipe-table row`);
    }
  }

  const tableStarts = [];
  for (let i = 0; i < lines.length - 1; i += 1) {
    if (lines[i].trim().startsWith('|') && /^\|\s*-+/.test(lines[i + 1].trim())) {
      tableStarts.push(i + 1);
    }
  }
  if (tableStarts.length === 0) errors.push(`${file} must contain at least one markdown pipe table`);
}

for (const file of files) lintStrictTables(file);

if (errors.length > 0) {
  console.error('Template table lint failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Template table lint passed.');
