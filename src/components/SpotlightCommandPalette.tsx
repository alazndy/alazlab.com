'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Command,
  ArrowRight,
  Sparkles,
  Cpu,
  Layers,
  Globe,
  Radio,
  FileCode2,
  Terminal,
  ShieldCheck,
  ChevronRight,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';

interface SearchItem {
  id: string;
  title: string;
  category: string;
  summaryTr: string;
  summaryEn: string;
  href: string;
  tags: string[];
  icon: 'cpu' | 'radar' | 'cli' | 'tab' | 'code' | 'page';
  isExternal?: boolean;
}

const SEARCH_ITEMS: SearchItem[] = [
  // Flagships
  {
    id: 'gt-launcher',
    title: 'GT-Launcher',
    category: 'Flagship Mobile',
    summaryTr: 'Star Trek LCARS tarzı Android 14 launcher, 2D grid ve OBD araç modu.',
    summaryEn: 'Star Trek LCARS-style Android 14 launcher with custom 2D grid and OBD HUD.',
    href: '/proje/GT-Launcher',
    tags: ['Android', 'Kotlin', 'Jetpack Compose', 'LCARS', 'OBD-II', 'Launcher'],
    icon: 'code',
  },
  {
    id: 'unicontrol',
    title: 'UniControl',
    category: 'Flagship Embedded',
    summaryTr: 'ESP32-S3 Brigade BS-9000 radar ve CAN 2.0B / FD araç telemetri kontrolcüsü.',
    summaryEn: 'ESP32-S3 Brigade BS-9000 radar and CAN 2.0B / FD vehicle telemetry unit.',
    href: '/proje/UniControl',
    tags: ['ESP32-S3', 'ESP-IDF', 'CAN Bus', 'Radar', 'FreeRTOS', 'Automotive'],
    icon: 'radar',
  },
  {
    id: 'raios',
    title: 'R-AI-OS',
    category: 'Flagship System',
    summaryTr: 'Rust tabanlı AI çalışma alanı çekirdeği, trigram arama ve MCP politika motoru.',
    summaryEn: 'Local AI workspace orchestration kernel in Rust with trigram search & MCP gates.',
    href: '/proje/R-AI-OS',
    tags: ['Rust', 'Tokio', 'Ratatui', 'MCP', 'fastembed', 'CLI', 'Orchestration'],
    icon: 'cli',
  },
  {
    id: 'gtab',
    title: 'GTab',
    category: 'Flagship Web',
    summaryTr: 'Chrome için Google Görevler ve yerel IndexedDB destekli yeni sekme paneli.',
    summaryEn: 'Privacy-focused Chrome new tab workspace with Google Tasks and IndexedDB.',
    href: '/gtab',
    tags: ['Chrome Extension', 'Manifest V3', 'React', 'IndexedDB', 'Google Tasks'],
    icon: 'tab',
  },
  {
    id: 'ai-trader',
    title: 'AI_Trader',
    category: 'AI & Data',
    summaryTr: 'Makine öğrenimi destekli kantitatif algoritmik kripto ve hisse alım satım motoru.',
    summaryEn: 'Machine learning powered quantitative trading and backtesting engine.',
    href: '/proje/AI_Trader',
    tags: ['Python', 'PyTorch', 'FastAPI', 'Pandas', 'Quantitative'],
    icon: 'code',
  },
  {
    id: 'tek-ui',
    title: 'tek-ui',
    category: 'Web & Design',
    summaryTr: 'Next.js ve React 19 için endüstriyel LCARS ve Liquid Glass tasarım bileşenleri.',
    summaryEn: 'Industrial LCARS and Liquid Glass UI component library for Next.js & React 19.',
    href: '/proje/tek-ui',
    tags: ['React 19', 'Next.js', 'Tailwind CSS', 'Radix UI', 'Design System'],
    icon: 'code',
  },
  {
    id: 'env-i',
    title: 'ENV-I',
    category: 'Embedded & IoT',
    summaryTr: 'Endüstriyel sahalar için ESP32 tabanlı çoklu sensör ve hava kalitesi telemetri istasyonu.',
    summaryEn: 'Industrial multi-sensor environmental telemetry station powered by ESP32.',
    href: '/proje/ENV-I',
    tags: ['ESP32', 'MQTT', 'InfluxDB', 'Grafana', 'Sensors'],
    icon: 'cpu',
  },
  // Core Navigation Pages
  {
    id: 'page-engineering',
    title: 'Mühendislik Projeleri / Engineering',
    category: 'Page Hub',
    summaryTr: 'Donanım, gömülü sistemler, otomotiv ve çekirdek yazılım projeleri.',
    summaryEn: 'Hardware, embedded systems, automotive, and kernel engineering projects.',
    href: '/muhendislik',
    tags: ['Engineering', 'Embedded', 'Hardware', 'Rust', 'C++'],
    icon: 'page',
  },
  {
    id: 'page-lab',
    title: 'Yazılım Laboratuvarı / Software Lab',
    category: 'Page Hub',
    summaryTr: 'Web uygulamaları, AI ajan sistemleri, araçlar ve açık kaynak kütüphaneler.',
    summaryEn: 'Web apps, AI agent pipelines, developer tools, and open-source libraries.',
    href: '/lab',
    tags: ['Lab', 'Web', 'React', 'AI', 'Next.js'],
    icon: 'page',
  },
  {
    id: 'page-about',
    title: 'Hakkımda / About Göktuğ',
    category: 'Page Hub',
    summaryTr: 'Göktuğ Turhan biyografisi, mühendislik yaklaşımı ve iletişim kanalları.',
    summaryEn: 'Biography of Göktuğ Turhan, engineering philosophy, and contact details.',
    href: '/hakkimda',
    tags: ['About', 'Contact', 'Bio', 'Philosophy'],
    icon: 'page',
  },
];

