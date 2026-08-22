import Link from 'next/link';
import { getAllProjects } from '@/lib/markdown';
import { statusConfig, statusDot } from '@/lib/project-config';
import { Wrench, Cpu, ArrowRight } from 'lucide-react';

export async function generateStaticParams() {
  return [{ lang: 'tr' }, { lang: 'en' }];
}

export default async function MuhendislikPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';
  const projects = getAllProjects().filter(p => p.area === 'muhendislik');

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-24 px-2 sm:px-4">

      {/* APPLE HEADER & HERO */}
      <div className="apple-card relative p-8 sm:p-12 overflow-hidden">
        <div
          aria-hidden
          className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-orange-500/10 blur-3xl pointer-events-none"
        />

        <div className="relative z-10 space-y-6 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="apple-pill border-orange-500/20 bg-orange-500/10 text-apple-orange font-mono">
              <Wrench className="w-3.5 h-3.5" />
              {isEn ? 'ENGINEERING & EMBEDDED SYSTEMS' : 'MÜHENDİSLİK & GÖMÜLÜ SİSTEMLER'}
            </span>
            <span className="text-xs font-mono text-muted-foreground">ADC TASARIM · 2021-2026</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.05]">
            {isEn ? 'Hardware-Linked' : 'Donanım Bağlantılı'}{' '}
            <span className="text-apple-orange">{isEn ? 'Field Deployments' : 'Saha Sistemleri'}</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-normal">
            {isEn
              ? 'Real-world embedded hardware, automotive CAN-bus radar architectures, isolated I/O control units, and mission-critical HMI dashboards deployed in mines, heavy machinery, and defense applications.'
              : 'Maden sahalarında, ağır vasıtalarda ve endüstriyel tesislerde çalışan gömülü donanımlar, CAN-bus radar telemetrileri, izole I/O kontrol üniteleri ve operatör HMI ekranları.'}
          </p>

          {/* Quick Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border text-xs">
            <div>
              <div className="text-2xl font-extrabold text-apple-orange">{projects.length}</div>
              <div className="text-muted-foreground uppercase tracking-wider">{isEn ? 'Active Projects' : 'Aktif Proje'}</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-foreground">CAN 2.0B / FD</div>
              <div className="text-muted-foreground uppercase tracking-wider">{isEn ? 'Telemetry Protocol' : 'Telemetri Protokolü'}</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-apple-blue">ESP32 & STM32</div>
              <div className="text-muted-foreground uppercase tracking-wider">{isEn ? 'Core Architectures' : 'Çekirdek Mimari'}</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-apple-green">ISO 16750</div>
              <div className="text-muted-foreground uppercase tracking-wider">{isEn ? 'Automotive Standard' : 'Otomotiv Standardı'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* APPLE BENTO PROJECT MATRIX */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/${lang}/proje/${p.slug}`}
            className="apple-card p-6 flex flex-col justify-between space-y-6 group"
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
                <div className="w-full h-32 rounded-2xl bg-muted border border-border flex items-center justify-center text-apple-orange group-hover:bg-orange-500/10 transition-colors">
                  <Cpu className="w-8 h-8" />
                </div>
              )}

              {/* Status & Category */}
              <div className="flex items-center justify-between">
                <span className="apple-pill text-[10px] font-mono text-muted-foreground">
                  {p.category}
                </span>
                <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border uppercase flex items-center gap-1.5 ${statusConfig[p.status] ?? ''}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${statusDot[p.status] ?? ''}`} />
                  {p.status}
                </span>
              </div>

              {/* Title & Summary */}
              <div className="space-y-1.5">
                <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-apple-orange transition-colors flex items-center justify-between">
                  {p.title}
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-apple-orange" />
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {p.summary}
                </p>
              </div>
            </div>

            {/* Tech Stack Pills */}
            {p.techStack && p.techStack.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border">
                {p.techStack.slice(0, 4).map((tech) => (
                  <span key={tech} className="apple-pill text-[10px] font-mono">
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
