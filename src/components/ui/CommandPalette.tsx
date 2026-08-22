'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Terminal, Command, X, FileText, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/lib/i18n';

// We'll pass projects as props or fetch them
interface CommandPaletteProps {
  projects: { title: string; slug: string; category: string }[];
}

export function CommandPalette({ projects }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { t, localizePath } = useI18n();

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
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-background/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="w-full max-w-2xl bg-card rounded-2xl border border-lcars-cyan/30 overflow-hidden shadow-2xl"
          >
            <div className="p-6 border-b border-border flex items-center gap-4">
              <Terminal className="w-5 h-5 text-lcars-cyan animate-pulse" />
              <input
                autoFocus
                placeholder={t('cmd.placeholder')}
                className="flex-1 bg-transparent border-none outline-none text-sm font-mono tracking-widest text-foreground placeholder:text-muted-foreground/40 uppercase"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="flex items-center gap-2 px-2 py-1 bg-foreground/5 rounded text-[10px] font-mono text-muted-foreground border border-border">
                <Command className="w-3 h-3" />
                <span>K</span>
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2 custom-scrollbar">
              {filteredProjects.length > 0 ? (
                <div className="space-y-1">
                  <div className="px-4 py-2 text-[10px] font-black font-mono text-muted-foreground uppercase tracking-[0.2em]">{t('cmd.availableModules')}</div>
                  {filteredProjects.map((p) => (
                    <button
                      key={p.slug}
                      onClick={() => navigate(p.slug === 'GTab' ? localizePath('/gtab') : localizePath(`/proje/${p.slug}`))}
                      className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-foreground/5 transition-all group text-left border border-transparent hover:border-border"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-lcars-cyan/10 flex items-center justify-center border border-lcars-cyan/20 group-hover:bg-lcars-cyan/20 transition-all">
                           <FileText className="w-4 h-4 text-lcars-cyan" />
                        </div>
                        <div>
                          <div className="text-sm font-black text-foreground group-hover:text-lcars-cyan transition-colors uppercase tracking-tight">{p.title}</div>
                          <div className="text-[10px] font-mono text-muted-foreground uppercase">{p.category}</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-foreground transition-all" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center space-y-4">
                   <X className="w-12 h-12 text-lcars-red/40 mx-auto" />
                   <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">No_System_Match_Found</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-foreground/[0.02] border-t border-border flex items-center justify-between text-[9px] font-mono text-muted-foreground uppercase tracking-widest">
               <div className="flex gap-4">
                  <span>[ENTER] Select</span>
                  <span>[ESC] Close</span>
               </div>
               <div className="text-lcars-cyan">Kernel_Status: Secure</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