export function SpotlightCommandPalette() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const { lang } = useI18n();
  const isEn = lang === 'en';
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Global keydown listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Filtered search results
  const results = useMemo(() => {
    if (!query.trim()) return SEARCH_ITEMS;
    const q = query.toLowerCase();
    return SEARCH_ITEMS.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchCategory = item.category.toLowerCase().includes(q);
      const matchSummary = isEn
        ? item.summaryEn.toLowerCase().includes(q)
        : item.summaryTr.toLowerCase().includes(q);
      const matchTags = item.tags.some((t) => t.toLowerCase().includes(q));
      return matchTitle || matchCategory || matchSummary || matchTags;
    });
  }, [query, isEn]);

  // Handle keyboard navigation inside search list
  const handleItemKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      navigate(results[selectedIndex]);
    }
  };

  const navigate = (item: SearchItem) => {
    setIsOpen(false);
    if (item.isExternal) {
      window.open(item.href, '_blank');
    } else {
      router.push(`/${lang}${item.href.startsWith('/') ? item.href : '/' + item.href}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={() => setIsOpen(false)} />

      {/* Spotlight Window */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-2xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 animate-in zoom-in-95 duration-200"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-muted/30">
          <Search className="w-5 h-5 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleItemKeyDown}
            placeholder={isEn ? 'Search projects, hardware, wiki docs, or tags...' : 'Projeler, donanım mimarileri, wiki veya etiketlerde ara...'}
            className="w-full bg-transparent text-sm sm:text-base font-medium focus:outline-hidden text-foreground placeholder:text-muted-foreground"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full hover:bg-muted text-muted-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted border border-border text-[10px] font-mono text-muted-foreground">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {results.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              {isEn ? 'No matching projects or documents found.' : 'Eşleşen proje veya doküman bulunamadı.'}
            </div>
          ) : (
            results.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => navigate(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={cn(
                    "flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all",
                    isSelected
                      ? "bg-foreground text-background shadow-md"
                      : "hover:bg-muted/70 text-foreground"
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                      isSelected
                        ? "bg-background/20 text-background"
                        : "bg-muted border border-border text-foreground/80"
                    )}>
                      {item.icon === 'radar' && <Radio className="w-4 h-4" />}
                      {item.icon === 'cli' && <Terminal className="w-4 h-4" />}
                      {item.icon === 'tab' && <Layers className="w-4 h-4" />}
                      {item.icon === 'cpu' && <Cpu className="w-4 h-4" />}
                      {item.icon === 'page' && <Globe className="w-4 h-4" />}
                      {item.icon === 'code' && <FileCode2 className="w-4 h-4" />}
                    </div>

                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm tracking-tight truncate">{item.title}</span>
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-[10px] font-mono",
                          isSelected ? "bg-background/20 text-background" : "bg-muted text-muted-foreground"
                        )}>
                          {item.category}
                        </span>
                      </div>
                      <p className={cn(
                        "text-[11px] sm:text-xs truncate font-normal",
                        isSelected ? "text-background/80" : "text-muted-foreground"
                      )}>
                        {isEn ? item.summaryEn : item.summaryTr}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className={cn(
                    "w-4 h-4 shrink-0 transition-transform ml-2",
                    isSelected ? "text-background translate-x-0.5" : "text-muted-foreground"
                  )} />
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 border-t border-border bg-muted/20 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span>41 projects indexed</span>
        </div>

      </div>
    </div>
  );
}
