'use client';

import Image from 'next/image';
import {
  BookOpen,
  Download,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Play,
} from 'lucide-react';
import type {
  ProjectDownload,
  ProjectGalleryItem,
  ProjectManual,
  ProjectMetadata,
  ProjectVideo,
} from '@/lib/markdown';
import { useI18n } from '@/lib/i18n';

interface ProjectResourceSectionsProps {
  project: ProjectMetadata;
}

function ResourceCard({
  icon: Icon,
  title,
  href,
  description,
  meta,
  external = false,
}: {
  icon: typeof Download;
  title: string;
  href: string;
  description?: string;
  meta?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-lcars-cyan/40 hover:bg-foreground/[0.03]"
    >
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-lcars-cyan/30 bg-lcars-cyan/10 text-lcars-cyan">
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2 text-sm font-bold text-foreground transition-colors group-hover:text-lcars-cyan">
          {title}
          {external && <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />}
        </span>
        {description && <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{description}</span>}
        {meta && <span className="mt-2 block font-mono text-[10px] uppercase tracking-widest text-lcars-cyan">{meta}</span>}
      </span>
      <Download className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-lcars-cyan" />
    </a>
  );
}

function DownloadsSection({ downloads }: { downloads: ProjectDownload[] }) {
  const { t } = useI18n();
  if (downloads.length === 0) return null;

  return (
    <section aria-labelledby="project-downloads" className="space-y-4">
      <SectionHeading id="project-downloads" icon={Download} title={t('project.downloads')} />
      <div className="grid gap-3 md:grid-cols-2">
        {downloads.map((download) => (
          <ResourceCard
            key={`${download.title}-${download.href}`}
            icon={Download}
            title={download.title}
            href={download.href}
            description={download.description}
            meta={[download.version, download.format].filter(Boolean).join(' · ') || undefined}
          />
        ))}
      </div>
    </section>
  );
}

function ManualsSection({ manuals }: { manuals: ProjectManual[] }) {
  const { t } = useI18n();
  if (manuals.length === 0) return null;

  return (
    <section aria-labelledby="project-manuals" className="space-y-4">
      <SectionHeading id="project-manuals" icon={BookOpen} title={t('project.manuals')} />
      <div className="grid gap-3 md:grid-cols-2">
        {manuals.map((manual) => (
          <ResourceCard
            key={`${manual.title}-${manual.href}`}
            icon={FileText}
            title={manual.title}
            href={manual.href}
            description={manual.description}
            meta={manual.format}
          />
        ))}
      </div>
    </section>
  );
}

function GallerySection({ gallery }: { gallery: ProjectGalleryItem[] }) {
  const { t } = useI18n();
  if (gallery.length === 0) return null;

  return (
    <section aria-labelledby="project-gallery" className="space-y-4">
      <SectionHeading id="project-gallery" icon={ImageIcon} title={t('project.gallery')} />
      <div className="grid gap-4 sm:grid-cols-2">
        {gallery.map((item) => (
          <figure key={`${item.src}-${item.alt}`} className="overflow-hidden rounded-2xl border border-border bg-card">
            <Image
              src={item.src}
              alt={item.alt}
              width={1600}
              height={1000}
              unoptimized
              className="aspect-video w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
            />
            {item.caption && <figcaption className="px-4 py-3 text-xs leading-relaxed text-muted-foreground">{item.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </section>
  );
}

function getVideoEmbedUrl(src: string): string | null {
  try {
    const url = new URL(src);
    const hostname = url.hostname.toLowerCase();

    if (hostname === 'youtu.be') {
      const id = url.pathname.slice(1);
      return id ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}` : null;
    }

    if (hostname === 'youtube.com' || hostname === 'www.youtube.com' || hostname === 'm.youtube.com') {
      const id = url.searchParams.get('v') ?? url.pathname.split('/').filter(Boolean).pop();
      return id ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}` : null;
    }

    if (hostname === 'vimeo.com' || hostname === 'www.vimeo.com') {
      const id = url.pathname.split('/').filter(Boolean).pop();
      return id && /^\d+$/.test(id) ? `https://player.vimeo.com/video/${id}` : null;
    }
  } catch {
    return null;
  }

  return null;
}

function isDirectVideo(src: string): boolean {
  return /\.(mp4|webm|ogg)(?:$|[?#])/i.test(src);
}

function VideoCard({ video }: { video: ProjectVideo }) {
  const { t } = useI18n();
  const embedUrl = getVideoEmbedUrl(video.src);

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card">
      {embedUrl ? (
        <div className="aspect-video bg-black">
          <iframe
            src={embedUrl}
            title={video.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
      ) : isDirectVideo(video.src) ? (
        <video controls preload="metadata" poster={video.thumbnail} className="aspect-video w-full bg-black">
          <source src={video.src} />
          Tarayıcınız video oynatmayı desteklemiyor.
        </video>
      ) : (
        <a href={video.src} target="_blank" rel="noreferrer" className="flex aspect-video items-center justify-center bg-foreground/5 text-muted-foreground transition-colors hover:text-lcars-cyan">
          <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest"><Play className="h-4 w-4" /> {t('project.openVideo')}</span>
        </a>
      )}
      <div className="space-y-1 px-4 py-3">
        <h3 className="text-sm font-semibold text-foreground">{video.title}</h3>
        {video.description && <p className="text-xs leading-relaxed text-muted-foreground">{video.description}</p>}
      </div>
    </article>
  );
}

function VideosSection({ videos }: { videos: ProjectVideo[] }) {
  const { t } = useI18n();
  if (videos.length === 0) return null;

  return (
    <section aria-labelledby="project-videos" className="space-y-4">
      <SectionHeading id="project-videos" icon={Play} title={t('project.videos')} />
      <div className="grid gap-4 lg:grid-cols-2">
        {videos.map((video) => <VideoCard key={`${video.title}-${video.src}`} video={video} />)}
      </div>
    </section>
  );
}

function SectionHeading({
  id,
  icon: Icon,
  title,
}: {
  id: string;
  icon: typeof Download;
  title: string;
}) {
  return (
    <h2 id={id} className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-foreground">
      <Icon className="h-4 w-4 text-lcars-cyan" />
      {title}
    </h2>
  );
}

export function ProjectResourceSections({ project }: ProjectResourceSectionsProps) {
  const downloads = [
    ...(project.download ? [{ title: 'Ana indirme', href: project.download }] : []),
    ...(project.downloads ?? []),
  ].filter((item, index, items) => items.findIndex((candidate) => candidate.href === item.href) === index);
  const manuals = project.manuals ?? [];
  const gallery = project.gallery ?? [];
  const videos = project.videos ?? [];

  if (downloads.length === 0 && manuals.length === 0 && gallery.length === 0 && videos.length === 0) return null;

  return (
    <div className="mt-16 space-y-14 border-t border-border pt-12">
      <DownloadsSection downloads={downloads} />
      <ManualsSection manuals={manuals} />
      <GallerySection gallery={gallery} />
      <VideosSection videos={videos} />
    </div>
  );
}
