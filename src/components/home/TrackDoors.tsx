'use client';

import Link from 'next/link';
import { Wrench, Terminal, ArrowRight } from 'lucide-react';
import type { ProjectMetadata } from '@/lib/markdown';
import { useI18n } from '@/lib/i18n';

interface TrackDoorsProps {
  projects: ProjectMetadata[];
}

export function TrackDoors({ projects }: TrackDoorsProps) {
  const { t, lang, localizePath } = useI18n();
  const isEn = lang === 'en';
  const muhendislikProjects = projects.filter(p => p.area === 'muhendislik');
  const labProjects = projects.filter(p => p.area === 'lab');

  return (
    <section className="space-y-4 pt-2">
      <div className="flex items-center gap-3">
        <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-muted-foreground">
          {isEn ? 'CORE FOCUS AREAS' : 'ANA ODAK ALANLARI'}
        </h2>
        <div className="flex-1 h-px bg-border/60" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Mühendislik Kapısı */}
        <Link
          href={localizePath('/muhendislik')}
          className="apple-card p-7 sm:p-9 flex flex-col justify-between space-y-6 group"
        >
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-apple-orange group-hover:scale-105 transition-transform">
                <Wrench className="w-6 h-6" />
              </div>
              <span className="apple-pill border-orange-500/20 bg-orange-500/10 text-apple-orange font-mono">
                {muhendislikProjects.length} {t('stats.projects')}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground group-hover:text-apple-orange transition-colors flex items-center gap-2">
                {t('cat.engineering')}
                <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {isEn 
                  ? 'Hardware-linked embedded systems, CAN-bus radar, and HMI control units deployed in heavy vehicles, mines, and industrial sites at ADC Design.'
                  : 'ADC Tasarım bünyesinde, gerçek donanıma bağlı, madenlerde ve ağır vasıtalarda sahada çalışan gömülü sistemler, CAN-bus radar ve HMI kontrol üniteleri.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-border/80">
            {['UniControl', 'RCPS', 'VCT', 'UCC APP'].map((badge) => (
              <span
                key={badge}
                className="apple-pill text-xs font-mono font-medium"
              >
                {badge}
              </span>
            ))}
          </div>
        </Link>

        {/* Lab Kapısı */}
        <Link
          href={localizePath('/lab')}
          className="apple-card p-7 sm:p-9 flex flex-col justify-between space-y-6 group"
        >
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-apple-blue group-hover:scale-105 transition-transform">
                <Terminal className="w-6 h-6" />
              </div>
              <span className="apple-pill border-blue-500/20 bg-blue-500/10 text-apple-blue font-mono">
                {labProjects.length} {t('stats.projects')}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground group-hover:text-apple-blue transition-colors flex items-center gap-2">
                {t('cat.lab')}
                <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {isEn
                  ? 'Autonomous software ecosystem developed with AI agents: Rust kernel, modular Android launcher, design systems, and productivity tools.'
                  : 'Kişisel zamanda AI ajanlarıyla birlikte geliştirilen otonom yazılım ekosistemi: Rust kernel, Android launcher, npm tasarım sistemi ve üretkenlik araçları.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-border/80">
            {['R-AI-OS', 'GT-Launcher', 'GT-UI', 'GTab'].map((badge) => (
              <span
                key={badge}
                className="apple-pill text-xs font-mono font-medium"
              >
                {badge}
              </span>
            ))}
          </div>
        </Link>
      </div>
    </section>
  );
}
