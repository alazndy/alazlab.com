'use client';

import { Tag, ArrowRight, Layers, Cpu, Calendar, Activity } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';
import { categoryLabel, statusLabel } from '@/lib/project-config';
import type { ProjectMetadata } from '@/lib/markdown';

interface ProjectSidebarProps {
  metadata: ProjectMetadata;
  catAccent: string;
  statusClass: string;
  related: ProjectMetadata[];
}

export function ProjectSidebar({ metadata, catAccent, statusClass, related }: ProjectSidebarProps) {
  const { t, lang, localizePath } = useI18n();
  const isEn = lang === 'en';

  return (
    <aside className="lg:col-span-4 order-1 lg:order-2 space-y-5 lg:sticky lg:top-20">

      {/* SYSTEM SPECS CARD */}
      <div className="apple-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-foreground uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 text-apple-blue" />
            {isEn ? 'SPECIFICATIONS' : 'SİSTEM ÖZELLİKLERİ'}
          </div>
        </div>

        <dl className="space-y-3 text-xs">
          <div className="flex justify-between items-center gap-2">
            <dt className="text-muted-foreground font-mono shrink-0">{t('project.category')}</dt>
            <dd className={cn("font-bold text-right", catAccent)}>{categoryLabel(metadata.category, lang)}</dd>
          </div>

          <div className="flex justify-between items-center gap-2">
            <dt className="text-muted-foreground font-mono">{t('project.status')}</dt>
            <dd>
              <span className={cn("px-2.5 py-0.5 rounded-full text-[10px] font-mono border", statusClass)}>
                {statusLabel(metadata.status, lang)}
              </span>
            </dd>
          </div>

          {metadata.version && (
            <div className="flex justify-between items-center gap-2">
              <dt className="text-muted-foreground font-mono">{isEn ? 'Release' : 'Sürüm'}</dt>
              <dd className="font-mono text-foreground font-semibold bg-muted px-2 py-0.5 rounded-md border border-border">
                {metadata.version}
              </dd>
            </div>
          )}

          {metadata.date && (
            <div className="flex justify-between items-center gap-2">
              <dt className="text-muted-foreground font-mono">{t('project.year')}</dt>
              <dd className="text-foreground font-mono flex items-center gap-1">
                <Calendar className="w-3 h-3 text-muted-foreground" />
                {new Date(metadata.date).getFullYear()}
              </dd>
            </div>
          )}

          {metadata.techStack && metadata.techStack.length > 0 && (
            <div className="flex justify-between items-center gap-2">
              <dt className="text-muted-foreground font-mono">{isEn ? 'Stack Modules' : 'Modül Sayısı'}</dt>
              <dd className="text-foreground font-mono font-bold">{metadata.techStack.length} {isEn ? 'Modules' : 'Modül'}</dd>
            </div>
          )}
        </dl>
      </div>

      {/* TECH STACK MATRIX */}
      {metadata.techStack && metadata.techStack.length > 0 && (
        <div className="apple-card p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-foreground uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5 text-apple-orange" />
            {t('project.stack')}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {metadata.techStack.map(tech => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg text-xs font-mono bg-muted text-foreground/85 border border-border"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* RELATED PROJECTS */}
      {related.length > 0 && (
        <div className="apple-card p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-apple-purple" />
            {t('project.related')}
          </div>
          <div className="space-y-2">
            {related.map(r => (
              <Link
                key={r.slug}
                href={r.slug === 'GTab' ? localizePath('/gtab') : localizePath(`/proje/${r.slug}`)}
                className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-muted/70 transition-all group border border-transparent hover:border-border"
              >
                {r.image ? (
                  <div className="w-10 h-10 rounded-xl overflow-hidden border border-border shrink-0 bg-muted">
                    <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center shrink-0 text-muted-foreground group-hover:text-foreground">
                    <Cpu className="w-4 h-4" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-foreground group-hover:text-apple-blue transition-colors truncate">
                    {r.title}
                  </div>
                  <div className="text-[10px] font-mono text-muted-foreground truncate">
                    {categoryLabel(r.category, lang)}
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      )}

    </aside>
  );
}
