import { getProjectBySlug } from '@/lib/markdown';
import { marked } from 'marked';
import { RaiosClient } from './RaiosClient';
import { ProjectResourceSections } from '@/components/projects/ProjectResourceSections';

const DEFAULT_STACK = ['Rust', 'Tokio', 'Ratatui', 'Axum', 'SQLite', 'MCP', 'fastembed'];

export default async function RAIOSPage() {
  const project = getProjectBySlug('R-AI-OS');
  const contentHtml = await marked.parse(project?.content || '');
  const techStack = project?.metadata.techStack ?? DEFAULT_STACK;

  return (
    <div className="pb-24">
      <RaiosClient techStack={techStack} />

      {/* ── DYNAMIC PROJECT DETAILS ── */}
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="glass p-8 md:p-12 rounded-[32px] border-border mt-16">
          <div
            className="prose prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tight prose-headings:text-foreground prose-p:text-foreground/60 prose-li:text-foreground/60 prose-strong:text-foreground/90 prose-a:text-lcars-red prose-code:text-lcars-orange [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-black/40 [&_pre]:border [&_pre]:border-border [&_pre]:p-4"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </div>
      {project && <ProjectResourceSections project={project.metadata} />}
    </div>
  );
}
