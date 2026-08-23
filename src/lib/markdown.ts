import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const PROJECTS_PATH = path.join(process.cwd(), 'src', 'content', 'projects');
const DOCS_PROJECTS_PATH = path.join(process.cwd(), 'docs', 'projects');

export interface ProjectDownload {
  title: string;
  href: string;
  description?: string;
  version?: string;
  format?: string;
}

export interface ProjectManual {
  title: string;
  href: string;
  description?: string;
  format?: string;
}

export interface ProjectGalleryItem {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectVideo {
  title: string;
  src: string;
  description?: string;
  thumbnail?: string;
}

export interface ProjectWikiDoc {
  slug: string;
  filename: string;
  title: string;
  summary?: string;
  content: string;
}

export interface ProjectMetadata {
  title: string;
  category: string;
  area?: 'muhendislik' | 'lab';
  status: string;
  summary: string;
  neden?: string;
  techStack?: string[];
  date?: string;
  github?: string;
  live?: string;
  download?: string;
  downloads?: ProjectDownload[];
  manuals?: ProjectManual[];
  gallery?: ProjectGalleryItem[];
  videos?: ProjectVideo[];
  version?: string;
  image?: string;
  slug: string;
}

type FrontmatterRecord = Record<string, unknown>;

function asRecord(value: unknown): FrontmatterRecord | null {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
    ? value as FrontmatterRecord
    : null;
}

function asString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function isSafeResourceHref(href: string): boolean {
  if (href.startsWith('/') && !href.startsWith('//') && !href.includes('\\')) return true;

  try {
    const url = new URL(href);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function parseDownloads(value: unknown): ProjectDownload[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((entry) => {
    const item = asRecord(entry);
    const title = item && (asString(item.title) ?? asString(item.label));
    const href = item && asString(item.href);
    if (!title || !href || !isSafeResourceHref(href)) return [];

    return [{
      title,
      href,
      description: item && asString(item.description),
      version: item && asString(item.version),
      format: item && asString(item.format),
    }];
  });
}

function parseManuals(value: unknown): ProjectManual[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((entry) => {
    const item = asRecord(entry);
    const title = item && (asString(item.title) ?? asString(item.label));
    const href = item && asString(item.href);
    if (!title || !href || !isSafeResourceHref(href)) return [];

    return [{
      title,
      href,
      description: item && asString(item.description),
      format: item && asString(item.format),
    }];
  });
}

function parseGallery(value: unknown): ProjectGalleryItem[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((entry) => {
    const item = asRecord(entry);
    const src = item && asString(item.src);
    const alt = item && asString(item.alt);
    if (!src || !alt || !isSafeResourceHref(src)) return [];

    return [{ src, alt, caption: item && asString(item.caption) }];
  });
}

function parseVideos(value: unknown): ProjectVideo[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((entry) => {
    const item = asRecord(entry);
    const title = item && (asString(item.title) ?? asString(item.label));
    const src = item && asString(item.src);
    const thumbnail = item && asString(item.thumbnail);
    if (!title || !src || !isSafeResourceHref(src)) return [];

    return [{
      title,
      src,
      description: item && asString(item.description),
      thumbnail: thumbnail && isSafeResourceHref(thumbnail) ? thumbnail : undefined,
    }];
  });
}

function normalizeMetadata(data: FrontmatterRecord, slug: string): ProjectMetadata {
  return {
    ...data,
    slug,
    downloads: parseDownloads(data.downloads),
    manuals: parseManuals(data.manuals),
    gallery: parseGallery(data.gallery),
    videos: parseVideos(data.videos),
  } as ProjectMetadata;
}

export function getAllProjects(lang: string = 'tr'): ProjectMetadata[] {
  if (!fs.existsSync(PROJECTS_PATH)) return [];

  const baseFiles = fs.readdirSync(PROJECTS_PATH).filter(f => f.endsWith('.md') && !f.endsWith('.en.md') && !f.endsWith('.tr.md'));

  return baseFiles
    .map(file => {
      const slug = file.replace(/\.md$/, '');
      const project = getProjectBySlug(slug, lang);
      return project ? project.metadata : null;
    })
    .filter((p): p is ProjectMetadata => p !== null)
    .sort((a, b) => {
      if (a.date && b.date) return new Date(b.date).getTime() - new Date(a.date).getTime();
      return (a.title || '').localeCompare(b.title || '');
    });
}

export function getProjectBySlug(slug: string, lang: string = 'tr') {
  const enFilePath = path.join(PROJECTS_PATH, `${slug}.en.md`);
  const defaultFilePath = path.join(PROJECTS_PATH, `${slug}.md`);

  let targetPath = defaultFilePath;
  if (lang === 'en' && fs.existsSync(enFilePath)) {
    targetPath = enFilePath;
  } else if (!fs.existsSync(defaultFilePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(targetPath, 'utf8');
  const { data, content } = matter(fileContent);

  return {
    metadata: normalizeMetadata(data, slug),
    content,
  };
}

export function getProjectWikiDocs(slug: string, lang: string = 'tr'): ProjectWikiDoc[] {
  const projectDocsDir = path.join(DOCS_PROJECTS_PATH, slug);
  if (!fs.existsSync(projectDocsDir)) return [];

  const allFiles = fs.readdirSync(projectDocsDir).filter(f => f.endsWith('.md') && !f.startsWith('.'));
  const baseFiles = allFiles.filter(f => !f.endsWith('.en.md') && !f.endsWith('.tr.md'));

  return baseFiles.map(file => {
    const docSlug = file.replace(/\.md$/, '').toLowerCase();
    const enFile = file.replace(/\.md$/, '.en.md');
    let actualFile = file;

    if (lang === 'en' && allFiles.includes(enFile)) {
      actualFile = enFile;
    }

    const filePath = path.join(projectDocsDir, actualFile);
    const raw = fs.readFileSync(filePath, 'utf8');
    const { content } = matter(raw);

    // Extract first # heading as title, fallback to file name
    const headingMatch = content.match(/^#\s+([^\n\r]+)/m);
    let title = headingMatch ? headingMatch[1].trim() : file.replace(/\.md$/, '').replace(/[-_]/g, ' ');
    title = title.replace(/^#+\s*/, '').replace(/\[.*?\]/g, '').trim();

    // Extract first paragraph as summary
    const paraMatch = content.replace(/^#\s+[^\n\r]+/m, '').trim().match(/^([^#\n\r`][^\n\r]+)/m);
    const summary = paraMatch ? paraMatch[1].slice(0, 140) + '...' : undefined;

    return {
      slug: docSlug,
      filename: actualFile,
      title,
      summary,
      content,
    };
  });
}

export function getProjectsByCategory(lang: string = 'tr') {
  const projects = getAllProjects(lang);
  const categories: Record<string, ProjectMetadata[]> = {};
  projects.forEach(p => {
    if (!categories[p.category]) categories[p.category] = [];
    categories[p.category].push(p);
  });
  return categories;
}
