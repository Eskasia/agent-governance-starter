#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const skillDir = path.join(root, 'templates/runtime/antigravity/skills');
const expectedSkills = [
  'bootstrap-intake',
  'validation-gate',
  'implementation-plan',
  'release-handoff',
];
const errors = [];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

for (const skill of expectedSkills) {
  const relativePath = `templates/runtime/antigravity/skills/${skill}/SKILL.md`;
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) {
    errors.push(`Missing ${relativePath}`);
    continue;
  }
  const content = read(relativePath);
  if (!/^---\n[\s\S]*?\n---/m.test(content)) errors.push(`${relativePath} missing frontmatter`);
  if (!new RegExp(`^name:\\s*${skill}$`, 'm').test(content)) errors.push(`${relativePath} missing matching name`);
  if (!/^description:\s*\S+/m.test(content)) errors.push(`${relativePath} missing description`);
}

if (!fs.existsSync(skillDir)) errors.push('Missing templates/runtime/antigravity/skills');

const initScript = read('scripts/init.mjs');
for (const skill of expectedSkills) {
  const generatedPath = `.agents/skills/${skill}/SKILL.md`;
  if (!initScript.includes(generatedPath)) errors.push(`scripts/init.mjs does not generate ${generatedPath}`);
}

if (errors.length > 0) {
  console.error('Antigravity skill check failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Antigravity skill check passed.');
