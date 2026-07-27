import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Cpu, Activity, ShieldAlert, Cpu as Microchip, TableProperties, Wrench } from 'lucide-react';
import { getProjectBySlug } from '@/lib/markdown';
import { marked } from 'marked';

export default async function UniControlPage() {
  const project = getProjectBySlug('UniControl');
  const contentHtml = await marked.parse(project?.content || '');
  
  return (
    <div className="min-h-screen pb-24 animate-in fade-in duration-1000 bg-[#020202]">
      
      {/* ── HERO ── */}
      <div className="relative pt-20 pb-16 px-6 overflow-hidden">
        {/* Hardware/Grid background effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lcars-gold/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10 space-y-8 text-center flex flex-col items-center">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-foreground/50 hover:text-lcars-gold transition-colors font-mono tracking-widest uppercase text-xs">
            <ArrowLeft className="w-4 h-4" />
            Back to Hub
          </Link>

          <div className="space-y-6 max-w-3xl">
            <div className="inline-flex items-center justify-center gap-3 px-4 py-2 bg-foreground/5 border border-lcars-gold/20 rounded-full font-mono text-xs uppercase tracking-widest text-lcars-gold">
              <Microchip className="w-4 h-4" />
              Embedded Hardware
            </div>
            
          {/* Project Cover Image */}
          {project?.metadata?.image && (
            <div className="relative w-full aspect-[21/9] rounded-[32px] overflow-hidden border border-border mb-12 group">
              <img 
                src={project.metadata.image} 
                alt={project.metadata.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
            </div>
          )}

          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-foreground">UniControl</h1>
            <p className="text-xl md:text-2xl text-foreground/60 font-light leading-relaxed">
              ESP32-S3 tabanlı gelişmiş araç güvenlik ve kontrol sistemi. Ağır vasıtalar ve endüstriyel sahalar için Brigade Radar destekli bütünleşik donanım mimarisi.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 space-y-16 relative z-10">
        
        {/* ── SCHEMATIC VIEW ── */}
        <div className="glass p-2 border-border rounded-[32px] overflow-hidden">
          <div className="bg-[#050505] rounded-[24px] p-8 md:p-12 relative overflow-hidden border border-border">
            {/* PCB Traces Decorative */}
            <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0 100 L 100 100 L 150 150 L 300 150" fill="none" stroke="#ffaa00" strokeWidth="2" />
              <path d="M 500 0 L 500 80 L 450 130 L 350 130" fill="none" stroke="#ffaa00" strokeWidth="2" />
              <circle cx="300" cy="150" r="4" fill="#ffaa00" />
              <circle cx="350" cy="130" r="4" fill="#ffaa00" />
            </svg>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-lcars-gold/10 border border-lcars-gold/30 rounded-xl flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-lcars-gold" />
                </div>
                <h3 className="text-lg font-black text-foreground uppercase tracking-tight">Core Processing</h3>
                <p className="text-sm text-foreground/50 leading-relaxed">
                  ESP32-S3 mimarisi üzerinde C/C++ (ESP-IDF) ile yazılmış yüksek performanslı RTOS (Real-Time Operating System) çekirdeği.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-lcars-red/10 border border-lcars-red/30 rounded-xl flex items-center justify-center">
                  <ShieldAlert className="w-6 h-6 text-lcars-red" />
                </div>
                <h3 className="text-lg font-black text-foreground uppercase tracking-tight">Radar Integration</h3>
                <p className="text-sm text-foreground/50 leading-relaxed">
                  Brigade Radar üzerinden gelen verilerin CAN Bus iletişim protokolü ile milisaniyeler içerisinde işlenmesi ve çarpışma önleme algoritmaları.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-lcars-cyan/10 border border-lcars-cyan/30 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-lcars-cyan" />
                </div>
                <h3 className="text-lg font-black text-foreground uppercase tracking-tight">HMI Display</h3>
                <p className="text-sm text-foreground/50 leading-relaxed">
                  Nextion akıllı ekran üzerinden operatöre gerçek zamanlı araç durumu, sensör verileri ve kritik uyarı bildirimlerinin sunulması.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── BOM & ENGINEERING ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="glass p-8 md:p-12 rounded-[32px] border-border space-y-6">
            <h2 className="text-2xl font-black text-foreground uppercase tracking-tight flex items-center gap-3">
              <span className="w-2 h-6 bg-foreground/20 rounded-full" />
              Donanım Maliyet & BOM
            </h2>
            <p className="text-foreground/60 text-sm leading-relaxed">
              Tüm proje, tedarik zinciri kesintilerine karşı optimize edilmiş BOM (Bill of Materials) listesiyle yönetilmektedir. Direnc.net entegrasyonuyla canlı maliyet takibi (sensörler hariç ~5.900 TL) Excel mimarisinde hesaplanır.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono mt-4">
              <span className="px-3 py-1.5 bg-foreground/5 border border-border rounded-lg text-foreground/80 flex items-center gap-2">
                <TableProperties className="w-4 h-4 text-lcars-green" /> BOM Excel
              </span>
              <span className="px-3 py-1.5 bg-foreground/5 border border-border rounded-lg text-foreground/80 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-lcars-orange" /> Cost Active
              </span>
            </div>
          </div>

          <div className="glass p-8 md:p-12 rounded-[32px] border-border space-y-6">
             <h2 className="text-2xl font-black text-foreground uppercase tracking-tight flex items-center gap-3">
              <span className="w-2 h-6 bg-lcars-gold rounded-full" />
              Stack & Protocols
            </h2>
            <div className="grid grid-cols-2 gap-4 pt-2">
              {['ESP-IDF', 'C / C++', 'ESP32-S3', 'Nextion', 'CAN Bus', 'Brigade Radar'].map(tech => (
                <div key={tech} className="border border-border bg-foreground/5 px-4 py-3 rounded-xl flex items-center gap-3 font-mono text-xs text-foreground/70">
                  <div className="w-1.5 h-1.5 rounded-full bg-lcars-gold animate-pulse" />
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>

      
        {/* ── DYNAMIC PROJECT DETAILS ── */}
        <div className="glass p-8 md:p-12 rounded-[32px] border-border mt-16 max-w-5xl mx-auto px-6 relative z-10 mb-16">
          <div
            className="prose prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tight prose-headings:text-foreground prose-p:text-foreground/60 prose-li:text-foreground/60 prose-strong:text-foreground/90 prose-a:text-lcars-red"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </div>
    </div>
  );
}
