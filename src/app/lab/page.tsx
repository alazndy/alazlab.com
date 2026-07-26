// src/app/lab/page.tsx
import Link from 'next/link';
import { getAllProjects } from '@/lib/markdown';
import { statusConfig, statusDot } from '@/lib/project-config';

export const metadata = {
  title: 'Lab',
  description: 'Kişisel zamanda kurulan, AI-agent\'larla birlikte geliştirilen yazılım ekosistemi.',
};

export default function LabPage() {
  const projects = getAllProjects().filter(p => p.area === 'lab');

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24">
      <div className="space-y-4">
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase">Lab</h1>
        <p className="text-foreground/50 max-w-2xl">
          Kişisel zamanda kurulan, AI-agent&apos;larla birlikte geliştirilen yazılım ekosistemi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map(p => (
          <Link key={p.slug} href={`/proje/${p.slug}`}
            className="p-6 glass rounded-2xl border-border hover:border-lcars-cyan/40 transition-all space-y-3 block"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{p.title}</h2>
              <span className={`text-[10px] font-mono px-2 py-1 rounded border uppercase flex items-center gap-1.5 ${statusConfig[p.status] ?? ''}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${statusDot[p.status] ?? ''}`} />
                {p.status}
              </span>
            </div>
            <p className="text-sm text-foreground/50">{p.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
