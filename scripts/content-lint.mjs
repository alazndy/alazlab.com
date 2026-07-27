// scripts/content-lint.mjs
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const BANNED_LITERALS = [
  'Kernel_Operator',
  'Access_Granted',
  'L5_ARCHITECT_VERIFIED',
  'END_OF_MISSION_FILE',
  'ARCHITECT_GOKTUG_SYS',
  'Authorized_Only',
  'System_Nodes',
  'Uptime_Index',
  'Auth_Protocol',
];

const BANNED_PATTERNS = [
  { name: 'roleplay-level-rank', re: /Level[_ ]\d+\b/g },
];

// Order/position-agnostic checks: flag a line when a value (percent or count)
// AND a relevant keyword both appear anywhere on the same line, regardless of
// adjacency or which one comes first. This survives literal-string renames
// (e.g. "Uptime_Index" -> "Uptime") that the strict single regex above missed.
const BANNED_LINE_RULES = [
  {
    name: 'fabricated-uptime-percent',
    valueRe: /\d+(\.\d+)?%/,
    keywordRe: /uptime/i,
  },
  {
    name: 'fake-node-count',
    valueRe: /\d+/,
    // Case-sensitive on purpose: the roleplay/LCARS styling in this codebase
    // renders this stat as literal all-caps "ACTIVE" (e.g. "46 ACTIVE").
    // A case-insensitive "active" or a bare "nodes?" keyword would false-positive
    // on ordinary tech mentions like "Node.js 20+", "Node-RED", or "Edge Node".
    keywordRe: /\bACTIVE\b/,
  },
];

function walk(dir, exts, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.next' || entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, exts, out);
    else if (exts.some(e => entry.name.endsWith(e))) out.push(full);
  }
  return out;
}

function lintFile(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const lines = text.split('\n');
  const hits = [];

  lines.forEach((line, i) => {
    for (const literal of BANNED_LITERALS) {
      if (line.includes(literal)) {
        hits.push(`${filePath}:${i + 1}: matched banned literal "${literal}"`);
      }
    }
    for (const { name, re } of BANNED_PATTERNS) {
      re.lastIndex = 0;
      if (re.test(line)) {
        hits.push(`${filePath}:${i + 1}: matched banned pattern "${name}" — "${line.trim()}"`);
      }
    }
    for (const { name, valueRe, keywordRe } of BANNED_LINE_RULES) {
      if (valueRe.test(line) && keywordRe.test(line)) {
        hits.push(`${filePath}:${i + 1}: matched banned pattern "${name}" — "${line.trim()}"`);
      }
    }
  });

  return hits;
}

const targets = [
  ...walk(path.join(ROOT, 'src', 'content', 'projects'), ['.md']),
  ...walk(path.join(ROOT, 'src', 'app'), ['.tsx']),
  ...walk(path.join(ROOT, 'src', 'components'), ['.tsx']),
];

const allHits = targets.flatMap(lintFile);

if (allHits.length > 0) {
  console.error(`content-lint: ${allHits.length} violation(s) found\n`);
  allHits.forEach(h => console.error(h));
  process.exit(1);
} else {
  console.log(`content-lint: clean (${targets.length} files checked)`);
  process.exit(0);
}
