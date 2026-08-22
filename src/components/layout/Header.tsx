'use client';

import { Menu, Sun, Moon, Command, Search } from 'lucide-react';
import { useEffect, useState, memo, useCallback } from 'react';
import { useTheme } from 'next-themes';
import { useMobileNav } from './mobile-nav-context';
import { useI18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';

const Clock = memo(function Clock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    setTime(fmt());
    const t = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!time) return null;
  return <span className="text-xs font-mono font-bold text-foreground/80 tracking-widest">{time}</span>;
});

const ThemeToggle = memo(function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-8 h-8" />;
  
  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-foreground/8 active:scale-95 transition-all"
      aria-label="Toggle theme"
      title={isDark ? "Açık Moda Geç" : "Karanlık Moda Geç"}
    >
      {isDark
        ? <Sun className="w-4 h-4 text-foreground/70 hover:text-foreground transition-colors" />
        : <Moon className="w-4 h-4 text-foreground/70 hover:text-foreground transition-colors" />}
    </button>
  );
});

const LanguageSegmented = memo(function LanguageSegmented() {
  const { lang, setLang } = useI18n();

  return (
    <div className="apple-segmented p-0.5 rounded-lg flex items-center bg-muted border border-border">
      <button
        onClick={() => setLang('tr')}
        className={cn(
          "px-2.5 py-1 rounded-md text-[11px] font-mono font-bold tracking-wider transition-all",
          lang === 'tr'
            ? "bg-card text-foreground shadow-xs"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        TR
      </button>
      <button
        onClick={() => setLang('en')}
        className={cn(
          "px-2.5 py-1 rounded-md text-[11px] font-mono font-bold tracking-wider transition-all",
          lang === 'en'
            ? "bg-card text-foreground shadow-xs"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        EN
      </button>
    </div>
  );
});

export const Header = memo(function Header() {
  const { toggle } = useMobileNav();
  const { t } = useI18n();

  const openCommandPalette = useCallback(() => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, metaKey: true, bubbles: true }));
  }, []);

  return (
    <header className="h-14 apple-liquid-glass flex items-center justify-between px-4 sm:px-6 z-40 sticky top-0 shrink-0">

      {/* Left: Mobile Drawer Trigger & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg hover:bg-foreground/8 active:scale-95 transition-all"
          aria-label={t('nav.openMenu')}
        >
          <Menu className="w-5 h-5 text-foreground/70" />
        </button>
        <div className="lg:hidden flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-apple-orange" />
          <span className="text-sm font-bold tracking-tight text-foreground">alazlab</span>
        </div>
      </div>

      {/* Right: Controls & Actions */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={openCommandPalette}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/80 hover:bg-muted border border-border text-muted-foreground hover:text-foreground transition-all group"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">{t('header.searchBtn')}</span>
          <kbd className="text-[10px] font-mono bg-card px-1.5 py-0.5 rounded border border-border shadow-2xs">⌘K</kbd>
        </button>

        <LanguageSegmented />
        <ThemeToggle />

        <div className="hidden sm:flex items-center pl-2 border-l border-border/80">
          <Clock />
        </div>
      </div>
    </header>
  );
});
