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
  { name: 'fabricated-uptime-percent', re: /\d+(\.\d+)?%\s*(Uptime|uptime)/g },
  { name: 'fake-node-count', re: /\d+\s*ACTIVE\s*nodes?/gi },
  { name: 'roleplay-level-rank', re: /Level[_ ]0?\d\b/g },
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
  });

  return hits;
}

const targets = [
  ...walk(path.join(ROOT, 'src', 'content', 'projects'), ['.md']),
  ...walk(path.join(ROOT, 'src', 'app'), ['.tsx']),
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
