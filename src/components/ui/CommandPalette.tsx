'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Command, X, FileText, ChevronRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/lib/i18n';

interface CommandPaletteProps {
  projects: { title: string; slug: string; category: string }[];
}

export function CommandPalette({ projects }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { t, localizePath, lang } = useI18n();
  const isEn = lang === 'en';

  const toggle = useCallback(() => setIsOpen((prev) => !isOpen), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, toggle]);

  const filteredProjects = query === '' 
    ? projects 
    : projects.filter((p) => 
        p.title.toLowerCase().includes(query.toLowerCase()) || 
        p.category.toLowerCase().includes(query.toLowerCase())
      );

  const navigate = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-background/60 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="w-full max-w-2xl bg-card rounded-3xl border border-border overflow-hidden shadow-2xl"
          >
            {/* Spotlight Search Header */}
            <div className="p-5 border-b border-border flex items-center gap-3.5 bg-muted/40">
              <Search className="w-5 h-5 text-apple-blue shrink-0" />
              <input
                autoFocus
                placeholder={t('cmd.placeholder')}
                className="flex-1 bg-transparent border-none outline-none text-base font-medium text-foreground placeholder:text-muted-foreground"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-1 bg-card rounded-lg text-xs font-mono text-muted-foreground border border-border shadow-2xs">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div className="max-h-[60vh] overflow-y-auto p-3 custom-scrollbar space-y-1">
              {filteredProjects.length > 0 ? (
                <div>
                  <div className="px-3 py-2 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    {t('cmd.availableModules')} ({filteredProjects.length})
                  </div>
                  {filteredProjects.map((p) => (
                    <button
                      key={p.slug}
                      onClick={() => navigate(p.slug === 'GTab' ? localizePath('/gtab') : localizePath(`/proje/${p.slug}`))}
                      className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-muted/80 transition-all group text-left border border-transparent hover:border-border"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-apple-blue shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-foreground group-hover:text-apple-blue transition-colors truncate">
                            {p.title}
                          </div>
                          <div className="text-xs text-muted-foreground truncate">
                            {p.category}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-foreground group-hover:translate-x-0.5 transition-all shrink-0" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {isEn ? 'No matching modules found.' : 'Eşleşen modül bulunamadı.'}
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 bg-muted/30 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span><strong className="text-foreground">↑↓</strong> {isEn ? 'Navigate' : 'Gezin'}</span>
                <span><strong className="text-foreground">↵</strong> {isEn ? 'Select' : 'Seç'}</span>
              </div>
              <span className="apple-pill text-[10px] font-mono">SPOTLIGHT</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
