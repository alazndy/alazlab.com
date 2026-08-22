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

const PROFILE_IMAGE = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070";

export default function HakkimdaPage() {
  const { t, lang } = useI18n();

  const directives = lang === 'en' ? [
    { label: 'Security First', desc: 'The real boundary: no data leaks, no unauthorized access — non-negotiable in production systems.', icon: Shield },
    { label: 'Performance is Measured', desc: 'Real measurements over claims — proven through real benchmarks and test results.', icon: Zap },
    { label: 'Visual Clarity', desc: 'Presenting complex systems through intuitive interfaces — designed for clarity, not decoration.', icon: Layers },
  ] : [
    { label: 'Güvenlik Önce', desc: 'Gerçek sınır: veri sızıntısı yok, yetkisiz erişim yok — üretim sistemlerinde ödün verilmez.', icon: Shield },
    { label: 'Performans Ölçülür', desc: 'İddia değil, ölçüm — gerçek benchmark ve gerçek test sonuçlarıyla konuşulur.', icon: Zap },
    { label: 'Görsel Netlik', desc: 'Karmaşık sistemleri anlaşılır arayüzlerle sunmak, süs için değil netlik için.', icon: Layers },
  ];

  return (
    <div className="max-w-[1600px] mx-auto space-y-32 pb-32 animate-in fade-in duration-1000">

      {/*  HERO: dual identity  */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden glass rounded-[64px] border-border">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#030305]/40 z-10" />
          <img
            src={PROFILE_IMAGE}
            alt=""
            className="w-full h-full object-cover grayscale brightness-[0.2]"
          />
          <div className="absolute inset-y-0 left-0 w-full lg:w-3/5 overflow-hidden hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#030305] to-[#030305] z-10" />
            <img
              src={PROFILE_IMAGE}
              alt="Göktuğ Turhan"
              className="w-full h-full object-cover grayscale-[0.8] opacity-80 scale-105 origin-left"
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-16 relative z-10 w-full py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="hidden lg:block lg:col-span-5 relative h-full">
              <div className="absolute top-1/2 left-0 -translate-y-1/2 p-6 glass border-lcars-orange/30 rounded-2xl rotate-[-5deg]">
                <Wrench className="w-12 h-12 text-lcars-orange opacity-40 mb-3" />
                <div className="text-[10px] font-mono text-lcars-orange font-black uppercase tracking-widest">{t('about.dayTag')}</div>
                <div className="text-xs font-mono text-foreground/40 uppercase mt-1">{t('about.dayCompany')}</div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-12"
            >
              <div className="space-y-8">
                <div className="inline-flex items-center gap-4 px-5 py-2 rounded-sm bg-lcars-orange text-black font-black text-[11px] tracking-[0.4em] uppercase shadow-[0_0_25px_rgba(255,153,0,0.2)]">
                  <Shield className="w-4 h-4" />
                  Göktuğ Turhan
                </div>

                <h1 className="text-6xl md:text-[100px] font-black tracking-[calc(-0.08em)] text-foreground uppercase leading-[0.8]">
                  {t('about.heroTitle1')} <br/>
                  <span className="text-lcars-cyan">{t('about.heroTitle2')}</span>
                </h1>

                <div className="relative group">
                  <div className="absolute -left-8 top-0 bottom-0 w-1 bg-lcars-cyan shadow-[0_0_15px_#00ccff] rounded-full" />
                  <div className="text-xl md:text-2xl text-foreground/80 leading-[1.3] font-bold tracking-tight">
                    <Typewriter
                      key={lang}
                      text={t('about.typewriter')}
                      speed={20}
                      delay={1200}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/*  DUAL IDENTITY NARRATIVE  */}
      <section className="relative overflow-hidden px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="p-10 glass rounded-[32px] border-border space-y-6">
            <div className="flex items-center gap-3">
              <Wrench className="w-6 h-6 text-lcars-orange" />
              <h2 className="text-2xl font-black uppercase tracking-tight">{t('about.dayTitle')}</h2>
            </div>
            <p className="text-foreground/60 leading-relaxed">
              {t('about.dayBody')}
            </p>
          </div>
          <div className="p-10 glass rounded-[32px] border-border space-y-6">
            <div className="flex items-center gap-3">
              <Terminal className="w-6 h-6 text-lcars-cyan" />
              <h2 className="text-2xl font-black uppercase tracking-tight">{t('about.nightTitle')}</h2>
            </div>
            <p className="text-foreground/60 leading-relaxed">
              {t('about.nightBody')}
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-16 text-center">
          <p className="text-2xl text-foreground/80 font-medium italic">
            &quot;{lang === 'en'
              ? 'The common denominator connecting both: never giving up until the problem is truly solved — whether it is a CAN-bus radar system or a security core of an AI agent.'
              : 'İkisini bağlayan ortak payda: sorunu gerçekten çözene kadar uğraşmak — ister bir CAN-bus radar sistemi olsun, ister bir AI agent\'ın güvenlik çekirdeği.'}&quot;
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6 mt-16">
          {directives.map((directive) => (
            <div key={directive.label} className="p-8 glass rounded-[32px] border-border flex gap-8 items-center group hover:border-lcars-cyan/30 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-foreground/5 flex items-center justify-center border border-border group-hover:bg-lcars-cyan/10">
                <directive.icon className="w-8 h-8 text-foreground/40 group-hover:text-lcars-cyan" />
              </div>
              <div>
                <div className="text-[11px] font-black font-mono text-lcars-cyan tracking-[0.2em] uppercase">{directive.label}</div>
                <p className="text-sm text-foreground/40 font-medium">{directive.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/*  SYSTEM TOWER  */}
      <section className="space-y-16 px-4">
        <SystemTower />
      </section>
    </div>
  );
}
