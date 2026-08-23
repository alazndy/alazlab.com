import Link from 'next/link';
import { ArrowLeft, LayoutDashboard, ShieldCheck, Globe, Code2 } from 'lucide-react';
import { getProjectBySlug } from '@/lib/markdown';
import { ProjectResourceSections } from '@/components/projects/ProjectResourceSections';

export async function generateStaticParams() {
  return [{ lang: 'tr' }, { lang: 'en' }];
}

export default async function GTabPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';
  const project = getProjectBySlug('GTab');

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-7xl mx-auto animate-in fade-in duration-700 space-y-16">
      
      <Link href={`/${lang}`} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/60 hover:bg-muted border border-border text-xs font-mono tracking-wider uppercase text-muted-foreground hover:text-foreground transition-all">
        <ArrowLeft className="w-3.5 h-3.5" />
        {isEn ? 'Back to Hub' : 'Ana Sayfaya Dön'}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full font-mono text-xs uppercase tracking-widest text-apple-blue font-bold">
              <LayoutDashboard className="w-4 h-4" />
              Browser Extension
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tight text-foreground">GTab</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl font-normal">
              {isEn 
                ? 'A modular new tab workspace for Chrome. Integrates Google Tasks, Calendar, and local notes with offline-first persistence and zero third-party servers.'
                : 'Chrome için modüler yeni sekme çalışma alanı. Google Görevler, Takvim ve yerel notları üçüncü taraf sunucu kullanmadan, yerel depolamayla birleştirir.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a 
              href="https://chromewebstore.google.com/detail/gtab-ki%C5%9Fiselle%C5%9Ftirilebili/ablekgbicginadinndchdojklkojgbdb" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-apple-blue text-white font-semibold text-xs uppercase tracking-wider rounded-xl hover:opacity-90 transition-all shadow-md"
            >
              <Globe className="w-4 h-4" />
              {isEn ? 'Add to Chrome' : "Chrome'a Ekle"}
            </a>
            <a 
              href="https://github.com/alazndy/GTab" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-card text-foreground font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-muted border border-border transition-all"
            >
              <Code2 className="w-4 h-4" />
              {isEn ? 'Source Code' : 'Kaynak Kod'}
            </a>
            <Link
              href={`/${lang}/gtab/privacy-policy`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground bg-card hover:bg-muted border border-border transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-apple-green" />
              {isEn ? 'Privacy Policy' : 'Gizlilik Politikası'}
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="apple-card overflow-hidden shadow-2xl">
            <div className="aspect-[4/3] bg-muted/60 flex items-center justify-center p-8">
              {/* Abstract Representation of GTab */}
              <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-3">
                <div className="col-span-2 row-span-2 bg-card rounded-xl border border-border shadow-xs" />
                <div className="bg-orange-500/10 rounded-xl border border-orange-500/20" />
                <div className="bg-blue-500/10 rounded-xl border border-blue-500/20" />
                <div className="col-span-3 bg-card rounded-xl border border-border shadow-xs" />
              </div>
            </div>
            <div className="p-5 bg-card border-t border-border flex items-center justify-between text-xs font-mono">
              <span className="text-muted-foreground">Version 4.3.0 · Manifest V3</span>
              <span className="text-apple-green font-bold">Chrome Web Store</span>
            </div>
          </div>
        </div>
      </div>

      {project && <ProjectResourceSections project={project.metadata} />}
    </div>
  );
}
