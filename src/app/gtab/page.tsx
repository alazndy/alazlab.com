import Link from 'next/link';
import { ArrowLeft, LayoutDashboard, ShieldCheck, Globe, Code2 } from 'lucide-react';
import { getProjectBySlug } from '@/lib/markdown';
import { ProjectResourceSections } from '@/components/projects/ProjectResourceSections';

export default function GTabPage() {
  const project = getProjectBySlug('GTab');

  return (
    <div className="min-h-screen py-20 px-6 max-w-5xl mx-auto animate-in fade-in duration-1000 space-y-16">
      
      <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-lcars-cyan transition-colors font-mono tracking-widest uppercase text-sm">
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full font-mono text-xs uppercase tracking-widest text-lcars-cyan">
              <LayoutDashboard className="w-4 h-4" />
              Browser Extension
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white">GTab</h1>
            <p className="text-xl text-white/60 leading-relaxed max-w-xl font-light">
              A highly customizable, modular new tab page for Chrome. Organize your digital life with Google Tasks, Calendar, Weather, and dynamic widgets in a beautiful grid layout.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a 
              href="https://chromewebstore.google.com/detail/gtab-ki%C5%9Fiselle%C5%9Ftirilebili/ablekgbicginadinndchdojklkojgbdb" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-lcars-cyan text-black font-black uppercase tracking-widest rounded-2xl hover:bg-white transition-all transform hover:scale-105"
            >
              <Globe className="w-5 h-5" />
              Add to Chrome
            </a>
            <a 
              href="https://github.com/alazndy/GTab" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 border border-white/10 transition-all"
            >
              <Code2 className="w-5 h-5" />
              Source Code
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="absolute -inset-4 bg-lcars-cyan/20 blur-3xl rounded-full opacity-50" />
          <div className="glass border-white/10 rounded-[32px] overflow-hidden relative shadow-2xl">
            <div className="aspect-[4/3] bg-black/40 flex items-center justify-center p-8">
              {/* Abstract Representation of GTab */}
              <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-3 opacity-80">
                <div className="col-span-2 row-span-2 bg-white/10 rounded-xl border border-white/5" />
                <div className="bg-lcars-orange/20 rounded-xl border border-lcars-orange/30" />
                <div className="bg-lcars-cyan/20 rounded-xl border border-lcars-cyan/30" />
                <div className="col-span-3 bg-white/5 rounded-xl border border-white/5" />
              </div>
            </div>
            <div className="p-6 bg-black/60 border-t border-white/5 flex items-center justify-between">
              <span className="font-mono text-xs text-white/40 uppercase tracking-widest">Version 4.3.0</span>
              <span className="flex items-center gap-2 text-lcars-green font-mono text-xs uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-lcars-green animate-pulse" />
                Stable
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Modular Grid", desc: "Freely resize and drag widgets to build your perfect workspace." },
          { title: "Google Integration", desc: "Securely connect Tasks and Calendar to manage your day directly from the new tab." },
          { title: "Privacy First", desc: "All data stays local. No tracking, no external servers, complete transparency." }
        ].map(feature => (
          <div key={feature.title} className="glass p-8 rounded-3xl border-white/10 space-y-4 hover:border-lcars-cyan/30 transition-all group">
            <h3 className="text-lg font-black text-white uppercase tracking-tight group-hover:text-lcars-cyan transition-colors">{feature.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center pt-12 border-t border-white/5">
        <Link 
          href="/gtab/privacy-policy" 
          className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all font-mono text-sm uppercase tracking-widest text-white/80"
        >
          <ShieldCheck className="w-4 h-4 text-lcars-orange" />
          View Privacy Policy
        </Link>
      </div>

      {project && <ProjectResourceSections project={project.metadata} />}

    </div>
  );
}
