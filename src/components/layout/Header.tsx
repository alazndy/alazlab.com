'use client';

import { Menu, Sun, Moon, Command } from 'lucide-react';
import { useEffect, useState, memo, useCallback } from 'react';
import { useTheme } from 'next-themes';
import { useMobileNav } from './mobile-nav-context';

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
    >
      {theme === 'dark'
        ? <Sun className="w-4 h-4 text-foreground/40" />
        : <Moon className="w-4 h-4 text-foreground/40" />}
    </button>
  );
});

export const Header = memo(function Header() {
  const { toggle } = useMobileNav();

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
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5 text-foreground/60" />
        </button>
        <span className="lg:hidden text-sm font-black text-foreground uppercase tracking-widest">alazlab</span>
      </div>

      {/* Right: toggles + clock + cmd palette */}
      <div className="flex items-center gap-2">
        <ThemeToggle />

        <button
          onClick={openCommandPalette}
          className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border hover:border-foreground/20 hover:bg-foreground/5 transition-all group"
        >
          <Command className="w-3.5 h-3.5 text-foreground/30 group-hover:text-foreground/60" />
          <span className="text-[10px] font-mono text-foreground/25 group-hover:text-foreground/50 uppercase">ARA</span>
          <span className="text-[9px] font-mono text-foreground/15 border border-foreground/10 rounded px-1.5 py-0.5">⌘K</span>
        </button>

        <div className="hidden sm:block pl-2 border-l border-border">
          <Clock />
        </div>
      </div>
    </header>
  );
});
