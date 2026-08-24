'use client';

import { ExternalLink, Code2, Calendar, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { categoryConfig, defaultConfig, categoryLabel, statusLabel, type HeroVariant } from '@/lib/project-config';
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
    <div className="relative w-full rounded-2xl overflow-hidden border border-border shadow-lg bg-card">
      {/* macOS window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-muted border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-apple-red/80" />
          <div className="w-3 h-3 rounded-full bg-apple-yellow/80" />
          <div className="w-3 h-3 rounded-full bg-apple-green/80" />
        </div>
        <div className="flex-1 mx-4 h-6 bg-card rounded-md border border-border flex items-center px-3">
          <span className="text-[10px] font-mono text-muted-foreground">{title}</span>
        </div>
      </div>
      <img src={image} alt={title} className="w-full object-cover max-h-[420px]" loading="lazy" />
    </div>
  );
}

function MobileFrame({ image, title }: { image: string; title: string }) {
  return (
    <div className="flex justify-center">
      <div className="relative w-64 rounded-[2.5rem] overflow-hidden border-4 border-border shadow-xl bg-card">
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
  const { t, lang } = useI18n();

  const hasImage = !!image;
  const isLegacy = status === 'Legacy' || status === 'Pending';

  return (
    <header className="relative mb-8">
      <div className="apple-card relative overflow-hidden">

        {/* Hero background image with subtle gradient overlay */}
        {hasImage && variant !== 'browser' && variant !== 'mobile' && (
          <div className="absolute inset-0">
            <img src={image} alt={title} className="w-full h-full object-cover opacity-15" loading="eager" />
            <div className={cn("absolute inset-0 bg-gradient-to-r", gradient)} />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/85 to-transparent" />
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
          <div className="space-y-5">
            {/* Metadata Tags */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-muted text-foreground/90 border border-border">
                <Icon className="w-3.5 h-3.5 text-apple-blue" />
                {categoryLabel(category, lang)}
              </span>
              <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono border", statusClass)}>
                <span className={cn("w-1.5 h-1.5 rounded-full", dot)} />
                {statusLabel(status, lang)}
              </span>
              {date && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono text-muted-foreground bg-muted border border-border">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(date).getFullYear()}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className={cn(
              "font-extrabold tracking-tight text-foreground leading-[1.05]",
              title.length > 15 ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl" : "text-4xl sm:text-5xl md:text-6xl"
            )}>
              {title}
            </h1>

            {/* Summary */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl font-normal">
              {summary}
            </p>

            {/* CTAs */}
            {(live || github || download) && (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                {download && (
                  <a href={download}
                    className="relative group/dl overflow-hidden inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all bg-apple-orange text-white hover:opacity-90 active:scale-95 shadow-md shadow-orange-500/20"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>{t('project.downloadApk')} {version || ''}</span>
                  </a>
                )}
                <div className="flex items-center gap-2.5">
                  {live && (
                    <a href={live} target="_blank" rel="noreferrer"
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all text-foreground border border-border hover:bg-muted bg-card shadow-2xs"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-apple-blue" />
                      {t('project.liveDemo')}
                    </a>
                  )}
                  {github && (
                    <a href={github} target="_blank" rel="noreferrer"
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground bg-card hover:bg-muted border border-border transition-all shadow-2xs"
                    >
                      <Code2 className="w-3.5 h-3.5" />
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
          <div className="relative mx-6 mb-6 md:mx-10 md:mb-8 rounded-2xl overflow-hidden border border-border shadow-md max-h-72">
            <img src={image} alt={title} className="w-full object-cover object-top" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
          </div>
        )}
      </div>
    </header>
  );
}
