'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';

export type Language = 'tr' | 'en';

export interface Dictionary {
  [key: string]: string;
}

export const dictionaries: Record<Language, Dictionary> = {
  tr: {
    // Nav
    'nav.home': 'Hub / Ana Sayfa',
    'nav.about': 'Hakkımda',
    'nav.muhendislik': 'Mühendislik',
    'nav.lab': 'Lab',
    'nav.portfolio': 'Portfolio Veritabanı',
    'nav.systemsActive': 'sistem aktif',
    'nav.allProjects': 'Tüm Projeler',
    'nav.close': 'Kapat',
    'nav.openMenu': 'Menüyü aç',

    // Header
    'header.search': 'Sistemde Ara (Ctrl+K)...',
    'header.searchBtn': 'ARA',
    'header.docs': 'Dökümantasyon',
    'header.github': 'GitHub Bağlantısı',
    'header.theme': 'Tema Değiştir',
    'header.lang': 'Dili Değiştir',
    'header.available': 'Müsait · İstanbul, TR',

    // Hero & Bio
    'hero.role': 'Sistem Mimarı · Full-Stack · Gömülü Sistemler',
    'hero.bio': 'Disiplinler arası altyapı inşa ediyorum — yapay zeka işlem motorları, otomotiv telemetri sistemleri, web platformları ve sıfırdan donanım geliştirme.',
    'hero.explore': 'Projeleri Keşfet',
    'hero.viewAll': 'Tümünü Gör',

    // Stats
    'stats.projects': 'Proje',
    'stats.active': 'Aktif',
    'stats.areas': 'Alan',
    'stats.years': 'Yıl',

    // Categories & Areas
    'cat.engineering': 'Mühendislik',
    'cat.lab': 'Lab',
    'cat.other': 'Diğer Çalışmalar',
    'cat.all': 'Tüm Projeler',
    'cat.total': 'toplam',
    'cat.engineeringDesc': 'Donanım, gömülü sistemler, telemetri ve endüstriyel çözümler.',
    'cat.labDesc': 'Deneysel yazılımlar, yapay zeka modelleri ve araştırma projeleri.',
    'cat.otherDesc': 'Web servisleri, araçlar ve açık kaynaklı ekosistem projeleri.',

    // Project Details
    'project.status': 'Durum',
    'project.category': 'Kategori',
    'project.area': 'Alan',
    'project.stack': 'Teknolojiler',
    'project.year': 'Yıl',
    'project.systemInfo': 'Sistem Bilgileri',
    'project.related': 'İlgili Projeler',
    'project.downloads': 'İndirmeler',
    'project.manuals': 'Kılavuzlar ve dokümantasyon',
    'project.gallery': 'Fotoğraflar ve ekran görüntüleri',
    'project.videos': 'Videolar',
    'project.openVideo': 'Videoyu aç',
    'project.liveDemo': 'Canlı Demo',
    'project.sourceCode': 'Kaynak Kod',
    'project.downloadApk': 'APK İNDİR',
    'project.detailsComingSoon': 'Detaylar yakında eklenecek.',
    'project.all': 'Tüm Projeler',

    // Command Palette
    'cmd.placeholder': 'KOMUT ÇALIŞTIR VEYA SİSTEMDE ARA...',
    'cmd.availableModules': 'KULLANILABİLİR_MODÜLLER',
    'cmd.noResults': 'Sonuç bulunamadı.',

    // About Page
    'about.dayTag': 'Gündüz',
    'about.dayCompany': 'ADC Tasarım — Sahada',
    'about.name': 'Göktuğ Turhan',
    'about.heroTitle1': 'İki hayat,',
    'about.heroTitle2': 'tek prensip.',
    'about.typewriter': 'Gündüz sahada gerçek donanımla, gece kendi yazılım ekosistemimle — ikisinde de sorunu gerçekten çözene kadar uğraşıyorum.',
    'about.dayTitle': 'Gündüz: Sahada',
    'about.dayBody': 'ADC Tasarım\'da sahada çalışan bir endüstriyel donanım/gömülü sistem mühendisiyim — kod masada kalmıyor, gerçek araçlara, gerçek madenlere, gerçek sınır kapılarına gidiyor. UniControl\'den saha kurulumları, Guardian Glass\'ın Mısır\'daki forklift filosu için çarpışma önleme sistemi bunlardan biri.',
    'about.nightTitle': 'Gece: Kendi Ekosistemim',
    'about.nightBody': 'Masa başına geçtiğimde kendi projelerimi sıfırdan mimarlıyorum: GT-Launcher ile Star Trek estetiğinde modüler bir Android ana ekranı, R-AI-OS ile yerel yapay zeka işletim sistemi, finans işlem botları ve web araçları.',
    'about.principleTitle': 'Temel Prensip',
    'about.principleBody': 'Her projede uçtan uca sahiplenme: donanım şemasından gömülü firmware\'e, backend mimarisinden arayüz mikro-etkileşimlerine kadar.',
  },
  en: {
    // Nav
    'nav.home': 'Hub / Home',
    'nav.about': 'About',
    'nav.muhendislik': 'Engineering',
    'nav.lab': 'Lab',
    'nav.portfolio': 'Portfolio Database',
    'nav.systemsActive': 'systems active',
    'nav.allProjects': 'All Projects',
    'nav.close': 'Close',
    'nav.openMenu': 'Open menu',

    // Header
    'header.search': 'Search System (Ctrl+K)...',
    'header.searchBtn': 'SEARCH',
    'header.docs': 'Documentation',
    'header.github': 'GitHub Link',
    'header.theme': 'Toggle Theme',
    'header.lang': 'Switch Language',
    'header.available': 'Available · Istanbul, TR',

    // Hero & Bio
    'hero.role': 'System Architect · Full-Stack · Embedded Systems',
    'hero.bio': 'Building infrastructure across disciplines — AI trading engines, automotive telemetry systems, web platforms, and hardware from scratch.',
    'hero.explore': 'Explore Projects',
    'hero.viewAll': 'View All',

    // Stats
    'stats.projects': 'Projects',
    'stats.active': 'Active',
    'stats.areas': 'Areas',
    'stats.years': 'Years',

    // Categories & Areas
    'cat.engineering': 'Engineering',
    'cat.lab': 'Lab',
    'cat.other': 'Other Works',
    'cat.all': 'All Projects',
    'cat.total': 'total',
    'cat.engineeringDesc': 'Hardware, embedded systems, telemetry, and industrial solutions.',
    'cat.labDesc': 'Experimental software, AI models, and research projects.',
    'cat.otherDesc': 'Web services, utilities, and open-source ecosystem projects.',

    // Project Details
    'project.status': 'Status',
    'project.category': 'Category',
    'project.area': 'Area',
    'project.stack': 'Tech Stack',
    'project.year': 'Year',
    'project.systemInfo': 'System Information',
    'project.related': 'Related Projects',
    'project.downloads': 'Downloads',
    'project.manuals': 'Manuals & documentation',
    'project.gallery': 'Photos & screenshots',
    'project.videos': 'Videos',
    'project.openVideo': 'Open video',
    'project.liveDemo': 'Live Demo',
    'project.sourceCode': 'Source Code',
    'project.downloadApk': 'DOWNLOAD APK',
    'project.detailsComingSoon': 'More details coming soon.',
    'project.all': 'All Projects',

    // Command Palette
    'cmd.placeholder': 'EXECUTE COMMAND OR SEARCH SYSTEMS...',
    'cmd.availableModules': 'AVAILABLE_MODULES',
    'cmd.noResults': 'No results found.',

    // About Page
    'about.dayTag': 'Daytime',
    'about.dayCompany': 'ADC Design — In the Field',
    'about.name': 'Göktuğ Turhan',
    'about.heroTitle1': 'Two lives,',
    'about.heroTitle2': 'one principle.',
    'about.typewriter': 'In the field with real hardware by day, building my own software ecosystem by night — in both, I never stop until the problem is truly solved.',
    'about.dayTitle': 'Day: In the Field',
    'about.dayBody': 'An industrial hardware/embedded systems engineer working on-site at ADC Design — code doesn\'t stay on the desk, it goes into real vehicles, real mines, and real border checkpoints. Field deployments of UniControl and anti-collision systems for Guardian Glass forklift fleets in Egypt are among them.',
    'about.nightTitle': 'Night: My Own Ecosystem',
    'about.nightBody': 'At my desk, I architect my own projects from scratch: a Star Trek-inspired modular Android launcher with GT-Launcher, local AI operating systems with R-AI-OS, financial trading bots, and web tools.',
    'about.principleTitle': 'Core Principle',
    'about.principleBody': 'End-to-end ownership in every project: from hardware schematics to embedded firmware, backend architecture to UI micro-interactions.',
  }
};

export interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('tr');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Language;
    if (saved === 'tr' || saved === 'en') {
      setLang(saved);
    }
  }, []);

  const handleSetLang = useCallback((newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  }, []);

  // Memoize the t function so it only changes when lang changes
  const t = useCallback((key: string): string => {
    return dictionaries[lang][key] || dictionaries['tr'][key] || key;
  }, [lang]);

  // Memoize the context value to prevent unnecessary re-renders of consumers
  const value = useMemo(() => ({
    lang,
    setLang: handleSetLang,
    t,
  }), [lang, handleSetLang, t]);

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
