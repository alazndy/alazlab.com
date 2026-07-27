import React from 'react';
import Link from 'next/link';
import { ArrowLeft, LineChart, Cpu, Zap, ActivitySquare, Server, BrainCircuit } from 'lucide-react';
import { getProjectBySlug } from '@/lib/markdown';
import { marked } from 'marked';

export default async function AITraderPage() {
  const project = getProjectBySlug('AI_Trader');
  const contentHtml = await marked.parse(project?.content || '');
  
  return (
    <div className="min-h-screen pb-24 animate-in fade-in duration-1000 bg-black">
      
      {/* ── HERO ── */}
      <div className="relative pt-20 pb-16 px-6 overflow-hidden">
        {/* Abstract Grid & Trading Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        <svg className="absolute bottom-0 left-0 w-full h-[60%] opacity-20 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1000 300">
          <path d="M0 300 L100 250 L200 280 L300 150 L400 180 L500 50 L600 120 L700 80 L800 160 L900 40 L1000 100 L1000 300 Z" fill="url(#gradient-chart)" />
          <path d="M0 300 L100 250 L200 280 L300 150 L400 180 L500 50 L600 120 L700 80 L800 160 L900 40 L1000 100" fill="none" stroke="#00ccff" strokeWidth="2" />
          <defs>
            <linearGradient id="gradient-chart" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00ccff" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#00ccff" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-lcars-cyan/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10 space-y-8">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-foreground/50 hover:text-lcars-cyan transition-colors font-mono tracking-widest uppercase text-xs">
            <ArrowLeft className="w-4 h-4" />
            Back to Hub
          </Link>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-foreground/5 border border-border rounded-full font-mono text-xs uppercase tracking-widest text-lcars-cyan">
              <BrainCircuit className="w-4 h-4" />
              Algorithmic Finance
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

          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-foreground">AI Trader</h1>
            <p className="text-xl md:text-2xl text-foreground/60 font-light max-w-2xl leading-relaxed">
              Yapay zeka destekli, düşük gecikmeli algoritmik ticaret motoru. Pazar sinyallerini gerçek zamanlı analiz eder ve otonom işlemler yürütür.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 space-y-16 relative z-10">
        
        {/* ── CORE ENGINE ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="glass p-8 md:p-12 rounded-[32px] border-border space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-foreground uppercase tracking-tight flex items-center gap-3">
                <span className="w-2 h-6 bg-lcars-green rounded-full" />
                Data Ingestion
              </h2>
              <Server className="w-6 h-6 text-lcars-green" />
            </div>
            <p className="text-foreground/60 text-sm leading-relaxed">
              Piyasa verilerini WebSocket üzerinden asenkron olarak toplayan, OHLCV verisini normalize eden ve time-series optimize edilmiş PostgreSQL & Redis mimarisinde depolayan gerçek zamanlı veri akışı.
            </p>
          </div>

          <div className="glass p-8 md:p-12 rounded-[32px] border-border space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-foreground uppercase tracking-tight flex items-center gap-3">
                <span className="w-2 h-6 bg-lcars-orange rounded-full" />
                Strategy Engine
              </h2>
              <ActivitySquare className="w-6 h-6 text-lcars-orange" />
            </div>
            <p className="text-foreground/60 text-sm leading-relaxed">
              Python ve TensorFlow tabanlı izolasyonlu mantık katmanı. LSTM ve Transformer modelleri kullanılarak sinyal tespiti, konfigüre edilebilir risk yönetimi ve backtesting altyapısı.
            </p>
          </div>
        </div>

        {/* ── EXECUTION & TECH STACK ── */}
        <div className="glass rounded-[32px] border-border p-8 md:p-12 space-y-8 bg-foreground/5">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between border-b border-border pb-8">
            <div className="space-y-4 max-w-lg">
              <h2 className="text-2xl font-black text-foreground uppercase tracking-tight flex items-center gap-3">
                <Zap className="w-6 h-6 text-lcars-cyan" />
                Execution Layer
              </h2>
              <p className="text-foreground/50 text-sm leading-relaxed">
                Broker API entegrasyonuyla pozisyon yönetimi ve otomatik işlem emirleri. Ağ kopmalarına karşı Retry Logic ve sermaye koruması için Circuit Breaker algoritmaları devreye girer.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/40 p-4 rounded-xl border border-border flex flex-col items-center">
                <span className="text-lcars-red font-mono font-bold">Stop-Loss</span>
                <span className="text-xs text-foreground/40 uppercase mt-1">Per-trade</span>
              </div>
              <div className="bg-black/40 p-4 rounded-xl border border-border flex flex-col items-center">
                <span className="text-lcars-orange font-mono font-bold">Drawdown</span>
                <span className="text-xs text-foreground/40 uppercase mt-1">Limits</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-[10px] font-mono text-foreground/30 uppercase tracking-widest">Technology Stack</div>
            <div className="flex flex-wrap gap-2">
              {['Python', 'FastAPI', 'React 19', 'TypeScript', 'TensorFlow', 'PostgreSQL', 'Redis', 'WebSocket', 'Docker'].map(tech => (
                <span key={tech} className="px-4 py-2 bg-black border border-border rounded-lg text-xs font-mono text-foreground/70">
                  {tech}
                </span>
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
