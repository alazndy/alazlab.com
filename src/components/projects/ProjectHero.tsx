'use client';

import { ExternalLink, Code2, Calendar, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { categoryConfig, defaultConfig, type HeroVariant } from '@/lib/project-config';
import { useI18n } from '@/lib/i18n';

interface ProjectHeroProps {
  title: string;
  summary: string;
  image?: string;
  status: string;
  category: string;
  date?: string;
  live?: string;
  github?: string;
  download?: string;
  version?: string;
  accent: string;
  accentBg: string;
  glow: string;
  badge: string;
  statusClass: string;
  statusDot: string;
  variant: HeroVariant;
  gradient: string;
}

function BrowserFrame({ image, title }: { image: string; title: string }) {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-border shadow-2xl bg-card">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-muted border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 mx-4 h-6 bg-card rounded-full border border-border flex items-center px-3">
          <span className="text-[10px] font-mono text-muted-foreground">app.preview — {title}</span>
        </div>
      </div>
      <img src={image} alt={title} className="w-full object-cover max-h-[420px]" loading="lazy" />
    </div>
  );
}

function MobileFrame({ image, title }: { image: string; title: string }) {
  return (
    <div className="flex justify-center">
      <div className="relative w-64 rounded-[2.5rem] overflow-hidden border-4 border-border shadow-2xl bg-card">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-muted rounded-b-2xl z-10" />
        <img src={image} alt={title} className="w-full object-cover" loading="lazy" />
      </div>
    </div>
  );
}

export function ProjectHero({
  title, summary, image, status, category, date, live, github, download, version,
  accent, accentBg, glow, badge, statusClass, statusDot: dot,
  variant, gradient,
}: ProjectHeroProps) {
  const cat = categoryConfig[category] ?? defaultConfig;
  const Icon = cat.icon;
  const { t } = useI18n();

  const hasImage = !!image;
  const isLegacy = status === 'Legacy' || status === 'Pending';

  return (
    <header className="relative mb-8">
      <div className="relative rounded-3xl border border-border overflow-hidden bg-card shadow-lg">

        {/* Ambient glow from category */}
        <div className={cn("absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none opacity-20 blur-3xl", glow)} />

        {/* Hero background image with gradient overlay */}
        {hasImage && variant !== 'browser' && variant !== 'mobile' && (
          <div className="absolute inset-0">
            <img src={image} alt={title} className="w-full h-full object-cover opacity-20" loading="eager" />
            <div className={cn("absolute inset-0 bg-gradient-to-r", gradient)} />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </div>
        )}

        {/* CONTENT */}
        <div className={cn(
          "relative z-10 grid gap-8 p-6 sm:p-10 md:p-12",
          (variant === 'browser' || variant === 'mobile') && hasImage
            ? "grid-cols-1 md:grid-cols-2 items-center"
            : "grid-cols-1 max-w-4xl"
        )}>

          {/* Left: Text content */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold border", badge)}>
                <Icon className="w-3 h-3" />
                {category}
              </span>
              <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono border", statusClass)}>
                <span className={cn("w-1.5 h-1.5 rounded-full", dot)} />
                {status}
              </span>
              {date && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {new Date(date).getFullYear()}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className={cn(
              "font-black tracking-tight text-foreground uppercase leading-[0.9]",
              title.length > 15 ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl" : "text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
            )}>
              {title}
            </h1>

            {/* Accent line */}
            <div className={cn("w-14 h-1.5 rounded-full", accentBg, isLegacy ? "opacity-30" : "")} />

            {/* Summary */}
            <p className="text-sm md:text-base text-foreground/75 leading-relaxed max-w-2xl">
              {summary}
            </p>

            {/* CTAs */}
            {(live || github || download) && (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                {download && (
                  <a href={download}
                    className="relative group/dl overflow-hidden inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-sm font-black transition-all bg-lcars-orange text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600 uppercase tracking-wider"
                  >
                    <Smartphone className="w-5 h-5 animate-pulse" />
                    <span>{t('project.downloadApk')} {version || ''}</span>
                  </a>
                )}
                <div className="flex items-center gap-3">
                  {live && (
                    <a href={live} target="_blank" rel="noreferrer"
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold font-mono uppercase transition-all text-foreground border border-border hover:bg-foreground/5 bg-foreground/[0.02]"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t('project.liveDemo')}
                    </a>
                  )}
                  {github && (
                    <a href={github} target="_blank" rel="noreferrer"
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold font-mono uppercase text-muted-foreground hover:text-foreground bg-foreground/[0.02] hover:bg-foreground/5 border border-border transition-all"
                    >
                      <Code2 className="w-4 h-4" />
                      {t('project.sourceCode')}
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right: Visual (browser/mobile only) */}
          {hasImage && variant === 'browser' && (
            <div className="block">
              <BrowserFrame image={image!} title={title} />
            </div>
          )}
          {hasImage && variant === 'mobile' && (
            <div className="block">
              <MobileFrame image={image!} title={title} />
            </div>
          )}
        </div>

        {/* Bottom image strip for non-split layouts */}
        {hasImage && variant !== 'browser' && variant !== 'mobile' && (
          <div className="relative mx-6 mb-6 md:mx-10 md:mb-8 rounded-2xl overflow-hidden border border-border shadow-xl max-h-72">
            <img src={image} alt={title} className="w-full object-cover object-top" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>
        )}
      </div>
    </header>
  );
}
