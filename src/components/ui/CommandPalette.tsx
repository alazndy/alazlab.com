'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, Terminal, FileText, Settings, X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';

// We'll pass projects as props or fetch them
interface CommandPaletteProps {
  projects: { title: string; slug: string; category: string }[];
}

export function CommandPalette({ projects }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { t } = useI18n();

  const toggle = useCallback(() => setIsOpen((prev) => !isOpen), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  const navigate = (path: string) => {
    router.push(path);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-[#030305]/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="w-full max-w-2xl glass rounded-2xl border-lcars-cyan/30 overflow-hidden shadow-[0_0_50px_rgba(0,204,255,0.2)]"
          >
            <div className="p-6 border-b border-white/5 flex items-center gap-4">
              <Terminal className="w-5 h-5 text-lcars-cyan animate-pulse" />
              <input
                autoFocus
                placeholder={t('cmd.placeholder')}
                className="flex-1 bg-transparent border-none outline-none text-sm font-mono tracking-widest text-white placeholder:text-white/20 uppercase"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="flex items-center gap-2 px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-white/40">
                <Command className="w-3 h-3" />
                <span>K</span>
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2 custom-scrollbar">
              {filteredProjects.length > 0 ? (
                <div className="space-y-1">
                  <div className="px-4 py-2 text-[10px] font-black font-mono text-white/20 uppercase tracking-[0.2em]">{t('cmd.availableModules')}</div>
                  {filteredProjects.map((p) => (
                    <button
                      key={p.slug}
                      onClick={() => navigate(`/proje/${p.slug}`)}
                      className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-all group text-left border border-transparent hover:border-white/5"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-lcars-cyan/10 flex items-center justify-center border border-lcars-cyan/20 group-hover:bg-lcars-cyan/20 transition-all">
                           <FileText className="w-4 h-4 text-lcars-cyan" />
                        </div>
                        <div>
                          <div className="text-sm font-black text-white group-hover:text-lcars-cyan transition-colors uppercase tracking-tight">{p.title}</div>
                          <div className="text-[10px] font-mono text-white/30 uppercase">{p.category}</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-white transition-all" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center space-y-4">
                   <X className="w-12 h-12 text-lcars-red/20 mx-auto" />
                   <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">No_System_Match_Found</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-white/5 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-white/20 uppercase tracking-widest">
               <div className="flex gap-4">
                  <span>[ENTER] Select</span>
                  <span>[ESC] Close</span>
               </div>
               <div className="text-lcars-cyan/40">Kernel_Status: Secure</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
