'use client';

import { Tag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';
import type { ProjectMetadata } from '@/lib/markdown';

interface ProjectSidebarProps {
  metadata: ProjectMetadata;
  catAccent: string;
  statusClass: string;
  related: ProjectMetadata[];
}

export function ProjectSidebar({ metadata, catAccent, statusClass, related }: ProjectSidebarProps) {
  const { t, localizePath } = useI18n();

  return (
    <aside className="lg:col-span-4 order-1 lg:order-2 space-y-5 lg:sticky lg:top-10">

      {/* Tech Stack */}
      {metadata.techStack && metadata.techStack.length > 0 && (
        <div className="rounded-2xl border border-white/8 bg-white/2 p-5 space-y-3">
          <div className="flex items-center gap-2 text-[10px] font-mono text-white/30 uppercase tracking-widest">
            <Tag className="w-3.5 h-3.5" />
            {t('project.stack')}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {metadata.techStack.map(tech => (
              <span key={tech}
                className="px-2 py-1 bg-white/5 border border-white/8 rounded-lg text-[11px] font-mono text-white/50 hover:text-white/70 transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Details */}
      <div className="rounded-2xl border border-white/8 bg-white/2 p-5 space-y-3">
        <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-3">
          {t('project.systemInfo')}
        </div>
        <dl className="space-y-2.5 text-xs">
          <div className="flex justify-between gap-2">
            <dt className="text-white/30 font-mono shrink-0">{t('project.category')}</dt>
            <dd className={cn("font-medium text-right", catAccent)}>{metadata.category}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-white/30 font-mono">{t('project.status')}</dt>
            <dd><span className={cn("px-2 py-0.5 rounded text-[10px] font-mono border", statusClass)}>{metadata.status}</span></dd>
          </div>
          {metadata.date && (
            <div className="flex justify-between gap-2">
              <dt className="text-white/30 font-mono">{t('project.year')}</dt>
              <dd className="text-white/60">{new Date(metadata.date).getFullYear()}</dd>
            </div>
          )}
          {metadata.techStack && metadata.techStack.length > 0 && (
            <div className="flex justify-between gap-2">
              <dt className="text-white/30 font-mono">{t('project.stack')}</dt>
              <dd className="text-white/60">{metadata.techStack.length}</dd>
            </div>
          )}
        </dl>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="rounded-2xl border border-white/8 bg-white/2 p-5 space-y-4">
          <div className="flex items-center gap-2 text-[10px] font-mono text-white/30 uppercase tracking-widest">
            <ArrowRight className="w-3.5 h-3.5" />
            {t('project.related')}
          </div>
          <div className="space-y-2">
            {related.map(r => (
              <Link key={r.slug} href={r.slug === 'GTab' ? localizePath('/gtab') : localizePath(`/proje/${r.slug}`)}
                className="flex items-center justify-between py-3 px-3 rounded-xl hover:bg-white/5 transition-colors group border border-transparent hover:border-white/5"
              >
                <span className="text-xs font-semibold text-white/50 group-hover:text-white/80 transition-colors">{r.title}</span>
                <ArrowRight className="w-3.5 h-3.5 text-white/10 group-hover:text-white/40 group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      )}

    </aside>
  );
}
