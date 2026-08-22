'use client';

import { memo, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ProjectMetadata } from '@/lib/markdown';
import { categoryConfig, defaultConfig, statusConfig } from '@/lib/project-config';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';

interface CategoryGridProps {
  categories: Record<string, ProjectMetadata[]>;
}

// Memoized project row — skips re-render unless its own props change
const ProjectRow = memo(function ProjectRow({ 
  project, idx 
}: { 
  project: ProjectMetadata; idx: number;
}) {
  const cat = categoryConfig[project.category] ?? defaultConfig;
  const Icon = cat.icon;
  const statusClass = statusConfig[project.status] ?? statusConfig['Early'];

  return (
    <Link
      href={`/proje/${project.slug}`}
      className="group flex items-center gap-4 px-4 py-3 rounded-xl border border-transparent hover:border-foreground/5 hover:bg-foreground/5 transition-all duration-150"
    >
      {project.image ? (
        <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-foreground/5 bg-foreground/5">
          <img 
            src={project.image} 
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className={cn("w-12 h-12 rounded-lg bg-foreground/5 flex items-center justify-center shrink-0 group-hover:bg-foreground/10 transition-colors", cat.accent)}>
          <Icon className="w-5 h-5" />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-foreground/70 group-hover:text-foreground transition-colors">{project.title}</span>
          <span className={cn("hidden sm:inline-flex shrink-0 px-1.5 py-0.5 rounded text-[9px] font-mono border", statusClass)}>
            {project.status}
          </span>
        </div>
        <p className="text-xs text-foreground/40 truncate mt-0.5">{project.summary}</p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span className="hidden lg:block text-[10px] font-mono text-foreground/30">{project.category}</span>
        <ArrowRight className="w-3.5 h-3.5 text-foreground/10 group-hover:text-foreground/40 group-hover:translate-x-0.5 transition-all" />
      </div>
    </Link>
  );
});

export const CategoryGrid = memo(function CategoryGrid({ categories }: CategoryGridProps) {
  const allProjects = useMemo(() => Object.values(categories).flat(), [categories]);
  const { t } = useI18n();

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-black tracking-widest uppercase text-foreground/40 font-mono">{t('nav.allProjects')}</h2>
        <div className="flex-1 h-px bg-foreground/5" />
        <span className="text-[10px] font-mono text-foreground/30">{allProjects.length} {t('cat.total')}</span>
      </div>

      <div className="space-y-1">
        {allProjects.map((project, idx) => (
          <ProjectRow key={project.slug} project={project} idx={idx} />
        ))}
      </div>
    </section>
  );
});
