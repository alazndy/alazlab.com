'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  MapPin,
  Cpu,
  Terminal,
  Smartphone,
  Globe2,
  ShieldCheck,
  Zap,
  Layers,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';

interface HomeHeroProps {
  projectCount: number;
  liveCount: number;
  categoryCount: number;
}

export function HomeHero({ projectCount, liveCount, categoryCount }: HomeHeroProps) {
  const { t, lang, localizePath } = useI18n();
  const isEn = lang === 'en';

  const stats = [
    { value: projectCount,  suffix: '',  label: t('stats.projects'), color: 'text-apple-orange' },
    { value: liveCount,     suffix: '',  label: t('stats.active'),   color: 'text-apple-blue'   },
    { value: categoryCount, suffix: '',  label: t('stats.areas'),    color: 'text-apple-purple' },
    { value: 5,             suffix: '+', label: t('stats.years'),    color: 'text-apple-green'  },
  ];

  const showcaseCards = [
    {
      title: isEn ? 'Automotive ECU & Radar' : 'Otomotiv ECU & Radar',
      project: 'UniControl V2',
      metric: 'CAN 2.0B · ESP32-S3',
      desc: isEn ? 'Industrial vehicle safety & brigade radar control unit.' : 'Ağır vasıta güvenlik kontrolcüsü ve radar telemetrisi.',
      icon: Cpu,
      color: 'text-apple-orange',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/20',
      href: '/proje/UniControl',
    },
    {
      title: isEn ? 'Modular UI Launcher' : 'Modüler Android Başlatıcı',
      project: 'GT-Launcher',
      metric: '22 Demos · LCARS Engine',
      desc: isEn ? 'Star Trek-inspired widget & card builder ecosystem.' : 'Star Trek temalı modüler kart ve vitrin ekosistemi.',
      icon: Smartphone,
      color: 'text-apple-blue',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      href: '/proje/GT-Launcher',
    },
    {
      title: isEn ? 'Autonomous AI Kernel' : 'Otonom AI Çekirdeği',
      project: 'R-AI-OS',
      metric: 'Rust · Tokio Async',
      desc: isEn ? 'Local vector intelligence & secure agent runtime.' : 'Yerel vektör zekası ve güvenli agent çalışma ortamı.',
      icon: Terminal,
      color: 'text-apple-green',
      bg: 'bg-green-500/10',
      border: 'border-green-500/20',
      href: '/proje/R-AI-OS',
    },
    {
      title: isEn ? 'Browser Productivity' : 'Tarayıcı Verimlilik Üssü',
      project: 'GTab Chrome',
      metric: 'v4.3.0 · Web Store',
      desc: isEn ? 'Modular new tab with Google Tasks & Calendar sync.' : 'Google servisleri entegre modüler yeni sekme uzantısı.',
      icon: Globe2,
      color: 'text-apple-purple',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
      href: '/gtab',
    },
  ];

  return (
    <section className="relative pt-4 pb-10 sm:pb-16 overflow-hidden">

      {/* Subtle ambient lighting */}
      <div
        aria-hidden
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(255,149,0,0.15) 0%, transparent 70%)' }}
      />
      <div
        aria-hidden
        className="absolute top-1/3 -right-32 w-96 h-96 rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(0,113,227,0.15) 0%, transparent 70%)' }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

        {/* ── LEFT: APPLE KEYNOTE HEADLINE & NARRATIVE ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="lg:col-span-7 space-y-8"
        >
          {/* Availability Pill */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="apple-pill">
              <span className="w-2 h-2 rounded-full bg-apple-green animate-pulse" />
              {t('header.available')}
              <MapPin className="w-3 h-3 text-muted-foreground ml-1" />
            </span>
            <span className="apple-pill border-apple-blue/20 bg-apple-blue/5 text-apple-blue">
              <ShieldCheck className="w-3 h-3" />
              System Architect v5.2
            </span>
          </div>

          {/* Large Title with Apple Typography */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.02]">
              Göktuğ <span className="text-apple-orange">Turhan</span>
            </h1>

            {/* Discipline Badges */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                { label: 'Embedded ECU', color: 'bg-orange-500/10 text-apple-orange border-orange-500/20' },
                { label: 'CAN-Bus 2.0B / FD', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' },
                { label: 'AI Agent Kernel', color: 'bg-green-500/10 text-apple-green border-green-500/20' },
                { label: 'Full-Stack Next.js', color: 'bg-blue-500/10 text-apple-blue border-blue-500/20' },
                { label: 'Android Systems', color: 'bg-purple-500/10 text-apple-purple border-purple-500/20' },
              ].map((b) => (
                <span
                  key={b.label}
                  className={`px-3 py-1 rounded-full text-[11px] font-mono font-medium border ${b.color}`}
                >
                  {b.label}
                </span>
              ))}
            </div>
          </div>

          {/* Bio text */}
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl font-normal">
            {t('hero.bio')}
          </p>

          {/* Metric Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl border border-border bg-card shadow-xs">
            {stats.map(({ value, suffix, label, color }) => (
              <div key={label} className="space-y-1">
                <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${color}`}>
                  {value}{suffix}
                </div>
                <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-xs uppercase tracking-wider bg-foreground text-background hover:opacity-90 active:scale-95 transition-all shadow-md"
            >
              <Zap className="w-3.5 h-3.5" />
              {t('hero.explore')}
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <Link
              href={localizePath('/hakkimda')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-xs uppercase tracking-wider border border-border bg-card hover:bg-muted text-foreground transition-all"
            >
              <Layers className="w-3.5 h-3.5 text-apple-blue" />
              {t('nav.about')}
            </Link>
            <a
              href="mailto:goktugturhan74@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-xs uppercase tracking-wider border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
            >
              {isEn ? 'Contact' : 'İletişim'}
            </a>
          </div>
        </motion.div>

        {/* ── RIGHT: APPLE BENTO FEATURE CARDS ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
          className="lg:col-span-5 space-y-4"
        >
          <div className="flex items-center justify-between px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <span>{isEn ? 'FEATURED PLATFORMS' : 'ÖNE ÇIKAN SİSTEMLER'}</span>
            <span className="flex items-center gap-1 text-[11px] text-apple-green font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-apple-green animate-ping" />
              OPERATIONAL
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {showcaseCards.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.project}
                  href={localizePath(card.href)}
                  className="apple-card p-5 hover:scale-[1.02] active:scale-[0.99] flex flex-col justify-between space-y-4 group"
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-2xl ${card.bg} ${card.border} border flex items-center justify-center ${card.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-mono font-bold ${card.color}`}>
                      {card.metric}
                    </span>
                  </div>

                  <div>
                    <div className="text-[11px] font-medium text-muted-foreground">{card.title}</div>
                    <div className="text-base font-bold text-foreground group-hover:text-apple-blue transition-colors flex items-center gap-1 mt-0.5">
                      {card.project}
                      <ChevronRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-apple-blue" />
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mt-1">
                      {card.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="p-3.5 rounded-2xl border border-border bg-card/60 flex items-center justify-between text-xs font-mono text-muted-foreground">
            <span>41 ARCHIVE NODES</span>
            <span className="text-apple-green font-bold">ALL SYSTEMS VERIFIED</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
