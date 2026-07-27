'use client';

import { memo, useState, useMemo, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home, User, ChevronRight, ChevronDown, Folder,
  Wrench, Terminal, X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProjectMetadata } from '@/lib/markdown';
import { useI18n } from '@/lib/i18n';
import { useMobileNav } from './mobile-nav-context';
import type { LucideIcon } from 'lucide-react';

const categoryIcons: Record<string, { icon: LucideIcon; color: string }> = {
  'Mühendislik':        { icon: Wrench,  color: 'bg-lcars-orange' },
  'Lab':                { icon: Terminal, color: 'bg-lcars-cyan' },
  'Diğer Çalışmalar':   { icon: Folder,  color: 'bg-white/50' },
};

const getCat = (cat: string) => categoryIcons[cat] ?? { icon: Folder, color: 'bg-white/50' };

const ProjectLink = memo(function ProjectLink({ project, url, isActive, color }: {
  project: ProjectMetadata; url: string; isActive: boolean; color: string;
}) {
  const { close } = useMobileNav();
  return (
    <Link href={url} onClick={close}
      className={cn(
        "flex items-center gap-2 px-3 py-2 lg:py-1.5 rounded-md transition-all",
        isActive ? "bg-foreground/10 text-foreground" : "text-foreground/40 hover:text-foreground/70 hover:bg-foreground/5"
      )}
    >
      <div className={cn("w-1 h-3 rounded-full shrink-0 transition-opacity", color, isActive ? "opacity-100" : "opacity-0")} />
      <span className="text-[11px] font-medium truncate">{project.title}</span>
    </Link>
  );
});

const CategorySection = memo(function CategorySection({ category, projects, isOpen, isActive, onToggle, pathname }: {
  category: string; projects: ProjectMetadata[]; isOpen: boolean; isActive: boolean; onToggle: () => void; pathname: string;
}) {
  const { icon: Icon, color } = getCat(category);
  return (
    <div>
      <button onClick={onToggle}
        className={cn(
          "w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors",
          isOpen || isActive ? "text-foreground" : "text-foreground/50 hover:text-foreground hover:bg-foreground/5"
        )}
      >
        <div className="flex items-center gap-3">
          <Icon className={cn("w-4 h-4", (isOpen || isActive) ? "" : "opacity-60")} />
          <span className="text-xs font-bold truncate">{category}</span>
        </div>
        {isOpen ? <ChevronDown className="w-3 h-3 opacity-50" /> : <ChevronRight className="w-3 h-3 opacity-50" />}
      </button>

      {(isOpen || isActive) && (
        <div className="mt-1 mb-2 ml-4 border-l border-border pl-2 space-y-0.5">
          {projects.map(p => {
            const url = p.slug === 'GTab' ? '/gtab' : `/proje/${p.slug}`;
            return <ProjectLink key={p.slug} project={p} url={url} isActive={pathname === url} color={color} />;
          })}
        </div>
      )}
    </div>
  );
});

function SidebarContent({ projects, pathname }: { projects: ProjectMetadata[]; pathname: string }) {
  const { t } = useI18n();
  const { close } = useMobileNav();
  const [openCats, setOpenCats] = useState<Record<string, boolean>>({});

  const { grouped, sorted } = useMemo(() => {
    const g: Record<string, ProjectMetadata[]> = { 'Mühendislik': [], 'Lab': [], 'Diğer Çalışmalar': [] };
    projects.forEach(p => {
      const key = p.area === 'muhendislik' ? 'Mühendislik' : p.area === 'lab' ? 'Lab' : 'Diğer Çalışmalar';
      g[key].push(p);
    });
    const sorted = ['Mühendislik', 'Lab', 'Diğer Çalışmalar'].filter(k => g[k].length > 0);
    return { grouped: g, sorted };
  }, [projects]);

  const toggle = useCallback((cat: string) => setOpenCats(p => ({ ...p, [cat]: !p[cat] })), []);

  return (
    <>
      {/* Logo */}
      <div className="px-5 py-5 border-b border-border shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-7 bg-lcars-orange rounded-full" />
          <div>
            <div className="text-sm font-black text-foreground tracking-widest uppercase">Göktuğ</div>
            <div className="text-[10px] font-mono text-foreground/30 uppercase tracking-wider">System Architect</div>
          </div>
        </div>
        {/* Close button — mobile only */}
        <button onClick={close} className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-foreground/8 transition-colors">
          <X className="w-4 h-4 text-foreground/40" />
        </button>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto py-4 flex flex-col custom-scrollbar">
        <nav className="px-3 space-y-0.5 mb-5">
          {[
            { href: '/',            label: t('nav.home'),        accent: 'bg-lcars-orange', icon: Home },
            { href: '/muhendislik', label: t('nav.muhendislik'), accent: 'bg-lcars-orange', icon: Wrench },
            { href: '/lab',         label: t('nav.lab'),         accent: 'bg-lcars-cyan',   icon: Terminal },
            { href: '/hakkimda',    label: t('nav.about'),       accent: 'bg-lcars-gold',   icon: User },
          ].map(({ href, label, accent, icon: Icon }) => (
            <Link key={href} href={href} onClick={close}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
                pathname === href ? "bg-foreground/10 text-foreground" : "text-foreground/40 hover:text-foreground/70 hover:bg-foreground/5"
              )}
            >
              <div className={cn("w-1 h-4 rounded-full shrink-0", accent, pathname === href ? "opacity-100" : "opacity-0")} />
              <Icon className="w-4 h-4 shrink-0" />
              <span className="text-xs font-semibold">{label}</span>
            </Link>
          ))}
        </nav>

        <div className="px-3">
          <div className="px-3 mb-2 text-[10px] font-black text-foreground/20 uppercase tracking-widest">{t('nav.portfolio')}</div>
          <div className="space-y-0.5">
            {sorted.map(cat => (
              <CategorySection key={cat} category={cat} projects={grouped[cat]}
                isOpen={!!openCats[cat]}
                isActive={grouped[cat].some(p => pathname === (p.slug === 'GTab' ? '/gtab' : `/proje/${p.slug}`))}
                onToggle={() => toggle(cat)} pathname={pathname}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-border shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-lcars-green animate-pulse" />
          <span className="text-[10px] font-mono text-foreground/25 uppercase tracking-wider">{projects.length} sistem aktif</span>
        </div>
      </div>
    </>
  );
}

export const Sidebar = memo(function Sidebar({ projects = [] }: { projects?: ProjectMetadata[] }) {
  const pathname = usePathname();
  const { isOpen, close } = useMobileNav();

  // Close on route change
  useEffect(() => { close(); }, [pathname, close]);

  return (
    <>
      {/* ── MOBILE OVERLAY ── */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={close}
          aria-hidden
        />
      )}

      {/* ── SIDEBAR PANEL ── */}
      <aside className={cn(
        "flex flex-col h-full bg-background border-r border-border z-50 select-none transition-transform duration-300 ease-in-out",
        // Mobile: fixed drawer
        "fixed top-0 left-0 w-[80vw] max-w-72 lg:w-64",
        isOpen ? "translate-x-0" : "-translate-x-full",
        // Desktop: static, always visible
        "lg:relative lg:translate-x-0 lg:shrink-0"
      )}>
        <SidebarContent projects={projects} pathname={pathname} />
      </aside>
    </>
  );
});
