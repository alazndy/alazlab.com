'use client';

import Link from 'next/link';
import { Wrench, Terminal, ArrowRight } from 'lucide-react';
import type { ProjectMetadata } from '@/lib/markdown';

interface TrackDoorsProps {
  projects: ProjectMetadata[];
}

export function TrackDoors({ projects }: TrackDoorsProps) {
  const muhendislikProjects = projects.filter(p => p.area === 'muhendislik');
  const labProjects = projects.filter(p => p.area === 'lab');

  return (
    <section className="space-y-4 pt-2">
      <div className="flex items-center gap-4">
        <h2 className="text-[10px] font-black font-mono uppercase tracking-[0.25em] text-muted-foreground">
          Ana Odaklar
        </h2>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Mühendislik Kapısı */}
        <Link
          href="/muhendislik"
          className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-8 hover:border-lcars-orange/50 transition-all duration-300 hover:shadow-xl hover:shadow-lcars-orange/5 flex flex-col justify-between space-y-6"
        >
          <div
            aria-hidden
            className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-lcars-orange/10 blur-3xl pointer-events-none group-hover:bg-lcars-orange/20 transition-all"
          />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-lcars-orange/10 border border-lcars-orange/30 flex items-center justify-center text-lcars-orange group-hover:scale-110 transition-transform">
                <Wrench className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-lcars-orange px-3 py-1 rounded-full bg-lcars-orange/10 border border-lcars-orange/20">
                {muhendislikProjects.length} Proje
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black uppercase tracking-tight text-foreground group-hover:text-lcars-orange transition-colors flex items-center gap-2">
                Mühendislik
                <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </h3>
              <p className="text-xs sm:text-sm text-foreground/60 leading-relaxed">
                ADC Tasarım bünyesinde, gerçek donanıma bağlı, madenlerde ve ağır vasıtalarda sahada çalışan gömülü sistemler, CAN-bus radar ve HMI kontrol üniteleri.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2 border-t border-border/60">
            {['UniControl', 'RCPS', 'VCT', 'UCC APP'].map((badge) => (
              <span
                key={badge}
                className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-foreground/5 text-foreground/70 border border-border group-hover:border-lcars-orange/30 transition-colors"
              >
                {badge}
              </span>
            ))}
          </div>
        </Link>

        {/* Lab Kapısı */}
        <Link
          href="/lab"
          className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-8 hover:border-lcars-cyan/50 transition-all duration-300 hover:shadow-xl hover:shadow-lcars-cyan/5 flex flex-col justify-between space-y-6"
        >
          <div
            aria-hidden
            className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-lcars-cyan/10 blur-3xl pointer-events-none group-hover:bg-lcars-cyan/20 transition-all"
          />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-lcars-cyan/10 border border-lcars-cyan/30 flex items-center justify-center text-lcars-cyan group-hover:scale-110 transition-transform">
                <Terminal className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-lcars-cyan px-3 py-1 rounded-full bg-lcars-cyan/10 border border-lcars-cyan/20">
                {labProjects.length} Proje
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black uppercase tracking-tight text-foreground group-hover:text-lcars-cyan transition-colors flex items-center gap-2">
                Lab
                <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </h3>
              <p className="text-xs sm:text-sm text-foreground/60 leading-relaxed">
                Kişisel zamanda AI ajanlarıyla birlikte geliştirilen otonom yazılım ekosistemi: Rust kernel, Android launcher, npm tasarım sistemi ve üretkenlik araçları.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2 border-t border-border/60">
            {['R-AI-OS', 'GT-Launcher', 'GT-UI', 'GTab'].map((badge) => (
              <span
                key={badge}
                className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-foreground/5 text-foreground/70 border border-border group-hover:border-lcars-cyan/30 transition-colors"
              >
                {badge}
              </span>
            ))}
          </div>
        </Link>
      </div>
    </section>
  );
}
