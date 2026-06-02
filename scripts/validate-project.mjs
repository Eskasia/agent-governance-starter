#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const STARTER_ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const PROFILES_DIR = path.join(STARTER_ROOT, 'profiles');
const PROJECT_CONFIG_FILE = '.agent-governance.json';

function usage() {
  console.log('Usage: node scripts/validate-project.mjs [--profile base|fullstack-ai|macos] <project-directory>');
  process.exit(0);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function uniqueByFile(items) {
  const byFile = new Map();
  for (const item of items) byFile.set(item.file, item);
  return [...byFile.values()];
}

function loadProfile(name, seen = new Set()) {
  const profilePath = path.join(PROFILES_DIR, `${name}.json`);
  if (!fs.existsSync(profilePath)) throw new Error(`Unknown profile: ${name}`);
  if (seen.has(name)) throw new Error(`Profile extends cycle: ${[...seen, name].join(' -> ')}`);
  const profile = readJson(profilePath);
  if (!profile.extends) return { ...profile, documents: profile.documents || [], conditionalHints: profile.conditionalHints || [] };
  const parent = loadProfile(profile.extends, new Set([...seen, name]));
  return {
    ...parent,
    ...profile,
    documents: uniqueByFile([...(parent.documents || []), ...(profile.documents || [])]),
    conditionalHints: uniqueByFile([...(parent.conditionalHints || []), ...(profile.conditionalHints || [])]),
  };
}

function parseArgs(argv) {
  const options = { profile: null, projectDir: null };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') usage();
    if (arg === '--profile') {
      options.profile = argv[i + 1];
      i += 1;
      continue;
    }
    if (arg.startsWith('--')) throw new Error(`Unknown option: ${arg}`);
    if (options.projectDir) throw new Error(`Unexpected extra argument: ${arg}`);
    options.projectDir = arg;
  }
  if (!options.projectDir) usage();
  options.projectDir = path.resolve(options.projectDir);
  return options;
}

let options;
try {
  options = parseArgs(process.argv.slice(2));
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

const errors = [];
const projectDir = options.projectDir;

function exists(relativePath) {
  return fs.existsSync(path.join(projectDir, relativePath));
}

function read(relativePath) {
  return fs.readFileSync(path.join(projectDir, relativePath), 'utf8');
}

function fail(message) {
  errors.push(message);
}

function projectConfig() {
  const configPath = path.join(projectDir, PROJECT_CONFIG_FILE);
  if (!fs.existsSync(configPath)) return null;
  return readJson(configPath);
}

function profileName(config) {
  return options.profile || config?.profile || 'base';
}

function pipeTableCount(content) {
  return content.split(/\r?\n/).filter((line) => line.trim().startsWith('|')).length;
}

function requirePipeTable(file) {
  if (!exists(file)) return;
  if (pipeTableCount(read(file)) < 2) fail(`${file} must contain markdown pipe tables`);
}

function requireCommandsTable() {
  if (!exists('AGENTS.md')) return;
  const content = read('AGENTS.md');
  if (!content.includes('## Commands') || !content.includes('| Purpose | Command |')) {
    fail('AGENTS.md must include a Commands table');
  }
}

function requireOpenLoopsTable() {
  if (!exists('OPEN_LOOPS.md')) return;
  const content = read('OPEN_LOOPS.md');
  if (!content.includes('| Status |') || !/open|closed|blocked/i.test(content)) {
    fail('OPEN_LOOPS.md must include a status table with open/closed/blocked states');
  }
}

function adapterFiles(agent) {
  const files = ['README.md', 'AGENTS.md'];
  if (exists('START_HERE.md')) files.push('START_HERE.md');
  if (agent === 'claude' || agent === 'all') files.push('CLAUDE.md');
  if (agent === 'antigravity' || agent === 'all') {
    files.push(
      '.agents/AGENTS.md',
      '.agents/skills/bootstrap-intake/SKILL.md',
      '.agents/skills/validation-gate/SKILL.md',
      '.agents/skills/implementation-plan/SKILL.md',
      '.agents/skills/release-handoff/SKILL.md',
    );
  }
  return files;
}

let config;
let profile;
try {
  config = projectConfig();
  profile = loadProfile(profileName(config));
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

for (const doc of profile.documents.filter((item) => item.required)) {
  if (!exists(doc.file)) fail(`Missing required document: ${doc.file}`);
}

for (const file of adapterFiles(config?.agent || 'codex')) {
  if (!exists(file)) fail(`Missing adapter file: ${file}`);
}

for (const file of ['CONTEXT.md', 'TASK_CONTRACT.md', 'OPEN_LOOPS.md', 'TECH_STACK.md']) {
  requirePipeTable(file);
}

requireCommandsTable();
requireOpenLoopsTable();

if (profile.name === 'fullstack-ai') {
  for (const file of ['DATA_MODEL.md', 'API_CONTRACT.md', 'ENV_CHECKLIST.md', 'AI_SECURITY_REVIEW.md']) {
    if (!exists(file)) fail(`fullstack-ai profile requires ${file}`);
  }
}

if (errors.length > 0) {
  console.error('Project validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Project validation passed: ${path.relative(process.cwd(), projectDir) || '.'}`);
