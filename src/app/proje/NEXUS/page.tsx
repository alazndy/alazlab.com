import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Cpu, Network, RadioTower, Database, CloudFog } from 'lucide-react';
import { getProjectBySlug } from '@/lib/markdown';
import { marked } from 'marked';

export default async function NexusPage() {
  const project = getProjectBySlug('NEXUS');
  const contentHtml = await marked.parse(project?.content || '');
  
  return (
    <div className="min-h-screen pb-24 animate-in fade-in duration-1000 bg-[#06080c]">
      
      {/* ── HERO ── */}
      <div className="relative pt-20 pb-16 px-6 overflow-hidden">
        {/* Hexagon pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iNDIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyIDBMIDI0IDcgTDI0IDIxIEwxMiAyOCBMMCAyMSBMMCA3IFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIvPjwvc3ZnPg==')] opacity-30" />
        
        <div className="max-w-5xl mx-auto relative z-10 space-y-8">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-foreground/50 hover:text-foreground transition-colors font-mono tracking-widest uppercase text-xs">
            <ArrowLeft className="w-4 h-4" />
            Back to Hub
          </Link>

          <div className="space-y-6 max-w-3xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-lcars-blue/10 border border-lcars-blue/30 rounded-full font-mono text-xs uppercase tracking-widest text-[#00ccff]">
              <Network className="w-4 h-4" />
              IoT & Edge Compute
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

          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-foreground drop-shadow-[0_0_15px_rgba(0,204,255,0.2)]">NEXUS</h1>
            <p className="text-xl md:text-2xl text-foreground/60 font-light leading-relaxed">
              Endüstriyel sensörleri (CAN, I2C, UART), uç nokta işleme (Edge Compute) düğümleri ve bulut mimarisini tek bir donanımda birleştiren IoT Ağ Geçidi.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 space-y-8 relative z-10">

        {/* ── ARCHITECTURE TOPOLOGY ── */}
        <div className="glass p-8 md:p-12 rounded-[32px] border-border space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">Topology</h2>
            <p className="text-foreground/40 text-sm font-mono uppercase tracking-widest">Hardware-to-Cloud Pipeline</p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto">
            
            {/* Edge Node */}
            <div className="w-full md:w-1/3 glass bg-black/40 p-6 rounded-3xl border border-border flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-foreground/5 rounded-2xl flex items-center justify-center border border-border">
                <Cpu className="w-8 h-8 text-lcars-gold" />
              </div>
              <div>
                <div className="font-black text-foreground">ESP32-S3 Edge Node</div>
                <div className="text-[10px] font-mono text-foreground/50 uppercase mt-1">FreeRTOS / ESP-IDF</div>
              </div>
              <div className="flex gap-2 justify-center flex-wrap pt-2">
                <span className="px-2 py-1 bg-foreground/5 rounded text-[10px] font-mono text-foreground/40">CAN</span>
                <span className="px-2 py-1 bg-foreground/5 rounded text-[10px] font-mono text-foreground/40">UART</span>
                <span className="px-2 py-1 bg-foreground/5 rounded text-[10px] font-mono text-foreground/40">I2C</span>
              </div>
            </div>

            {/* Transmission */}
            <div className="flex flex-col items-center text-center space-y-2">
              <RadioTower className="w-6 h-6 text-lcars-cyan animate-pulse" />
              <div className="text-xs font-mono text-lcars-cyan uppercase tracking-widest">MQTT Protocol</div>
              <div className="h-0.5 w-16 bg-gradient-to-r from-lcars-cyan to-transparent hidden md:block" />
            </div>

            {/* Cloud Pipeline */}
            <div className="w-full md:w-1/3 glass bg-black/40 p-6 rounded-3xl border border-border flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-foreground/5 rounded-2xl flex items-center justify-center border border-border">
                <CloudFog className="w-8 h-8 text-lcars-purple" />
              </div>
              <div>
                <div className="font-black text-foreground">Cloud Pipeline</div>
                <div className="text-[10px] font-mono text-foreground/50 uppercase mt-1">Node-RED / InfluxDB</div>
              </div>
              <div className="flex gap-2 justify-center flex-wrap pt-2">
                <span className="px-2 py-1 bg-foreground/5 rounded text-[10px] font-mono text-foreground/40">Grafana</span>
                <span className="px-2 py-1 bg-foreground/5 rounded text-[10px] font-mono text-foreground/40">JSON</span>
              </div>
            </div>

          </div>
        </div>

        {/* ── DESIGN GOALS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="glass p-8 md:p-12 rounded-[32px] border-border space-y-6">
             <h2 className="text-xl font-black text-foreground uppercase tracking-tight flex items-center gap-3">
              <span className="w-1.5 h-6 bg-lcars-gold rounded-full" />
              Firmware Architecture
            </h2>
            <ul className="space-y-4">
              {[
                { title: 'Sensor_Poll_Task', desc: 'Bütün yapılandırılmış sensör veriyollarını belirlenmiş aralıklarla okur.' },
                { title: 'Edge_Process_Task', desc: 'Ham sensör okumalarına yumuşatma filtreleri (smoothing) ve eşik (threshold) kontrolleri uygular.' },
                { title: 'MQTT_Pub_Task', desc: 'İşlenmiş veriyi JSON formatına çevirerek (serialize) broker üzerinde yayınlar.' },
                { title: 'OTA_Task', desc: 'MQTT üzerinden güvenli, geri dönüş destekli Firmware Update süreçlerini yönetir.' },
              ].map(task => (
                <li key={task.title} className="border-l border-border pl-4 py-1">
                  <div className="font-mono text-xs font-bold text-foreground/80">{task.title}</div>
                  <div className="text-sm text-foreground/50 mt-1">{task.desc}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass p-8 md:p-12 rounded-[32px] border-border space-y-6">
             <h2 className="text-xl font-black text-foreground uppercase tracking-tight flex items-center gap-3">
              <span className="w-1.5 h-6 bg-lcars-purple rounded-full" />
              Design Goals
            </h2>
            <div className="space-y-6 pt-2">
              <div>
                <h3 className="font-bold text-foreground">Protocol Agnostic</h3>
                <p className="text-foreground/50 text-sm mt-1">Modüler C/C++ firmware mimarisi sayesinde, çekirdek mantığa dokunmadan yeni sensör sürücüleri entegre edilebilir.</p>
              </div>
              <div>
                <h3 className="font-bold text-foreground">Edge Processing</h3>
                <p className="text-foreground/50 text-sm mt-1">Veri yığınlarını buluta göndermeden önce donanım üzerinde (Edge) filtreler ve maliyet tasarrufu sağlar.</p>
              </div>
              <div>
                <h3 className="font-bold text-foreground">Hardened Hardware</h3>
                <p className="text-foreground/50 text-sm mt-1">Otomotiv ve endüstriyel alanlar için tasarlandı: geniş besleme gerilim aralığı, ESD koruması ve watchdog destekli sistem.</p>
              </div>
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
