'use client';

import { memo } from 'react';
import { Activity, Globe, ChevronRight, Lock } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';

export const HomeWidgets = memo(function HomeWidgets() {
  const { t } = useI18n();
  
  return (
    <aside className="xl:col-span-4 space-y-6 sticky top-10">
      {/* Identity */}
      <div className="glass rounded-2xl p-6 border-border">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 rounded-xl bg-lcars-orange/10 flex items-center justify-center border border-lcars-orange/20">
            <Lock className="w-5 h-5 text-lcars-orange" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-lcars-orange tracking-widest uppercase">Doğrulanmış</div>
            <h3 className="text-base font-black text-foreground uppercase tracking-tight">Göktuğ Turhan</h3>
          </div>
        </div>
        <p className="text-xs text-foreground/60 leading-relaxed">
          {t('home.subtitle')}
        </p>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="p-2.5 bg-foreground/5 rounded-lg text-center">
            <div className="text-[9px] font-mono text-foreground/40 uppercase mb-1">Gündüz</div>
            <div className="text-xs font-black text-lcars-orange">ADC Tasarım</div>
          </div>
          <div className="p-2.5 bg-foreground/5 rounded-lg text-center">
            <div className="text-[9px] font-mono text-foreground/40 uppercase mb-1">Gece</div>
            <div className="text-xs font-black text-lcars-cyan">Alaz Lab</div>
          </div>
        </div>
      </div>

      {/* Areas */}
      <div className="glass rounded-2xl p-6 border-border">
        <div className="flex items-center gap-2 mb-5">
          <Activity className="w-4 h-4 text-lcars-cyan" />
          <span className="text-xs font-black text-foreground/50 uppercase tracking-widest">Uzmanlık Alanları</span>
        </div>
        <div className="space-y-4">
          {[
            { label: 'Gömülü Sistemler & ESP32 / CAN-Bus', color: 'text-lcars-orange' },
            { label: 'Full-Stack Web & Next.js', color: 'text-lcars-cyan' },
            { label: 'AI Agent Altyapıları & Rust', color: 'text-lcars-green' },
            { label: 'Mobil & UI/UX Tasarım Sistemleri', color: 'text-lcars-purple' },
          ].map(m => (
            <div key={m.label} className="flex items-center gap-2 text-xs">
              <span className={cn("w-1.5 h-1.5 rounded-full bg-current", m.color)} />
              <span className="text-foreground/70 font-medium">{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Projects */}
      <div className="glass rounded-2xl p-6 border-border">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-4 h-4 text-lcars-gold" />
          <span className="text-xs font-black text-foreground/50 uppercase tracking-widest">Öne Çıkanlar</span>
        </div>
        <div className="space-y-2">
          {[
            { name: 'GTab', cat: 'Verimlilik', href: '/gtab' },
            { name: 'UniControl', cat: 'Mühendislik', href: '/proje/UniControl' },
            { name: 'R-AI-OS', cat: 'Lab', href: '/proje/R-AI-OS' },
            { name: 'GT-Launcher', cat: 'Mobil', href: '/proje/GT-Launcher' },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-foreground/5 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-lcars-green" />
                <div>
                  <div className="text-sm font-semibold text-foreground/70 group-hover:text-foreground transition-colors">{item.name}</div>
                  <div className="text-[10px] font-mono text-foreground/40">{item.cat}</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-foreground/20 group-hover:text-foreground/60 transition-all group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
});
