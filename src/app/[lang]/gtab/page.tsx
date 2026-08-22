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
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-7xl mx-auto animate-in fade-in duration-1000 space-y-16">
      
      <Link href={`/${lang}`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-lcars-cyan transition-colors font-mono tracking-widest uppercase text-xs">
        <ArrowLeft className="w-4 h-4" />
        {isEn ? 'Back to Hub' : 'Ana Sayfaya Dön'}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-foreground/5 border border-border rounded-full font-mono text-xs uppercase tracking-widest text-lcars-cyan">
              <LayoutDashboard className="w-4 h-4" />
              Browser Extension
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-foreground">GTab</h1>
            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-xl font-light">
              {isEn 
                ? 'A highly customizable, modular new tab page for Chrome. Organize your digital life with Google Tasks, Calendar, Weather, and dynamic widgets in a beautiful grid layout.'
                : 'Chrome için yüksek düzeyde özelleştirilebilir, modüler yeni sekme sayfası. Google Görevler, Takvim, Hava Durumu ve dinamik widget\'larla dijital hayatınızı düzenleyin.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a 
              href="https://chromewebstore.google.com/detail/gtab-ki%C5%9Fiselle%C5%9Ftirilebili/ablekgbicginadinndchdojklkojgbdb" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-lcars-cyan text-black font-black uppercase tracking-widest rounded-2xl hover:bg-white transition-all transform hover:scale-105 shadow-lg shadow-sky-500/20"
            >
              <Globe className="w-5 h-5" />
              {isEn ? 'Add to Chrome' : "Chrome'a Ekle"}
            </a>
            <a 
              href="https://github.com/alazndy/GTab" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-foreground/5 text-foreground font-black uppercase tracking-widest rounded-2xl hover:bg-foreground/10 border border-border transition-all"
            >
              <Code2 className="w-5 h-5" />
              {isEn ? 'Source Code' : 'Kaynak Kod'}
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="absolute -inset-4 bg-lcars-cyan/20 blur-3xl rounded-full opacity-50" />
          <div className="glass border-border rounded-3xl overflow-hidden relative shadow-2xl bg-card">
            <div className="aspect-[4/3] bg-muted flex items-center justify-center p-8">
              {/* Abstract Representation of GTab */}
              <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-3 opacity-80">
                <div className="col-span-2 row-span-2 bg-foreground/10 rounded-xl border border-border" />
                <div className="bg-lcars-orange/20 rounded-xl border border-lcars-orange/30" />
                <div className="bg-lcars-cyan/20 rounded-xl border border-lcars-cyan/30" />
                <div className="col-span-3 bg-foreground/5 rounded-xl border border-border" />
              </div>
            </div>
            <div className="p-6 bg-card border-t border-border flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">Version 4.3.0</span>
              <span className="flex items-center gap-2 text-lcars-green font-mono text-xs uppercase tracking-widest font-bold">
                <span className="w-2 h-2 rounded-full bg-lcars-green animate-pulse" />
                Stable
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { 
            title: isEn ? "Modular Grid" : "Modüler Grid", 
            desc: isEn ? "Freely resize and drag widgets to build your perfect workspace." : "Mükemmel çalışma alanınızı oluşturmak için bileşenleri serbestçe yeniden boyutlandırın ve sürükleyin." 
          },
          { 
            title: isEn ? "Google Integration" : "Google Entegrasyonu", 
            desc: isEn ? "Securely connect Tasks and Calendar to manage your day directly from the new tab." : "Gününüzü doğrudan yeni sekmeden yönetmek için Görevler ve Takvimi güvenle bağlayın." 
          },
          { 
            title: isEn ? "Privacy First" : "Önce Gizlilik", 
            desc: isEn ? "All data stays local. No tracking, no external servers, complete transparency." : "Tüm veriler yerel kalır. İzleme yok, harici sunucu yok, tam şeffaflık." 
          }
        ].map(feature => (
          <div key={feature.title} className="glass p-8 rounded-3xl border-border space-y-4 hover:border-lcars-cyan/40 transition-all group bg-card">
            <h3 className="text-lg font-black text-foreground uppercase tracking-tight group-hover:text-lcars-cyan transition-colors">{feature.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center pt-12 border-t border-border">
        <Link 
          href={`/${lang}/gtab/privacy-policy`} 
          className="inline-flex items-center gap-3 px-6 py-3.5 bg-foreground/5 hover:bg-foreground/10 rounded-xl border border-border transition-all font-mono text-xs uppercase tracking-widest text-foreground font-bold"
        >
          <ShieldCheck className="w-4 h-4 text-lcars-orange" />
          {isEn ? 'View Privacy Policy' : 'Gizlilik Politikasını Görüntüle'}
        </Link>
      </div>

      {project && <ProjectResourceSections project={project.metadata} />}

    </div>
  );
}
