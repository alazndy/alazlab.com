import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const PROJECTS_PATH = path.join(process.cwd(), 'src', 'content', 'projects');

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
  version?: string;
  image?: string;
  slug: string;
}

export function getAllProjects(): ProjectMetadata[] {
  if (!fs.existsSync(PROJECTS_PATH)) return [];

  const files = fs.readdirSync(PROJECTS_PATH).filter(f => f.endsWith('.md'));

  return files
    .map(file => {
      const slug = file.replace(/\.md$/, '');
      const fileContent = fs.readFileSync(path.join(PROJECTS_PATH, file), 'utf8');
      const { data } = matter(fileContent);
      return { ...data, slug } as ProjectMetadata;
    })
    .sort((a, b) => {
      if (a.date && b.date) return new Date(b.date).getTime() - new Date(a.date).getTime();
      return (a.title || '').localeCompare(b.title || '');
    });
}

export function getProjectBySlug(slug: string) {
  const filePath = path.join(PROJECTS_PATH, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  return {
    metadata: { ...data, slug } as ProjectMetadata,
    content,
  };
}

export function getProjectsByCategory() {
  const projects = getAllProjects();
  const categories: Record<string, ProjectMetadata[]> = {};
  projects.forEach(p => {
    if (!categories[p.category]) categories[p.category] = [];
    categories[p.category].push(p);
  });
  return categories;
}
