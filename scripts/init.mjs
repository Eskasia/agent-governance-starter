#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const STARTER_ROOT = path.dirname(path.dirname(new URL(import.meta.url).pathname));
const TEMPLATES_DIR = path.join(STARTER_ROOT, 'templates');

const FIXED_DOCS = [
  'PROJECT_BRIEF.md',
  'SPEC.md',
  'CONTEXT.md',
  'TASK_CONTRACT.md',
  'OPEN_LOOPS.md',
  'AGENTS.md',
  'TECH_STACK.md',
];

function usage() {
  console.log(`Usage: node scripts/init.mjs <target-directory> [--all]`);
  console.log();
  console.log('  Copies fixed project document templates to <target-directory>.');
  console.log('  Use --all to also copy conditional templates.');
  console.log();
  console.log('Fixed documents:');
  for (const doc of FIXED_DOCS) console.log(`  - ${doc}`);
  process.exit(0);
}

const args = process.argv.slice(2).filter((a) => a !== '--help');
if (args.length === 0 || process.argv.includes('--help')) usage();

const targetDir = path.resolve(args[0]);
const copyAll = args.includes('--all');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log(`Created directory: ${targetDir}`);
}

const templateFiles = fs.readdirSync(TEMPLATES_DIR).filter((f) => f.endsWith('.md') && f !== 'README.md');
const filesToCopy = copyAll ? templateFiles : FIXED_DOCS;

let copied = 0;
let skipped = 0;

for (const file of filesToCopy) {
  const src = path.join(TEMPLATES_DIR, file);
  const dest = path.join(targetDir, file);

  if (!fs.existsSync(src)) {
    console.warn(`  ⚠ Template not found: ${file}`);
    continue;
  }

  if (fs.existsSync(dest)) {
    console.log(`  ⏭ Already exists: ${file}`);
    skipped++;
    continue;
  }

  fs.copyFileSync(src, dest);
  console.log(`  ✓ Copied: ${file}`);
  copied++;
}

console.log();
console.log(`Done. Copied ${copied} file(s), skipped ${skipped} existing file(s).`);
console.log();
console.log('Next steps:');
console.log('  1. Fill in PROJECT_BRIEF.md with your one-liner and target user.');
console.log('  2. Tell your agent: "Read AGENTS.md, then start Q1-Q9 from 01-bootstrap-gates.md."');
