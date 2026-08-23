import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Layers, Palette, Terminal, Box, Component } from 'lucide-react';
import { getProjectBySlug } from '@/lib/markdown';
import { marked } from 'marked';
import { ProjectResourceSections } from '@/components/projects/ProjectResourceSections';

export async function generateStaticParams() {
  return [{ lang: 'tr' }, { lang: 'en' }];
}

export default async function TekUIPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';
  const project = getProjectBySlug('tek-ui');
  const contentHtml = await marked.parse(project?.content || '');

  return (
    <div className="min-h-screen pb-24 animate-in fade-in duration-700 space-y-12">

      {/* HERO */}
      <div className="relative pt-12 pb-12 px-4 sm:px-6 overflow-hidden apple-card">
        <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-6 text-center flex flex-col items-center">
          <Link href={`/${lang}`} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/60 hover:bg-muted border border-border text-xs font-mono tracking-wider uppercase text-muted-foreground hover:text-foreground transition-all">
            <ArrowLeft className="w-3.5 h-3.5" />
            {isEn ? 'Back to Hub' : 'Ana Sayfaya Dön'}
          </Link>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full font-mono text-xs uppercase tracking-widest text-apple-orange font-bold">
              <Palette className="w-3.5 h-3.5" />
              UI Infrastructure
            </div>

            <h1 className="text-5xl sm:text-7xl font-extrabold uppercase tracking-tight text-foreground">tek-ui</h1>
            
            <p className="text-base sm:text-xl text-muted-foreground font-normal leading-relaxed max-w-2xl">
              {isEn 
                ? 'Design system and accessible React/Tailwind component library engineered for modular applications.'
                : 'T-Ecosystem için kurumsal tasarım sistemi ve component kütüphanesi. Radix UI primitives ve Tailwind CSS mimarisi.'}
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

        {/* PILLARS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="apple-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-apple-orange">
              <Component className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground uppercase">{isEn ? 'Component Library' : 'Bileşen Kütüphanesi'}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Accessible primitives with zero runtime overhead, strictly typed TypeScript contracts, and responsive tokens.
            </p>
          </div>

          <div className="apple-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-apple-blue">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground uppercase">{isEn ? 'Design Tokens' : 'Tasarım Tokenları'}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Unified colors, radii, elevation materials, and typography curves synchronizing across dark and light palettes.
            </p>
          </div>

          <div className="apple-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-apple-purple">
              <Box className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground uppercase">{isEn ? 'NPM Ecosystem' : 'NPM Paketi'}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Tree-shakeable exports published for internal apps, CLI tooling, and web dashboards.
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
