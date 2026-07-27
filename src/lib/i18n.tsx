'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';

type Language = 'tr' | 'en';

interface Dictionary {
  [key: string]: string;
}

const dictionaries: Record<Language, Dictionary> = {
  tr: {
    'nav.home': 'Hub / Ana Sayfa',
    'nav.about': 'Hakkımda',
    'nav.muhendislik': 'Mühendislik',
    'nav.lab': 'Lab',
    'nav.portfolio': 'Portfolio Veritabanı',
    'nav.systems': 'Sistemler Aktif',
    'header.search': 'Sistemde Ara (Ctrl+K)...',
    'header.docs': 'Dökümantasyon',
    'header.github': 'GitHub Bağlantısı',
    'home.title': 'Kişisel Veritabanı ve Proje Arşivi',
    'home.subtitle': 'T-Ecosystem altyapısına hoş geldiniz. Tüm endüstriyel, yazılımsal ve donanımsal projeler buradan yönetilmektedir.',
    'home.recent': 'Son İletimler',
    'home.tech': 'Sistem Altyapısı',
    'home.viewAll': 'Tümünü Gör',
    'project.status': 'Durum',
    'project.category': 'Kategori',
    'project.stack': 'Teknoloji',
    'project.live': 'Canlı Bağlantı',
    'project.github': 'Kaynak Kod',
    'project.download': 'APK İndir',
  },
  en: {
    'nav.home': 'Hub / Ana Sayfa',
    'nav.about': 'Hakkımda',
    'nav.muhendislik': 'Mühendislik',
    'nav.lab': 'Lab',
    'nav.portfolio': 'Portfolio Veritabanı',
    'nav.systems': 'Sistemler Aktif',
    'header.search': 'Sistemde Ara (Ctrl+K)...',
    'header.docs': 'Dökümantasyon',
    'header.github': 'GitHub Bağlantısı',
    'home.title': 'Kişisel Veritabanı ve Proje Arşivi',
    'home.subtitle': 'T-Ecosystem altyapısına hoş geldiniz. Tüm endüstriyel, yazılımsal ve donanımsal projeler buradan yönetilmektedir.',
    'home.recent': 'Son İletimler',
    'home.tech': 'Sistem Altyapısı',
    'home.viewAll': 'Tümünü Gör',
    'project.status': 'Durum',
    'project.category': 'Kategori',
    'project.stack': 'Teknoloji',
    'project.live': 'Canlı Bağlantı',
    'project.github': 'Kaynak Kod',
    'project.download': 'APK İndir',
  }
};

interface I18nContextType {
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
    return dictionaries[lang][key] || key;
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
