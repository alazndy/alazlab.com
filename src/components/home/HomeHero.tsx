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
  Activity,
  Layers,
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
    { value: projectCount,  suffix: '',  label: t('stats.projects'), color: 'text-lcars-orange' },
    { value: liveCount,     suffix: '',  label: t('stats.active'),   color: 'text-lcars-cyan'   },
    { value: categoryCount, suffix: '',  label: t('stats.areas'),    color: 'text-lcars-gold'   },
    { value: 5,             suffix: '+', label: t('stats.years'),    color: 'text-lcars-green'  },
  ];

  const telemetryNodes = [
    {
      title: isEn ? 'Automotive ECU & Radar' : 'Otomotiv ECU & Radar',
      project: 'UniControl V2',
      metric: 'CAN 2.0B · ESP32-S3',
      desc: isEn ? 'Industrial vehicle safety & brigade radar control unit.' : 'Ağır vasıta güvenlik kontrolcüsü ve radar telemetrisi.',
      icon: Cpu,
      accent: 'text-lcars-orange',
      border: 'border-lcars-orange/30',
      bg: 'bg-lcars-orange/10',
      href: '/proje/UniControl',
    },
    {
      title: isEn ? 'Modular UI Launcher' : 'Modüler Android Başlatıcı',
      project: 'GT-Launcher',
      metric: '22 Demos · LCARS Engine',
      desc: isEn ? 'Star Trek-inspired widget & card builder ecosystem.' : 'Star Trek temalı modüler kart ve vitrin ekosistemi.',
      icon: Smartphone,
      accent: 'text-lcars-cyan',
      border: 'border-lcars-cyan/30',
      bg: 'bg-lcars-cyan/10',
      href: '/proje/GT-Launcher',
    },
    {
      title: isEn ? 'Autonomous AI Kernel' : 'Otonom AI Çekirdeği',
      project: 'R-AI-OS',
      metric: 'Rust · Tokio Async',
      desc: isEn ? 'Local vector intelligence & secure agent runtime.' : 'Yerel vektör zekası ve güvenli agent çalışma ortamı.',
      icon: Terminal,
      accent: 'text-lcars-green',
      border: 'border-lcars-green/30',
      bg: 'bg-lcars-green/10',
      href: '/proje/R-AI-OS',
    },
    {
      title: isEn ? 'Browser Productivity' : 'Tarayıcı Verimlilik Üssü',
      project: 'GTab Chrome',
      metric: 'v4.3.0 · Web Store',
      desc: isEn ? 'Modular new tab with Google Tasks & Calendar sync.' : 'Google servisleri entegre modüler yeni sekme uzantısı.',
      icon: Globe2,
      accent: 'text-lcars-gold',
      border: 'border-lcars-gold/30',
      bg: 'bg-lcars-gold/10',
      href: '/gtab',
    },
  ];

  return (
    <section className="relative pt-6 pb-12 md:pt-10 md:pb-16 overflow-hidden">

      {/* Ambient background glows */}
      <div
        aria-hidden
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)' }}
      />
      <div
        aria-hidden
        className="absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(0,204,255,0.15) 0%, transparent 70%)' }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

        {/* ── LEFT COLUMN: MAIN ARCHITECT PROFILE ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7 space-y-8"
        >
          {/* Status pill & availability */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-foreground/[0.02] text-[11px] font-mono text-foreground/70">
              <span className="w-2 h-2 rounded-full bg-lcars-green animate-pulse" />
              {t('header.available')}
              <MapPin className="w-3 h-3 text-foreground/40" />
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-lcars-cyan/20 bg-lcars-cyan/5 text-[10px] font-mono text-lcars-cyan uppercase tracking-wider">
              <ShieldCheck className="w-3 h-3" />
              System Architect v5.2
            </span>
          </div>

          {/* Name & LCARS Accent */}
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="w-2.5 h-16 sm:h-20 bg-lcars-orange rounded-full shrink-0 shadow-[0_0_20px_rgba(255,153,0,0.5)]" />
              <div>
                <h1
                  className="font-black tracking-tighter uppercase leading-[0.85] text-foreground"
                  style={{ fontSize: 'clamp(2.8rem, 7vw, 5.8rem)' }}
                >
                  Göktuğ
                </h1>
                <h1
                  className="font-black tracking-tighter uppercase leading-[0.85] text-lcars-orange"
                  style={{ fontSize: 'clamp(2.8rem, 7vw, 5.8rem)' }}
                >
                  Turhan
                </h1>
              </div>
            </div>

            {/* Discipline Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                { label: 'Embedded ECU', color: 'border-lcars-orange/30 text-lcars-orange bg-lcars-orange/5' },
                { label: 'CAN-Bus 2.0B / FD', color: 'border-amber-500/30 text-amber-400 bg-amber-500/5' },
                { label: 'AI Agent Kernel', color: 'border-lcars-green/30 text-lcars-green bg-lcars-green/5' },
                { label: 'Full-Stack Next.js', color: 'border-lcars-cyan/30 text-lcars-cyan bg-lcars-cyan/5' },
                { label: 'Android Launcher', color: 'border-purple-500/30 text-purple-400 bg-purple-500/5' },
              ].map((b) => (
                <span
                  key={b.label}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider border ${b.color}`}
                >
                  {b.label}
                </span>
              ))}
            </div>
          </div>

          {/* Bio statement */}
          <p className="text-sm sm:text-base text-foreground/70 leading-relaxed max-w-xl">
            {t('hero.bio')}
          </p>

          {/* Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl border border-border bg-foreground/[0.02]">
            {stats.map(({ value, suffix, label, color }) => (
              <div key={label} className="space-y-1">
                <div className={`text-2xl sm:text-3xl font-black font-mono tracking-tight ${color}`}>
                  {value}{suffix}
                </div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-foreground/40">
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="#projects"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold font-mono text-xs uppercase tracking-wider transition-all bg-lcars-orange text-black hover:bg-white shadow-[0_0_25px_rgba(255,153,0,0.3)] hover:scale-105 active:scale-100"
            >
              <Zap className="w-4 h-4" />
              {t('hero.explore')}
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href={localizePath('/hakkimda')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold font-mono text-xs uppercase tracking-wider border border-border bg-foreground/5 hover:bg-foreground/10 text-foreground transition-all"
            >
              <Layers className="w-4 h-4 text-lcars-cyan" />
              {t('nav.about')}
            </Link>
            <a
              href="mailto:goktugturhan74@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold font-mono text-xs uppercase tracking-wider border border-border hover:border-foreground/30 text-foreground/60 hover:text-foreground transition-all"
            >
              {isEn ? 'Contact' : 'İletişim'}
            </a>
          </div>
        </motion.div>

        {/* ── RIGHT COLUMN: ACTIVE TELEMETRY & SYSTEM RADAR ── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="lg:col-span-5 space-y-4"
        >
          {/* Header of Cockpit */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-lcars-cyan">
              <Activity className="w-4 h-4 animate-pulse" />
              <span>{isEn ? 'SYSTEM ARCHITECTURE MATRIX' : 'SİSTEM MİMARİSİ MATRİSİ'}</span>
            </div>
            <span className="text-[10px] font-mono text-lcars-green uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-lcars-green animate-ping" />
              ONLINE
            </span>
          </div>

          {/* 4 Interactive Discipline Bento Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {telemetryNodes.map((node) => {
              const Icon = node.icon;
              return (
                <Link
                  key={node.project}
                  href={localizePath(node.href)}
                  className={`group p-4 rounded-2xl border ${node.border} bg-foreground/[0.02] hover:bg-foreground/[0.05] transition-all hover:scale-[1.02] active:scale-[0.99] flex flex-col justify-between space-y-3`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-9 h-9 rounded-xl ${node.bg} flex items-center justify-center ${node.accent} border ${node.border}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] font-mono font-bold uppercase ${node.accent}`}>
                      {node.metric}
                    </span>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono text-foreground/40 uppercase tracking-wider">{node.title}</div>
                    <div className="text-sm font-black text-foreground group-hover:text-lcars-cyan transition-colors uppercase tracking-tight flex items-center gap-1.5 mt-0.5">
                      {node.project}
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-lcars-cyan" />
                    </div>
                    <p className="text-[11px] text-foreground/50 leading-relaxed line-clamp-2 mt-1">
                      {node.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Status Line */}
          <div className="p-3 rounded-xl border border-white/8 bg-white/[0.01] flex items-center justify-between text-[10px] font-mono text-foreground/40 uppercase">
            <span>NODES: 41 ACTIVE</span>
            <span>STACK: TURBOPACK · SSG 98</span>
            <span className="text-lcars-green">INTEGRITY 100%</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
