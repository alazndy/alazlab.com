'use client';

import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Layers,
  Zap,
  Shield,
  Wrench,
  Terminal,
} from 'lucide-react';
import { Typewriter } from '@/components/ui/Typewriter';
import { SystemTower } from '@/components/ui/SystemTower';

const PROFILE_IMAGE = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070";

export default function HakkimdaPage() {
  return (
    <div className="max-w-[1600px] mx-auto space-y-32 pb-32 animate-in fade-in duration-1000">

      {/* ── HERO: dual identity ── */}
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
                <div className="text-[10px] font-mono text-lcars-orange font-black uppercase tracking-widest">Gündüz</div>
                <div className="text-xs font-mono text-foreground/40 uppercase mt-1">ADC Tasarım — Sahada</div>
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
                  İki hayat, <br/>
                  <span className="text-lcars-cyan">tek prensip.</span>
                </h1>

                <div className="relative group">
                  <div className="absolute -left-8 top-0 bottom-0 w-1 bg-lcars-cyan shadow-[0_0_15px_#00ccff] rounded-full" />
                  <div className="text-xl md:text-2xl text-foreground/80 leading-[1.3] font-bold tracking-tight">
                    <Typewriter
                      text="Gündüz sahada gerçek donanımla, gece kendi yazılım ekosistemimle — ikisinde de sorunu gerçekten çözene kadar uğraşıyorum."
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

      {/* ── DUAL IDENTITY NARRATIVE ── */}
      <section className="relative overflow-hidden px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="p-10 glass rounded-[32px] border-border space-y-6">
            <div className="flex items-center gap-3">
              <Wrench className="w-6 h-6 text-lcars-orange" />
              <h2 className="text-2xl font-black uppercase tracking-tight">Gündüz: Sahada</h2>
            </div>
            <p className="text-foreground/60 leading-relaxed">
              ADC Tasarım&apos;da sahada çalışan bir endüstriyel donanım/gömülü sistem mühendisiyim —
              kod masada kalmıyor, gerçek araçlara, gerçek madenlere, gerçek sınır kapılarına gidiyor.
              UniControl&apos;den saha kurulumları, Guardian Glass&apos;ın Mısır&apos;daki forklift filosu için
              çarpışma önleme sistemi bunlardan biri.
            </p>
          </div>
          <div className="p-10 glass rounded-[32px] border-border space-y-6">
            <div className="flex items-center gap-3">
              <Terminal className="w-6 h-6 text-lcars-cyan" />
              <h2 className="text-2xl font-black uppercase tracking-tight">Gece: Lab&apos;da</h2>
            </div>
            <p className="text-foreground/60 leading-relaxed">
              Kendi AI-agent&apos;lı yazılım ekosistemimi kuran bağımsız bir geliştiriciyim —
              R-AI-OS, GT-Launcher, GT-UI gibi projelerle kendi araçlarımı, kendi işletim
              katmanımı inşa ediyorum.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-16 text-center">
          <p className="text-2xl text-foreground/80 font-medium italic">
            &quot;İkisini bağlayan ortak payda: sorunu gerçekten çözene kadar uğraşmak —
            ister bir CAN-bus radar sistemi olsun, ister bir AI agent&apos;ın güvenlik çekirdeği.&quot;
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6 mt-16">
          {[
            { label: 'Güvenlik Önce', desc: 'Gerçek sınır: veri sızıntısı yok, yetkisiz erişim yok — üretim sistemlerinde ödün verilmez.', icon: Shield },
            { label: 'Performans Ölçülür', desc: 'İddia değil, ölçüm — gerçek benchmark ve gerçek test sonuçlarıyla konuşulur.', icon: Zap },
            { label: 'Görsel Netlik', desc: 'Karmaşık sistemleri anlaşılır arayüzlerle sunmak, süs için değil netlik için.', icon: Layers },
          ].map((directive) => (
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

      {/* ── SYSTEM TOWER (kept — visual language, not roleplay copy) ── */}
      <section className="space-y-16 px-4">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 px-12">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-foreground leading-none">
              Nasıl Çalışıyorum
            </h2>
          </div>
        </div>
        <div className="w-full glass rounded-[64px] border-border overflow-visible bg-gradient-to-br from-white/[0.02] to-transparent min-h-[900px] flex items-center justify-center relative shadow-[0_0_100px_rgba(0,0,0,0.5)]">
          <SystemTower />
        </div>
      </section>

      <footer className="flex items-center justify-between px-16 opacity-30 border-t border-border pt-12">
        <div className="flex items-center gap-3 text-[12px] font-mono font-black tracking-[0.3em] uppercase">
          <ShieldCheck className="w-4 h-4 text-lcars-cyan" />
          <span className="text-foreground/40">Göktuğ Turhan</span>
        </div>
        <div className="text-[10px] font-mono text-lcars-orange uppercase tracking-widest">alazlab.com</div>
      </footer>
    </div>
  );
}
