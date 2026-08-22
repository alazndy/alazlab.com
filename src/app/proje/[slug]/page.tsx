import { getProjectBySlug, getAllProjects } from '@/lib/markdown';
import { categoryConfig, defaultConfig, statusConfig } from '@/lib/project-config';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { ProjectHero } from '@/components/projects/ProjectHero';
import { ProjectSidebar } from '@/components/projects/ProjectSidebar';
import { ProjectResourceSections } from '@/components/projects/ProjectResourceSections';

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
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
      url: `https://alazlab.com/proje/${slug}`,
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
    alternates: { canonical: `https://alazlab.com/proje/${slug}` },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { metadata, content } = project;
  const contentHtml = await marked.parse(content);
  const cat = categoryConfig[metadata.category] ?? defaultConfig;
  const sc = statusConfig[metadata.status] ?? statusConfig['Early'];

  // Related projects (same category, different slug)
  const allProjects = getAllProjects();
  const related = allProjects
    .filter(p => p.category === metadata.category && p.slug !== slug)
    .slice(0, 3);

  return (
    <article className="max-w-5xl mx-auto pb-24">

      {/* Back */}
      <div className="py-4">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-mono text-white/25 hover:text-white/60 transition-colors group">
          <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Tüm Projeler
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

        {/* ── MAIN CONTENT ── */}
        <div className="lg:col-span-8 order-2 lg:order-1">
          {content.trim() ? (
            <div
              className={cn(
                "prose prose-invert max-w-none",
                "prose-headings:font-black prose-headings:tracking-tight prose-headings:text-white",
                "prose-h2:text-lg prose-h2:uppercase prose-h2:mt-10 prose-h2:mb-3",
                "prose-h2:flex prose-h2:items-center prose-h2:gap-2",
                `prose-h2:before:content-[''] prose-h2:before:block prose-h2:before:w-1 prose-h2:before:h-4 prose-h2:before:rounded-full prose-h2:before:${cat.accentBg}`,
                "prose-h3:text-base prose-h3:text-white/65 prose-h3:mt-6 prose-h3:mb-2",
                "prose-p:text-white/50 prose-p:leading-relaxed prose-p:mb-4 prose-p:text-sm",
                "prose-li:text-white/45 prose-li:text-sm",
                `prose-li:marker:${cat.accent}`,
                "prose-strong:text-white/75 prose-strong:font-semibold",
                "prose-code:text-amber-400 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-code:text-xs",
                "prose-blockquote:border-l-2 prose-blockquote:border-white/20 prose-blockquote:text-white/40 prose-blockquote:not-italic prose-blockquote:pl-4 prose-blockquote:my-6"
              )}
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          ) : (
            <div className="py-12 text-center text-white/20 text-sm font-mono">
              More details coming soon.
            </div>
          )}
        </div>

        {/* ── SIDEBAR ── */}
        <ProjectSidebar
          metadata={metadata}
          catAccent={cat.accent}
          statusClass={sc}
          related={related}
        />
      </div>

      <ProjectResourceSections project={metadata} />
    </article>
  );
}
