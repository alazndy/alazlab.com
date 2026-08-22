# alazlab.com Rebuild — Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the site's fabricated-stats/roleplay LCARS narrative with an honest one, and restructure routing/navigation/data schema to match the site map approved in `REBUILD_BRIEF.md` (Ana Sayfa · Mühendislik · Lab · Hakkımda), without breaking the live, indexed site's SEO.

**Architecture:** Keep the existing Next.js 16 App Router + markdown/gray-matter content system (`src/lib/markdown.ts`) and the persistent-Sidebar navigation shell — both work and the brief only mandates content honesty and a specific site map, not a technology rewrite (Section 9 explicitly leaves the design system choice to the executing agent; this plan keeps the current custom design system rather than adopting `@alazndy/gt-ui`, since GT-UI isn't currently a dependency and swapping it in would be a large unscoped redesign — see Global Constraints).

**Tech Stack:** Next.js 16.2.4, React 19.2.4, TypeScript 5, Tailwind CSS 4, framer-motion, gray-matter, next-themes. No new dependencies added by this plan.

**Scope note:** This is the *structural* half of the rebuild — routing, navigation, data schema, the About→Hakkımda rewrite, SEO carryover, and a reusable content-honesty lint guard. Rewriting the actual "neden yaptım" prose for all ~18 priority projects (Section 6/7 of the brief) is a separate follow-up content plan (`alazlab-rebuild-content.md`, not yet written) that depends on the `area`/`neden` schema fields this plan adds. This plan's own Task 8 only updates frontmatter facts (status/version/area) for existing project files — it does not author new narrative copy.

## Global Constraints

- No fabricated statistics or numbers anywhere in copy — every number must trace to a real source (REBUILD_BRIEF.md Section 3).
- No roleplay titles/ranks ("Kernel_Operator", "Access_Granted", "L5_ARCHITECT_VERIFIED", etc.) anywhere in copy (Section 3).
- Dark theme / LCARS visual language (mono fonts, glow effects, accent colors) stays — only the *copy* changes, not the aesthetic (Section 3).
- WIP projects must carry honest status badges, never disguised as finished (Section 3).
- Site map: `/`, `/muhendislik`, `/lab`, `/hakkimda`, `/proje/[slug]` (Section 4).
- Nav order: Ana Sayfa · Mühendislik · Lab · Hakkımda (Section 4).
- **Crucix is excluded from the site entirely** — user confirmed 2026-07-26 it is not their own project ("crucix bizm değil").
- **UniControl field evidence stays general** — no Kışladağ, no Bahrain, no "60+ units" figure; none of these are documented anywhere on disk (verified 2026-07-26). Only the Guardian Glass/Egypt story (`core/Vault101/Vault101/Projeler/Guardian Glass Projesi.md`) has real, sourceable detail, and even that is deferred to the content plan, not this one.
- **VCT (`web/VCT`) is the canonical calibration-station project**, not `archives/Other_Projects/VSD-` — user confirmed 2026-07-26.
- Old URLs (`/about`, `/projects/*`) must 308-redirect to their new equivalents — the site is live at alazlab.com, already indexed by Google, with an in-progress Search Console domain verification (per `memory.md`); breaking inbound URLs is not acceptable.
- **GT-UI is not added as a dependency in this plan** — documented decision, not an oversight; Section 9 left this choice open and the current design system already works.
- The current EN language toggle produces byte-identical English/Turkish copy (`src/lib/i18n.tsx` — verified 2026-07-26, e.g. `'home.title'` is the same Turkish string in both the `tr` and `en` dictionaries). Shipping a language switch that doesn't translate anything is itself a dishonesty bug under this brief's own rules — this plan hides the toggle rather than either lying or scope-creeping into full bilingual authorship (out of scope per Section 10, "nice to have, not a success criterion").

---

## File Structure

| File | Responsibility |
|---|---|
| `scripts/content-lint.mjs` | New. Scans `src/content/projects/*.md` + `src/app/**/*.tsx` for banned roleplay/fabricated-stat patterns; exits non-zero on any hit. |
| `src/lib/markdown.ts` | Modified. `ProjectMetadata` gains `area: 'muhendislik' \| 'lab'` and optional `neden`. |
| `src/lib/project-config.ts` | Modified. `Crucix` category entry removed. |
| `src/lib/i18n.tsx` | Modified. `LangToggle` usage removed from `Header.tsx`; dictionary untouched (kept for future real translation work). |
| `src/app/hakkimda/page.tsx` | New. Replaces `src/app/about/page.tsx` content with the honest dual-identity narrative. |
| `src/app/about/page.tsx` | Deleted (route now redirects via `next.config.ts`). |
| `src/app/muhendislik/page.tsx` | New. Lists `area: 'muhendislik'` projects. |
| `src/app/lab/page.tsx` | New. Lists `area: 'lab'` projects. |
| `src/app/proje/` | New (renamed from `src/app/projects/`). Contains the same 7 static project folders + `[slug]/page.tsx`. |
| `src/app/projects/` | Deleted (renamed to `src/app/proje/`; old URLs redirect). |
| `next.config.ts` | Modified. Adds permanent redirects `/about → /hakkimda`, `/projects/:slug* → /proje/:slug*`. |
| `src/components/layout/Sidebar.tsx` | Modified. Top nav becomes Ana Sayfa/Mühendislik/Lab/Hakkımda; project tree groups by `area` (2 sections) instead of 10 fine-grained categories. |
| `src/components/layout/Header.tsx` | Modified. `LangToggle` removed. |
| `src/app/sitemap.ts` | Modified. `/about` → `/hakkimda`, `/projects/${slug}` → `/proje/${slug}`, adds `/muhendislik`, `/lab`. |
| `src/content/projects/*.md` | Modified. `area` field added to all files; version/status corrected for the projects listed in Task 8; Crucix content removed if present. |

---

### Task 1: Content-honesty lint guard

**Files:**
- Create: `scripts/content-lint.mjs`
- Modify: `package.json` (add `"lint:content"` script)

**Interfaces:**
- Produces: a CLI script invocable as `node scripts/content-lint.mjs`, exit code `0` (clean) or `1` (violations found, printed to stderr as `path:line: matched "pattern"`).

- [ ] **Step 1: Write the script**

```javascript
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
```

- [ ] **Step 2: Register the npm script**

In `package.json`, inside the `"scripts"` block, add:

```json
"lint:content": "node scripts/content-lint.mjs"
```

- [ ] **Step 3: Run it against the current (unfixed) codebase to prove detection works**

Run: `pnpm lint:content`
Expected: exit code `1`, output listing hits in `src/app/about/page.tsx` for at minimum `Kernel_Operator`, `Access_Granted`, `L5_ARCHITECT_VERIFIED`, `System_Nodes`, `Uptime_Index`, `Auth_Protocol`, `END_OF_MISSION_FILE`, `ARCHITECT_GOKTUG_SYS`, `Authorized_Only`, plus the `99.982% Uptime` pattern and `Level_05` pattern.

- [ ] **Step 4: Commit**

```bash
git add scripts/content-lint.mjs package.json
git commit -m "feat: add content-honesty lint guard"
```

---

### Task 2: Extend project schema with `area` and `neden`

**Files:**
- Modify: `src/lib/markdown.ts:7-20`

**Interfaces:**
- Produces: `ProjectMetadata.area: 'muhendislik' | 'lab' | undefined`, `ProjectMetadata.neden: string | undefined` — consumed by Task 4 (Sidebar grouping) and Task 5 (`/muhendislik`, `/lab` pages).

- [ ] **Step 1: Update the interface**

In `src/lib/markdown.ts`, replace lines 7-20:

```typescript
export interface ProjectMetadata {
  title: string;
  category: string;
  area?: 'muhendislik' | 'lab';
  status: string;
  summary: string;
  neden?: string;
  techStack?: string[];
  date?: string;
  github?: string;
  live?: string;
  download?: string;
  version?: string;
  image?: string;
  slug: string;
}
```

- [ ] **Step 2: Verify the build still typechecks**

Run: `pnpm exec tsc --noEmit`
Expected: no new errors (the fields are optional, so existing markdown files without them remain valid).

- [ ] **Step 3: Commit**

```bash
git add src/lib/markdown.ts
git commit -m "feat: add area and neden fields to project schema"
```

---

### Task 3: Replace `/about` with an honest `/hakkimda`

**Files:**
- Create: `src/app/hakkimda/page.tsx`
- Delete: `src/app/about/page.tsx`
- Modify: `next.config.ts` (redirect, done in Task 6 alongside the `/projects` redirect — see that task)

**Interfaces:**
- Consumes: `Typewriter` (`src/components/ui/Typewriter`), `SystemTower` (`src/components/ui/SystemTower`) — both existing components, reused as-is for visual continuity.
- Produces: route `/hakkimda`, rendering the dual-identity narrative from REBUILD_BRIEF.md Section 2.

- [ ] **Step 1: Create the new page, keeping the visual structure (hero, directives, SystemTower, footer) but replacing every roleplay/fabricated element with real content**

```tsx
// src/app/hakkimda/page.tsx
'use client';

import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Layers,
  Zap,
  Shield,
  Wrench,
  Terminal,
} from 'lucide-react';
import { Typewriter } from '@/components/ui/Typewriter';
import { SystemTower } from '@/components/ui/SystemTower';

const PROFILE_IMAGE = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070";

export default function HakkimdaPage() {
  return (
    <div className="max-w-[1600px] mx-auto space-y-32 pb-32 animate-in fade-in duration-1000">

      {/*  HERO: dual identity  */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden glass rounded-[64px] border-border">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#030305]/40 z-10" />
          <img
            src={PROFILE_IMAGE}
            alt=""
            className="w-full h-full object-cover grayscale brightness-[0.2]"
          />
          <div className="absolute inset-y-0 left-0 w-full lg:w-3/5 overflow-hidden hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#030305] to-[#030305] z-10" />
            <img
              src={PROFILE_IMAGE}
              alt="Göktuğ Turhan"
              className="w-full h-full object-cover grayscale-[0.8] opacity-80 scale-105 origin-left"
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-16 relative z-10 w-full py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="hidden lg:block lg:col-span-5 relative h-full">
              <div className="absolute top-1/2 left-0 -translate-y-1/2 p-6 glass border-lcars-orange/30 rounded-2xl rotate-[-5deg]">
                <Wrench className="w-12 h-12 text-lcars-orange opacity-40 mb-3" />
                <div className="text-[10px] font-mono text-lcars-orange font-black uppercase tracking-widest">Gündüz</div>
                <div className="text-xs font-mono text-foreground/40 uppercase mt-1">ADC Tasarım — Sahada</div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-12"
            >
              <div className="space-y-8">
                <div className="inline-flex items-center gap-4 px-5 py-2 rounded-sm bg-lcars-orange text-black font-black text-[11px] tracking-[0.4em] uppercase shadow-[0_0_25px_rgba(255,153,0,0.2)]">
                  <Shield className="w-4 h-4" />
                  Göktuğ Turhan
                </div>

                <h1 className="text-6xl md:text-[100px] font-black tracking-[calc(-0.08em)] text-foreground uppercase leading-[0.8]">
                  İki hayat, <br/>
                  <span className="text-lcars-cyan">tek prensip.</span>
                </h1>

                <div className="relative group">
                  <div className="absolute -left-8 top-0 bottom-0 w-1 bg-lcars-cyan shadow-[0_0_15px_#00ccff] rounded-full" />
                  <div className="text-xl md:text-2xl text-foreground/80 leading-[1.3] font-bold tracking-tight">
                    <Typewriter
                      text="Gündüz sahada gerçek donanımla, gece kendi yazılım ekosistemimle — ikisinde de sorunu gerçekten çözene kadar uğraşıyorum."
                      speed={20}
                      delay={1200}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/*  DUAL IDENTITY NARRATIVE  */}
      <section className="relative overflow-hidden px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="p-10 glass rounded-[32px] border-border space-y-6">
            <div className="flex items-center gap-3">
              <Wrench className="w-6 h-6 text-lcars-orange" />
              <h2 className="text-2xl font-black uppercase tracking-tight">Gündüz: Sahada</h2>
            </div>
            <p className="text-foreground/60 leading-relaxed">
              ADC Tasarım&apos;da sahada çalışan bir endüstriyel donanım/gömülü sistem mühendisiyim —
              kod masada kalmıyor, gerçek araçlara, gerçek madenlere, gerçek sınır kapılarına gidiyor.
              UniControl&apos;den saha kurulumları, Guardian Glass&apos;ın Mısır&apos;daki forklift filosu için
              çarpışma önleme sistemi bunlardan biri.
            </p>
          </div>
          <div className="p-10 glass rounded-[32px] border-border space-y-6">
            <div className="flex items-center gap-3">
              <Terminal className="w-6 h-6 text-lcars-cyan" />
              <h2 className="text-2xl font-black uppercase tracking-tight">Gece: Lab&apos;da</h2>
            </div>
            <p className="text-foreground/60 leading-relaxed">
              Kendi AI-agent&apos;lı yazılım ekosistemimi kuran bağımsız bir geliştiriciyim —
              R-AI-OS, GT-Launcher, GT-UI gibi projelerle kendi araçlarımı, kendi işletim
              katmanımı inşa ediyorum.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-16 text-center">
          <p className="text-2xl text-foreground/80 font-medium italic">
            &quot;İkisini bağlayan ortak payda: sorunu gerçekten çözene kadar uğraşmak —
            ister bir CAN-bus radar sistemi olsun, ister bir AI agent&apos;ın güvenlik çekirdeği.&quot;
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6 mt-16">
          {[
            { label: 'Güvenlik Önce', desc: 'Gerçek sınır: veri sızıntısı yok, yetkisiz erişim yok — üretim sistemlerinde ödün verilmez.', icon: Shield },
            { label: 'Performans Ölçülür', desc: 'İddia değil, ölçüm — gerçek benchmark ve gerçek test sonuçlarıyla konuşulur.', icon: Zap },
            { label: 'Görsel Netlik', desc: 'Karmaşık sistemleri anlaşılır arayüzlerle sunmak, süs için değil netlik için.', icon: Layers },
          ].map((directive) => (
            <div key={directive.label} className="p-8 glass rounded-[32px] border-border flex gap-8 items-center group hover:border-lcars-cyan/30 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-foreground/5 flex items-center justify-center border border-border group-hover:bg-lcars-cyan/10">
                <directive.icon className="w-8 h-8 text-foreground/40 group-hover:text-lcars-cyan" />
              </div>
              <div>
                <div className="text-[11px] font-black font-mono text-lcars-cyan tracking-[0.2em] uppercase">{directive.label}</div>
                <p className="text-sm text-foreground/40 font-medium">{directive.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/*  SYSTEM TOWER (kept — visual language, not roleplay copy)  */}
      <section className="space-y-16 px-4">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 px-12">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-foreground leading-none">
              Nasıl Çalışıyorum
            </h2>
          </div>
        </div>
        <div className="w-full glass rounded-[64px] border-border overflow-visible bg-gradient-to-br from-white/[0.02] to-transparent min-h-[900px] flex items-center justify-center relative shadow-[0_0_100px_rgba(0,0,0,0.5)]">
          <SystemTower />
        </div>
      </section>

      <footer className="flex items-center justify-between px-16 opacity-30 border-t border-border pt-12">
        <div className="flex items-center gap-3 text-[12px] font-mono font-black tracking-[0.3em] uppercase">
          <ShieldCheck className="w-4 h-4 text-lcars-cyan" />
          <span className="text-foreground/40">Göktuğ Turhan</span>
        </div>
        <div className="text-[10px] font-mono text-lcars-orange uppercase tracking-widest">alazlab.com</div>
      </footer>
    </div>
  );
}
```

- [ ] **Step 2: Delete the old page**

```bash
rm src/app/about/page.tsx
rmdir src/app/about
```

- [ ] **Step 3: Run the content lint against the new page**

Run: `pnpm lint:content`
Expected: no hits from `src/app/hakkimda/page.tsx` (the old `src/app/about/page.tsx` hits are gone because the file no longer exists).

- [ ] **Step 4: Commit**

```bash
git add -A src/app/hakkimda src/app/about
git commit -m "feat: replace roleplay About page with honest Hakkımda page"
```

---

### Task 4: `/muhendislik` and `/lab` landing pages

**Files:**
- Create: `src/app/muhendislik/page.tsx`
- Create: `src/app/lab/page.tsx`

**Interfaces:**
- Consumes: `getAllProjects()` from `src/lib/markdown.ts` (Task 2's `area` field), `statusConfig`/`statusDot` from `src/lib/project-config.ts:89-105`.
- Produces: two server-rendered listing pages, each filtering by `area`.

- [ ] **Step 1: Write `/muhendislik`**

```tsx
// src/app/muhendislik/page.tsx
import Link from 'next/link';
import { getAllProjects } from '@/lib/markdown';
import { statusConfig, statusDot } from '@/lib/project-config';

export const metadata = {
  title: 'Mühendislik',
  description: 'ADC Tasarım bünyesinde, gerçek donanıma bağlı, sahada çalışan sistemler.',
};

export default function MuhendislikPage() {
  const projects = getAllProjects().filter(p => p.area === 'muhendislik');

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24">
      <div className="space-y-4">
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase">Mühendislik</h1>
        <p className="text-foreground/50 max-w-2xl">
          ADC Tasarım bünyesinde, gerçek donanıma bağlı, sahada çalışan sistemler.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map(p => (
          <Link key={p.slug} href={`/proje/${p.slug}`}
            className="p-6 glass rounded-2xl border-border hover:border-lcars-orange/40 transition-all space-y-3 block"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{p.title}</h2>
              <span className={`text-[10px] font-mono px-2 py-1 rounded border uppercase flex items-center gap-1.5 ${statusConfig[p.status] ?? ''}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${statusDot[p.status] ?? ''}`} />
                {p.status}
              </span>
            </div>
            <p className="text-sm text-foreground/50">{p.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Write `/lab` (identical shape, different filter/copy)**

```tsx
// src/app/lab/page.tsx
import Link from 'next/link';
import { getAllProjects } from '@/lib/markdown';
import { statusConfig, statusDot } from '@/lib/project-config';

export const metadata = {
  title: 'Lab',
  description: 'Kişisel zamanda kurulan, AI-agent\'larla birlikte geliştirilen yazılım ekosistemi.',
};

export default function LabPage() {
  const projects = getAllProjects().filter(p => p.area === 'lab');

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24">
      <div className="space-y-4">
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase">Lab</h1>
        <p className="text-foreground/50 max-w-2xl">
          Kişisel zamanda kurulan, AI-agent&apos;larla birlikte geliştirilen yazılım ekosistemi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map(p => (
          <Link key={p.slug} href={`/proje/${p.slug}`}
            className="p-6 glass rounded-2xl border-border hover:border-lcars-cyan/40 transition-all space-y-3 block"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{p.title}</h2>
              <span className={`text-[10px] font-mono px-2 py-1 rounded border uppercase flex items-center gap-1.5 ${statusConfig[p.status] ?? ''}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${statusDot[p.status] ?? ''}`} />
                {p.status}
              </span>
            </div>
            <p className="text-sm text-foreground/50">{p.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify both pages render with zero projects (expected until Task 8 assigns `area` values) — confirms no crash on empty filter**

Run: `pnpm dev` (in background), then `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/muhendislik` and same for `/lab`
Expected: both return `200`.

- [ ] **Step 4: Commit**

```bash
git add src/app/muhendislik src/app/lab
git commit -m "feat: add /muhendislik and /lab landing pages"
```

---

### Task 5: Rename `/projects` → `/proje`, add redirects

**Files:**
- Move: `src/app/projects/` → `src/app/proje/` (all 7 static subfolders + `[slug]/`)
- Modify: `next.config.ts`
- Modify: `src/app/proje/[slug]/page.tsx` and any static subpage that hardcodes `/projects/` links (grep after move)

**Interfaces:**
- Produces: routes `/proje/[slug]`, `/proje/AI_Trader`, `/proje/ENV-I`, `/proje/NEXUS`, `/proje/R-AI-OS`, `/proje/tek-ui`, `/proje/UniControl` (note: `GTab` stays at its existing dedicated `/gtab` route, untouched — Sidebar already special-cases it at `src/components/layout/Sidebar.tsx:71`).

- [ ] **Step 1: Move the directory**

```bash
git mv src/app/projects src/app/proje
```

- [ ] **Step 2: Find any hardcoded `/projects/` references left behind**

Run: `grep -rn "/projects/" src/ --include="*.tsx" --include="*.ts"`
Expected: review each hit. `src/components/layout/Sidebar.tsx:71` and `:139` will show up — these are fixed in Task 6, not here. Any hit inside `src/app/proje/**` itself (e.g. an internal "back to projects" link) must be changed from `/projects/` to `/proje/` in this step.

- [ ] **Step 3: Add permanent redirects in `next.config.ts`**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/about', destination: '/hakkimda', permanent: true },
      { source: '/projects/:slug*', destination: '/proje/:slug*', permanent: true },
    ];
  },
};

export default nextConfig;
```

- [ ] **Step 4: Verify redirects work**

Run: `pnpm dev` (background), then:
```bash
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" http://localhost:3000/about
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" http://localhost:3000/projects/UniControl
```
Expected: both return `308` with `redirect_url` pointing at `/hakkimda` and `/proje/UniControl` respectively.

- [ ] **Step 5: Commit**

```bash
git add -A src/app/proje next.config.ts
git commit -m "feat: rename /projects to /proje, add redirects for old URLs"
```

---

### Task 6: Restructure Sidebar navigation

**Files:**
- Modify: `src/components/layout/Sidebar.tsx`

**Interfaces:**
- Consumes: `ProjectMetadata.area` (Task 2), routes `/muhendislik`, `/lab`, `/hakkimda`, `/proje/${slug}` (Tasks 3-5).
- Produces: nav items `Ana Sayfa · Mühendislik · Lab · Hakkımda`; project tree grouped into exactly two sections (`Mühendislik`, `Lab`) instead of the current 10 fine-grained categories; projects with no `area` set fall into a third collapsed "Diğer Çalışmalar" section so nothing silently disappears from navigation before Task 8 assigns `area` to every file.

- [ ] **Step 1: Replace the top nav array (lines 116-119)**

```tsx
{[
  { href: '/',            label: t('nav.home'),        accent: 'bg-lcars-orange', icon: Home },
  { href: '/muhendislik', label: t('nav.muhendislik'), accent: 'bg-lcars-orange', icon: Wrench },
  { href: '/lab',         label: t('nav.lab'),         accent: 'bg-lcars-cyan',   icon: Terminal },
  { href: '/hakkimda',    label: t('nav.about'),       accent: 'bg-lcars-gold',   icon: User },
].map(({ href, label, accent, icon: Icon }) => (
```

Add `Wrench, Terminal` to the `lucide-react` import at the top of the file (line 9's import block already imports several icons — extend that list).

- [ ] **Step 2: Add new i18n keys**

In `src/lib/i18n.tsx`, inside both the `tr` and `en` dictionary objects, add (next to the existing `'nav.home'`/`'nav.about'`/`'nav.portfolio'` keys):

```typescript
'nav.muhendislik': 'Mühendislik',
'nav.lab': 'Lab',
```

(Keep them identical in both dictionaries for now — this matches the plan's Global Constraints decision to defer real EN translation, and Task 7 hides the toggle so this doesn't surface a lie to users.)

- [ ] **Step 3: Replace the category-grouping logic (lines 85-92) to group by `area` instead of `category`**

```tsx
const { grouped, sorted } = useMemo(() => {
  const g: Record<string, ProjectMetadata[]> = { 'Mühendislik': [], 'Lab': [], 'Diğer Çalışmalar': [] };
  projects.forEach(p => {
    const key = p.area === 'muhendislik' ? 'Mühendislik' : p.area === 'lab' ? 'Lab' : 'Diğer Çalışmalar';
    g[key].push(p);
  });
  const sorted = ['Mühendislik', 'Lab', 'Diğer Çalışmalar'].filter(k => g[k].length > 0);
  return { grouped: g, sorted };
}, [projects]);
```

- [ ] **Step 4: Update the project link URL builder (line 71 and 139) to use `/proje/` instead of `/projects/`**

```tsx
const url = p.slug === 'GTab' ? '/gtab' : `/proje/${p.slug}`;
```

Apply this same change in both places it appears (`CategorySection`'s `url` construction and the `isActive` check in `SidebarContent`).

- [ ] **Step 5: Update `categoryIcons` (lines 17-28) to cover the new 3-key grouping instead of the old 10 categories**

```tsx
const categoryIcons: Record<string, { icon: LucideIcon; color: string }> = {
  'Mühendislik':        { icon: Wrench,  color: 'bg-lcars-orange' },
  'Lab':                { icon: Terminal, color: 'bg-lcars-cyan' },
  'Diğer Çalışmalar':   { icon: Folder,  color: 'bg-white/50' },
};
```

- [ ] **Step 6: Manually verify in the browser**

Run: `pnpm dev`, open `http://localhost:3000` in a browser (or via the `run` skill / Playwright tool).
Expected: sidebar shows 4 top-level links (Ana Sayfa, Mühendislik, Lab, Hakkımda), then a collapsible "Diğer Çalışmalar" section holding all 41 existing projects (since none have `area` set yet — that's Task 8). No console errors.

- [ ] **Step 7: Commit**

```bash
git add src/components/layout/Sidebar.tsx src/lib/i18n.tsx
git commit -m "feat: restructure sidebar nav to Ana Sayfa/Mühendislik/Lab/Hakkımda"
```

---

### Task 7: Hide the non-functional language toggle

**Files:**
- Modify: `src/components/layout/Header.tsx`

**Interfaces:**
- Consumes: none new.
- Produces: `Header` renders without `LangToggle`; `useI18n`'s `lang`/`setLang` remain available in `src/lib/i18n.tsx` for a future real-translation pass, just not exposed in the UI.

- [ ] **Step 1: Remove the `LangToggle` component and its usage**

In `src/components/layout/Header.tsx`, delete the `LangToggle` component definition (lines 39-48) and its usage `<LangToggle />` (line 74). Remove the now-unused `useI18n` import (line 6) if nothing else in the file uses it.

- [ ] **Step 2: Verify the build**

Run: `pnpm exec tsc --noEmit`
Expected: no errors (no unused-import errors if the import was fully removed; if `useI18n` is still imported but unused, delete that import line too).

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Header.tsx
git commit -m "fix: hide non-functional language toggle until real EN copy exists"
```

---

### Task 8: Sync project frontmatter to verified facts

**Files:**
- Modify: `src/content/projects/UniControl.md`
- Modify: `src/content/projects/R-AI-OS.md`
- Modify: `src/content/projects/GT-Launcher.md`
- Modify: `src/content/projects/GT-UI.md`
- Modify: `src/content/projects/GTab.md`
- Delete or modify any Crucix-referencing content file (grep first — memory.md says Crucix was already removed once, confirm it stayes removed)
- Modify: remaining priority-project files to add `area` (list below)

**Interfaces:**
- Consumes: `area`/`neden` fields from Task 2.
- Produces: frontmatter `status`/`version`/`area` values that match Section B of the 2026-07-26 research pass — this task only touches *facts* (status/version/area), not narrative prose (that's the follow-up content plan).

- [ ] **Step 1: Confirm Crucix is fully gone from content**

Run: `grep -rli crucix src/content/projects/ src/lib/project-config.ts`
Expected: only `src/lib/project-config.ts` (the `'Crucix'` category entry, `project-config.ts:76-80`) — no markdown file. If a markdown file does show up, delete it: `git rm src/content/projects/<file>.md`.

- [ ] **Step 2: Remove the Crucix category from `project-config.ts`**

Delete lines 76-80 (the `'Crucix': { ... }` entry) from `src/lib/project-config.ts`.

- [ ] **Step 3: Update `UniControl.md` frontmatter**

Set (add/correct these keys in the existing frontmatter block, leave the rest untouched):

```yaml
area: muhendislik
status: Active
version: v5.1.0
```

(Per this plan's Global Constraints: do not add any unit count or site-name claim — none is sourced. Status is "Active" per `embedded/UniControl/memory.md`'s 2026-07-17 entry, not "Live"/mature, since that file itself says "Development Started".)

- [ ] **Step 4: Update `R-AI-OS.md` frontmatter**

```yaml
area: lab
status: Active
version: v3.7.1
```

(Latest git tag is `v3.7.1`; latest formal GitHub Release is `v3.7.0` with 732 passing tests per `CHANGELOG.md` — do not use the brief's stale "v3.6.0 / 583 tests" figures.)

- [ ] **Step 5: Update `GT-Launcher.md` frontmatter**

```yaml
area: lab
status: Active
version: v4.9.4
```

(`app/build.gradle`'s `versionName` is the current live figure; `v4.7.1` is only the latest *tagged* release, and the brief's `v4.7.3` doesn't match anything found on disk.)

- [ ] **Step 6: Update `GT-UI.md` frontmatter**

```yaml
area: lab
status: Live
version: v1.1.1
```

(`npm view @alazndy/gt-ui version` returns `1.1.1` — that's what users actually get; the local repo being at `1.1.2` is unpublished and not evidence of anything live.)

- [ ] **Step 7: Update `GTab.md` frontmatter**

```yaml
area: lab
status: Live
version: v4.3.0
```

(Confirmed exact match across `manifest.json`, latest git tag, and `memory.md` — no change needed to the version number itself, just add `area`.)

- [ ] **Step 8: Assign `area: muhendislik` to remaining Mühendislik-track projects**

Add `area: muhendislik` to the frontmatter of: `AI-360-VCT.md` (this is the file backing the VCT project — per Global Constraints, VCT/`web/VCT` is canonical, do not touch or reference VSD-), `UCC-APP.md`.

If `RCPS.md`, `RCPS-Sim.md` do not yet exist as content files (confirmed missing in the 2026-07-26 research pass), do not create them in this task — new project pages are content-authoring work for the follow-up plan, since they need real "neden yaptım" prose this task is not scoped to write. Skip them here.

- [ ] **Step 9: Assign `area: lab` to remaining Lab-track projects that already have content files**

Add `area: lab` to: `MuseIQ.md`, `tek-ui.md`, `Weave.md`, `UPH.md`, `T-SA.md`, `Renderci.md`, `ENV-I.md`.

(`streamdeck-kaira`, `ahead-the-curve`, `kaira-mix`, `ml-model`, `gt-fit` have no existing content files either — same reasoning as Step 8, deferred to the content plan.)

- [ ] **Step 10: Run content lint + typecheck**

Run: `pnpm lint:content && pnpm exec tsc --noEmit`
Expected: both clean.

- [ ] **Step 11: Verify `/muhendislik` and `/lab` now list projects**

Run: `pnpm dev` (background), `curl -s http://localhost:3000/muhendislik | grep -o "UniControl"` and `curl -s http://localhost:3000/lab | grep -o "R-AI-OS"`
Expected: both greps find a match (confirms the filtered pages now render real cards instead of the empty state from Task 4 Step 3).

- [ ] **Step 12: Commit**

```bash
git add src/content/projects src/lib/project-config.ts
git commit -m "fix: sync project frontmatter to verified status/version, remove Crucix category"
```

---

### Task 9: SEO carryover — sitemap and metadata

**Files:**
- Modify: `src/app/sitemap.ts`

**Interfaces:**
- Consumes: `getAllProjects()`.
- Produces: sitemap entries matching the new route structure.

- [ ] **Step 1: Update the sitemap**

Replace `src/app/sitemap.ts` lines 9-22:

```typescript
const projectUrls: MetadataRoute.Sitemap = projects.map(p => ({
  url: `${BASE_URL}/proje/${p.slug}`,
  lastModified: p.date ? new Date(p.date) : new Date(),
  changeFrequency: 'monthly',
  priority: 0.8,
}));

return [
  { url: BASE_URL,                          lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
  { url: `${BASE_URL}/hakkimda`,             lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/muhendislik`,          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/lab`,                  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/gtab`,                 lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/gtab/privacy-policy`,  lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
  ...projectUrls,
];
```

- [ ] **Step 2: Verify**

Run: `pnpm dev` (background), `curl -s http://localhost:3000/sitemap.xml | grep -c "/proje/"`
Expected: count > 0, and `grep -c "/projects/"` on the same output returns `0`.

- [ ] **Step 3: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "fix: update sitemap for /proje, /hakkimda, /muhendislik, /lab routes"
```

---

### Task 10: Final verification against brief's self-check criteria

**Files:** none (verification only).

- [ ] **Step 1: Full content lint**

Run: `pnpm lint:content`
Expected: exit `0`.

- [ ] **Step 2: Full typecheck + build**

Run: `pnpm exec tsc --noEmit && pnpm build`
Expected: both succeed with no errors.

- [ ] **Step 3: Manual route smoke test**

Run: `pnpm dev` (background), then for each of `/`, `/hakkimda`, `/muhendislik`, `/lab`, `/proje/UniControl`, `/proje/R-AI-OS`, `/about` (expect redirect), `/projects/UniControl` (expect redirect):
```bash
curl -s -o /dev/null -w "%{url_effective} -> %{http_code}\n" -L http://localhost:3000<path>
```
Expected: `200` for the first six, and the two legacy paths resolve (via `-L`) to `200` at their new destination.

- [ ] **Step 4: Re-check against REBUILD_BRIEF.md Section 11 (the items this plan covers)**

Confirm by inspection:
- [ ] No page contains fabricated numbers/stats (verified by Step 1's lint + manual read of `/hakkimda`).
- [ ] No roleplay titles/ranks remain (same).
- [ ] Status badges reflect Task 8's corrected values, not aspirational ones.
- [ ] `/hakkimda` carries the dual day/night identity narrative, no roleplay rank.
- [ ] GT-UI still has its own project page (`GT-UI.md`, untouched content, only frontmatter facts corrected) even though it wasn't adopted as the site's own design system.

- [ ] **Step 5: Push**

```bash
git push
```

(This plan intentionally stops at push, not deploy — confirm with the user before triggering a Vercel production deploy, since the site is live and this is the first content-honesty pass.)
