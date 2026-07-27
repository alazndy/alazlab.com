import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Database, Shield, Globe, ScanLine, LayoutDashboard, FileSpreadsheet, Lock } from 'lucide-react';
import { getProjectBySlug } from '@/lib/markdown';
import { marked } from 'marked';

export default async function ENVIPage() {
  const project = getProjectBySlug('ENV-I');
  const contentHtml = await marked.parse(project?.content || '');
  
  return (
    <div className="min-h-screen pb-24 animate-in fade-in duration-1000">
      
      {/* ── HERO ── */}
      <div className="relative pt-20 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-lcars-cyan/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10 space-y-8">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-foreground/50 hover:text-lcars-cyan transition-colors font-mono tracking-widest uppercase text-xs">
            <ArrowLeft className="w-4 h-4" />
            Back to Hub
          </Link>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-foreground/5 border border-border rounded-full font-mono text-xs uppercase tracking-widest text-lcars-cyan">
              <Database className="w-4 h-4" />
              Monitoring / Platform
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

          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-foreground">ENV-I</h1>
            <p className="text-xl md:text-2xl text-foreground/60 font-light max-w-2xl leading-relaxed">
              T-Ecosystem Envanter & Stok Yönetim Modülü. Endüstriyel seviye güvenlik, uluslararası çoklu dil desteği ve gerçek zamanlı lot takibi.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 space-y-16 relative z-10">
        
        {/* ── METRICS DASHBOARD ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Uptime', val: '99.9%', icon: Shield, color: 'text-lcars-green' },
            { label: 'Latency', val: '< 50ms', icon: Globe, color: 'text-lcars-cyan' },
            { label: 'Localization', val: 'TR / EN', icon: LayoutDashboard, color: 'text-lcars-orange' },
            { label: 'Sync', val: 'Realtime', icon: Database, color: 'text-lcars-purple' },
          ].map((m, i) => (
            <div key={i} className="glass p-6 rounded-2xl border-border flex flex-col items-center text-center space-y-3 hover:border-border transition-all">
              <m.icon className={`w-6 h-6 ${m.color}`} />
              <div>
                <div className="text-2xl font-black text-foreground tracking-tight">{m.val}</div>
                <div className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest">{m.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── CORE ARCHITECTURE ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="glass p-8 md:p-12 rounded-[32px] border-border space-y-8">
            <h2 className="text-2xl font-black text-foreground uppercase tracking-tight flex items-center gap-3">
              <span className="w-2 h-6 bg-lcars-cyan rounded-full" />
              Teknoloji Yığını
            </h2>
            <div className="space-y-4">
              <p className="text-foreground/60 leading-relaxed text-sm">
                Next.js 16 ve React 19 kullanılarak inşa edilen mimari, Firebase v11 Firestore üzerinde çalışır. Zustand ile state yönetimi yapılırken, Tailwind CSS v4 ile UI katmanı şekillendirilir.
              </p>
              <div className="flex flex-wrap gap-2 pt-4">
                {project?.metadata.techStack?.map(tech => (
                  <span key={tech} className="px-3 py-1.5 bg-foreground/5 border border-border rounded-lg text-xs font-mono text-foreground/70">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="glass p-8 md:p-12 rounded-[32px] border-border space-y-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Lock className="w-32 h-32 text-lcars-orange" />
            </div>
            <h2 className="text-2xl font-black text-foreground uppercase tracking-tight flex items-center gap-3">
              <span className="w-2 h-6 bg-lcars-orange rounded-full" />
              Firestore Security
            </h2>
            <div className="space-y-4 relative z-10">
              <p className="text-foreground/60 leading-relaxed text-sm">
                Kesin sınırlarla çizilmiş Role-Based Access Control (RBAC). Admin, Manager ve Viewer rolleri için özel Firestore kuralları (Rules) ve indekslemeler (Indexes) kullanılarak veri güvenliği day 0'dan sağlandı.
              </p>
              <div className="pt-4 space-y-2">
                <div className="flex justify-between text-xs font-mono border-b border-border py-2">
                  <span className="text-foreground/40">Auth Level</span>
                  <span className="text-lcars-orange font-bold">STRICT_ENFORCED</span>
                </div>
                <div className="flex justify-between text-xs font-mono border-b border-border py-2">
                  <span className="text-foreground/40">Read/Write</span>
                  <span className="text-lcars-green font-bold">ROLE_BASED</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── FEATURES ── */}
        <div className="space-y-8">
          <h2 className="text-3xl font-black text-foreground uppercase tracking-tight text-center">Genişletilmiş Özellikler</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass p-8 rounded-3xl border-border space-y-4 hover:border-lcars-cyan/30 transition-all">
              <ScanLine className="w-8 h-8 text-lcars-cyan" />
              <h3 className="text-lg font-black text-foreground uppercase tracking-tight">Barkod & Lot Takibi</h3>
              <p className="text-foreground/50 text-sm leading-relaxed">
                Her ürüne özel parça numarası ve detaylı lot takibi. Sisteme entegre barkod okuma arayüzü ile hızlı stok girişi/çıkışı.
              </p>
            </div>
            <div className="glass p-8 rounded-3xl border-border space-y-4 hover:border-lcars-orange/30 transition-all">
              <Globe className="w-8 h-8 text-lcars-orange" />
              <h3 className="text-lg font-black text-foreground uppercase tracking-tight">Full i18n Desteği</h3>
              <p className="text-foreground/50 text-sm leading-relaxed">
                Tüm arayüzler, formlar, PDF/Excel dökümleri ve hata mesajları next-intl altyapısı ile %100 oranında Türkçe ve İngilizce destekler.
              </p>
            </div>
            <div className="glass p-8 rounded-3xl border-border space-y-4 hover:border-lcars-purple/30 transition-all">
              <FileSpreadsheet className="w-8 h-8 text-lcars-purple" />
              <h3 className="text-lg font-black text-foreground uppercase tracking-tight">Raporlama</h3>
              <p className="text-foreground/50 text-sm leading-relaxed">
                Stok hareketleri, değerleme ve kategori analizi için gelişmiş raporlama. Dile duyarlı PDF ve Excel dışa aktarma (export) yetenekleri.
              </p>
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
