import Link from 'next/link';
import { getAllProjects } from '@/lib/markdown';
import { statusConfig, statusDot } from '@/lib/project-config';
import { Wrench, Cpu, Radio, ShieldCheck, ArrowRight, Layers, Activity } from 'lucide-react';

export async function generateStaticParams() {
  return [{ lang: 'tr' }, { lang: 'en' }];
}

export default async function MuhendislikPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';
  const projects = getAllProjects().filter(p => p.area === 'muhendislik');

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-24 px-2 sm:px-4">
      
      {/* ── HEADER & TELEMETRY HUD ── */}
      <div className="relative p-8 sm:p-12 rounded-3xl border border-lcars-orange/30 bg-card overflow-hidden shadow-2xl">
        <div
          aria-hidden
          className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-lcars-orange/15 blur-3xl pointer-events-none"
        />

        <div className="relative z-10 space-y-6 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-lcars-orange/40 bg-lcars-orange/10 text-lcars-orange font-mono text-xs font-bold uppercase tracking-wider">
              <Wrench className="w-3.5 h-3.5" />
              {isEn ? 'ENGINEERING & EMBEDDED SYSTEMS' : 'MÜHENDİSLİK & GÖMÜLÜ SİSTEMLER'}
            </span>
            <span className="text-[10px] font-mono text-foreground/40 uppercase">ADC TASARIM · 2021-2026</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase text-foreground">
            {isEn ? 'Hardware-Linked' : 'Donanım Bağlantılı'}{' '}
            <span className="text-lcars-orange">{isEn ? 'Field Deployments' : 'Saha Sistemleri'}</span>
          </h1>

          <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
            {isEn
              ? 'Real-world embedded hardware, automotive CAN-bus radar architectures, isolated I/O control units, and mission-critical HMI dashboards deployed in mines, heavy machinery, and defense applications.'
              : 'Maden sahalarında, ağır vasıtalarda ve endüstriyel tesislerde çalışan gömülü donanımlar, CAN-bus radar telemetrileri, izole I/O kontrol üniteleri ve operatör HMI ekranları.'}
          </p>

          {/* Quick Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border/80 text-xs font-mono">
            <div>
              <div className="text-2xl font-black text-lcars-orange">{projects.length}</div>
              <div className="text-foreground/40 uppercase">{isEn ? 'Active Projects' : 'Aktif Proje'}</div>
            </div>
            <div>
              <div className="text-2xl font-black text-foreground">CAN 2.0B / FD</div>
              <div className="text-foreground/40 uppercase">{isEn ? 'Telemetry Protocol' : 'Telemetri Protokolü'}</div>
            </div>
            <div>
              <div className="text-2xl font-black text-lcars-cyan">ESP32 & STM32</div>
              <div className="text-foreground/40 uppercase">{isEn ? 'Core Architectures' : 'Çekirdek Mimari'}</div>
            </div>
            <div>
              <div className="text-2xl font-black text-lcars-green">ISO 16750</div>
              <div className="text-foreground/40 uppercase">{isEn ? 'Automotive Standard' : 'Otomotiv Standardı'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BENTO PROJECT MATRIX ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/${lang}/proje/${p.slug}`}
            className="group relative rounded-3xl border border-border bg-card p-6 hover:border-lcars-orange/50 hover:shadow-xl hover:shadow-lcars-orange/5 transition-all duration-300 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              {/* Image or Icon Preview */}
              {p.image ? (
                <div className="w-full h-44 rounded-2xl overflow-hidden border border-border bg-black">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="w-full h-32 rounded-2xl bg-foreground/5 border border-border flex items-center justify-center text-lcars-orange group-hover:bg-lcars-orange/10 transition-colors">
                  <Cpu className="w-10 h-10" />
                </div>
              )}

              {/* Status & Category */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                  {p.category}
                </span>
                <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border uppercase flex items-center gap-1.5 ${statusConfig[p.status] ?? ''}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${statusDot[p.status] ?? ''}`} />
                  {p.status}
                </span>
              </div>

              {/* Title & Summary */}
              <div className="space-y-1.5">
                <h3 className="text-xl font-black uppercase tracking-tight text-foreground group-hover:text-lcars-orange transition-colors flex items-center justify-between">
                  {p.title}
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-lcars-orange" />
                </h3>
                <p className="text-xs text-foreground/60 leading-relaxed line-clamp-3">
                  {p.summary}
                </p>
              </div>
            </div>

            {/* Tech Stack Pills */}
            {p.techStack && p.techStack.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/60">
                {p.techStack.slice(0, 4).map((tech) => (
                  <span key={tech} className="px-2 py-0.5 rounded-lg text-[10px] font-mono border border-border/80 bg-foreground/[0.02] text-foreground/70">
                    {tech}
                  </span>
                ))}
                {p.techStack.length > 4 && (
                  <span className="px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                    +{p.techStack.length - 4}
                  </span>
                )}
              </div>
            )}
          </Link>
        ))}
      </div>

    </div>
  );
}
