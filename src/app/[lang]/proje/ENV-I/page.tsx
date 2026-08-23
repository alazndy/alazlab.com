import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Database, Shield, Globe, ScanLine, LayoutDashboard, FileSpreadsheet, Lock } from 'lucide-react';
import { getProjectBySlug } from '@/lib/markdown';
import { marked } from 'marked';
import { ProjectResourceSections } from '@/components/projects/ProjectResourceSections';

export async function generateStaticParams() {
  return [{ lang: 'tr' }, { lang: 'en' }];
}

export default async function ENVIPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';
  const project = getProjectBySlug('ENV-I');
  const contentHtml = await marked.parse(project?.content || '');

  return (
    <div className="min-h-screen pb-24 animate-in fade-in duration-700 space-y-12">

      {/* HERO */}
      <div className="relative pt-12 pb-12 px-4 sm:px-6 overflow-hidden apple-card">
        <div className="max-w-4xl mx-auto relative z-10 space-y-6 text-center flex flex-col items-center">
          <Link href={`/${lang}`} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/60 hover:bg-muted border border-border text-xs font-mono tracking-wider uppercase text-muted-foreground hover:text-foreground transition-all">
            <ArrowLeft className="w-3.5 h-3.5" />
            {isEn ? 'Back to Hub' : 'Ana Sayfaya Dön'}
          </Link>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full font-mono text-xs uppercase tracking-widest text-apple-blue font-bold">
              <Database className="w-3.5 h-3.5" />
              Monitoring / Platform
            </div>

            <h1 className="text-5xl sm:text-7xl font-extrabold uppercase tracking-tight text-foreground">ENV-I</h1>
            
            <p className="text-base sm:text-xl text-muted-foreground font-normal leading-relaxed max-w-2xl">
              {isEn 
                ? 'Enterprise inventory & stock management platform with lot tracking and multi-language support.'
                : 'T-Ecosystem Envanter & Stok Yönetim Modülü. Endüstriyel seviye güvenlik, uluslararası çoklu dil desteği ve gerçek zamanlı lot takibi.'}
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

        {/* METRICS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Role-Based Access', val: 'RBAC', color: 'text-apple-blue' },
            { label: 'Audit Trail', val: 'SHA-256', color: 'text-apple-green' },
            { label: 'Export Format', val: 'PDF / XLSX', color: 'text-apple-purple' },
            { label: 'Localization', val: 'TR / EN', color: 'text-apple-orange' },
          ].map((m) => (
            <div key={m.label} className="apple-card p-5 space-y-1">
              <div className={`text-xl sm:text-2xl font-extrabold font-mono ${m.color}`}>{m.val}</div>
              <div className="text-xs text-muted-foreground">{m.label}</div>
            </div>
          ))}
        </div>

        {/* FEATURES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="apple-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-apple-blue">
              <ScanLine className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground">{isEn ? 'Barcode & Lot Tracking' : 'Barkod & Lot Takibi'}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Detailed part number and batch tracking per product with barcode scanner integration for fast stock flow.
            </p>
          </div>

          <div className="apple-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-apple-orange">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground">{isEn ? 'Full i18n Localization' : 'Tam Çoklu Dil Desteği'}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              All UI forms, Excel exports, and validation messages support localized Turkish and English formats.
            </p>
          </div>

          <div className="apple-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-apple-purple">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground">{isEn ? 'Report Generation' : 'Gelişmiş Raporlama'}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Stock movement valuation and automated category analysis with direct export capabilities.
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
