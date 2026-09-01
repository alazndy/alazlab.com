'use client';

import { useState, useEffect } from 'react';
import { Smartphone, Layers, Palette, History, BookOpen, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';

// Page-wide rail — mirrors the app's own icon rail (HOME flag tab + a tight
// stack of solid, permanently-colored icon squares), but scoped to the whole
// GT-Launcher page (flagship block, changelog, wiki/media/downloads tabs)
// instead of just the flagship block's own three sections.
const RAIL_SECTIONS: { id: string; icon: typeof Smartphone; labelTr: string; labelEn: string; solid?: string }[] = [
  { id: 'gt-home', icon: Smartphone, labelTr: 'Ana Ekran', labelEn: 'Home' },
  { id: 'gt-modules', icon: Layers, labelTr: 'Modüller', labelEn: 'Modules', solid: 'bg-[#FF9900] text-black' },
  { id: 'gt-styles', icon: Palette, labelTr: 'Stiller', labelEn: 'Styles', solid: 'bg-[#9999CC] text-black' },
  { id: 'changelog', icon: History, labelTr: 'Sürüm Geçmişi', labelEn: 'Changelog', solid: 'bg-[#FFCC66] text-black' },
  { id: 'project-tabs', icon: BookOpen, labelTr: 'Wiki & Kaynaklar', labelEn: 'Wiki & Resources', solid: 'bg-[#9977AA] text-black' },
];

export function GTLauncherSidebar() {
  const { lang } = useI18n();
  const isEn = lang === 'en';
  const [activeRailId, setActiveRailId] = useState<string>(RAIL_SECTIONS[0].id);

  useEffect(() => {
    const targets = RAIL_SECTIONS
      .map((r) => document.getElementById(r.id))
      .filter((el): el is HTMLElement => !!el);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveRailId(visible.target.id);
      },
      { root: null, rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    // Mobile: a horizontal top bar (spends height, which phones have plenty
    // of via scrolling, not width). sm+: back to the app's real vertical
    // rail, which only makes sense once there's width to spare for it.
    <nav className="dark flex flex-row sm:flex-col gap-1.5 sm:gap-0 shrink-0 sticky top-2 sm:top-4 self-start w-full sm:w-14 md:w-16 h-fit z-10">
      {/* HOME flag tab — light, like the app's status flag; elbow-shaped
          corner only at sm+ where it sits atop a vertical stack. */}
      <a
        href={`#${RAIL_SECTIONS[0].id}`}
        aria-label={isEn ? RAIL_SECTIONS[0].labelEn : RAIL_SECTIONS[0].labelTr}
        title={isEn ? RAIL_SECTIONS[0].labelEn : RAIL_SECTIONS[0].labelTr}
        className={cn(
          "shrink-0 flex items-center justify-center w-11 h-11 sm:w-auto sm:h-auto rounded-xl sm:rounded-xl sm:rounded-tl-[4px] sm:rounded-tr-[20px] text-center text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider sm:py-1.5 bg-[#FFEECC] text-[#553311] transition-opacity",
          activeRailId === RAIL_SECTIONS[0].id ? "opacity-100" : "opacity-80 hover:opacity-100"
        )}
      >
        {isEn ? 'HOME' : 'ANA'}
      </a>

      {/* Icon squares — one per page section. Mobile: fills the bar (flex-1),
          keeps the vertical stack look at sm+. */}
      <div className="flex flex-row sm:flex-col flex-1 sm:flex-initial gap-1.5 sm:mt-1.5">
        {RAIL_SECTIONS.slice(1).map((r) => {
          const RailIcon = r.icon;
          const isActive = r.id === activeRailId;
          return (
            <a
              key={r.id}
              href={`#${r.id}`}
              aria-label={isEn ? r.labelEn : r.labelTr}
              title={isEn ? r.labelEn : r.labelTr}
              className={cn(
                "flex-1 sm:flex-initial h-11 sm:h-14 md:h-16 sm:w-14 md:w-16 rounded-[10px] border border-black/40 flex items-center justify-center transition-all",
                r.solid,
                isActive ? "ring-2 ring-white/80 scale-105 shadow-lg" : "opacity-85 hover:opacity-100"
              )}
            >
              <RailIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </a>
          );
        })}
        <a
          href="https://play.google.com/store/apps/details?id=com.alazndy.gtlauncher"
          target="_blank"
          rel="noreferrer"
          aria-label={isEn ? 'Get on Google Play' : "Google Play'den İndir"}
          title={isEn ? 'Get on Google Play' : "Google Play'den İndir"}
          className="flex-1 sm:flex-initial h-11 sm:h-14 md:h-16 sm:w-14 md:w-16 rounded-[10px] border border-black/40 flex items-center justify-center bg-[#AA4444] text-black opacity-85 hover:opacity-100 transition-all"
        >
          <Play className="w-4.5 h-4.5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </a>
      </div>
    </nav>
  );
}
