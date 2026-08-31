'use client';

import { useEffect, useState } from 'react';
import { Check, X, Sparkles, Smartphone, ExternalLink, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Language } from '@/lib/i18n';
import { getRegionalPricing } from '@/data/gt-launcher-pricing';

interface GTLauncherPricingTabProps {
  lang: Language;
}

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.alazndy.gtlauncher';

function formatPrice(amount: number, currency: string, lang: Language): string {
  try {
    return new Intl.NumberFormat(lang === 'tr' ? 'tr-TR' : 'en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${amount} ${currency}`;
  }
}

export function GTLauncherPricingTab({ lang }: GTLauncherPricingTabProps) {
  const isEn = lang === 'en';
  const [countryCode, setCountryCode] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/geo')
      .then((res) => res.json())
      .then((data: { country: string | null }) => {
        if (!cancelled) setCountryCode(data.country);
      })
      .catch(() => {
        // Stay on the US/USD default — network hiccup or dev environment without the edge header.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const pricing = getRegionalPricing(countryCode);

  type Row = { label: string; free: string | boolean; premium: string | boolean };

  const comparisonRows: Row[] = isEn
    ? [
        { label: 'All 8 visual style presets (Flat, Glass, Neobrutalism, Claymorphism, Minimalism, Neon, Dot, Pixel)', free: true, premium: true },
        { label: 'Card Builder, OmniSearch, App List card, Sidebar, Slide List drawer, theming, header widgets', free: true, premium: true },
        { label: 'Saved custom style slots', free: '1', premium: '12' },
        { label: 'Modules stacked per card', free: 'Up to 2', premium: 'Unlimited' },
        { label: 'Notification color animation', free: 'Static only', premium: 'Breathing & flashing' },
        { label: 'Drive Mode — OBD-II vehicle HUD', free: false, premium: true },
      ]
    : [
        { label: '8 görsel stil presetinin tamamı (Flat, Glass, Neobrutalism, Claymorphism, Minimalism, Neon, Dot, Pixel)', free: true, premium: true },
        { label: 'Card Builder, OmniSearch, App List kartı, Sidebar, Slide List çekmecesi, temalama, header widget\'ları', free: true, premium: true },
        { label: 'Kaydedilen özel stil slotu', free: '1', premium: '12' },
        { label: 'Kart başına stacklenen modül', free: '2\'ye kadar', premium: 'Sınırsız' },
        { label: 'Bildirim renk animasyonu', free: 'Sadece statik', premium: 'Nefes alma & yanıp sönme' },
        { label: 'Drive Mode — OBD-II araç HUD', free: false, premium: true },
      ];

  const plans = [
    {
      id: 'monthly',
      label: isEn ? 'Monthly' : 'Aylık',
      price: pricing.monthly,
      period: isEn ? '/ month' : '/ ay',
      highlight: false,
    },
    {
      id: 'yearly',
      label: isEn ? 'Yearly' : 'Yıllık',
      price: pricing.yearly,
      period: isEn ? '/ year' : '/ yıl',
      highlight: true,
      badge: isEn ? 'Best Value' : 'En İyi Değer',
    },
    {
      id: 'lifetime',
      label: isEn ? 'Lifetime' : 'Ömür Boyu',
      price: pricing.lifetime,
      period: isEn ? 'one-time' : 'tek seferlik',
      highlight: false,
    },
  ] as const;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Region indicator */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-extrabold text-foreground tracking-tight">
            {isEn ? 'Premium Packages' : 'Premium Paketler'}
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            {isEn
              ? 'Try every premium feature free for 3 days via Google Play, then choose a plan.'
              : 'Google Play üzerinden tüm premium özellikleri 3 gün ücretsiz dene, sonra bir plan seç.'}
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/80 border border-border text-[10px] font-mono text-muted-foreground shrink-0">
          <Globe className="w-3 h-3" />
          <span>
            {isEn ? 'Prices shown for' : 'Fiyatlar şu bölge için gösteriliyor:'} {countryCode ?? 'US'} · {pricing.currency}
          </span>
        </div>
      </div>

      {/* Package cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              'apple-card relative p-6 flex flex-col gap-4',
              plan.highlight && 'ring-2 ring-apple-blue shadow-lg shadow-blue-500/10'
            )}
          >
            {plan.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-apple-blue text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                <Sparkles className="w-3 h-3" />
                {plan.badge}
              </div>
            )}
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {plan.label}
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-extrabold text-foreground tracking-tight">
                {formatPrice(plan.price, pricing.currency, lang)}
              </div>
              <div className="text-xs text-muted-foreground">{plan.period}</div>
            </div>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noreferrer"
              className={cn(
                'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all active:scale-95',
                plan.highlight
                  ? 'bg-apple-blue text-white hover:opacity-90 shadow-md shadow-blue-500/20'
                  : 'bg-muted text-foreground hover:bg-muted/70'
              )}
            >
              <Smartphone className="w-3.5 h-3.5" />
              {isEn ? 'Get on Google Play' : "Google Play'de Aç"}
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>
        ))}
      </div>

      {/* Free vs Premium comparison */}
      <div className="apple-card p-6 sm:p-8 space-y-4">
        <div className="text-xs font-bold uppercase tracking-wider text-apple-blue">
          {isEn ? 'Free vs. Premium' : 'Ücretsiz ve Premium'}
        </div>

        <div className="overflow-x-auto -mx-2 px-2">
          <table className="w-full min-w-[420px] text-xs border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left font-semibold text-muted-foreground pb-3 pr-4 w-1/2">
                  {isEn ? 'Feature' : 'Özellik'}
                </th>
                <th className="text-center font-bold text-foreground pb-3 px-2">
                  {isEn ? 'Free' : 'Ücretsiz'}
                </th>
                <th className="text-center font-bold text-apple-blue pb-3 pl-2">
                  {isEn ? 'Premium' : 'Premium'}
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.label} className="border-b border-border/60 last:border-0">
                  <td className="py-3 pr-4 text-muted-foreground leading-snug">{row.label}</td>
                  <td className="py-3 px-2 text-center">
                    {typeof row.free === 'boolean' ? (
                      row.free ? (
                        <Check className="w-4 h-4 mx-auto text-apple-green" />
                      ) : (
                        <X className="w-4 h-4 mx-auto text-muted-foreground/40" />
                      )
                    ) : (
                      <span className="text-foreground/80 font-mono text-[11px]">{row.free}</span>
                    )}
                  </td>
                  <td className="py-3 pl-2 text-center">
                    {typeof row.premium === 'boolean' ? (
                      row.premium ? (
                        <Check className="w-4 h-4 mx-auto text-apple-blue" />
                      ) : (
                        <X className="w-4 h-4 mx-auto text-muted-foreground/40" />
                      )
                    ) : (
                      <span className="text-apple-blue font-mono text-[11px] font-bold">{row.premium}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-[11px] text-muted-foreground/70 leading-relaxed pt-1">
          {isEn
            ? 'Everything else in the app — the full card system, search, drawer styles, and theming — is free for everyone with no cap.'
            : 'Uygulamadaki her şey — tam kart sistemi, arama, çekmece stilleri ve temalama — herkes için ücretsiz ve sınırsız.'}
        </p>
      </div>

      <p className="text-[11px] text-muted-foreground/70 leading-relaxed">
        {isEn
          ? 'Prices are manually synced from Google Play Console and may lag behind the live store listing. The price and currency actually charged are always determined by Google Play at checkout.'
          : 'Fiyatlar Google Play Console\'dan elle senkronize edilir, canlı mağaza listelemesinin gerisinde kalabilir. Gerçekte tahsil edilecek fiyat ve para birimi her zaman ödeme anında Google Play tarafından belirlenir.'}
      </p>
    </div>
  );
}
