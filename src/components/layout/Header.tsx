'use client';

import { Menu, Sun, Moon, Command, Globe } from 'lucide-react';
import { useEffect, useState, memo, useCallback } from 'react';
import { useTheme } from 'next-themes';
import { useMobileNav } from './mobile-nav-context';
import { useI18n } from '@/lib/i18n';

const Clock = memo(function Clock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    setTime(fmt());
    const t = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!time) return null;
  return <span className="text-xs font-mono font-black text-lcars-cyan tracking-widest">{time}</span>;
});

const ThemeToggle = memo(function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-8 h-8" />;
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-foreground/8 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark'
        ? <Sun className="w-4 h-4 text-foreground/40" />
        : <Moon className="w-4 h-4 text-foreground/40" />}
    </button>
  );
});

const LanguageToggle = memo(function LanguageToggle() {
  const { lang, setLang } = useI18n();

  return (
    <button
      onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
      className="flex items-center gap-1 h-8 px-2.5 rounded-lg border border-border hover:border-foreground/20 hover:bg-foreground/5 text-xs font-mono font-bold text-foreground/60 hover:text-foreground transition-all"
      aria-label="Toggle language"
      title={lang === 'tr' ? 'Switch to English' : "Türkçe'ye Geç"}
    >
      <Globe className="w-3.5 h-3.5 text-foreground/40" />
      <span className={lang === 'tr' ? 'text-lcars-cyan font-black' : 'text-foreground/30'}>TR</span>
      <span className="text-foreground/20">/</span>
      <span className={lang === 'en' ? 'text-lcars-cyan font-black' : 'text-foreground/30'}>EN</span>
    </button>
  );
});

export const Header = memo(function Header() {
  const { toggle } = useMobileNav();
  const { t } = useI18n();

  const openCommandPalette = useCallback(() => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, metaKey: true, bubbles: true }));
  }, []);

  return (
    <header className="h-14 border-b border-border flex items-center justify-between px-4 md:px-6 z-10 relative shrink-0 bg-background/80 backdrop-blur-sm">

      {/* Left: hamburger (mobile) + logo text (mobile only) */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg hover:bg-foreground/8 transition-colors"
          aria-label={t('nav.openMenu')}
        >
          <Menu className="w-5 h-5 text-foreground/60" />
        </button>
        <span className="lg:hidden text-sm font-black text-foreground uppercase tracking-widest">alazlab</span>
      </div>

      {/* Right: toggles + clock + cmd palette */}
      <div className="flex items-center gap-2">
        <LanguageToggle />
        <ThemeToggle />

        <button
          onClick={openCommandPalette}
          className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border hover:border-foreground/20 hover:bg-foreground/5 transition-all group"
        >
          <Command className="w-3.5 h-3.5 text-foreground/30 group-hover:text-foreground/60" />
          <span className="text-[10px] font-mono text-foreground/25 group-hover:text-foreground/50 uppercase">{t('header.searchBtn')}</span>
          <span className="text-[9px] font-mono text-foreground/15 border border-foreground/10 rounded px-1.5 py-0.5">⌘K</span>
        </button>

        <div className="hidden sm:block pl-2 border-l border-border">
          <Clock />
        </div>
      </div>
    </header>
  );
});
