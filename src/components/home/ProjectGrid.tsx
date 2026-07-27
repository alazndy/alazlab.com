'use client';

import { useState, useMemo, memo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { ProjectMetadata } from '@/lib/markdown';
import { categoryConfig, defaultConfig, statusConfig, statusDot } from '@/lib/project-config';
import { cn } from '@/lib/utils';

// ── SCORE ─────────────────────────────────────────────────────────────────────
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

// row-span classes (use grid-rows-[repeat(auto,80px)])
const ROW: Record<Size, string> = {
  hero:   'row-span-4',
  large:  'row-span-4',
  medium: 'row-span-3',
  small:  'row-span-2',
  xs:     'row-span-2',
};

// ── CARD ──────────────────────────────────────────────────────────────────────
const ProjectCard = memo(function ProjectCard({ project, size, idx }: {
  project: ProjectMetadata; size: Size; idx: number;
}) {
  const cat  = categoryConfig[project.category] ?? defaultConfig;
  const sc   = statusConfig[project.status] ?? statusConfig['Early'];
  const dot  = statusDot[project.status] ?? statusDot['Early'];
  const href = project.slug === 'GTab' ? '/gtab' : `/proje/${project.slug}`;
  const dim  = project.status === 'Legacy' || project.status === 'Pending';

  if (size === 'xs') {
    return (
      <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.2, delay: Math.min(idx * 0.015, 0.25) }}
        className={cn(SPAN[size], ROW[size])}
      >
        <Link href={href}
          className={cn(
            "group h-full flex flex-col justify-between p-4 rounded-2xl border border-border",
            "hover:border-foreground/15 hover:bg-foreground/[0.02] transition-all duration-200",
            dim && "opacity-40 hover:opacity-70"
          )}
        >
          {project.image && (
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-border mb-3 shrink-0">
              <img src={project.image} alt="" className="w-full h-full object-cover" loading="lazy" />
            </div>
          )}
          <div className="flex-1 min-w-0 space-y-1">
            <p className="text-xs font-bold text-foreground/60 group-hover:text-foreground/90 transition-colors truncate">{project.title}</p>
            <p className="text-[10px] font-mono text-muted-foreground truncate">{project.category.split(' ')[0]}</p>
          </div>
          <ArrowUpRight className="w-3 h-3 text-muted-foreground/30 group-hover:text-muted-foreground mt-2 self-end transition-colors" />
        </Link>
      </motion.div>
    );
  }

  const isBig = size === 'hero' || size === 'large';

  return (
    <motion.div layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3, delay: Math.min(idx * 0.035, 0.4) }}
      className={cn(SPAN[size], ROW[size], dim && "opacity-60 hover:opacity-80 transition-opacity")}
    >
      <Link href={href} className="group block h-full">
        <article className="relative h-full overflow-hidden rounded-2xl border border-border hover:border-foreground/20 transition-all duration-300 hover:shadow-2xl hover:shadow-black/40 bg-card">

          {/* Image fills the card */}
          {project.image ? (
            <img
              src={project.image} alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              loading={idx < 4 ? 'eager' : 'lazy'}
            />
          ) : (
            <div className={cn("absolute inset-0 flex items-center justify-center", cat.glow, "opacity-15")}>
              <cat.icon className={cn("w-16 h-16", cat.accent, "opacity-20")} />
            </div>
          )}

          {/* Dark gradient — stronger at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/5" />

          {/* Top: status badge */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className={cn(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono border backdrop-blur-sm",
              sc
            )}>
              <span className={cn("w-1 h-1 rounded-full", dot)} />
              {project.status}
            </span>
            {isBig && (
              <span className={cn("text-[9px] font-mono px-2 py-0.5 rounded-full border backdrop-blur-sm", cat.badge)}>
                {project.category.length > 18 ? project.category.split(' ').slice(0, 2).join(' ') : project.category}
              </span>
            )}
          </div>

          {/* Bottom: text content */}
          <div className={cn("absolute bottom-0 left-0 right-0 p-4 sm:p-5 space-y-1.5", isBig ? "p-5 sm:p-6 space-y-2" : "")}>
            <h3 className={cn(
              "font-black text-white uppercase tracking-tight leading-tight",
              size === 'hero'   ? "text-2xl sm:text-3xl" :
              size === 'large'  ? "text-xl sm:text-2xl"  :
              size === 'medium' ? "text-sm sm:text-base" :
              "text-xs sm:text-sm"
            )}>
              {project.title}
            </h3>

            {(size === 'hero' || size === 'large') && (
              <p className="text-white/55 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                {project.summary}
              </p>
            )}

            {isBig && project.techStack && project.techStack.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-1">
                {project.techStack.slice(0, size === 'hero' ? 5 : 3).map(t => (
                  <span key={t} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/8 text-white/50 border border-white/10">
                    {t}
                  </span>
                ))}
                {project.techStack.length > (size === 'hero' ? 5 : 3) && (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-white/30">
                    +{project.techStack.length - (size === 'hero' ? 5 : 3)}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Arrow */}
          <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </article>
      </Link>
    </motion.div>
  );
});

// ── MAIN ──────────────────────────────────────────────────────────────────────
const ALL = 'Hepsi';

export function ProjectGrid({ projects }: { projects: ProjectMetadata[] }) {
  const categories = useMemo(() =>
    [ALL, ...new Set(projects.map(p => p.category))].sort((a, b) =>
      a === ALL ? -1 : b === ALL ? 1 : a.localeCompare(b)),
    [projects]
  );
  const [active, setActive] = useState(ALL);

  const sorted = useMemo(() => {
    const list = active === ALL ? projects : projects.filter(p => p.category === active);
    return [...list].sort((a, b) => score(b) - score(a));
  }, [projects, active]);

  return (
    <section id="projects" className="space-y-6 pb-4">

      {/* Header + filter */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <h2 className="text-[10px] font-black font-mono uppercase tracking-[0.25em] text-muted-foreground">Projeler</h2>
          <div className="flex-1 h-px bg-border" />
          <span className="text-[10px] font-mono text-muted-foreground/60">{sorted.length}</span>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)}
              className={cn(
                "shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
                active === cat
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground hover:bg-foreground/5 border border-transparent hover:border-border"
              )}
            >
              {cat === ALL ? 'Hepsi' : cat.length > 22 ? cat.slice(0, 20) + '…' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Bento grid: 6 columns (mobile) / 12 columns (desktop), auto rows of 80px */}
      <motion.div layout
        className="grid grid-cols-6 lg:grid-cols-12 auto-rows-[80px] gap-3"
      >
        <AnimatePresence mode="popLayout">
          {sorted.map((p, i) => (
            <ProjectCard key={p.slug} project={p} size={getSize(score(p))} idx={i} />
          ))}
        </AnimatePresence>
      </motion.div>

    </section>
  );
}
