'use client';

import { useState, useMemo, memo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Search, Sparkles } from 'lucide-react';
import type { ProjectMetadata } from '@/lib/markdown';
import { categoryConfig, defaultConfig, statusConfig, statusDot } from '@/lib/project-config';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';

// SCORE
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

// APPLE BENTO CARD
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
            "apple-card h-full flex flex-col justify-between p-4",
            dim && "opacity-40 hover:opacity-75"
          )}
        >
          <div className="flex items-center justify-between">
            {project.image ? (
              <div className="w-8 h-8 rounded-xl overflow-hidden border border-border shrink-0">
                <img src={project.image} alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
            ) : (
              <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border border-border bg-muted", cat.accent)}>
                <Icon className="w-4 h-4" />
              </div>
            )}
            <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
          </div>

          <div className="flex-1 min-w-0 space-y-0.5 mt-2">
            <p className="text-xs font-bold text-foreground group-hover:text-apple-blue transition-colors truncate">{project.title}</p>
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
          "apple-card relative h-full overflow-hidden flex flex-col justify-between p-5 sm:p-6",
          dim && "opacity-50 hover:opacity-85"
        )}>

          {/* Background image & gradient overlay */}
          {project.image && (
            <div className="absolute inset-0 z-0">
              <img src={project.image} alt="" className="w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/90 to-transparent" />
            </div>
          )}

          {/* Top row: Badges & Icon */}
          <div className="relative z-10 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono border bg-background/80 backdrop-blur-sm", sc)}>
                <span className={cn("w-1.5 h-1.5 rounded-full", dot)} />
                {project.status}
              </span>
              <span className="apple-pill text-[10px] font-mono text-muted-foreground">
                {project.category}
              </span>
            </div>

            <div className="w-8 h-8 rounded-full bg-foreground/5 group-hover:bg-foreground group-hover:text-background flex items-center justify-center text-foreground transition-all">
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Bottom row: Title, summary, tech stack */}
          <div className="relative z-10 space-y-2 mt-auto pt-4">
            <h3 className={cn(
              "font-extrabold tracking-tight text-foreground group-hover:text-apple-blue transition-colors",
              isBig ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
            )}>
              {project.title}
            </h3>

            <p className={cn(
              "text-muted-foreground leading-relaxed line-clamp-2",
              isBig ? "text-sm sm:text-base max-w-xl" : "text-xs"
            )}>
              {project.summary}
            </p>

            {project.techStack && project.techStack.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.techStack.slice(0, isBig ? 6 : 3).map((t) => (
                  <span key={t} className="apple-pill text-[10px] font-mono font-normal">
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

// MAIN
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
            <Sparkles className="w-4 h-4 text-apple-orange" />
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-foreground">
              {isEn ? 'PROJECT ARCHIVE' : 'PROJE ARŞİVİ'}
            </h2>
            <span className="apple-pill text-[10px] font-mono">
              {filtered.length} / {projects.length}
            </span>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder={isEn ? 'Search stack or name...' : 'Teknoloji veya isim ara...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-muted/80 border border-border rounded-full text-xs font-medium text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-apple-blue/30 transition-all"
            />
          </div>
        </div>

        {/* Category Pills (Apple Segmented Scroll) */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)}
              className={cn(
                "shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap",
                active === cat
                  ? "bg-foreground text-background shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground bg-muted/60 hover:bg-muted"
              )}
            >
              {cat === ALL ? ALL : cat.length > 24 ? cat.slice(0, 22) + '…' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Bento grid: 6 columns (mobile) / 12 columns (desktop) */}
      <motion.div layout
        className="grid grid-cols-6 lg:grid-cols-12 auto-rows-[88px] gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <ProjectCard key={p.slug} project={p} size={getSize(score(p))} idx={i} localizePath={localizePath} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="p-12 text-center apple-card space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            {isEn ? 'No projects match your filter query.' : 'Aramanıza uygun proje bulunamadı.'}
          </p>
        </div>
      )}

    </section>
  );
}
