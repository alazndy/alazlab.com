'use client';

import { motion } from 'framer-motion';
import {
  Shield,
  Layers,
  Zap,
  Wrench,
  Terminal,
} from 'lucide-react';
import { Typewriter } from '@/components/ui/Typewriter';
import { SystemTower } from '@/components/ui/SystemTower';
import { useI18n } from '@/lib/i18n';

export default function HakkimdaPage() {
  const { t, lang } = useI18n();

  const directives = lang === 'en' ? [
    { label: 'Security First', desc: 'The real boundary: zero data leakage, zero unauthorized execution — non-negotiable in production systems.', icon: Shield },
    { label: 'Performance is Measured', desc: 'Real measurements over claims — proven through hardware telemetry and benchmark results.', icon: Zap },
    { label: 'Visual Clarity', desc: 'Presenting complex multi-layer systems through intuitive, high-legibility interfaces.', icon: Layers },
  ] : [
    { label: 'Güvenlik Önce', desc: 'Gerçek sınır: veri sızıntısı yok, yetkisiz erişim yok — üretim sistemlerinde ödün verilmez.', icon: Shield },
    { label: 'Performans Ölçülür', desc: 'İddia değil, ölçüm — gerçek benchmark ve telemetri test sonuçlarıyla konuşulur.', icon: Zap },
    { label: 'Görsel Netlik', desc: 'Karmaşık sistemleri anlaşılır arayüzlerle sunmak — süs için değil netlik için.', icon: Layers },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-20 pb-24 px-2 sm:px-4 animate-in fade-in duration-700">

      {/* HERO SECTION */}
      <section className="apple-card relative p-8 sm:p-14 overflow-hidden">
        <div className="space-y-8 max-w-4xl">
          <div className="flex items-center gap-2.5">
            <span className="apple-pill border-orange-500/20 bg-orange-500/10 text-apple-orange font-mono">
              <Shield className="w-3.5 h-3.5" />
              Göktuğ Turhan
            </span>
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              {t('about.dayCompany')} · ADC Tasarım
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.05]">
            {t('about.heroTitle1')}{' '}
            <span className="text-apple-blue">{t('about.heroTitle2')}</span>
          </h1>

          <div className="p-5 rounded-2xl bg-muted/60 border border-border">
            <div className="text-base sm:text-lg text-foreground font-medium leading-relaxed">
              <Typewriter
                key={lang}
                text={t('about.typewriter')}
                speed={20}
                delay={800}
              />
            </div>
          </div>
        </div>
      </section>

      {/* DUAL IDENTITY NARRATIVE */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="apple-card p-8 sm:p-10 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-apple-orange">
              <Wrench className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">{t('about.dayTitle')}</h2>
          </div>
          <p className="text-base text-muted-foreground leading-relaxed">
            {t('about.dayBody')}
          </p>
        </div>

        <div className="apple-card p-8 sm:p-10 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-apple-blue">
              <Terminal className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">{t('about.nightTitle')}</h2>
          </div>
          <p className="text-base text-muted-foreground leading-relaxed">
            {t('about.nightBody')}
          </p>
        </div>
      </section>

      {/* QUOTE BLOCK */}
      <div className="max-w-4xl mx-auto text-center p-8 rounded-3xl bg-muted/40 border border-border/80">
        <p className="text-lg sm:text-xl text-foreground font-medium leading-relaxed">
          &quot;{lang === 'en'
            ? 'The common denominator connecting both: never giving up until the problem is truly solved — whether it is an automotive CAN-bus radar system or the security core of an autonomous AI agent.'
            : 'İkisini bağlayan ortak payda: sorunu gerçekten çözene kadar uğraşmak — ister bir CAN-bus radar sistemi olsun, ister bir AI agent\'ın güvenlik çekirdeği.'}&quot;
        </p>
      </div>

      {/* DIRECTIVES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {directives.map((directive) => {
          const Icon = directive.icon;
          return (
            <div key={directive.label} className="apple-card p-6 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-muted border border-border flex items-center justify-center text-apple-blue">
                <Icon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-base font-bold text-foreground">{directive.label}</div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{directive.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* SYSTEM TOWER */}
      <section className="space-y-8">
        <SystemTower />
      </section>
    </div>
  );
}
