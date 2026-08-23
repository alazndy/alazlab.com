'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  ShieldCheck,
  Globe,
  Code2,
  CheckCircle2,
  ExternalLink,
  Search,
  Plus,
  Trash2,
  Clock,
  Palette,
  Sparkles,
  Layers,
  Flame,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';

interface Task {
  id: number;
  text: string;
  done: boolean;
}

export function GTabClient() {
  const { lang } = useI18n();
  const isEn = lang === 'en';

  // Interactive Playground State
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: isEn ? 'Review PR for GT-Launcher v4.3' : 'GT-Launcher v4.3 PR incelemesi', done: true },
    { id: 2, text: isEn ? 'Update ISO 16750 radar test logs' : 'ISO 16750 radar test kayıtlarını güncelle', done: false },
    { id: 3, text: isEn ? 'Ship Chrome Web Store release' : 'Chrome Web Store sürümünü yayınla', done: false },
  ]);
  const [newTaskInput, setNewTaskInput] = useState('');
  const [noteContent, setNoteContent] = useState(
    isEn
      ? 'Manifest V3 compliant local notes. Stored in IndexedDB with zero remote tracking.'
      : 'Manifest V3 uyumlu yerel notlar. Sıfır uzaktan takip ve IndexedDB yerel depolama.'
  );
  const [timeStr, setTimeStr] = useState('12:00:00');
  const [searchEngine, setSearchEngine] = useState<'Google' | 'GitHub' | 'Kagi'>('Google');
  const [themeMode, setThemeMode] = useState<'dark' | 'amber' | 'slate'>('dark');

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTimeStr(
        `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTaskInput.trim(), done: false }]);
    setNewTaskInput('');
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <section className="space-y-8">

      {/* Flagship Hero Card */}
      <div className="apple-card p-8 sm:p-12 md:p-14 space-y-8 relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold bg-blue-500/10 text-apple-blue border border-blue-500/20">
              <LayoutDashboard className="w-3.5 h-3.5" />
              Manifest V3 · Chrome Extension
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-muted text-foreground/80 border border-border">
              v4.3.0 Verified
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono text-apple-green bg-green-500/10 border border-green-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
              100% Offline-First (No Cloud DB)
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.02]">
            GTab
          </h1>

          <p className="text-base sm:text-xl text-muted-foreground leading-relaxed font-normal max-w-2xl">
            {isEn
              ? 'Modular, privacy-focused productivity dashboard for Google Chrome. Seamlessly embeds Google Tasks, Calendar events, quick notes, and custom RSS feeds into your new tab.'
              : 'Google Chrome için gizlilik odaklı modüler yeni sekme çalışma alanı: Google Görevler, Takvim etkinlikleri, hızlı not defteri ve yerel depolama entegrasyonu.'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="https://chromewebstore.google.com/detail/gtab-ki%C5%9Fiselle%C5%9Ftirilebili/ablekgbicginadinndchdojklkojgbdb"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-apple-blue text-white hover:opacity-90 active:scale-95 transition-all shadow-md"
          >
            <Globe className="w-4 h-4" />
            <span>{isEn ? 'Add to Chrome Store' : "Chrome Web Mağazası'ndan Ekle"}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
          <a
            href="https://github.com/alazndy/GTab"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-xs uppercase tracking-wider border border-border bg-card hover:bg-muted text-foreground transition-all shadow-xs"
          >
            <Code2 className="w-4 h-4" />
            <span>{isEn ? 'Source Code' : 'Kaynak Kod'}</span>
          </a>
        </div>

        {/* Extension Spec Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-border text-xs">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-apple-blue font-mono">&lt; 15 ms</div>
            <div className="text-muted-foreground mt-0.5">{isEn ? 'Tab Open Latency' : 'Yeni Sekme Açılış Hızı'}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-apple-green font-mono">0 KB</div>
            <div className="text-muted-foreground mt-0.5">{isEn ? 'Data Telemetry Sent' : 'Harici Veri Gönderimi'}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-apple-purple font-mono">IDB</div>
            <div className="text-muted-foreground mt-0.5">{isEn ? 'IndexedDB Local Cache' : 'Yerel Veri Tabanı'}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-apple-orange font-mono">OAuth 2.0</div>
            <div className="text-muted-foreground mt-0.5">{isEn ? 'Direct Google Tasks API' : 'Direkt Görev API Entegrasyonu'}</div>
          </div>
        </div>
      </div>

      {/* ── LIVE INTERACTIVE NEW TAB PLAYGROUND ── */}
      <div className="apple-card p-6 sm:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-apple-blue uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>{isEn ? 'INTERACTIVE NEW TAB SANDBOX' : 'CANLI YENİ SEKME DENEYİMİ'}</span>
            </div>
            <h3 className="text-2xl font-extrabold text-foreground tracking-tight mt-1">
              {isEn ? 'Experience GTab Live in Browser' : 'GTab Arayüzünü Tarayıcıda Canlı Dene'}
            </h3>
          </div>

          {/* Theme Switcher */}
          <div className="inline-flex p-1 rounded-xl bg-muted/80 border border-border text-xs font-semibold">
            <button
              onClick={() => setThemeMode('dark')}
              className={cn("px-3 py-1.5 rounded-lg transition-all", themeMode === 'dark' ? "bg-card text-foreground font-bold shadow-xs" : "text-muted-foreground")}
            >
              Dark Modern
            </button>
            <button
              onClick={() => setThemeMode('amber')}
              className={cn("px-3 py-1.5 rounded-lg transition-all", themeMode === 'amber' ? "bg-card text-foreground font-bold shadow-xs" : "text-muted-foreground")}
            >
              Amber Retro
            </button>
            <button
              onClick={() => setThemeMode('slate')}
              className={cn("px-3 py-1.5 rounded-lg transition-all", themeMode === 'slate' ? "bg-card text-foreground font-bold shadow-xs" : "text-muted-foreground")}
            >
              Deep Slate
            </button>
          </div>
        </div>

        {/* Mockup Browser Window */}
        <div className={cn(
          "rounded-3xl border transition-all p-6 sm:p-8 space-y-6 shadow-2xl",
          themeMode === 'dark' && "bg-zinc-950 border-zinc-800 text-zinc-100",
          themeMode === 'amber' && "bg-[#18140c] border-[#382b18] text-[#fde047]",
          themeMode === 'slate' && "bg-[#0b1120] border-[#1e293b] text-slate-100"
        )}>
          {/* Top Mockup Header: Clock & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight">
              {timeStr}
            </div>

            {/* Omnibar */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-zinc-900/90 border border-zinc-800 w-full max-w-md shadow-inner">
              <Search className="w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder={isEn ? `Search with ${searchEngine}...` : `${searchEngine} ile ara...`}
                className="bg-transparent text-xs w-full focus:outline-hidden text-zinc-200"
              />
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                {searchEngine}
              </span>
            </div>
          </div>

          {/* Grid Layout: Tasks Tile + Notes Tile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            {/* Tile 1: Google Tasks */}
            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-apple-blue" />
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                    {isEn ? 'Google Tasks' : 'Google Görevler'}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500">
                  {tasks.filter((t) => t.done).length}/{tasks.length} {isEn ? 'done' : 'tamam'}
                </span>
              </div>

              {/* Task list */}
              <div className="space-y-2 max-h-44 overflow-y-auto">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-2 rounded-xl bg-zinc-950/60 border border-zinc-800/50 text-xs hover:border-zinc-700 transition-all"
                  >
                    <button
                      onClick={() => toggleTask(task.id)}
                      className="flex items-center gap-2.5 text-left flex-1"
                    >
                      <div className={cn(
                        "w-4 h-4 rounded-md border flex items-center justify-center transition-colors",
                        task.done ? "bg-apple-blue border-apple-blue text-white" : "border-zinc-600"
                      )}>
                        {task.done && <CheckCircle2 className="w-3 h-3" />}
                      </div>
                      <span className={cn(task.done ? "line-through text-zinc-500" : "text-zinc-200")}>
                        {task.text}
                      </span>
                    </button>
                    <button
                      onClick={() => removeTask(task.id)}
                      className="text-zinc-600 hover:text-red-400 p-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add task form */}
              <form onSubmit={addTask} className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={newTaskInput}
                  onChange={(e) => setNewTaskInput(e.target.value)}
                  placeholder={isEn ? 'Add new task...' : 'Yeni görev ekle...'}
                  className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs w-full focus:outline-hidden text-zinc-200"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-apple-blue text-white hover:opacity-90 transition-opacity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            {/* Tile 2: Scratchpad Quick Notes */}
            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-4 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-apple-green" />
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                    {isEn ? 'Offline Scratchpad' : 'Çevrimdışı Not Defteri'}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-apple-green">● AUTOSAVED</span>
              </div>

              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                rows={4}
                className="w-full bg-zinc-950/70 border border-zinc-800/60 rounded-xl p-3 text-xs text-zinc-300 focus:outline-hidden resize-none font-mono leading-relaxed"
              />

              <div className="text-[11px] text-zinc-500 font-mono flex items-center justify-between pt-1">
                <span>{noteContent.length} chars</span>
                <span>IndexedDB Storage</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
