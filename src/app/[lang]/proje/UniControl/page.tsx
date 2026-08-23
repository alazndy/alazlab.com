import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Cpu, Activity, ShieldAlert, Cpu as Microchip, TableProperties, Wrench } from 'lucide-react';
import { getProjectBySlug } from '@/lib/markdown';
import { marked } from 'marked';
import { ProjectResourceSections } from '@/components/projects/ProjectResourceSections';

export async function generateStaticParams() {
  return [{ lang: 'tr' }, { lang: 'en' }];
}

export default async function UniControlPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';
  const project = getProjectBySlug('UniControl');
  const contentHtml = await marked.parse(project?.content || '');

  return (
    <div className="min-h-screen pb-24 animate-in fade-in duration-700 space-y-12">

      {/* HERO */}
      <div className="relative pt-12 pb-12 px-4 sm:px-6 overflow-hidden apple-card">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-6 text-center flex flex-col items-center">
          <Link href={`/${lang}`} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/60 hover:bg-muted border border-border text-xs font-mono tracking-wider uppercase text-muted-foreground hover:text-foreground transition-all">
            <ArrowLeft className="w-3.5 h-3.5" />
            {isEn ? 'Back to Hub' : 'Ana Sayfaya Dön'}
          </Link>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full font-mono text-xs uppercase tracking-widest text-apple-orange font-bold">
              <Microchip className="w-3.5 h-3.5" />
              Embedded Hardware
            </div>

            <h1 className="text-5xl sm:text-7xl font-extrabold uppercase tracking-tight text-foreground">UniControl</h1>
            
            <p className="text-base sm:text-xl text-muted-foreground font-normal leading-relaxed max-w-2xl">
              {isEn 
                ? 'ESP32-S3 powered vehicle safety & industrial radar telemetry unit deployed on heavy machinery.'
                : 'ESP32-S3 tabanlı gelişmiş araç güvenlik ve kontrol sistemi. Ağır vasıtalar ve endüstriyel sahalar için Brigade Radar destekli bütünleşik donanım mimarisi.'}
            </p>
          </div>

          {/* Project Cover Image */}
          {project?.metadata?.image && (
            <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden border border-border mt-6 shadow-xl">
              <img
                src={project.metadata.image}
                alt={project.metadata.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
            </div>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12 relative z-10">

        {/* SCHEMATIC & TELEMETRY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="apple-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-apple-orange">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground uppercase">{isEn ? 'Hardware Core' : 'Donanım Çekirdeği'}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              ESP32-S3 dual-core LX7 microcontroller, isolated optocoupler inputs, and ruggedized power regulation designed for 24V vehicle power networks.
            </p>
          </div>

          <div className="apple-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-apple-blue">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground uppercase">{isEn ? 'CAN Radar Bus' : 'CAN Radar Hattı'}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Real-time integration with Brigade BS-9000 radar sensors over CAN 2.0B / FD protocol at 250 kbps, providing sub-millisecond obstacle telemetry.
            </p>
          </div>

          <div className="apple-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-apple-green">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground uppercase">{isEn ? 'Field Deployment' : 'Saha Dayanımı'}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Tested under ISO 16750 automotive vibration and environmental standards, operating continuously in harsh mining conditions.
            </p>
          </div>
        </div>

        {/* DYNAMIC MARKDOWN CONTENT */}
        <div className="apple-card p-6 sm:p-10">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>

        {project && <ProjectResourceSections project={project.metadata} />}

      </div>

    </div>
  );
}
