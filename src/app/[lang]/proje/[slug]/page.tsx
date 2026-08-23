import { getProjectBySlug, getAllProjects, getProjectWikiDocs } from '@/lib/markdown';
import { categoryConfig, defaultConfig, statusConfig } from '@/lib/project-config';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ProjectHero } from '@/components/projects/ProjectHero';
import { ProjectSidebar } from '@/components/projects/ProjectSidebar';
import { ProjectViewTabs } from '@/components/projects/ProjectViewTabs';

interface Props { params: Promise<{ lang: string; slug: string }> }

export async function generateStaticParams() {
  const projects = getAllProjects();
  const params: { lang: string; slug: string }[] = [];
  for (const lang of ['tr', 'en']) {
    for (const p of projects) {
      params.push({ lang, slug: p.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = getProjectBySlug(slug, lang);
  if (!project) return {};

  const { title, summary, category, techStack, image } = project.metadata;
  const description = summary || `${title} — ${category} project by Göktuğ Turhan.`;

  return {
    title: `${title} — Göktuğ Turhan`,
    description,
    keywords: [title, category, ...(techStack ?? []), 'Göktuğ Turhan', 'alazlab'].join(', '),
    openGraph: {
      title: `${title} — Göktuğ Turhan`,
      description,
      url: `https://alazlab.com/${lang}/proje/${slug}`,
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
    alternates: { canonical: `https://alazlab.com/${lang}/proje/${slug}` },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { lang, slug } = await params;
  const isEn = lang === 'en';
  const project = getProjectBySlug(slug, lang);
  if (!project) notFound();

  const { metadata, content } = project;
  const contentHtml = await marked.parse(content);
  const cat = categoryConfig[metadata.category] ?? defaultConfig;
  const sc = statusConfig[metadata.status] ?? statusConfig['Early'];

  // Load project wiki docs if available
  const rawWikiDocs = getProjectWikiDocs(slug, lang);
  const parsedWikiDocs = await Promise.all(
    rawWikiDocs.map(async (doc) => ({
      ...doc,
      html: await marked.parse(doc.content),
    }))
  );

  // Related projects (same category, different slug)
  const allProjects = getAllProjects(lang);
  const related = allProjects
    .filter(p => p.category === metadata.category && p.slug !== slug)
    .slice(0, 3);

  return (
    <article className="max-w-7xl mx-auto pb-24 px-2 sm:px-4 space-y-4">

      {/* Back Button */}
      <div className="py-3">
        <Link
          href={`/${lang}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/60 hover:bg-muted border border-border text-xs font-medium text-muted-foreground hover:text-foreground transition-all group"
        >
          <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          {isEn ? 'Back to All Projects' : 'Tüm Projelere Dön'}
        </Link>
      </div>

      {/* Hero */}
      <ProjectHero
        title={metadata.title}
        summary={metadata.summary}
        image={metadata.image}
        status={metadata.status}
        category={metadata.category}
        date={metadata.date}
        live={metadata.live}
        github={metadata.github}
        download={metadata.download}
        version={metadata.version}
        accent={cat.accent}
        accentBg={cat.accentBg}
        glow={cat.glow}
        badge={cat.badge}
        statusClass={sc}
        statusDot={cat.accentBg}
        variant={cat.hero}
        gradient={cat.gradient}
      />

      {/* Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

        {/* MAIN CONTENT (TABS: Overview, Wiki Reader, Media, Resources) */}
        <div className="lg:col-span-8 order-2 lg:order-1">
          <ProjectViewTabs
            metadata={metadata}
            overviewHtml={contentHtml}
            wikiDocs={parsedWikiDocs}
            accentColor={cat.accent}
            accentBg={cat.accentBg}
          />
        </div>

        {/* SIDEBAR */}
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
