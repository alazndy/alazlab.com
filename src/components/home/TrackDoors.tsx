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
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          {isEn ? 'Two Development Tracks' : 'İki Ana Çalışma Alanı'}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Mühendislik Kapısı */}
        <Link
          href={localizePath('/muhendislik')}
          className="apple-card p-6 sm:p-8 flex flex-col justify-between space-y-6 group"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-apple-orange group-hover:scale-105 transition-transform">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-muted-foreground bg-muted px-2.5 py-1 rounded-md border border-border">
                {muhendislikProjects.length} {t('stats.projects')}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-apple-orange transition-colors flex items-center justify-between">
                {t('cat.engineering')}
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-apple-orange" />
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {isEn 
                  ? 'Real-world embedded hardware, automotive CAN-bus radar, isolated 24V I/O units, and HMI dashboards deployed in mining and heavy machinery at ADC Design.'
                  : 'ADC Tasarım bünyesinde, gerçek donanıma bağlı, madenlerde ve ağır vasıtalarda sahada çalışan gömülü sistemler, CAN-bus radar ve HMI kontrol üniteleri.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-3 border-t border-border">
            {['UniControl V2', 'RCPS', 'VCT 360', 'UCC APP'].map((badge) => (
              <span
                key={badge}
                className="text-xs font-mono px-2.5 py-1 rounded-md bg-muted text-foreground/80 border border-border/80"
              >
                {badge}
              </span>
            ))}
          </div>
        </Link>

        {/* Lab Kapısı */}
        <Link
          href={localizePath('/lab')}
          className="apple-card p-6 sm:p-8 flex flex-col justify-between space-y-6 group"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-apple-blue group-hover:scale-105 transition-transform">
                <Terminal className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-muted-foreground bg-muted px-2.5 py-1 rounded-md border border-border">
                {labProjects.length} {t('stats.projects')}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-apple-blue transition-colors flex items-center justify-between">
                {t('cat.lab')}
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-apple-blue" />
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {isEn
                  ? 'Independent software engineering: Kotlin / Jetpack Compose Android launcher, Rust CLI runners, Chrome extensions, and component libraries.'
                  : 'Bağımsız yazılım geliştirme: Kotlin ve Jetpack Compose ile Android başlatıcı, Rust CLI araç motoru, Chrome uzantıları ve bileşen kütüphaneleri.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-3 border-t border-border">
            {['GT-Launcher', 'R-AI-OS', 'GTab', 'tek-ui'].map((badge) => (
              <span
                key={badge}
                className="text-xs font-mono px-2.5 py-1 rounded-md bg-muted text-foreground/80 border border-border/80"
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
