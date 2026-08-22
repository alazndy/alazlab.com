'use client';

import { useState, useMemo, memo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Search, Sparkles } from 'lucide-react';
import type { ProjectMetadata } from '@/lib/markdown';
import { categoryConfig, defaultConfig, statusConfig, statusDot } from '@/lib/project-config';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';

//  SCORE
const S: Record<string, number> = { Live: 10, Active: 8, Stable: 6, Early: 4, Pending: 2, Legacy: 0 };
const score = (p: ProjectMetadata) => (S[p.status] ?? 2) + Math.min(p.techStack?.length ?? 0, 10) * 0.8;

type Size = 'hero' | 'large' | 'medium' | 'small' | 'xs';
const getSize = (s: number): Size => s >= 16 ? 'hero' : s >= 11 ? 'large' : s >= 7 ? 'medium' : s >= 3 ? 'small' : 'xs';

// col-spans in a 6-col (mobile) and 12-col (desktop) grid
const SPAN: Record<Size, string> = {
  hero:   'col-span-6 sm:col-span-12 lg:col-span-8',
  large:  'col-span-6 sm:col-span-12 lg:col-span-4',
  medium: 'col-span-3 sm:col-span-6 lg:col-span-4',
  small:  'col-span-3 sm:col-span-6 lg:col-span-3',
  xs:     'col-span-2 sm:col-span-4 lg:col-span-3',
};

// row-span classes
const ROW: Record<Size, string> = {
  hero:   'row-span-4',
  large:  'row-span-4',
  medium: 'row-span-3',
  small:  'row-span-2',
  xs:     'row-span-2',
};

//  CARD
const ProjectCard = memo(function ProjectCard({ project, size, idx, localizePath }: {
  project: ProjectMetadata; size: Size; idx: number; localizePath: (path: string) => string;
}) {
  const cat  = categoryConfig[project.category] ?? defaultConfig;
  const sc   = statusConfig[project.status] ?? statusConfig['Early'];
  const dot  = statusDot[project.status] ?? statusDot['Early'];
  const href = project.slug === 'GTab' ? localizePath('/gtab') : localizePath(`/proje/${project.slug}`);
  const dim  = project.status === 'Legacy' || project.status === 'Pending';
  const Icon = cat.icon;

  if (size === 'xs') {
    return (
      <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.2, delay: Math.min(idx * 0.015, 0.25) }}
        className={cn(SPAN[size], ROW[size])}
      >
        <Link href={href}
          className={cn(
            "group h-full flex flex-col justify-between p-4 rounded-2xl border border-border bg-card",
            "hover:border-foreground/20 hover:bg-foreground/[0.03] transition-all duration-200",
            dim && "opacity-40 hover:opacity-70"
          )}
        >
          <div className="flex items-center justify-between">
            {project.image ? (
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-border shrink-0">
                <img src={project.image} alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
            ) : (
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-border bg-foreground/5", cat.accent)}>
                <Icon className="w-4 h-4" />
              </div>
            )}
            <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
          </div>

          <div className="flex-1 min-w-0 space-y-0.5 mt-2">
            <p className="text-xs font-bold text-foreground/80 group-hover:text-foreground transition-colors truncate">{project.title}</p>
            <p className="text-[10px] font-mono text-muted-foreground truncate">{project.category}</p>
          </div>
        </Link>
      </motion.div>
    );
  }

  const isBig = size === 'hero' || size === 'large';

  return (
    <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.25, delay: Math.min(idx * 0.02, 0.3) }}
      className={cn(SPAN[size], ROW[size])}
    >
      <Link href={href} className="group block h-full">
        <article className={cn(
          "relative h-full rounded-3xl border border-border bg-card overflow-hidden",
          "hover:border-foreground/25 hover:shadow-2xl transition-all duration-300",
          "flex flex-col justify-between p-5 sm:p-6",
          dim && "opacity-50 hover:opacity-85"
        )}>

          {/* Background image & gradient overlay */}
          {project.image && (
            <div className="absolute inset-0 z-0">
              <img src={project.image} alt="" className="w-full h-full object-cover opacity-25 group-hover:scale-105 transition-transform duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
            </div>
          )}

          {/* Top row: Badges & Icon */}
          <div className="relative z-10 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono border bg-background/80 backdrop-blur-sm", sc)}>
                <span className={cn("w-1.5 h-1.5 rounded-full", dot)} />
                {project.status}
              </span>
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider bg-foreground/5 px-2 py-0.5 rounded-md border border-border/60">
                {project.category}
              </span>
            </div>

            <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center text-foreground group-hover:bg-lcars-cyan group-hover:text-black transition-all">
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Bottom row: Title, summary, tech stack */}
          <div className="relative z-10 space-y-2 mt-auto pt-4">
            <h3 className={cn(
              "font-black uppercase tracking-tight text-foreground group-hover:text-lcars-cyan transition-colors",
              isBig ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
            )}>
              {project.title}
            </h3>

            <p className={cn(
              "text-foreground/60 leading-relaxed line-clamp-2",
              isBig ? "text-sm sm:text-base max-w-xl" : "text-xs"
            )}>
              {project.summary}
            </p>

            {project.techStack && project.techStack.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.techStack.slice(0, isBig ? 6 : 3).map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono border border-border/80 bg-background/60 text-foreground/60">
                    {t}
                  </span>
                ))}
                {project.techStack.length > (isBig ? 6 : 3) && (
                  <span className="px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                    +{project.techStack.length - (isBig ? 6 : 3)}
                  </span>
                )}
              </div>
            )}
          </div>

        </article>
      </Link>
    </motion.div>
  );
});

