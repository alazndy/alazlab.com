'use client';

import { Tag, ArrowRight, Layers, ShieldCheck, Activity, Cpu, Calendar } from 'lucide-react';
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
  const { t, lang, localizePath } = useI18n();
  const isEn = lang === 'en';

  return (
    <aside className="lg:col-span-4 order-1 lg:order-2 space-y-5 lg:sticky lg:top-10">

      {/* ── SYSTEM TELEMETRY & SPEC CARD ── */}
      <div className="rounded-3xl border border-white/10 bg-card p-6 space-y-4 shadow-lg">
        <div className="flex items-center justify-between border-b border-white/8 pb-3">
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-lcars-cyan uppercase tracking-widest">
            <Activity className="w-3.5 h-3.5 text-lcars-cyan animate-pulse" />
            {isEn ? 'SYSTEM TELEMETRY' : 'SİSTEM TELEMETRİSİ'}
          </div>
          <span className="text-[10px] font-mono text-lcars-green uppercase">SYNCED</span>
        </div>

        <dl className="space-y-3 text-xs">
          <div className="flex justify-between items-center gap-2">
            <dt className="text-muted-foreground font-mono shrink-0">{t('project.category')}</dt>
            <dd className={cn("font-bold text-right", catAccent)}>{metadata.category}</dd>
          </div>

          <div className="flex justify-between items-center gap-2">
            <dt className="text-muted-foreground font-mono">{t('project.status')}</dt>
            <dd>
              <span className={cn("px-2.5 py-0.5 rounded-full text-[10px] font-mono border", statusClass)}>
                {metadata.status}
              </span>
            </dd>
          </div>

          {metadata.version && (
            <div className="flex justify-between items-center gap-2">
              <dt className="text-muted-foreground font-mono">{isEn ? 'Release' : 'Sürüm'}</dt>
              <dd className="font-mono text-foreground/80 font-bold bg-foreground/5 px-2 py-0.5 rounded border border-border">
                {metadata.version}
              </dd>
            </div>
          )}

          {metadata.date && (
            <div className="flex justify-between items-center gap-2">
              <dt className="text-muted-foreground font-mono">{t('project.year')}</dt>
              <dd className="text-foreground/70 font-mono flex items-center gap-1">
                <Calendar className="w-3 h-3 text-muted-foreground" />
                {new Date(metadata.date).getFullYear()}
              </dd>
            </div>
          )}

          {metadata.techStack && metadata.techStack.length > 0 && (
            <div className="flex justify-between items-center gap-2">
              <dt className="text-muted-foreground font-mono">{isEn ? 'Stack Modules' : 'Modül Sayısı'}</dt>
              <dd className="text-foreground/80 font-mono font-bold">{metadata.techStack.length} {isEn ? 'Technologies' : 'Teknoloji'}</dd>
            </div>
          )}
        </dl>
      </div>

      {/* ── TECH STACK MATRIX ── */}
      {metadata.techStack && metadata.techStack.length > 0 && (
        <div className="rounded-3xl border border-white/10 bg-card p-6 space-y-4 shadow-lg">
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-lcars-orange uppercase tracking-widest">
            <Tag className="w-3.5 h-3.5" />
            {t('project.stack')}
          </div>
          <div className="flex flex-wrap gap-2">
            {metadata.techStack.map(tech => (
              <span
                key={tech}
                className="px-2.5 py-1 bg-foreground/5 border border-border rounded-xl text-xs font-mono text-foreground/70 hover:text-foreground hover:border-foreground/30 transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── RELATED PROJECTS WITH IMAGE PREVIEWS ── */}
      {related.length > 0 && (
        <div className="rounded-3xl border border-white/10 bg-card p-6 space-y-4 shadow-lg">
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5" />
            {t('project.related')}
          </div>
          <div className="space-y-2.5">
            {related.map(r => (
              <Link
                key={r.slug}
                href={r.slug === 'GTab' ? localizePath('/gtab') : localizePath(`/proje/${r.slug}`)}
                className="flex items-center gap-3 p-3 rounded-2xl bg-foreground/[0.02] hover:bg-foreground/5 transition-all group border border-border/60 hover:border-foreground/20"
              >
                {r.image ? (
                  <div className="w-10 h-10 rounded-xl overflow-hidden border border-border shrink-0 bg-black">
                    <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-foreground/5 border border-border flex items-center justify-center shrink-0 text-muted-foreground group-hover:text-lcars-cyan">
                    <Cpu className="w-4 h-4" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-foreground/80 group-hover:text-lcars-cyan transition-colors truncate">
                    {r.title}
                  </div>
                  <div className="text-[10px] font-mono text-muted-foreground truncate">
                    {r.category}
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      )}

    </aside>
  );
}
