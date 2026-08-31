import { getProjectBySlug, getAllProjects, getProjectWikiDocs } from '@/lib/markdown';
import { categoryConfig, defaultConfig, statusConfig } from '@/lib/project-config';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { GTLauncherClient } from './GTLauncherClient';
import { GTLauncherChangelog } from './GTLauncherChangelog';
import { GTLauncherPricingTab } from './GTLauncherPricingTab';
import { ProjectSidebar } from '@/components/projects/ProjectSidebar';
import { ProjectViewTabs } from '@/components/projects/ProjectViewTabs';
import { getGtLauncherChangelog } from '@/lib/gt-launcher-changelog';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return [{ lang: 'tr' }, { lang: 'en' }];
}

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const project = getProjectBySlug('GT-Launcher', lang);
  if (!project) return {};

  const { title, summary, category, techStack, image } = project.metadata;
  const description = summary || `${title} — Android Launcher by Göktuğ Turhan.`;

  return {
    title: `${title} — Göktuğ Turhan`,
    description,
    keywords: [title, category, ...(techStack ?? []), 'GT-Launcher', 'Android', 'Kotlin', 'Compose'].join(', '),
    openGraph: {
      title: `${title} — Göktuğ Turhan`,
      description,
      url: `https://alazlab.com/${lang}/proje/GT-Launcher`,
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
    alternates: { canonical: `https://alazlab.com/${lang}/proje/GT-Launcher` },
  };
}

export default async function GTLauncherPage({ params }: Props) {
  const { lang } = await params;
  const isEn = lang === 'en';
  const project = getProjectBySlug('GT-Launcher', lang);
  if (!project) notFound();

  const { metadata, content } = project;
  const [contentHtml, changelog] = await Promise.all([
    marked.parse(content),
    getGtLauncherChangelog(),
  ]);
  const cat = categoryConfig[metadata.category] ?? defaultConfig;
  const sc = statusConfig[metadata.status] ?? statusConfig['Active'];

  // Load project wiki docs (9 guides)
  const rawWikiDocs = getProjectWikiDocs('GT-Launcher', lang);
  const parsedWikiDocs = await Promise.all(
    rawWikiDocs.map(async (doc) => ({
      ...doc,
      html: await marked.parse(doc.content),
    }))
  );

  // Related projects
  const allProjects = getAllProjects(lang);
  const related = allProjects
    .filter(p => p.slug !== 'GT-Launcher' && (p.category === metadata.category || p.area === 'lab'))
    .slice(0, 3);

  return (
    <article className="max-w-7xl mx-auto pb-24 px-2 sm:px-4 space-y-12">

      {/* Back to Hub */}
      <div className="py-2">
        <Link
          href={`/${lang}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/60 hover:bg-muted border border-border text-xs font-medium text-muted-foreground hover:text-foreground transition-all group"
        >
          <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          {isEn ? 'Back to All Projects' : 'Tüm Projelere Dön'}
        </Link>
      </div>

      {/* Flagship Interactive Mockup & Demos */}
      <GTLauncherClient version={metadata.version || 'v4.2.15'} />

      <GTLauncherChangelog
        releases={changelog.releases}
        isAvailable={changelog.isAvailable}
      />

      {/* Technical Architecture, Wiki Reader & System Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-6 border-t border-border">

        {/* Main Content Tabs (Overview, Wiki Docs, Gallery, Downloads) */}
        <div className="lg:col-span-8 order-2 lg:order-1">
          <ProjectViewTabs
            metadata={metadata}
            overviewHtml={contentHtml}
            wikiDocs={parsedWikiDocs}
            accentColor={cat.accent}
            accentBg={cat.accentBg}
            extraTab={{
              id: 'pricing',
              label: isEn ? 'Pricing' : 'Fiyatlandırma',
              content: <GTLauncherPricingTab lang={lang as 'tr' | 'en'} />,
            }}
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
