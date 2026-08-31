'use client';

import { History, RefreshCw } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import type { GtLauncherRelease } from '@/lib/gt-launcher-changelog';

interface GTLauncherChangelogProps {
  releases: GtLauncherRelease[];
  isAvailable: boolean;
}

export function GTLauncherChangelog({ releases, isAvailable }: GTLauncherChangelogProps) {
  const { lang } = useI18n();
  const isEn = lang === 'en';

  return (
    <section id="changelog" className="apple-card p-6 sm:p-8 space-y-5" aria-labelledby="gt-launcher-changelog-title">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 text-apple-blue">
            <History className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-[0.16em]">
              {isEn ? 'Release history' : 'Sürüm geçmişi'}
            </span>
          </div>
          <h2 id="gt-launcher-changelog-title" className="text-2xl font-bold tracking-tight text-foreground">
            {isEn ? 'GT Launcher changelog' : 'GT Launcher değişiklik notları'}
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            {isEn
              ? 'Release notes are synced from the public source on the server and refreshed hourly.'
              : 'Sürüm notları sunucuda herkese açık kaynaktan eşitlenir ve saatlik olarak yenilenir.'}
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-apple-green/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-apple-green">
          <RefreshCw className="h-3.5 w-3.5" />
          {isEn ? 'Auto sync' : 'Otomatik senkron'}
        </span>
      </div>

      {!isAvailable ? (
        <p className="rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
          {isEn
            ? 'Release notes are temporarily unavailable. Please try again later.'
            : 'Sürüm notları şu anda geçici olarak alınamıyor. Lütfen daha sonra tekrar deneyin.'}
        </p>
      ) : (
        <div className="space-y-3">
          {releases.map((release, index) => (
            <details
              key={`${release.version}-${release.publishedAt ?? index}`}
              open={index === 0}
              className="group rounded-xl border border-border bg-card/70 px-4 py-3"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-foreground marker:hidden">
                <span>{release.version}</span>
                {release.publishedAt && (
                  <span className="text-xs font-normal text-muted-foreground">{release.publishedAt}</span>
                )}
              </summary>
              <div className="space-y-4 pb-1 pt-4">
                {release.sections.map((section) => (
                  <div key={section.title} className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-apple-blue">
                      {section.title}
                    </h3>
                    <ul className="space-y-2 pl-4 text-sm leading-6 text-muted-foreground marker:text-apple-blue">
                      {section.entries.map((entry, entryIndex) => (
                        <li key={`${section.title}-${entryIndex}`}>{entry}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      )}
    </section>
  );
}
