import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Layers, Palette, Terminal, Box, Component } from 'lucide-react';
import { getProjectBySlug } from '@/lib/markdown';
import { marked } from 'marked';

export default async function TekUIPage() {
  const project = getProjectBySlug('tek-ui');
  const contentHtml = await marked.parse(project?.content || '');
  
  return (
    <div className="min-h-screen pb-24 animate-in fade-in duration-1000 bg-foreground/5">
      
      {/* ── HERO ── */}
      <div className="relative pt-20 pb-16 px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-foreground/50 hover:text-foreground transition-colors font-mono tracking-widest uppercase text-xs">
            <ArrowLeft className="w-4 h-4" />
            Back to Hub
          </Link>

          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="space-y-6 flex-1">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-foreground border border-border rounded-full font-mono text-xs uppercase tracking-widest text-black font-bold">
                <Palette className="w-4 h-4" />
                UI Infrastructure
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

          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-foreground">TEK-UI</h1>
              <p className="text-xl text-foreground/60 font-light leading-relaxed">
                T-Ecosystem'in kurumsal tasarım sistemi ve component kütüphanesi. Radix UI primitives ve Tailwind CSS v4 mimarisi.
              </p>
            </div>
            
            {/* Visualizer Block */}
            <div className="w-full md:w-72 aspect-square glass rounded-3xl border-border p-6 flex flex-col justify-between shadow-2xl bg-black/40">
               <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-lcars-red" />
                 <div className="w-3 h-3 rounded-full bg-lcars-orange" />
                 <div className="w-3 h-3 rounded-full bg-lcars-green" />
               </div>
               <div className="space-y-2">
                 <div className="h-2 w-full bg-foreground/10 rounded-full" />
                 <div className="h-2 w-3/4 bg-foreground/10 rounded-full" />
                 <div className="h-2 w-1/2 bg-foreground/10 rounded-full" />
               </div>
               <div className="w-full py-3 bg-foreground text-black text-center text-xs font-black uppercase rounded-lg">
                 Primary Action
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 space-y-12 relative z-10 mt-12">
        
        {/* ── CORE PILLARS ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass p-8 rounded-[24px] border-border space-y-4">
            <Layers className="w-8 h-8 text-foreground" />
            <h3 className="font-bold text-foreground uppercase tracking-tight">Radix Primitives</h3>
            <p className="text-sm text-foreground/50 leading-relaxed">
              Tüm bileşenler erişilebilirlik (a11y) standartlarına tam uyumlu, headless Radix UI temelleri üzerine inşa edildi.
            </p>
          </div>
          <div className="glass p-8 rounded-[24px] border-border space-y-4">
            <Terminal className="w-8 h-8 text-foreground" />
            <h3 className="font-bold text-foreground uppercase tracking-tight">Tailwind CSS v4</h3>
            <p className="text-sm text-foreground/50 leading-relaxed">
              shadcn/ui yaklaşımıyla, stil kodlarının projeye import edilmesi yerine doğrudan konfigüre edilebilir utilities (cn) mimarisi.
            </p>
          </div>
          <div className="glass p-8 rounded-[24px] border-border space-y-4">
            <Component className="w-8 h-8 text-foreground" />
            <h3 className="font-bold text-foreground uppercase tracking-tight">Glassmorphism</h3>
            <p className="text-sm text-foreground/50 leading-relaxed">
              T-Ecosystem'in imza niteliğindeki "backdrop-blur" ve yarı saydam glass yüzey dokusu.
            </p>
          </div>
        </div>

        {/* ── TOKENS ── */}
        <div className="glass p-8 md:p-12 rounded-[32px] border-border space-y-8">
          <h2 className="text-2xl font-black text-foreground uppercase tracking-tight flex items-center gap-3">
            <Box className="w-6 h-6" />
            Design Tokens
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Primary', hex: 'hsl(151 86% 39%)', color: 'bg-[hsl(151,86%,39%)]' },
              { name: 'Background', hex: '#000000', color: 'bg-black border border-border' },
              { name: 'Glass', hex: 'rgba(255,255,255,0.05)', color: 'bg-foreground/5 border border-border backdrop-blur-md' },
              { name: 'Text', hex: 'Geist Sans', color: 'bg-foreground text-black' },
            ].map(token => (
              <div key={token.name} className="space-y-3">
                <div className={`w-full h-24 rounded-2xl ${token.color} flex items-center justify-center`}>
                  {token.name === 'Text' && <span className="font-black text-3xl">Aa</span>}
                </div>
                <div>
                  <div className="font-bold text-foreground text-sm">{token.name}</div>
                  <div className="font-mono text-[10px] text-foreground/40">{token.hex}</div>
                </div>
              </div>
            ))}
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
