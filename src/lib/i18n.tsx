'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export type Language = 'tr' | 'en';

export interface Dictionary {
  [key: string]: string;
}

export const dictionaries: Record<Language, Dictionary> = {
  tr: {
    // Nav
    'nav.home': 'Ana Sayfa',
    'nav.about': 'Hakkımda',
    'nav.muhendislik': 'Mühendislik',
    'nav.lab': 'Lab',
    'nav.portfolio': 'Proje Kataloğu',
    'nav.systemsActive': 'proje aktif',
    'nav.allProjects': 'Tüm Projeler',
    'nav.close': 'Kapat',
    'nav.openMenu': 'Menüyü aç',

    // Header
    'header.search': 'Projelerde ara (Ctrl+K)...',
    'header.searchBtn': 'Ara',
    'header.docs': 'Dokümantasyon',
    'header.github': 'GitHub',
    'header.theme': 'Tema Değiştir',
    'header.lang': 'Dili Değiştir',
    'header.available': 'İstanbul, TR',

    // Hero & Bio
    'hero.role': 'Gömülü Donanım & Yazılım Mühendisi',
    'hero.bio': 'ADC Tasarım bünyesinde ağır vasıta ve maden sahaları için ESP32 tabanlı CAN-bus radar ve kontrol donanımları geliştiriyorum. Bağımsız olarak Kotlin ile Android sistemleri ve Rust ile araçlar kodluyorum.',
    'hero.explore': 'Projeleri İncele',
    'hero.viewAll': 'Tümünü Gör',

    // Stats
    'stats.projects': 'Toplam Proje',
    'stats.active': 'Canlı / Aktif',
    'stats.areas': 'Uzmanlık Alanı',
    'stats.years': 'Yıllık Deneyim',

    // Categories & Areas
    'cat.engineering': 'Mühendislik & Donanım',
    'cat.lab': 'Yazılım & Lab',
    'cat.other': 'Diğer Projeler',
    'cat.all': 'Tüm Projeler',
    'cat.total': 'toplam',
    'cat.engineeringDesc': 'ESP32, STM32, CAN-bus 2.0B / FD radar telemetrisi ve endüstriyel I/O kontrol üniteleri.',
    'cat.labDesc': 'Kotlin / Compose Android başlatıcıları, Rust CLI araçları ve Chrome uzantıları.',
    'cat.otherDesc': 'Web servisleri, arayüz kütüphaneleri ve açık kaynaklı yazılımlar.',

    // Project Details
    'project.status': 'Durum',
    'project.category': 'Kategori',
    'project.area': 'Alan',
    'project.stack': 'Teknolojiler',
    'project.year': 'Yıl',
    'project.systemInfo': 'Teknik Özellikler',
    'project.related': 'Benzer Projeler',
    'project.downloads': 'İndirmeler',
    'project.manuals': 'Teknik Kılavuzlar',
    'project.gallery': 'Görseller ve Şemalar',
    'project.videos': 'Video Kayıtları',
    'project.openVideo': 'Videoyu Aç',
    'project.liveDemo': 'Canlı Önizleme',
    'project.sourceCode': 'Kaynak Kod',
    'project.downloadApk': 'APK İndir',
    'project.detailsComingSoon': 'Teknik detaylar hazırlanıyor.',
    'project.all': 'Tüm Projeler',
    'project.back': 'Geri Dön',

    // Command Palette
    'cmd.placeholder': 'Proje adı veya teknoloji arayın...',
    'cmd.availableModules': 'Kayıtlı Projeler',
    'cmd.noResults': 'Eşleşen proje bulunamadı.',

    // About Page
    'about.dayTag': 'Gündüz',
    'about.dayCompany': 'ADC Tasarım (Saha Sistemleri)',
    'about.name': 'Göktuğ Turhan',
    'about.heroTitle1': 'Donanım ve Yazılım',
    'about.heroTitle2': 'Mühendisliği.',
    'about.typewriter': 'Gündüz sahada gerçek donanımla, gece kendi yazılım ekosistemimle çalışıyorum. Sorunu kökünden çözene kadar sistemin her katmanına müdahale ederim.',
    'about.dayTitle': 'Gündüz: Saha & Endüstriyel Donanım',
    'about.dayBody': 'ADC Tasarım bünyesinde ağır vasıta, maden ve liman sahaları için ESP32 ve STM32 tabanlı mikrodenetleyici kartları, izole güç üniteleri ve Brigade BS-9000 radar telemetrisi tasarlıyorum. Yazdığım kod ve tasarladığım PCB doğrudan sahada, zorlu çevre şartlarında çalışıyor.',
    'about.nightTitle': 'Gece: Bağımsız Yazılım Mimarisi',
    'about.nightBody': 'Masa başında kendi bağımsız yazılım projelerimi geliştiriyorum: GT-Launcher (Kotlin ve Jetpack Compose ile yazılmış modüler Android başlatıcı), R-AI-OS (Rust tabanlı yerel araç çalıştırma sistemi), GTab (Chrome uzantısı) ve web arayüz kütüphaneleri.',
    'about.principleTitle': 'Çalışma Prensibi',
    'about.principleBody': 'Şema ve PCB tasarımından firmware koduna, arayüzden performans optimizasyonuna kadar tam kontrol ve gerçek mühendislik disiplini.',
  },
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.muhendislik': 'Engineering',
    'nav.lab': 'Lab',
    'nav.portfolio': 'Project Catalog',
    'nav.systemsActive': 'projects active',
    'nav.allProjects': 'All Projects',
    'nav.close': 'Close',
    'nav.openMenu': 'Open menu',

    // Header
    'header.search': 'Search projects (Ctrl+K)...',
    'header.searchBtn': 'Search',
    'header.docs': 'Documentation',
    'header.github': 'GitHub',
    'header.theme': 'Toggle Theme',
    'header.lang': 'Switch Language',
    'header.available': 'Istanbul, TR',

    // Hero & Bio
    'hero.role': 'Embedded Hardware & Software Engineer',
    'hero.bio': 'Developing ESP32-based CAN-bus radar and control hardware for heavy machinery at ADC Design. Independently building Kotlin Android systems and Rust tools.',
    'hero.explore': 'View Projects',
    'hero.viewAll': 'View All',

    // Stats
    'stats.projects': 'Total Projects',
    'stats.active': 'Live / Active',
    'stats.areas': 'Core Disciplines',
    'stats.years': 'Years Experience',

    // Categories & Areas
    'cat.engineering': 'Engineering & Hardware',
    'cat.lab': 'Software & Lab',
    'cat.other': 'Other Projects',
    'cat.all': 'All Projects',
    'cat.total': 'total',
    'cat.engineeringDesc': 'ESP32, STM32, CAN-bus 2.0B / FD radar telemetry, and industrial I/O units.',
    'cat.labDesc': 'Kotlin / Compose Android launchers, Rust CLI tools, and Chrome extensions.',
    'cat.otherDesc': 'Web platforms, UI component libraries, and open-source software.',

    // Project Details
    'project.status': 'Status',
    'project.category': 'Category',
    'project.area': 'Area',
    'project.stack': 'Technologies',
    'project.year': 'Year',
    'project.systemInfo': 'Technical Specs',
    'project.related': 'Related Projects',
    'project.downloads': 'Downloads',
    'project.manuals': 'Technical Guides',
    'project.gallery': 'Gallery & Schematics',
    'project.videos': 'Video Recordings',
    'project.openVideo': 'Open Video',
    'project.liveDemo': 'Live Preview',
    'project.sourceCode': 'Source Code',
    'project.downloadApk': 'Download APK',
    'project.detailsComingSoon': 'Technical details coming soon.',
    'project.all': 'All Projects',
    'project.back': 'Back',

    // Command Palette
    'cmd.placeholder': 'Search by project name or technology...',
    'cmd.availableModules': 'Catalogued Projects',
    'cmd.noResults': 'No matching projects found.',

    // About Page
    'about.dayTag': 'Day',
    'about.dayCompany': 'ADC Design (Field Systems)',
    'about.name': 'Göktuğ Turhan',
    'about.heroTitle1': 'Hardware and Software',
    'about.heroTitle2': 'Engineering.',
    'about.typewriter': 'Working on industrial hardware by day, developing independent software by night. Solving problems down to the root at every level of the system.',
    'about.dayTitle': 'Day: Field & Industrial Hardware',
    'about.dayBody': 'Designing ESP32 and STM32 microcontroller boards, isolated power regulators, and Brigade BS-9000 radar integration for heavy vehicles, mines, and industrial facilities at ADC Design.',
    'about.nightTitle': 'Night: Independent Software Architecture',
    'about.nightBody': 'Architecting independent software projects: GT-Launcher (Kotlin / Jetpack Compose Android launcher), R-AI-OS (Rust local tool runner), GTab (Chrome new-tab extension), and UI component toolkits.',
    'about.principleTitle': 'Core Principle',
    'about.principleBody': 'End-to-end ownership: from schematic and PCB routing to firmware implementation, frontend architecture, and performance benchmarking.',
  },
};

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  localizePath: (path: string) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Extract initial language from pathname (/tr/... or /en/...)
  const initialLang: Language = useMemo(() => {
    if (!pathname) return 'tr';
    const segment = pathname.split('/')[1];
    return (segment === 'en' || segment === 'tr') ? segment : 'tr';
  }, [pathname]);

  const [lang, setLangState] = useState<Language>(initialLang);

  // Sync state if pathname changes externally
  useEffect(() => {
    if (!pathname) return;
    const segment = pathname.split('/')[1];
    if (segment === 'en' || segment === 'tr') {
      if (segment !== lang) {
        setLangState(segment);
      }
    }
  }, [pathname, lang]);

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    if (!pathname) return;

    const segments = pathname.split('/');
    if (segments[1] === 'tr' || segments[1] === 'en') {
      segments[1] = newLang;
      router.push(segments.join('/') || `/${newLang}`);
    } else {
      router.push(`/${newLang}${pathname.startsWith('/') ? pathname : `/${pathname}`}`);
    }
  }, [pathname, router]);

  const t = useCallback((key: string): string => {
    return dictionaries[lang]?.[key] ?? dictionaries['tr']?.[key] ?? key;
  }, [lang]);

  const localizePath = useCallback((path: string): string => {
    if (!path) return `/${lang}`;
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('#')) return path;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    if (cleanPath.startsWith('/tr/') || cleanPath.startsWith('/en/') || cleanPath === '/tr' || cleanPath === '/en') {
      return cleanPath;
    }
    return `/${lang}${cleanPath === '/' ? '' : cleanPath}`;
  }, [lang]);

  const value = useMemo(() => ({
    lang,
    setLang,
    t,
    localizePath,
  }), [lang, setLang, t, localizePath]);

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
