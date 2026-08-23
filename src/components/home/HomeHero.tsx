'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Cpu,
  Terminal,
  Smartphone,
  Globe2,
  ChevronRight,
  Code2,
  Layers,
  Send,
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

  const flagshipProjects = [
    {
      title: isEn ? 'Industrial Radar ECU' : 'Endüstriyel Radar ECU',
      name: 'UniControl V2',
      badge: 'CAN 2.0B / FD · ESP32-S3',
      desc: isEn 
        ? 'Heavy vehicle safety controller integrated with Brigade BS-9000 radar sensors.' 
        : 'Brigade BS-9000 radar sensörleriyle entegre çalışan ağır vasıta güvenlik kontrol ünitesi.',
      icon: Cpu,
      color: 'text-apple-orange',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/20',
      href: '/proje/UniControl',
    },
    {
      title: isEn ? 'Modular Android Launcher' : 'Modüler Android Başlatıcı',
      name: 'GT-Launcher',
      badge: 'Kotlin · Jetpack Compose',
      desc: isEn 
        ? 'Modular home screen launcher with custom widgets and high-performance local indexing.' 
        : 'Özelleştirilebilir widget mimarisi ve yerel uygulama indeksleme motoru içeren Android başlatıcı.',
      icon: Smartphone,
      color: 'text-apple-blue',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      href: '/proje/GT-Launcher',
    },
    {
      title: isEn ? 'Local CLI Tool Engine' : 'Yerel CLI Araç Motoru',
      name: 'R-AI-OS',
      badge: 'Rust · Tokio · SQLite',
      desc: isEn 
        ? 'Lightweight local command line tool runner and asynchronous task orchestrator.' 
        : 'Hafif ve hızlı yerel komut satırı araç çalıştırıcısı ve asenkron görev yöneticisi.',
      icon: Terminal,
      color: 'text-apple-green',
      bg: 'bg-green-500/10',
      border: 'border-green-500/20',
      href: '/proje/R-AI-OS',
    },
    {
      title: isEn ? 'Productivity New Tab' : 'Yeni Sekme Verimlilik Aracı',
      name: 'GTab',
      badge: 'Chrome API · Google Tasks',
      desc: isEn 
        ? 'Privacy-first modular new-tab extension with offline-first local state storage.' 
        : 'Yerel depolama mimarisi ve Google Görevler entegrasyonu sunan Chrome uzantısı.',
      icon: Globe2,
      color: 'text-apple-purple',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
      href: '/gtab',
    },
  ];

  return (
    <section className="relative pt-6 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

        {/* ── LEFT: AUTHENTIC ENGINEER INTRO ── */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
              Göktuğ Turhan
            </h1>
            <p className="text-lg sm:text-xl font-semibold text-apple-orange">
              {t('hero.role')}
            </p>
          </div>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl font-normal">
            {t('hero.bio')}
          </p>

          {/* Real Tech Focus Tags */}
          <div className="flex flex-wrap gap-2 pt-1">
            {[
              'ESP32-S3',
              'CAN 2.0B / FD',
              'ISO 16750',
              'Kotlin & Compose',
              'Rust & Tokio',
              'Next.js & TypeScript',
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg text-xs font-mono bg-muted text-foreground/80 border border-border"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Genuine Stat Blocks */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl border border-border bg-card">
            {stats.map(({ value, suffix, label, color }) => (
              <div key={label} className="space-y-0.5">
                <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${color}`}>
                  {value}{suffix}
                </div>
                <div className="text-[11px] font-medium text-muted-foreground">
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider bg-foreground text-background hover:opacity-90 active:scale-95 transition-all"
            >
              <Code2 className="w-4 h-4" />
              {t('hero.explore')}
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <Link
              href={localizePath('/hakkimda')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider border border-border bg-card hover:bg-muted text-foreground transition-all"
            >
              <Layers className="w-3.5 h-3.5 text-apple-blue" />
              {t('nav.about')}
            </Link>
            <a
              href="mailto:goktugturhan74@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              {isEn ? 'Contact' : 'İletişim'}
            </a>
          </div>

        </div>

        {/* ── RIGHT: FLAGSHIP SYSTEMS SHOWCASE ── */}
        <div className="lg:col-span-5 space-y-3.5">
          <div className="px-1 text-xs font-bold text-muted-foreground uppercase tracking-wider">
            {isEn ? 'Selected Flagship Projects' : 'Öne Çıkan Projeler'}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {flagshipProjects.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.name}
                  href={localizePath(card.href)}
                  className="apple-card p-4.5 hover:scale-[1.01] active:scale-[0.99] flex flex-col justify-between space-y-3 group"
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-9 h-9 rounded-xl ${card.bg} ${card.border} border flex items-center justify-center ${card.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded border border-border/60">
                      {card.badge.split('·')[0].trim()}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[11px] font-medium text-muted-foreground">{card.title}</div>
                    <div className="text-sm font-bold text-foreground group-hover:text-apple-blue transition-colors flex items-center justify-between">
                      {card.name}
                      <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-apple-blue group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {card.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
