'use client';

import { memo, useState, useMemo, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home, User, ChevronRight, ChevronDown, Folder,
  Wrench, Terminal, X, Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProjectMetadata } from '@/lib/markdown';
import { useI18n } from '@/lib/i18n';
import { useMobileNav } from './mobile-nav-context';
import type { LucideIcon } from 'lucide-react';

const categoryIcons: Record<string, { icon: LucideIcon; color: string }> = {
  'Mühendislik':        { icon: Wrench,  color: 'bg-apple-orange' },
  'Lab':                { icon: Terminal, color: 'bg-apple-cyan' },
  'Diğer Çalışmalar':   { icon: Folder,  color: 'bg-muted-foreground' },
};

const getCat = (cat: string) => categoryIcons[cat] ?? { icon: Folder, color: 'bg-muted-foreground' };

const ProjectLink = memo(function ProjectLink({ project, url, isActive, color }: {
  project: ProjectMetadata; url: string; isActive: boolean; color: string;
}) {
  const { close } = useMobileNav();
  return (
    <Link href={url} onClick={close}
      className={cn(
        "flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
        isActive
          ? "bg-foreground/10 text-foreground font-semibold shadow-2xs"
          : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
      )}
    >
      <div className={cn("w-1.5 h-1.5 rounded-full shrink-0 transition-opacity", color, isActive ? "opacity-100" : "opacity-40")} />
      <span className="truncate">{project.title}</span>
    </Link>
  );
});

const CategorySection = memo(function CategorySection({ category, displayLabel, projects, isOpen, isActive, onToggle, pathname, localizePath }: {
  category: string; displayLabel: string; projects: ProjectMetadata[]; isOpen: boolean; isActive: boolean; onToggle: () => void; pathname: string; localizePath: (path: string) => string;
}) {
  const { icon: Icon, color } = getCat(category);
  return (
    <div>
      <button onClick={onToggle}
        className={cn(
          "w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors",
          isOpen || isActive
            ? "text-foreground bg-foreground/[0.03]"
            : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
        )}
      >
        <div className="flex items-center gap-2.5">
          <Icon className={cn("w-4 h-4", (isOpen || isActive) ? "text-foreground" : "text-muted-foreground")} />
          <span className="truncate">{displayLabel}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono text-muted-foreground/60">{projects.length}</span>
          {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />}
        </div>
      </button>

      {(isOpen || isActive) && (
        <div className="mt-1 mb-2 ml-3 border-l border-border/80 pl-2 space-y-0.5">
          {projects.map(p => {
            const url = p.slug === 'GTab' ? localizePath('/gtab') : localizePath(`/proje/${p.slug}`);
            return <ProjectLink key={p.slug} project={p} url={url} isActive={pathname === url} color={color} />;
          })}
        </div>
      )}
    </div>
  );
});

function SidebarContent({ projects, pathname }: { projects: ProjectMetadata[]; pathname: string }) {
  const { t, localizePath } = useI18n();
  const { close } = useMobileNav();
  const [openCats, setOpenCats] = useState<Record<string, boolean>>({ 'Mühendislik': true, 'Lab': true });

  const { grouped, sorted } = useMemo(() => {
    const g: Record<string, ProjectMetadata[]> = { 'Mühendislik': [], 'Lab': [], 'Diğer Çalışmalar': [] };
    projects.forEach(p => {
      const key = p.area === 'muhendislik' ? 'Mühendislik' : p.area === 'lab' ? 'Lab' : 'Diğer Çalışmalar';
      g[key].push(p);
    });
    const sorted = ['Mühendislik', 'Lab', 'Diğer Çalışmalar'].filter(k => g[k].length > 0);
    return { grouped: g, sorted };
  }, [projects]);

  const getCatLabel = useCallback((cat: string) => {
    if (cat === 'Mühendislik') return t('cat.engineering');
    if (cat === 'Lab') return t('cat.lab');
    return t('cat.other');
  }, [t]);

  const toggle = useCallback((cat: string) => setOpenCats(p => ({ ...p, [cat]: !p[cat] })), []);

  return (
    <>
      {/* macOS Window Header Style Logo */}
      <div className="px-5 py-4 border-b border-border/60 shrink-0 flex items-center justify-between">
        <Link href={localizePath('/')} onClick={close} className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-xl bg-foreground/5 border border-border flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-apple-orange" />
          </div>
          <div>
            <div className="text-sm font-bold text-foreground tracking-tight">Göktuğ Turhan</div>
            <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{t('hero.role').split('·')[0].trim()}</div>
          </div>
        </Link>
        {/* Mobile close */}
        <button onClick={close} className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-foreground/8 transition-colors">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto py-3 px-3 flex flex-col custom-scrollbar space-y-4">
        <nav className="space-y-0.5">
          {[
            { href: localizePath('/'),            label: t('nav.home'),        icon: Home },
            { href: localizePath('/muhendislik'), label: t('nav.muhendislik'), icon: Wrench },
            { href: localizePath('/lab'),         label: t('nav.lab'),         icon: Terminal },
            { href: localizePath('/hakkimda'),    label: t('nav.about'),       icon: User },
          ].map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link key={href} href={href} onClick={close}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all",
                  isActive
                    ? "bg-foreground text-background shadow-xs font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div>
          <div className="px-3 mb-1.5 text-[10px] font-bold text-muted-foreground/70 uppercase tracking-widest">{t('nav.portfolio')}</div>
          <div className="space-y-0.5">
            {sorted.map(cat => (
              <CategorySection key={cat} category={cat} displayLabel={getCatLabel(cat)} projects={grouped[cat]}
                isOpen={!!openCats[cat]}
                isActive={grouped[cat].some(p => pathname === (p.slug === 'GTab' ? localizePath('/gtab') : localizePath(`/proje/${p.slug}`)))}
                onToggle={() => toggle(cat)} pathname={pathname} localizePath={localizePath}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer Status */}
      <div className="px-5 py-3 border-t border-border/60 shrink-0 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-apple-green animate-pulse" />
          <span>{projects.length} {t('nav.systemsActive')}</span>
        </div>
        <span className="text-[9px] uppercase tracking-wider text-muted-foreground/60">v5.2</span>
      </div>
    </>
  );
}

export const Sidebar = memo(function Sidebar({ projects = [] }: { projects?: ProjectMetadata[] }) {
  const pathname = usePathname();
  const { isOpen, close } = useMobileNav();

  useEffect(() => { close(); }, [pathname, close]);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-md transition-opacity"
          onClick={close}
          aria-hidden
        />
      )}

      {/* macOS Translucent Sidebar */}
      <aside className={cn(
        "flex flex-col h-full bg-sidebar/95 backdrop-blur-2xl border-r border-border z-50 select-none transition-transform duration-300 ease-in-out",
        "fixed top-0 left-0 w-[80vw] max-w-72 lg:w-64",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "lg:relative lg:translate-x-0 lg:shrink-0"
      )}>
        <SidebarContent projects={projects} pathname={pathname} />
      </aside>
    </>
  );
});
