import { getProjectBySlug } from '@/lib/markdown';
import { marked } from 'marked';
import { RaiosClient } from './RaiosClient';
import { ProjectResourceSections } from '@/components/projects/ProjectResourceSections';

export async function generateStaticParams() {
  return [{ lang: 'tr' }, { lang: 'en' }];
}

const DEFAULT_STACK = ['Rust', 'Tokio', 'Ratatui', 'Axum', 'SQLite', 'MCP', 'fastembed'];

export default async function RAIOSPage() {
  const project = getProjectBySlug('R-AI-OS');
  const contentHtml = await marked.parse(project?.content || '');
  const techStack = project?.metadata.techStack ?? DEFAULT_STACK;

  return (
    <div className="pb-24 space-y-12">
      <RaiosClient techStack={techStack} />

      {/* DYNAMIC PROJECT DETAILS */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="apple-card p-6 sm:p-10">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </div>

      {project && <ProjectResourceSections project={project.metadata} />}
    </div>
  );
}
