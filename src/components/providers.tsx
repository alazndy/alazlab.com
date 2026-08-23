'use client';

import { ThemeProvider } from 'next-themes';
import { I18nProvider } from '@/lib/i18n';
import { ReactNode } from 'react';
import { SpotlightCommandPalette } from '@/components/SpotlightCommandPalette';

// Filter out the React 19 script tag warning in development (false positive for next-themes)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const orig = console.error;
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].includes('Encountered a script tag')) return;
    orig.apply(console, args);
  };
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        {children}
        <SpotlightCommandPalette />
      </ThemeProvider>
    </I18nProvider>
  );
}
