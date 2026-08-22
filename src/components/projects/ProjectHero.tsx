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
    <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#1a1a1a]">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#252525] border-b border-white/8">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 mx-4 h-6 bg-[#1a1a1a] rounded-full border border-white/8 flex items-center px-3">
          <span className="text-[10px] font-mono text-white/30">newtab — {title}</span>
        </div>
      </div>
      <img src={image} alt={title} className="w-full object-cover max-h-[420px]" loading="lazy" />
    </div>
  );
}

function MobileFrame({ image, title }: { image: string; title: string }) {
  return (
    <div className="flex justify-center">
      <div className="relative w-64 rounded-[2.5rem] overflow-hidden border-4 border-white/15 shadow-2xl bg-black">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-10" />
        <img src={image} alt={title} className="w-full object-cover" loading="lazy" />
      </div>
    </div>
  );
}

function DataGrid({ accentBg }: { accentBg: string }) {
  return (
    <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" className={accentBg.replace('bg-', 'text-')} />
      </svg>
      {/* Fake chart bars */}
      <div className="absolute bottom-8 left-8 right-8 flex items-end gap-2 h-24 opacity-40">
        {[60, 85, 45, 92, 70, 55, 88, 65, 78, 90, 50, 95].map((h, i) => (
          <div key={i} className={cn("flex-1 rounded-t opacity-60", accentBg)} style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

function HardwareGrid() {
  return (
    <div className="absolute inset-0 opacity-8 pointer-events-none overflow-hidden">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" className="text-amber-400" />
      </svg>
      {/* Circuit traces */}
      <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="30%" x2="25%" y2="30%" stroke="#F59E0B" strokeWidth="1.5" />
        <line x1="25%" y1="30%" x2="25%" y2="60%" stroke="#F59E0B" strokeWidth="1.5" />
        <line x1="25%" y1="60%" x2="60%" y2="60%" stroke="#F59E0B" strokeWidth="1.5" />
        <line x1="75%" y1="20%" x2="100%" y2="20%" stroke="#F59E0B" strokeWidth="1.5" />
        <line x1="75%" y1="20%" x2="75%" y2="80%" stroke="#F59E0B" strokeWidth="1.5" />
        <circle cx="25%" cy="30%" r="4" fill="#F59E0B" opacity="0.6" />
        <circle cx="25%" cy="60%" r="4" fill="#F59E0B" opacity="0.6" />
        <circle cx="60%" cy="60%" r="4" fill="#F59E0B" opacity="0.6" />
        <circle cx="75%" cy="20%" r="4" fill="#F59E0B" opacity="0.6" />
      </svg>
    </div>
  );
}

function DesignGrid({ accentBg }: { accentBg: string }) {
  return (
    <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
      <div className="grid grid-cols-6 grid-rows-4 gap-3 p-8 h-full">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className={cn(
            "rounded-xl border border-white/10",
            i % 7 === 0 ? cn("col-span-2", accentBg, "opacity-40") :
            i % 5 === 0 ? "bg-white/5 row-span-2" :
            "bg-white/3"
          )} />
        ))}
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
    <header className="relative mb-12">
      <div className="relative rounded-[2.5rem] border border-white/8 overflow-hidden bg-white/[0.02]">

        {/* Ambient glow from category */}
        <div className={cn("absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none opacity-20 blur-3xl", glow)} />

        {/* Hero background image with gradient overlay */}
        {hasImage && variant !== 'browser' && variant !== 'mobile' && (
          <div className="absolute inset-0">
            <img src={image} alt={title} className="w-full h-full object-cover opacity-30" loading="eager" />
            <div className={cn("absolute inset-0 bg-gradient-to-r", gradient)} />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          </div>
        )}

        {/*  CONTENT  */}
        <div className={cn(
          "relative z-10 grid gap-6 p-5 sm:p-8 md:p-12",
          (variant === 'browser' || variant === 'mobile') && hasImage
            ? "grid-cols-1 md:grid-cols-2 items-center"
            : "grid-cols-1 max-w-3xl"
        )}>

          {/* Left: Text content */}
          <div className="space-y-5">
            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono border", badge)}>
                <Icon className="w-3 h-3" />
                {category}
              </span>
              <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono border", statusClass)}>
                <span className={cn("w-1.5 h-1.5 rounded-full", dot)} />
                {status}
              </span>
              {date && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-white/20">
                  <Calendar className="w-3 h-3" />
                  {new Date(date).getFullYear()}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className={cn(
              "font-black tracking-tight text-white uppercase leading-[0.9]",
              title.length > 15 ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl" : "text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
            )}>
              {title}
            </h1>

            {/* Accent line */}
            <div className={cn("w-12 h-1 rounded-full", accentBg, isLegacy ? "opacity-30" : "")} />

            {/* Summary */}
            <p className="text-sm md:text-base text-white/55 leading-relaxed max-w-xl">
              {summary}
            </p>

            {/* CTAs */}
            {(live || github || download) && (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                {download && (
                  <a href={download}
                    className="relative group/dl overflow-hidden inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl text-base font-black transition-all bg-orange-500 text-white shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:shadow-[0_0_60px_rgba(249,115,22,0.7)] hover:-translate-y-1 active:translate-y-0 uppercase tracking-tighter"
                  >
                    {/* Glossy overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover/dl:opacity-100 transition-opacity" />

                    <Smartphone className="w-6 h-6 animate-pulse" />
                    <span>{t('project.downloadApk')} {version || ''}</span>
                  </a>
                )}
                <div className="flex items-center gap-3">
                  {live && (
                    <a href={live} target="_blank" rel="noreferrer"
                      className={cn("flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all text-white border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10")}
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t('project.liveDemo')}
                    </a>
                  )}
                  {github && (
                    <a href={github} target="_blank" rel="noreferrer"
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white/40 hover:text-white/70 bg-white/5 hover:bg-white/8 border border-white/5 transition-all"
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
          <div className="relative mx-8 mb-8 md:mx-12 md:mb-10 rounded-2xl overflow-hidden border border-white/8 shadow-xl max-h-64">
            <img src={image} alt={title} className="w-full object-cover object-top" loading="eager" />
            <div className="absolute inset-0 bg-linear-to-t from-background/60 to-transparent" />
          </div>
        )}
      </div>
    </header>
  );
}
