'use client';

import { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Image as ImageIcon,
  Download,
  FileText,
  Search,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';
import type { ProjectMetadata, ProjectWikiDoc } from '@/lib/markdown';
import { ProjectResourceSections } from './ProjectResourceSections';

interface ParsedWikiDoc extends ProjectWikiDoc {
  html: string;
}

interface ProjectViewTabsProps {
  metadata: ProjectMetadata;
  overviewHtml: string;
  wikiDocs: ParsedWikiDoc[];
  accentColor: string;
  accentBg: string;
}

export function ProjectViewTabs({
  metadata,
  overviewHtml,
  wikiDocs,
  accentColor,
  accentBg,
}: ProjectViewTabsProps) {
  const { t, lang } = useI18n();
  const isEn = lang === 'en';

  const hasWiki = wikiDocs.length > 0;
  const hasGallery = (metadata.gallery && metadata.gallery.length > 0) || (metadata.videos && metadata.videos.length > 0);
  const hasResources = (metadata.downloads && metadata.downloads.length > 0) || (metadata.manuals && metadata.manuals.length > 0) || !!metadata.download;

  const [activeTab, setActiveTab] = useState<'overview' | 'wiki' | 'gallery' | 'resources'>('overview');
  const [activeDocSlug, setActiveDocSlug] = useState<string>(wikiDocs[0]?.slug || '');
  const [wikiSearch, setWikiSearch] = useState('');

  const selectedDoc = useMemo(() => {
    return wikiDocs.find(d => d.slug === activeDocSlug) || wikiDocs[0];
  }, [wikiDocs, activeDocSlug]);

  const filteredDocs = useMemo(() => {
    if (!wikiSearch.trim()) return wikiDocs;
    const q = wikiSearch.toLowerCase();
    return wikiDocs.filter(d => d.title.toLowerCase().includes(q) || d.content.toLowerCase().includes(q));
  }, [wikiDocs, wikiSearch]);

  const tabs = [
    {
      id: 'overview' as const,
      label: isEn ? 'Overview' : 'Genel Bakış',
      icon: LayoutDashboard,
      count: undefined,
    },
    ...(hasWiki ? [{
      id: 'wiki' as const,
      label: isEn ? 'Wiki & Manuals' : 'Wiki & Kılavuzlar',
      icon: BookOpen,
      count: wikiDocs.length,
    }] : []),
    ...(hasGallery ? [{
      id: 'gallery' as const,
      label: isEn ? 'Media & Demos' : 'Medya & Vitrin',
      icon: ImageIcon,
      count: (metadata.gallery?.length || 0) + (metadata.videos?.length || 0),
    }] : []),
    ...(hasResources ? [{
      id: 'resources' as const,
      label: isEn ? 'Resources' : 'Kaynaklar',
      icon: Download,
      count: (metadata.downloads?.length || 0) + (metadata.manuals?.length || 0) + (metadata.download ? 1 : 0),
    }] : []),
  ];

  return (
    <div className="space-y-8">

      {/* ── INTERACTIVE TAB SELECTOR ── */}
      {tabs.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-border custom-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all shrink-0",
                  isActive
                    ? "bg-foreground/10 text-foreground border border-border shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/5 border border-transparent"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-lcars-cyan" : "text-muted-foreground")} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={cn(
                    "px-1.5 py-0.5 rounded text-[10px]",
                    isActive ? "bg-lcars-cyan/20 text-lcars-cyan" : "bg-foreground/5 text-muted-foreground"
                  )}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* ── TAB 1: OVERVIEW ── */}
      {activeTab === 'overview' && (
        <div className="space-y-12 animate-in fade-in duration-300">
          <div
            className={cn(
              "prose max-w-none",
              "prose-headings:font-black prose-headings:tracking-tight prose-headings:text-foreground",
              "prose-h2:text-lg prose-h2:uppercase prose-h2:mt-10 prose-h2:mb-3",
              "prose-h2:flex prose-h2:items-center prose-h2:gap-2",
              `prose-h2:before:content-[''] prose-h2:before:block prose-h2:before:w-1 prose-h2:before:h-4 prose-h2:before:rounded-full prose-h2:before:${accentBg}`,
              "prose-h3:text-base prose-h3:text-foreground/80 prose-h3:mt-6 prose-h3:mb-2",
              "prose-p:text-foreground/70 prose-p:leading-relaxed prose-p:mb-4 prose-p:text-sm",
              "prose-li:text-foreground/60 prose-li:text-sm",
              `prose-li:marker:${accentColor}`,
              "prose-strong:text-foreground/90 prose-strong:font-semibold",
              "prose-code:text-lcars-orange prose-code:bg-foreground/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs",
              "prose-blockquote:border-l-2 prose-blockquote:border-border prose-blockquote:text-foreground/60 prose-blockquote:not-italic prose-blockquote:pl-4 prose-blockquote:my-6"
            )}
            dangerouslySetInnerHTML={{ __html: overviewHtml }}
          />

          {hasWiki && (
            <div className="p-6 rounded-3xl border border-lcars-cyan/30 bg-lcars-cyan/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-black text-lcars-cyan font-mono uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  {isEn ? 'Complete Documentation Available' : 'Kapsamlı Dokümantasyon Mevcut'}
                </div>
                <p className="text-xs text-foreground/70">
                  {isEn
                    ? `This project includes ${wikiDocs.length} technical guides and architectural specifications.`
                    : `Bu proje için hazırlanmış ${wikiDocs.length} adet teknik kılavuz ve sistem mimarisi dokümanı bulunmaktadır.`}
                </p>
              </div>
              <button
                onClick={() => setActiveTab('wiki')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-lcars-cyan/10 hover:bg-lcars-cyan/20 text-lcars-cyan font-mono text-xs font-bold uppercase transition-all shrink-0 border border-lcars-cyan/30"
              >
                <BookOpen className="w-3.5 h-3.5" />
                {isEn ? 'Read Wiki' : "Wiki'yi Oku"}
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── TAB 2: WIKI & DOCUMENTATION READER ── */}
      {activeTab === 'wiki' && hasWiki && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
          
          {/* Wiki Table of Contents Sidebar */}
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-16">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder={isEn ? 'Search documentation...' : 'Dokümantasyonda ara...'}
                value={wikiSearch}
                onChange={(e) => setWikiSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-foreground/5 border border-border rounded-xl text-xs font-mono text-foreground placeholder:text-muted-foreground outline-none focus:border-lcars-cyan transition-colors"
              />
            </div>

            <div className="rounded-2xl border border-border bg-card p-2 space-y-1 max-h-[65vh] overflow-y-auto custom-scrollbar">
              {filteredDocs.map((doc) => {
                const isCurrent = (selectedDoc?.slug === doc.slug);
                return (
                  <button
                    key={doc.slug}
                    onClick={() => setActiveDocSlug(doc.slug)}
                    className={cn(
                      "w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all",
                      isCurrent
                        ? "bg-lcars-cyan/10 text-foreground border border-lcars-cyan/30"
                        : "text-muted-foreground hover:text-foreground hover:bg-foreground/5 border border-transparent"
                    )}
                  >
                    <FileText className={cn("w-4 h-4 mt-0.5 shrink-0", isCurrent ? "text-lcars-cyan" : "text-muted-foreground")} />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold truncate">{doc.title}</div>
                      <div className="text-[10px] font-mono text-muted-foreground truncate mt-0.5">{doc.filename}</div>
                    </div>
                  </button>
                );
              })}
              {filteredDocs.length === 0 && (
                <div className="p-4 text-center text-xs font-mono text-muted-foreground">
                  {isEn ? 'No documents found.' : 'Doküman bulunamadı.'}
                </div>
              )}
            </div>
          </div>

          {/* Wiki Document Reader Article */}
          <div className="lg:col-span-8 rounded-3xl border border-border bg-card p-6 sm:p-10 space-y-6">
            {selectedDoc ? (
              <article className="space-y-6">
                <div className="border-b border-border pb-6 space-y-2">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-lcars-cyan">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>WIKI ARTICLE · {selectedDoc.filename}</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-foreground uppercase tracking-tight">
                    {selectedDoc.title}
                  </h1>
                </div>

                <div
                  className={cn(
                    "prose max-w-none",
                    "prose-headings:font-black prose-headings:tracking-tight prose-headings:text-foreground",
                    "prose-h2:text-lg prose-h2:uppercase prose-h2:mt-8 prose-h2:mb-3",
                    "prose-h3:text-base prose-h3:text-foreground/80 prose-h3:mt-6 prose-h3:mb-2",
                    "prose-p:text-foreground/75 prose-p:leading-relaxed prose-p:mb-4 prose-p:text-sm",
                    "prose-li:text-foreground/70 prose-li:text-sm",
                    "prose-code:text-lcars-orange prose-code:bg-foreground/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs",
                    "prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-2xl",
                    "prose-table:text-xs prose-table:border-collapse",
                    "prose-th:border-b prose-th:border-border prose-th:text-foreground/90 prose-th:py-2",
                    "prose-td:border-b prose-td:border-border/60 prose-td:py-2"
                  )}
                  dangerouslySetInnerHTML={{ __html: selectedDoc.html }}
                />
              </article>
            ) : null}
          </div>

        </div>
      )}

      {/* ── TAB 3: MEDIA & GALLERY ── */}
      {activeTab === 'gallery' && hasGallery && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <ProjectResourceSections project={metadata} />
        </div>
      )}

      {/* ── TAB 4: RESOURCES & DOWNLOADS ── */}
      {activeTab === 'resources' && hasResources && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <ProjectResourceSections project={metadata} />
        </div>
      )}

    </div>
  );
}
