'use client';

import { motion } from 'framer-motion';
import {
  Shield, Cpu, Database, Zap, Gauge,
  Smartphone, Monitor, Radio, GitBranch, Layers
} from 'lucide-react';

// --- Visual Modules ---

function BlueprintPlaceholder({ slug }: { slug: string, category: string }) {
  const planNumber = slug.length % 9;
  return (
    <div className="w-full h-full min-h-[300px] blueprint-bg rounded-2xl flex items-center justify-center relative overflow-hidden group">
       <div className="absolute inset-0 bg-gradient-to-br from-lcars-cyan/5 to-transparent pointer-events-none" />
       <div className="flex flex-col items-center gap-4 z-10">
          <Layers className="w-16 h-16 text-lcars-cyan/20 group-hover:text-lcars-cyan/40 transition-all group-hover:scale-110 duration-700" />
          <div className="text-center">
             <div className="text-[10px] font-mono text-lcars-cyan/40 font-black tracking-[0.4em] uppercase">Architecture_Plan_0{planNumber}</div>
             <div className="text-xs font-mono text-white/20 uppercase mt-1 tracking-widest">{slug}_SYSTEM_MODULE</div>
          </div>
       </div>
       {/* Decorative CAD-like measurements */}
       <div className="absolute top-8 left-8 w-32 h-[1px] bg-lcars-cyan/20">
          <div className="absolute -top-4 left-0 text-[8px] font-mono text-lcars-cyan/40">dim: 1024px</div>
       </div>
       <div className="absolute bottom-8 right-8 h-32 w-[1px] bg-lcars-cyan/20">
          <div className="absolute top-1/2 left-4 -rotate-90 text-[8px] font-mono text-lcars-cyan/40 origin-left">scale: 1:1</div>
       </div>
    </div>
  );
}

function TechnicalMetrics({ slug, category }: { slug: string, category: string }) {
  return <BlueprintPlaceholder slug={slug} category={category} />;
}

export function ProjectDashboard({ slug, category }: { slug: string; category: string }) {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
      {/* Visual Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
        <div className="lg:col-span-8 glass rounded-[24px] md:rounded-[32px] p-5 md:p-8 border-white/5 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 md:p-6 opacity-20">
              <GitBranch className="w-6 h-6 md:w-8 md:h-8 text-lcars-cyan" />
           </div>
           <div className="flex items-center gap-3 mb-6 md:mb-8">
             <div className="w-2.5 h-6 md:w-3 md:h-8 bg-lcars-cyan rounded-full shadow-[0_0_15px_#00ccff]" />
             <h3 className="text-lg md:text-xl font-black tracking-widest uppercase text-white/90">Teknik_Görselleştirme</h3>
           </div>
           
           <div className="h-[250px] md:h-[300px]">
             <TechnicalMetrics slug={slug} category={category} />
           </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
           {/* Speed/Performance Gauge */}
           <div className="glass rounded-[24px] md:rounded-[32px] p-6 md:p-8 border-white/5 flex-1 flex flex-col justify-center items-center gap-4 relative overflow-hidden group min-h-[200px]">
              <div className="absolute inset-0 bg-gradient-to-br from-lcars-orange/5 to-transparent pointer-events-none" />
              <div className="relative w-32 h-32 rounded-full border-2 border-white/5 flex items-center justify-center">
                 <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-0 rounded-full border-t-2 border-lcars-orange opacity-40"
                 />
                 <Gauge className="w-10 h-10 text-lcars-orange" />
              </div>
              <p className="text-[10px] font-mono text-white/30 text-center uppercase tracking-[0.2em]">Ölçeklenebilir_Mimari</p>
           </div>

           {/* Security Module */}
           <div className="glass rounded-[24px] md:rounded-[32px] p-6 md:p-8 border-white/5 flex-1 relative overflow-hidden group">
              <div className="flex items-center gap-3 mb-6">
                 <Shield className="w-5 h-5 text-lcars-green" />
                 <span className="text-xs font-black font-mono tracking-widest text-white/60 uppercase">Güvenlik_Katmanı</span>
              </div>

              <div className="space-y-4">
                 {['Erişim Kontrolü', 'Versiyon Takibi'].map(label => (
                   <div key={label} className="flex items-center justify-between text-[10px] font-mono text-white/40 uppercase tracking-widest">
                      <span>{label}</span>
                      <div className="flex gap-1">
                         {[...Array(3)].map((_, i) => (
                           <div key={i} className="w-1 h-1 rounded-full bg-lcars-green/40" />
                         ))}
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Terminal Access Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
         {[
           { icon: Cpu, label: 'İŞLEMCİ_TAHSİSİ' },
           { icon: Database, label: 'VERİ_SENK' },
           { icon: Radio, label: 'SİNYAL_TX' },
           { icon: Smartphone, label: 'MOBİL_UI' },
           { icon: Monitor, label: 'SİSTEM_OS' },
           { icon: Zap, label: 'GÜÇ_SİSTEMİ' }
         ].map((node) => (
           <div key={node.label} className="glass p-4 rounded-2xl border-white/5 flex flex-col items-center gap-3 hover:border-lcars-cyan/30 transition-all group cursor-default">
              <node.icon className="w-5 h-5 text-white/20 group-hover:text-lcars-cyan transition-colors" />
              <span className="text-[8px] font-mono text-white/20 group-hover:text-white/40 transition-colors uppercase tracking-widest">{node.label}</span>
              <div className="flex gap-1">
                 {[...Array(3)].map((_, i) => (
                   <div key={i} className="w-1 h-1 rounded-full bg-lcars-green/40" />
                 ))}
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}
