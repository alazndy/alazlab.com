// src/app/muhendislik/page.tsx
import Link from 'next/link';
import { getAllProjects } from '@/lib/markdown';
import { statusConfig, statusDot } from '@/lib/project-config';

export const metadata = {
  title: 'Mühendislik',
  description: 'ADC Tasarım bünyesinde, gerçek donanıma bağlı, sahada çalışan sistemler.',
};

export default function MuhendislikPage() {
  const projects = getAllProjects().filter(p => p.area === 'muhendislik');

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24">
      <div className="space-y-4">
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase">Mühendislik</h1>
        <p className="text-foreground/50 max-w-2xl">
          ADC Tasarım bünyesinde, gerçek donanıma bağlı, sahada çalışan sistemler.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map(p => (
          <Link key={p.slug} href={`/proje/${p.slug}`}
            className="p-6 glass rounded-2xl border-border hover:border-lcars-orange/40 transition-all space-y-3 block"
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