//  MAIN
export function ProjectGrid({ projects }: { projects: ProjectMetadata[] }) {
  const { t, lang, localizePath } = useI18n();
  const isEn = lang === 'en';
  const ALL = isEn ? 'All Projects' : 'Tüm Projeler';

  const categories = useMemo(() =>
    [ALL, ...new Set(projects.map(p => p.category))].sort((a, b) =>
      a === ALL ? -1 : b === ALL ? 1 : a.localeCompare(b)),
    [projects, ALL]
  );

  const [active, setActive] = useState(ALL);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = active === ALL ? projects : projects.filter(p => p.category === active);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        (p.techStack && p.techStack.some(t => t.toLowerCase().includes(q)))
      );
    }
    return [...list].sort((a, b) => score(b) - score(a));
  }, [projects, active, search, ALL]);

  return (
    <section id="projects" className="space-y-6 pb-4">

      {/* Header + Search + Category Filter */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-lcars-orange" />
            <h2 className="text-xs font-black font-mono uppercase tracking-[0.25em] text-foreground">
              {isEn ? 'PROJECT ARCHIVE MATRIX' : 'PROJE ARŞİV MATRİSİ'}
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-border bg-foreground/5 text-foreground/60">
              {filtered.length} / {projects.length}
            </span>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
            <input
              type="text"
              placeholder={isEn ? 'Search stack or name...' : 'Teknoloji veya isim ara...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-foreground/5 border border-border rounded-xl text-xs font-mono text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-lcars-cyan transition-colors"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)}
              className={cn(
                "shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all whitespace-nowrap",
                active === cat
                  ? "bg-foreground text-background shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-foreground/5 border border-transparent hover:border-border"
              )}
            >
              {cat === ALL ? ALL : cat.length > 24 ? cat.slice(0, 22) + '…' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Bento grid: 6 columns (mobile) / 12 columns (desktop) */}
      <motion.div layout
        className="grid grid-cols-6 lg:grid-cols-12 auto-rows-[80px] gap-3.5"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <ProjectCard key={p.slug} project={p} size={getSize(score(p))} idx={i} localizePath={localizePath} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="p-12 text-center border border-border/60 rounded-3xl bg-card space-y-2">
          <p className="text-sm font-mono text-muted-foreground">
            {isEn ? 'No projects match your filter query.' : 'Aramanıza uygun proje bulunamadı.'}
          </p>
        </div>
      )}

    </section>
  );
}
