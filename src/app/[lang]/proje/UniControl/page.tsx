import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { getProjectBySlug, getAllProjects, getProjectWikiDocs } from '@/lib/markdown';
import { categoryConfig, defaultConfig, statusConfig } from '@/lib/project-config';
import { marked } from 'marked';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { UniControlClient } from './UniControlClient';
import { ProjectSidebar } from '@/components/projects/ProjectSidebar';
import { ProjectViewTabs } from '@/components/projects/ProjectViewTabs';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return [{ lang: 'tr' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const project = getProjectBySlug('UniControl', lang);
  if (!project) return {};

  const { title, summary, category, techStack, image } = project.metadata;
  const description = summary || `${title} — Automotive safety controller by Göktuğ Turhan.`;

  return {
    title: `${title} — Göktuğ Turhan`,
    description,
    keywords: [title, category, ...(techStack ?? []), 'ESP32-S3', 'CAN Bus', 'Radar', 'FreeRTOS'].join(', '),
    openGraph: {
      title: `${title} — Göktuğ Turhan`,
      description,
      url: `https://alazlab.com/${lang}/proje/UniControl`,
      siteName: 'alazlab.com',
      type: 'article',
      ...(image ? { images: [{ url: `https://alazlab.com${image}` }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} — Göktuğ Turhan`,
      description,
      ...(image ? { images: [`https://alazlab.com${image}`] } : {}),
    },
    alternates: { canonical: `https://alazlab.com/${lang}/proje/UniControl` },
  };
}

export default async function UniControlPage({ params }: Props) {
  const { lang } = await params;
  const isEn = lang === 'en';
  const project = getProjectBySlug('UniControl', lang);
  if (!project) notFound();

  const { metadata, content } = project;
  const contentHtml = await marked.parse(content);
  const cat = categoryConfig[metadata.category] ?? defaultConfig;
  const sc = statusConfig[metadata.status] ?? statusConfig['Active'];

  // Load project wiki docs
  const rawWikiDocs = getProjectWikiDocs('UniControl', lang);
  const parsedWikiDocs = await Promise.all(
    rawWikiDocs.map(async (doc) => ({
      ...doc,
      html: await marked.parse(doc.content),
    }))
  );

  // Related projects
  const allProjects = getAllProjects(lang);
  const related = allProjects
    .filter(p => p.slug !== 'UniControl' && (p.category === metadata.category || p.area === 'muhendislik'))
    .slice(0, 3);

  return (
    <article className="max-w-7xl mx-auto pb-24 px-2 sm:px-4 space-y-12 animate-in fade-in duration-500">

      {/* Back Link */}
      <div className="py-2">
        <Link
          href={`/${lang}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/60 hover:bg-muted border border-border text-xs font-medium text-muted-foreground hover:text-foreground transition-all group"
        >
          <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          {isEn ? 'Back to All Projects' : 'Tüm Projelere Dön'}
        </Link>
      </div>

      {/* Flagship Interactive Hardware Simulator */}
      <UniControlClient />

      {/* Architecture, Wiki Reader & System Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-6 border-t border-border">

        {/* Main Content Tabs (Overview, Wiki Docs, Gallery, Downloads) */}
        <div className="lg:col-span-8 order-2 lg:order-1">
          <ProjectViewTabs
            metadata={metadata}
            overviewHtml={contentHtml}
            wikiDocs={parsedWikiDocs}
            accentColor={cat.accent}
            accentBg={cat.accentBg}
          />
        </div>

        {/* Project Telemetry Sidebar */}
        <ProjectSidebar
          metadata={metadata}
          catAccent={cat.accent}
          statusClass={sc}
          related={related}
        />
      </div>

    </article>
  );
}
