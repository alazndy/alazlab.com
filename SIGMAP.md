# alazlab.com v0.1.0 — Architecture Wiki

_Deterministically generated from signatures + dependency graph by SigMap v8.18.0 — no LLM. Regenerate: `sigmap wiki`._

## Overview
The codebase spans **74 indexed files** across **1 top-level module**, with ~1538 tokens of extracted signatures.
Context health: **100/100 (A)**.

## Modules
| Module | Files | Sig tokens | Key files |
|--------|-------|------------|-----------|
| `src` | 74 | ~1538 | `src\app\globals.css`, `src\content\projects\UCC-APP.md`, `src\content\projects\ADC-Web-Sitesi.md` |

The largest module by signature volume is `src` (74 files, ~1538 tokens) — start there for the core logic.

## Dependency flow
The most depended-on files — changes here have the widest blast radius:

| Hub file | Importers |
|----------|-----------|
| `src/lib/markdown.ts` | 16 |
| `src/lib/utils.ts` | 11 |
| `src/components/projects/projectresourcesections.tsx` | 8 |
| `src/lib/project-config.ts` | 6 |
| `src/lib/i18n.tsx` | 5 |
| `src/components/layout/mobile-nav-context.tsx` | 3 |
| `src/components/ui/typewriter.tsx` | 3 |
| `src/app/proje/r-ai-os/raiosclient.tsx` | 1 |

Entry points (imported by nothing, importing the rest):

- `src/app/layout.tsx` → 6 imports
- `src/app/proje/[slug]/page.tsx` → 5 imports
- `src/components/home/categorygrid.tsx` → 4 imports
- `src/app/page.tsx` → 3 imports
- `src/app/proje/r-ai-os/page.tsx` → 3 imports
- `src/app/gtab/page.tsx` → 2 imports
- `src/app/hakkimda/page.tsx` → 2 imports
- `src/app/lab/page.tsx` → 2 imports

**Dependency cycles:** none detected.

## Conventions
No dominant conventions detected (repo too small or styles mixed).

## Navigating
- `sigmap ask "<question>"` — ranked, budgeted mini-context for any task
- `sigmap --impact <file>` / `--callers <symbol>` — blast radius before you change something
- `sigmap evidence "<query>"` — machine-consumable Evidence Pack (JSON) for agents/CI
- MCP: `get_architecture_overview`, `get_map`, `get_callee_signatures` for live agent access
