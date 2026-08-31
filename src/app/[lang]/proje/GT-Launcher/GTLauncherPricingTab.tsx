'use client';

import { useEffect, useState } from 'react';
import { Check, Sparkles, Smartphone, ExternalLink, Globe } from 'lucide-react';
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

  const features = isEn
    ? [
        'All visual style presets (Glass, Neobrutalism, Claymorphism, Neon, Pixel & more)',
        'Drive Mode — OBD-II vehicle HUD',
        'Unlimited module stacking per card',
        'Breathing & flashing notification animations',
        'Up to 12 saved custom style slots',
      ]
    : [
        'Tüm görsel stil presetleri (Glass, Neobrutalism, Claymorphism, Neon, Pixel ve daha fazlası)',
        'Drive Mode — OBD-II araç HUD',
        'Kart başına sınırsız modül stackleme',
        'Nefes alma ve yanıp sönme bildirim animasyonları',
        "12'ye kadar özel stil slotu kaydetme",
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

      {/* Feature checklist */}
      <div className="apple-card p-6 sm:p-8 space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-apple-blue">
          {isEn ? "What's included" : 'Nelere sahip oluyorsun'}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
          {features.map((f) => (
            <div key={f} className="flex items-start gap-2.5">
              <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 text-apple-blue" />
              <span className="text-xs text-muted-foreground leading-relaxed">{f}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground/70 leading-relaxed">
        {isEn
          ? 'Prices are manually synced from Google Play Console and may lag behind the live store listing. The price and currency actually charged are always determined by Google Play at checkout.'
          : 'Fiyatlar Google Play Console\'dan elle senkronize edilir, canlı mağaza listelemesinin gerisinde kalabilir. Gerçekte tahsil edilecek fiyat ve para birimi her zaman ödeme anında Google Play tarafından belirlenir.'}
      </p>
    </div>
  );
}
