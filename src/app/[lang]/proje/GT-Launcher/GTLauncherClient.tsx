'use client';

import { useState, useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Smartphone,
  Layers,
  Palette,
  Compass,
  Search,
  Gauge,
  Cpu,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Shield,
  Sliders,
  ExternalLink,
  Play,
  RotateCcw,
  Image as ImageIcon,
  MessageSquare,
  Music,
  TrendingUp,
  Cloud,
  LayoutGrid,
  Grid3x3,
  Wrench,
  LayoutTemplate,
  Bell,
  Camera,
  Calendar,
  Timer,
  StickyNote,
  Flashlight,
  Footprints,
  Clock,
  SkipBack,
  SkipForward,
  Pause,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';

interface GTLauncherClientProps {
  version: string;
}

// ── Full StyleRecipe model — ported field-for-field from the app's
// ui/theme/StyleRecipe.kt + ui/theme/StyleLibrary.kt. Every slider/switch
// below is a real, independently adjustable field in the app's own Style
// Studio (ui/screens/style/StyleEffectGroups.kt) — same ranges, same
// defaults, same enable toggles. Not a fixed set of 6 looks: a recipe.

type CornerType = 'SHARP' | 'ROUNDED' | 'CUT' | 'PIXELATED';
type FillGradient = 'NONE' | 'VERTICAL' | 'DIAGONAL';
type BorderGradient = 'NONE' | 'SWEEP' | 'PULSE';
type BorderColorSrc = 'ACCENT' | 'LIGHT' | 'CONTRAST';
type ShadowDir = 'BR' | 'BL' | 'TR' | 'TL' | 'B' | 'R' | 'T' | 'L';
type ShadowColorMode = 'CONTRAST_BG' | 'ACCENT' | 'DARK' | 'LIGHT';
type PatternShapeT = 'DOT' | 'BLOCK';
type StyleRecipeId = 'FLAT' | 'GLASS' | 'NEOBRUTALISM' | 'CLAYMORPHISM' | 'MINIMALISM' | 'NEON';

interface StyleRecipe {
  cornerType: CornerType;
  cornerSize: number;
  fillEnabled: boolean;
  fillAlpha: number;
  fillGradient: FillGradient;
  fillGradientStrength: number;
  borderEnabled: boolean;
  borderWidth: number;
  borderAlpha: number;
  borderGradient: BorderGradient;
  borderColorSrc: BorderColorSrc;
  hardShadowEnabled: boolean;
  hardShadowSize: number;
  hardShadowAlpha: number;
  hardShadowDir: ShadowDir;
  hardShadowColorMode: ShadowColorMode;
  softShadowEnabled: boolean;
  softShadowElevation: number;
  softShadowAlpha: number;
  glowEnabled: boolean;
  glowRadius: number;
  glowAlpha: number;
  frost: number;
  shimmer: number;
  highlight: number;
  innerGlow: number;
  patternEnabled: boolean;
  patternShape: PatternShapeT;
  patternSize: number;
  patternSpacing: number;
  patternAlpha: number;
  patternNoise: number;
  patternColorSrc: BorderColorSrc;
}

// Mirrors StyleRecipe()'s Kotlin default constructor values.
const RECIPE_DEFAULTS: StyleRecipe = {
  cornerType: 'ROUNDED', cornerSize: 14,
  fillEnabled: true, fillAlpha: 1, fillGradient: 'NONE', fillGradientStrength: 0,
  borderEnabled: true, borderWidth: 1, borderAlpha: 0.5, borderGradient: 'NONE', borderColorSrc: 'ACCENT',
  hardShadowEnabled: false, hardShadowSize: 8, hardShadowAlpha: 0.85, hardShadowDir: 'BR', hardShadowColorMode: 'CONTRAST_BG',
  softShadowEnabled: false, softShadowElevation: 14, softShadowAlpha: 0.32,
  glowEnabled: false, glowRadius: 8, glowAlpha: 0.80,
  frost: 0, shimmer: 0, highlight: 0, innerGlow: 0,
  patternEnabled: false, patternShape: 'DOT', patternSize: 3, patternSpacing: 6, patternAlpha: 0.35, patternNoise: 0, patternColorSrc: 'CONTRAST',
};

// Presets — only the overrides StyleLibrary.kt actually specifies; every
// other field falls back to RECIPE_DEFAULTS, exactly as in Kotlin.
const STYLE_PRESETS: Record<StyleRecipeId, StyleRecipe> = {
  FLAT: { ...RECIPE_DEFAULTS, cornerSize: 14, fillAlpha: 1.0, fillGradient: 'VERTICAL', fillGradientStrength: 0, borderWidth: 1, borderAlpha: 0.50 },
  GLASS: { ...RECIPE_DEFAULTS, cornerSize: 22, fillAlpha: 0.18, fillGradient: 'DIAGONAL', fillGradientStrength: 1, borderWidth: 1.5, borderAlpha: 0.90, borderGradient: 'SWEEP', frost: 0.22, shimmer: 0.13, innerGlow: 0.07 },
  NEOBRUTALISM: { ...RECIPE_DEFAULTS, cornerSize: 4, fillAlpha: 0.92, borderWidth: 3, borderAlpha: 0.96, hardShadowEnabled: true },
  CLAYMORPHISM: { ...RECIPE_DEFAULTS, cornerSize: 28, fillAlpha: 0.92, fillGradient: 'VERTICAL', borderWidth: 0.6, borderAlpha: 0.20, borderColorSrc: 'LIGHT', softShadowEnabled: true, highlight: 0.20, shimmer: 0.20 },
  MINIMALISM: { ...RECIPE_DEFAULTS, cornerSize: 8, fillAlpha: 0.10, borderWidth: 0.8, borderAlpha: 0.28 },
  NEON: { ...RECIPE_DEFAULTS, cornerSize: 14, fillAlpha: 0.08, borderWidth: 1.5, borderAlpha: 0.95, borderGradient: 'PULSE', glowEnabled: true },
};

const SHADOW_VEC: Record<ShadowDir, [number, number]> = {
  BR: [1, 1], BL: [-1, 1], TR: [1, -1], TL: [-1, -1], B: [0, 1], R: [1, 0], T: [0, -1], L: [-1, 0],
};

// The app's full module catalog — ui/screens/CardRegistry.kt (CardRegistry.all),
// its single source of truth for card-type metadata ("Adding a new card type =
// add one CardDescriptor here"). gridLabel, accentColor and defaultIconName are
// copied verbatim (accentColor resolved from ui/theme/GtColors.kt); iconName is
// mapped to its closest Lucide equivalent since the app draws Material icons.
const MODULE_CATALOG: { label: string; hex: string; icon: typeof Music }[] = [
  { label: 'APP\nLAUNCHER', hex: '#FF9900', icon: LayoutGrid },
  { label: 'APP\nDRAWER', hex: '#9999CC', icon: Grid3x3 },
  { label: 'MEDIA\nCONTROL', hex: '#FF7700', icon: Music },
  { label: 'IMAGE\nLOGS', hex: '#CC99CC', icon: Compass },
  { label: 'SYSTEM\nSTATUS', hex: '#FFCC66', icon: Wrench },
  { label: 'ANDROID\nWIDGET', hex: '#9977AA', icon: LayoutTemplate },
  { label: 'NOTIF\nCARD', hex: '#00D4FF', icon: Bell },
  { label: 'COMM\nLINKS', hex: '#9999CC', icon: MessageSquare },
  { label: 'CAMERA\nCONTROL', hex: '#14B8A6', icon: Camera },
  { label: 'DECK\nROTATOR', hex: '#FF7700', icon: LayoutGrid },
  { label: 'CHRONO\nMETER', hex: '#FFCC66', icon: Clock },
  { label: 'WEATHER', hex: '#4DA6FF', icon: Cloud },
  { label: 'CALENDAR', hex: '#9999CC', icon: Calendar },
  { label: 'COUNTDOWN\nTIMER', hex: '#FF7700', icon: Timer },
  { label: 'QUICK\nNOTE', hex: '#FFFF99', icon: StickyNote },
  { label: 'FLASH\nLIGHT', hex: '#FFDD44', icon: Flashlight },
  { label: 'STEP\nCOUNTER', hex: '#00CC00', icon: Footprints },
  { label: 'FINANCE', hex: '#00CC00', icon: TrendingUp },
  { label: 'APP\nLIST', hex: '#9333EA', icon: LayoutGrid },
];

function hexToRgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function cardStyleFor(recipe: StyleRecipe, hex: string): CSSProperties {
  const { r, g, b } = hexToRgb(hex);
  const rgb = `${r}, ${g}, ${b}`;
  const isSolid = recipe.fillEnabled && recipe.fillAlpha >= 0.5;
  const style: CSSProperties = { color: isSolid ? '#000000' : hex, position: 'relative' };

  // Corners
  if (recipe.cornerType === 'SHARP') {
    style.borderRadius = 0;
  } else if (recipe.cornerType === 'ROUNDED') {
    style.borderRadius = `${recipe.cornerSize}px`;
  } else if (recipe.cornerType === 'CUT') {
    const c = recipe.cornerSize;
    style.clipPath = `polygon(${c}px 0, calc(100% - ${c}px) 0, 100% ${c}px, 100% calc(100% - ${c}px), calc(100% - ${c}px) 100%, ${c}px 100%, 0 calc(100% - ${c}px), 0 ${c}px)`;
  } else {
    const c = Math.max(4, recipe.cornerSize) / 2;
    style.clipPath = `polygon(${c}px 0, calc(100% - ${c}px) 0, calc(100% - ${c}px) ${c}px, 100% ${c}px, 100% calc(100% - ${c}px), calc(100% - ${c}px) calc(100% - ${c}px), calc(100% - ${c}px) 100%, ${c}px 100%, ${c}px calc(100% - ${c}px), 0 calc(100% - ${c}px), 0 ${c}px, ${c}px ${c}px)`;
  }

  // Fill + highlight + pattern, stacked as background-image layers (front → back)
  const bgLayers: string[] = [];
  const bgSizes: string[] = [];
  if (recipe.highlight > 0) {
    bgLayers.push(`linear-gradient(180deg, rgba(255,255,255,${recipe.highlight}), transparent 55%)`);
    bgSizes.push('auto');
  }
  if (recipe.patternEnabled) {
    const patRgb = recipe.patternColorSrc === 'LIGHT' ? '255,255,255' : recipe.patternColorSrc === 'ACCENT' ? rgb : '0,0,0';
    const cell = recipe.patternSize * 2 + recipe.patternSpacing;
    if (recipe.patternShape === 'DOT') {
      bgLayers.push(`radial-gradient(circle, rgba(${patRgb}, ${recipe.patternAlpha}) ${recipe.patternSize}px, transparent ${recipe.patternSize}px)`);
      bgSizes.push(`${cell}px ${cell}px`);
    } else {
      bgLayers.push(`linear-gradient(rgba(${patRgb}, ${recipe.patternAlpha}) ${recipe.patternSize}px, transparent ${recipe.patternSize}px)`);
      bgSizes.push(`${cell}px ${cell}px`);
      bgLayers.push(`linear-gradient(90deg, rgba(${patRgb}, ${recipe.patternAlpha}) ${recipe.patternSize}px, transparent ${recipe.patternSize}px)`);
      bgSizes.push(`${cell}px ${cell}px`);
    }
  }
  if (recipe.fillEnabled && recipe.fillGradient !== 'NONE') {
    const endAlpha = recipe.fillGradient === 'VERTICAL'
      ? recipe.fillAlpha * (1 - recipe.fillGradientStrength * 0.5)
      : recipe.fillAlpha * 0.4;
    const angle = recipe.fillGradient === 'VERTICAL' ? '180deg' : '135deg';
    bgLayers.push(`linear-gradient(${angle}, rgba(${rgb}, ${recipe.fillAlpha}), rgba(${rgb}, ${endAlpha}))`);
    bgSizes.push('auto');
  }
  if (bgLayers.length) {
    style.backgroundImage = bgLayers.join(', ');
    style.backgroundSize = bgSizes.join(', ');
  }
  style.backgroundColor = recipe.fillEnabled
    ? `rgba(${rgb}, ${recipe.fillGradient === 'NONE' ? recipe.fillAlpha : 0})`
    : 'transparent';

  // Border
  if (recipe.borderEnabled && recipe.borderWidth > 0) {
    const borderRgb = recipe.borderColorSrc === 'LIGHT' ? '255, 255, 255' : recipe.borderColorSrc === 'CONTRAST' ? '0, 0, 0' : rgb;
    style.border = `${recipe.borderWidth}px solid rgba(${borderRgb}, ${recipe.borderAlpha})`;
  } else {
    style.border = 'none';
  }
  if (recipe.borderGradient === 'PULSE') style.animation = 'gt-border-pulse 1.6s ease-in-out infinite';

  // Shadows + glow — independently toggleable, combined into one box-shadow list
  const shadows: string[] = [];
  if (recipe.hardShadowEnabled) {
    const [dx, dy] = SHADOW_VEC[recipe.hardShadowDir];
    const shadowRgb = recipe.hardShadowColorMode === 'ACCENT' ? rgb : recipe.hardShadowColorMode === 'LIGHT' ? '255,255,255' : '0,0,0';
    shadows.push(`${dx * recipe.hardShadowSize}px ${dy * recipe.hardShadowSize}px 0 0 rgba(${shadowRgb}, ${recipe.hardShadowAlpha})`);
  }
  if (recipe.softShadowEnabled) {
    shadows.push(`0 ${recipe.softShadowElevation}px ${recipe.softShadowElevation * 2}px -8px rgba(0,0,0, ${recipe.softShadowAlpha})`);
  }
  if (recipe.glowEnabled) {
    shadows.push(`0 0 ${recipe.glowRadius * 2}px rgba(${rgb}, ${recipe.glowAlpha})`);
  }
  if (recipe.innerGlow > 0) {
    shadows.push(`inset 0 0 12px rgba(${rgb}, ${recipe.innerGlow})`);
  }
  if (shadows.length) style.boxShadow = shadows.join(', ');

  if (recipe.frost > 0) style.backdropFilter = `blur(${recipe.frost * 24}px)`;

  return style;
}

function EngSlider({ label, value, min, max, step = 0.01, onChange, accent }: {
  label: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void; accent: string;
}) {
  return (
    <label className="block space-y-1">
      <div className="text-[10px] font-mono text-muted-foreground">{label}</div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1 rounded-full cursor-pointer"
        style={{ accentColor: accent }}
      />
    </label>
  );
}

function EnumPills<T extends string>({ options, value, onChange, accent }: {
  options: readonly T[]; value: T; onChange: (v: T) => void; accent: string;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className="px-2 py-1 rounded-md text-[9px] font-mono font-bold transition-all"
            style={{
              color: active ? accent : 'rgba(154,154,162,1)',
              backgroundColor: active ? `${accent}33` : 'transparent',
              border: `1px solid ${active ? accent : `${accent}40`}`,
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function EffectGroup({ title, summary, accent, expanded, onToggle, master, onMasterChange, children }: {
  title: string; summary: string; accent: string; expanded: boolean; onToggle: () => void;
  master?: boolean; onMasterChange?: (v: boolean) => void; children: ReactNode;
}) {
  return (
    <div className="rounded-xl p-3 space-y-2.5" style={{ border: `1px solid ${accent}33`, backgroundColor: 'rgba(255,255,255,0.02)' }}>
      <button type="button" onClick={onToggle} className="w-full flex items-center gap-2 text-left cursor-pointer">
        <span style={{ color: accent }} className="text-xs">{expanded ? '▾' : '▸'}</span>
        <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: accent }}>{title}</span>
        <span className="flex-1" />
        {!expanded && <span className="text-[10px] text-muted-foreground">{summary}</span>}
        {master !== undefined && onMasterChange && (
          <input
            type="checkbox"
            checked={master}
            onChange={(e) => onMasterChange(e.target.checked)}
            onClick={(e) => e.stopPropagation()}
            className="w-3.5 h-3.5"
            style={{ accentColor: accent }}
          />
        )}
      </button>
      {expanded && <div className="space-y-3 pt-1">{children}</div>}
    </div>
  );
}

export function GTLauncherClient({ version }: GTLauncherClientProps) {
  const { t, lang } = useI18n();
  const isEn = lang === 'en';

  const interactiveFeatures = [
    {
      id: 'builder',
      title: isEn ? '5-Tab Card Builder' : '5 Sekmeli Kart Üreticisi',
      badge: isEn ? 'Modular UI System' : 'Modüler Arayüz Mimarisi',
      desc: isEn
        ? 'Construct bespoke widget cards step-by-step: configure capabilities (system monitors, crypto tickers, weather, media), behaviors, visual styles, dimensions, and custom image backdrops.'
        : 'Sıfırdan özel kartlar inşa edin: yetenekler (sistem monitörleri, kripto takibi, hava durumu, medya), davranışlar, görsel stiller, boyutlar ve özel görsel katmanları adım adım yapılandırın.',
      gif: '/projects/GT-Launcher/card-builder-demo.gif',
      icon: Layers,
      color: 'text-apple-blue',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      solid: 'bg-[#FF9900] text-black border border-black/40',
      iconBg: 'bg-black/10',
      specs: [
        { label: isEn ? 'Card Capabilities' : 'Modül Yetenekleri', val: '19+ UCCS Nodes' },
        { label: isEn ? 'Visual Styles' : 'Görsel Stiller', val: '6 Engine Modes' },
        { label: isEn ? 'Grid Constraints' : 'Izgara Ölçüsü', val: '1x1 to 4x4 Cells' },
      ],
    },
    {
      id: 'themes',
      title: isEn ? 'Dynamic LCARS Theme Engine' : 'Dinamik LCARS Tema Motoru',
      badge: isEn ? 'Real-Time Shader Pipeline' : 'Gerçek Zamanlı Renk Motoru',
      desc: isEn
        ? 'Create and fine-tune dynamic color palettes with contrast curve computation. Features wallpaper pinch-to-crop and GPU-accelerated background blur synthesis.'
        : 'Kontrast eğrisi hesaplamaları ile dinamik renk paletleri oluşturun ve özelleştirin. Canlı duvar kağıdı kırpma ve GPU hızlandırmalı arka plan bulanıklaştırma içerir.',
      gif: '/projects/GT-Launcher/theme-creator-demo.gif',
      icon: Palette,
      color: 'text-apple-orange',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/20',
      solid: 'bg-[#FFCC66] text-black border border-black/40',
      iconBg: 'bg-black/10',
      specs: [
        { label: isEn ? 'Color Channels' : 'Renk Kanalları', val: '7 LCARS Hues' },
        { label: isEn ? 'Wallpaper Slicer' : 'Duvar Kağıdı Dilimleme', val: 'Pinch-to-Crop UV' },
        { label: isEn ? 'Presets' : 'Hazır Temalar', val: '12 Official Presets' },
      ],
    },
    {
      id: 'grid',
      title: isEn ? 'Fluid 2D Grid Drag & Resize' : 'Akıcı 2D Izgara ve Boyutlandırma',
      badge: isEn ? 'SubcomposeLayout Engine' : 'Compose SubcomposeLayout',
      desc: isEn
        ? 'Direct physical drag-and-drop widget arrangement with collision physics, snap-to-grid ergonomics, and real-time live layout re-calculation.'
        : 'Çarpışma fiziği, ızgaraya yapışma ergonomisi ve gerçek zamanlı düzen hesaplaması ile doğrudan fiziksel sürükle-bırak kart yerleşimi.',
      gif: '/projects/GT-Launcher/grid-drag-resize.gif',
      icon: Sliders,
      color: 'text-apple-green',
      bg: 'bg-green-500/10',
      border: 'border-green-500/20',
      solid: 'bg-[#00CC00] text-black border border-black/40',
      iconBg: 'bg-black/10',
      specs: [
        { label: isEn ? 'Measure Phase' : 'Hesaplama Fazı', val: '< 1.2 ms per frame' },
        { label: isEn ? 'Re-flow' : 'Akış Düzeni', val: 'Non-destructive' },
        { label: isEn ? 'Lock Mode' : 'Kilit Modu', val: 'One-touch Guard' },
      ],
    },
    {
      id: 'drive',
      title: isEn ? 'Drive Mode & OBD Telemetry' : 'Sürüş Modu ve OBD Telemetrisi',
      badge: isEn ? 'Automotive BLE Integration' : 'Otomotiv BLE Entegrasyonu',
      desc: isEn
        ? 'High-contrast automotive cockpit interface reading real-time engine metrics, GPS ground speed, radar distance warnings, and diagnostic trouble codes (DTCs).'
        : 'Gerçek zamanlı motor telemetrisi, GPS yer hızı, radar mesafe uyarıları ve arıza teşhis kodlarını (DTC) okuyan yüksek kontrastlı kokpit arayüzü.',
      gif: '/projects/GT-Launcher/vehicle-obd-settings.gif',
      icon: Gauge,
      color: 'text-apple-purple',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
      solid: 'bg-[#CC6666] text-black border border-black/40',
      iconBg: 'bg-black/10',
      specs: [
        { label: isEn ? 'Protocol' : 'Protokol', val: 'ELM327 BLE / CAN' },
        { label: isEn ? 'Refresh Rate' : 'Yenileme Hızı', val: '20 Hz Sensor Loop' },
        { label: isEn ? 'Safety Mode' : 'Güvenlik Modu', val: 'Night HUD Contrast' },
      ],
    },
    {
      id: 'search',
      title: isEn ? 'Omni-Search & App Drawer' : 'OmniSearch ve Uygulama Çekmecesi',
      badge: isEn ? 'Sub-Millisecond Indexer' : 'Hafif İndeksleme Çekirdeği',
      desc: isEn
        ? 'Universal command deck indexing installed packages, Play Store shortcuts, device settings, and web search results in a single unified stroke.'
        : 'Yüklü paketleri, Play Store kısayollarını, cihaz ayarlarını ve web aramalarını tek komuta çubuğunda anlık indeksleyen arama çekirdeği.',
      gif: '/projects/GT-Launcher/omnisearch-demo.gif',
      icon: Search,
      color: 'text-apple-cyan',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
      solid: 'bg-[#9999CC] text-black border border-black/40',
      iconBg: 'bg-black/10',
      specs: [
        { label: isEn ? 'Lookup Latency' : 'Arama Gecikmesi', val: '< 0.8 ms instant' },
        { label: isEn ? 'Categories' : 'Kategoriler', val: 'Smart Clustering' },
        { label: isEn ? 'Index Store' : 'Depolama', val: 'In-memory Cache' },
      ],
    },
    {
      id: 'tour',
      title: isEn ? 'Interactive System Tour' : 'İnteraktif Sistem Turu',
      badge: isEn ? 'Zero-Friction Onboarding' : 'Kullanıcı Deneyimi',
      desc: isEn
        ? 'Guided introductory walkthrough demonstrating swipe gestures, drawer reveals, module pinning, and emergency launcher defaults.'
        : 'Kaydırma hareketlerini, çekmece açılışlarını, modül sabitlemeyi ve varsayılan başlatıcı ayarlarını adım adım gösteren rehber.',
      gif: '/projects/GT-Launcher/interactive-tour-demo.gif',
      icon: Compass,
      color: 'text-apple-orange',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/20',
      solid: 'bg-[#FF7700] text-black border border-black/40',
      iconBg: 'bg-black/10',
      specs: [
        { label: isEn ? 'Gesture Engine' : 'Jest Motoru', val: 'Multi-Directional' },
        { label: isEn ? 'Haptic' : 'Titreşim', val: 'Tactile Feedback' },
        { label: isEn ? 'Profiles' : 'Profiller', val: 'Export & Import JSON' },
      ],
    },
    {
      id: 'card-art',
      title: isEn ? 'Card Art & Color Wheel' : 'Kart İçi Sanat & Renk Çarkı',
      badge: isEn ? 'Per-Card Background & Tint' : 'Kart İçi Görsel & Renk Teorisi',
      desc: isEn
        ? 'Embed bespoke photographs into individual widget cards with opacity tuning, text color overrides, custom icon glyphs, and harmonic 360° color-theory wheel palettes.'
        : 'Her widget kartının içine bağımsız fotoğraf yerleştirin; opaklık katmanları, metin rengi geçersiz kılma, özel ikonlar ve renk teorisi armonileri sunan 360° renk çarkı ile kişiselleştirin.',
      gif: '/projects/GT-Launcher/card-customization-demo.gif',
      icon: ImageIcon,
      color: 'text-pink-400',
      bg: 'bg-pink-500/10',
      border: 'border-pink-500/20',
      solid: 'bg-[#9977AA] text-black border border-black/40',
      iconBg: 'bg-black/10',
      specs: [
        { label: isEn ? 'Backdrop Engine' : 'Görsel Katmanı', val: 'Per-Card Surface UV' },
        { label: isEn ? 'Color Theory' : 'Renk Teorisi', val: 'Analogous / Triadic / Hex' },
        { label: isEn ? 'Layer Controls' : 'Katman Ayarları', val: 'Opacity + Tint Filter' },
      ],
    },
    {
      id: 'foreground-slice',
      title: isEn ? 'Foreground Photo Mosaic' : 'Ön Plan Fotoğraf Mozaiği',
      badge: isEn ? 'Multi-Card UV Grid Slicer' : 'Çoklu Kart UV Izgara Dilimleyici',
      desc: isEn
        ? 'Position an overarching photograph over the active launcher layout. The system computes exact cell UV bounds, slicing the image across cards into an interactive dynamic mosaic.'
        : 'Tüm ızgaranın üzerine tek bir fotoğraf konumlandırın; sistem her kartın koordinatını hesaplayarak görseli kartlar arasında etkileşimli bir mozaik gibi dilimler.',
      gif: '/projects/GT-Launcher/foreground-image-slice.gif',
      icon: Sparkles,
      color: 'text-apple-cyan',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
      solid: 'bg-[#CC99CC] text-black border border-black/40',
      iconBg: 'bg-black/10',
      specs: [
        { label: isEn ? 'Slicing Algorithm' : 'Dilimleme Algoritması', val: 'Global Grid UV Matrix' },
        { label: isEn ? 'Resolution' : 'Önizleme Çözünürlüğü', val: 'Zero-Lag Hardware Cache' },
        { label: isEn ? 'Source Picker' : 'Görsel Kaynağı', val: 'System SAF & Gallery' },
      ],
    },
  ];

  const [activeFeatureId, setActiveFeatureId] = useState(interactiveFeatures[0].id);
  const activeFeature = interactiveFeatures.find((f) => f.id === activeFeatureId) || interactiveFeatures[0];

  // ── SIDEBAR RAIL: scroll-spy across the flagship block's own sections ──
  // Mirrors the real app's rail: a "HOME" flag tab + a tight stack of solid,
  // permanently-colored icon squares (not a uniform nav that only colors on hover).
  const railSections = [
    { id: 'gt-home', icon: Smartphone, label: isEn ? 'Home' : 'Ana Ekran' },
    { id: 'gt-modules', icon: Layers, label: isEn ? 'Modules' : 'Modüller', solid: 'bg-[#FF9900] text-black' },
    { id: 'gt-styles', icon: Palette, label: isEn ? 'Styles' : 'Stiller', solid: 'bg-[#9999CC] text-black' },
  ];
  const [activeRailId, setActiveRailId] = useState(railSections[0].id);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const targets = railSections
      .map((r) => document.getElementById(r.id))
      .filter((el): el is HTMLElement => !!el);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveRailId(visible.target.id);
      },
      { root: null, rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Recipe values copied verbatim from the app's own
  // ui/theme/StyleLibrary.kt (StyleRecipe.BUILTIN) — corner radius (dp),
  // fill alpha, border width/alpha. Not eyeballed from screenshots.
  const visualStyles = [
    { id: 'flat', recipeId: 'FLAT' as const, name: 'FLAT', desc: isEn ? 'Solid fill, subtle border' : 'Düz dolgu, ince kenarlık' },
    { id: 'glass', recipeId: 'GLASS' as const, name: 'GLASS', desc: isEn ? 'Frosted translucent surface' : 'Buzlu yarı saydam yüzey' },
    { id: 'neo', recipeId: 'NEOBRUTALISM' as const, name: isEn ? 'NEO (Neobrutalism)' : 'NEO (Neobrütalizm)', desc: isEn ? 'Hard shadow offset, retro feel' : 'Sert gölge kayması, retro his' },
    { id: 'clay', recipeId: 'CLAYMORPHISM' as const, name: isEn ? 'CLAY (Claymorphism)' : 'CLAY (Kilmorfizm)', desc: isEn ? 'Soft pastel blob with elevation' : 'Kabartmalı yumuşak pastel yüzey' },
    { id: 'minimal', recipeId: 'MINIMALISM' as const, name: 'MINIMAL', desc: isEn ? 'Near-invisible, text-only' : 'Neredeyse görünmez, sade metin' },
    { id: 'neon', recipeId: 'NEON' as const, name: 'NEON', desc: isEn ? 'Glowing outline on a dark surface' : 'Koyu yüzeyde parlayan kenarlık' },
  ];
  const [activePresetId, setActivePresetId] = useState<StyleRecipeId>('FLAT');
  const [recipe, setRecipe] = useState<StyleRecipe>(STYLE_PRESETS.FLAT);
  const patch = (p: Partial<StyleRecipe>) => setRecipe((r) => ({ ...r, ...p }));
  const studioAccent = '#FF9900';

  const [shapeOpen, setShapeOpen] = useState(true);
  const [fillOpen, setFillOpen] = useState(false);
  const [borderOpen, setBorderOpen] = useState(false);
  const [shadowOpen, setShadowOpen] = useState(false);
  const [glowOpen, setGlowOpen] = useState(false);
  const [textureOpen, setTextureOpen] = useState(false);
  const [patternOpen, setPatternOpen] = useState(false);

  // Media card state — the app's MusicControlPlugin exposes real
  // onPlayPause/onNext/onPrevious controls (CardPlugins.kt); mirrored here
  // as an actually-clickable transport instead of a static icon.
  const [mediaPlaying, setMediaPlaying] = useState(false);
  const [mediaTrack, setMediaTrack] = useState(0);
  const demoTracks = isEn
    ? ['SUBSPACE AUDIO', 'BRIDGE AMBIENCE', 'WARP CORE HUM']
    : ['SUBSPACE AUDIO', 'KÖPRÜ ORTAM SESİ', 'WARP ÇEKİRDEĞİ UĞULTUSU'];

  // Card types + default icons copied from the app's own
  // ui/screens/CardRegistry.kt (MUSIC_CONTROL→Music, COMMS→Chat,
  // FINANCE→TrendingUp, WEATHER→Weather/Cloud) — not generic icon picks.
  const demoCards: { label: string; hex: string; icon: typeof Music }[] = [
    { label: 'COMM', hex: '#FF7700', icon: MessageSquare },
    { label: 'FINANCE', hex: '#9999CC', icon: TrendingUp },
    { label: 'WEATHER', hex: '#FFCC66', icon: Cloud },
  ];

  return (
    <div ref={rootRef} className="dark bg-background rounded-[2rem] sm:rounded-[2.5rem] border border-border p-3 sm:p-5 flex gap-3 sm:gap-5">

      {/* ── SIDEBAR RAIL (mirrors the app's own icon rail: HOME flag + stacked solid-color squares) ── */}
      <nav className="hidden sm:flex flex-col shrink-0 sticky top-4 self-start w-14 sm:w-16">
        {/* HOME flag tab — light, flat-bottomed, like the app's status flag */}
        <a
          href="#gt-home"
          aria-label={railSections[0].label}
          title={railSections[0].label}
          className={cn(
            "rounded-tl-[4px] rounded-tr-[20px] text-center text-[10px] font-extrabold uppercase tracking-wider py-1.5 bg-[#FFEECC] text-[#553311] transition-opacity",
            activeRailId === 'gt-home' ? "opacity-100" : "opacity-80 hover:opacity-100"
          )}
        >
          {isEn ? 'HOME' : 'ANA'}
        </a>

        {/* Stacked solid-color icon squares */}
        <div className="flex flex-col gap-1.5 mt-1.5">
          {railSections.slice(1).map((r) => {
            const RailIcon = r.icon;
            const isActive = r.id === activeRailId;
            return (
              <a
                key={r.id}
                href={`#${r.id}`}
                aria-label={r.label}
                title={r.label}
                className={cn(
                  "w-14 h-14 sm:w-16 sm:h-16 rounded-[10px] border border-black/40 flex items-center justify-center transition-all",
                  r.solid,
                  isActive ? "ring-2 ring-white/80 scale-105 shadow-lg" : "opacity-85 hover:opacity-100"
                )}
              >
                <RailIcon className="w-6 h-6" />
              </a>
            );
          })}
          <a
            href="https://play.google.com/store/apps/details?id=com.alazndy.gtlauncher"
            target="_blank"
            rel="noreferrer"
            aria-label={isEn ? 'Get on Google Play' : "Google Play'den İndir"}
            title={isEn ? 'Get on Google Play' : "Google Play'den İndir"}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-[10px] border border-black/40 flex items-center justify-center bg-[#AA4444] text-black opacity-85 hover:opacity-100 transition-all"
          >
            <Play className="w-6 h-6" />
          </a>
        </div>
      </nav>

      {/* ── MAIN CONTENT COLUMN ── */}
      <div className="flex-1 min-w-0 space-y-10">

      {/* ── HERO BANNER ── */}
      <section id="gt-home" className="apple-card p-8 sm:p-12 md:p-14 space-y-8 relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold bg-blue-500/10 text-apple-blue border border-blue-500/20">
              <Smartphone className="w-3.5 h-3.5" />
              Android 12+ · Jetpack Compose
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-muted text-foreground/80 border border-border">
              {version || 'v4.2.15'} Latest
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono text-apple-green bg-green-500/10 border border-green-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Google Play Verified
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.02]">
            GT-Launcher
          </h1>

          <p className="text-base sm:text-xl text-muted-foreground leading-relaxed font-normal max-w-2xl">
            {isEn
              ? 'Star Trek LCARS-inspired modular Android home screen ecosystem. Features capability-based card builder, sub-millisecond OmniSearch, and OBD-II vehicle HUD telemetry.'
              : 'Star Trek LCARS estetiğinde, tamamen modüler kart sistemine sahip Android ana ekran ekosistemi: 5 sekmeli kart üretici, anlık OmniSearch ve OBD-II araç HUD telemetrisi.'}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="https://play.google.com/store/apps/details?id=com.alazndy.gtlauncher"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-lcars-orange text-black hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-orange-500/25"
          >
            <Smartphone className="w-4 h-4" />
            <span>{isEn ? 'Get on Google Play' : "Google Play'den İndir"}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>

        {/* Hardware & Engineering Performance Pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-border text-xs">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-lcars-gold font-mono">&lt; 180 ms</div>
            <div className="text-muted-foreground mt-0.5">{isEn ? 'Cold Startup' : 'Soğuk Başlatma'}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-apple-green font-mono">120 FPS</div>
            <div className="text-muted-foreground mt-0.5">{isEn ? 'Compose Render Loop' : 'Akıcı Yenileme'}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-apple-orange font-mono">&lt; 45 MB</div>
            <div className="text-muted-foreground mt-0.5">{isEn ? 'Idle Memory' : 'Boşta RAM Tüketimi'}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-apple-purple font-mono">100%</div>
            <div className="text-muted-foreground mt-0.5">{isEn ? 'Local & Private' : 'Yerel Depolama'}</div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE WORKSPACE PREVIEW ── */}
      <section id="gt-modules" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              {isEn ? 'Interactive Feature Matrix' : 'İnteraktif Modül Vitrini'}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {isEn
                ? 'Select a module below to inspect live recordings, architecture design, and technical parameters.'
                : 'Aşağıdaki modüllerden birini seçerek canlı kayıtları, mimari kararları ve teknik parametreleri inceleyin.'}
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-mono text-apple-green bg-green-500/10 px-3 py-1 rounded-md border border-green-500/20 w-fit">
            <span className="w-2 h-2 rounded-full bg-apple-green animate-pulse" />
            {interactiveFeatures.length} Live Demos
          </span>
        </div>

        {/* Feature Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {interactiveFeatures.map((f) => {
            const Icon = f.icon;
            const isSelected = f.id === activeFeatureId;
            return (
              <button
                key={f.id}
                onClick={() => setActiveFeatureId(f.id)}
                className={cn(
                  "p-3.5 rounded-[14px] text-left transition-all flex flex-col justify-between space-y-3 cursor-pointer",
                  f.solid,
                  isSelected ? "ring-2 ring-white/80 shadow-lg scale-[1.03]" : "opacity-75 hover:opacity-100 hover:scale-[1.015]"
                )}
              >
                <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center", f.iconBg)}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold line-clamp-1">{f.title.split('&')[0].trim()}</div>
                  <div className="text-[10px] font-mono opacity-70 line-clamp-1">{f.badge.split('·')[0].trim()}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Interactive Stage */}
        <div className="apple-card p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Device Mockup Displaying the Live GIF */}
          <div className="lg:col-span-6 flex justify-center">
            <div
              className={cn(
                "relative w-full rounded-[2.5rem] overflow-hidden border-4 border-border shadow-2xl bg-black transition-all duration-500",
                activeFeature.id === 'drive' ? "max-w-md sm:max-w-lg aspect-[18/10]" : "max-w-xs sm:max-w-sm aspect-[9/19]"
              )}
            >
              {/* Device Notch / Status Pill */}
              {activeFeature.id !== 'drive' && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-muted/80 backdrop-blur rounded-b-2xl z-20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-border mr-2" />
                  <div className="w-10 h-1 bg-border rounded-full" />
                </div>
              )}

              {/* Dynamic GIF Display */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature.gif}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="w-full h-full bg-black flex items-center justify-center overflow-hidden"
                >
                  <img
                    src={activeFeature.gif}
                    alt={activeFeature.title}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Bottom Home Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full z-20" />
            </div>
          </div>

          {/* Right: Technical Breakdown */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold border", activeFeature.bg, activeFeature.border, activeFeature.color)}>
                {activeFeature.badge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                {activeFeature.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {activeFeature.desc}
              </p>
            </div>

            {/* Spec Matrix */}
            <div className="p-4 rounded-2xl bg-muted/60 border border-border space-y-2.5">
              <div className="text-[11px] font-bold font-mono text-foreground uppercase tracking-wider border-b border-border pb-2">
                {isEn ? 'ENGINEERING METRICS' : 'MÜHENDİSLİK PARAMETRELERİ'}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {activeFeature.specs.map((s) => (
                  <div key={s.label} className="space-y-0.5">
                    <div className="text-xs font-bold text-foreground font-mono">{s.val}</div>
                    <div className="text-[10px] text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── VISUAL STYLE STUDIO — live, driven by the app's own StyleRecipe fields ── */}
      <section id="gt-styles" className="space-y-6">
        <style>{`@keyframes gt-border-pulse{0%,100%{opacity:1}50%{opacity:.35}}`}</style>
        <div className="px-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            {isEn ? 'Visual Style Studio' : 'Görsel Stil Stüdyosu'}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            {isEn
              ? 'The real Style Studio, ported: pick a preset, then every corner, fill, border, shadow, glow, texture and pattern control below is live and adjustable — same fields the app itself exposes.'
              : 'Gerçek Stil Stüdyosu birebir taşındı: bir hazır ayar seç, ardından aşağıdaki her köşe, dolgu, kenarlık, gölge, parlama, doku ve desen kontrolü canlı ve ayarlanabilir — uygulamanın kendisinin sunduğu aynı alanlar.'}
          </p>
        </div>

        {/* Preset pills — load a full recipe, then tweak freely below */}
        <div className="flex flex-wrap gap-2">
          {visualStyles.map((s) => {
            const isActive = s.recipeId === activePresetId;
            return (
              <button
                key={s.id}
                onClick={() => { setActivePresetId(s.recipeId); setRecipe(STYLE_PRESETS[s.recipeId]); }}
                className={cn(
                  "px-3.5 py-2 rounded-full text-xs font-bold font-mono transition-all",
                  isActive
                    ? "bg-lcars-orange text-black"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                )}
              >
                {s.name}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Live preview */}
          <div className="lg:col-span-5 apple-card p-6 sm:p-8 space-y-4 lg:sticky lg:top-4 self-start">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-sm mx-auto">
              {/* MEDIA — 1:1 with the app's real MusicControlPlugin card:
                  a play/pause transport plus prev/next, not a static icon. */}
              <div
                style={cardStyleFor(recipe, '#FF9900')}
                className="aspect-square p-3 flex flex-col justify-between transition-[background-color,border-color,box-shadow,border-radius,clip-path] duration-300"
              >
                <div className="flex items-start justify-between gap-1">
                  <button
                    type="button"
                    onClick={() => setMediaPlaying((p) => !p)}
                    aria-label={mediaPlaying ? (isEn ? 'Pause' : 'Duraklat') : (isEn ? 'Play' : 'Oynat')}
                    className="w-8 h-8 rounded-lg flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors text-white"
                  >
                    {mediaPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setMediaTrack((t) => (t + demoTracks.length - 1) % demoTracks.length)}
                      aria-label={isEn ? 'Previous track' : 'Önceki parça'}
                      className="w-6 h-6 rounded-md flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors text-white"
                    >
                      <SkipBack className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setMediaTrack((t) => (t + 1) % demoTracks.length)}
                      aria-label={isEn ? 'Next track' : 'Sonraki parça'}
                      className="w-6 h-6 rounded-md flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors text-white"
                    >
                      <SkipForward className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-extrabold tracking-wide leading-tight">
                    {mediaPlaying ? demoTracks[mediaTrack] : (isEn ? 'NO MEDIA' : 'MEDYA YOK')}
                  </div>
                  <div className="text-[10px] font-mono opacity-70 mt-0.5">
                    {mediaPlaying ? (isEn ? 'PLAYING' : 'ÇALIYOR') : 'STANDBY'}
                  </div>
                </div>
              </div>

              {demoCards.map((c) => {
                const CardIcon = c.icon;
                return (
                  <div
                    key={c.label}
                    style={cardStyleFor(recipe, c.hex)}
                    className="aspect-square p-4 flex flex-col justify-between transition-[background-color,border-color,box-shadow,border-radius,clip-path] duration-300"
                  >
                    <CardIcon className="w-5 h-5" />
                    <div className="text-sm font-extrabold tracking-wide">{c.label}</div>
                  </div>
                );
              })}
            </div>
            <div className="text-[10px] font-mono text-muted-foreground text-center">
              {isEn ? 'Live preview — every control on the right updates it instantly' : 'Canlı önizleme — sağdaki her kontrol anında yansır'}
            </div>
          </div>

          {/* Effect groups — direct port of ui/screens/style/StyleEffectGroups.kt */}
          <div className="lg:col-span-7 space-y-2.5">
            <EffectGroup
              title={isEn ? 'SHAPE' : 'ŞEKİL'}
              summary={`${recipe.cornerType} ${recipe.cornerSize}dp`}
              accent={studioAccent}
              expanded={shapeOpen}
              onToggle={() => setShapeOpen((v) => !v)}
            >
              <EnumPills options={['SHARP', 'ROUNDED', 'CUT', 'PIXELATED'] as const} value={recipe.cornerType} onChange={(v) => patch({ cornerType: v })} accent={studioAccent} />
              <EngSlider label={`${isEn ? 'CORNER SIZE' : 'KÖŞE BOYUTU'}: ${recipe.cornerSize}dp`} value={recipe.cornerSize} min={0} max={40} step={1} onChange={(v) => patch({ cornerSize: v })} accent={studioAccent} />
            </EffectGroup>

            <EffectGroup
              title={isEn ? 'FILL' : 'DOLGU'}
              summary={`${Math.round(recipe.fillAlpha * 100)}% ${recipe.fillGradient}`}
              accent={studioAccent}
              expanded={fillOpen}
              onToggle={() => setFillOpen((v) => !v)}
              master={recipe.fillEnabled}
              onMasterChange={(v) => patch({ fillEnabled: v })}
            >
              <EngSlider label={`${isEn ? 'FILL OPACITY' : 'DOLGU OPAKLIĞI'}: ${Math.round(recipe.fillAlpha * 100)}%`} value={recipe.fillAlpha} min={0} max={1} onChange={(v) => patch({ fillAlpha: v })} accent={studioAccent} />
              <EnumPills options={['NONE', 'VERTICAL', 'DIAGONAL'] as const} value={recipe.fillGradient} onChange={(v) => patch({ fillGradient: v })} accent={studioAccent} />
              {recipe.fillGradient === 'VERTICAL' && (
                <EngSlider label={`${isEn ? 'TONE SHIFT' : 'TON KAYMASI'}: ${Math.round(recipe.fillGradientStrength * 100)}%`} value={recipe.fillGradientStrength} min={0} max={1} onChange={(v) => patch({ fillGradientStrength: v })} accent={studioAccent} />
              )}
            </EffectGroup>

            <EffectGroup
              title={isEn ? 'BORDER' : 'KENARLIK'}
              summary={`${recipe.borderWidth}px ${Math.round(recipe.borderAlpha * 100)}%`}
              accent={studioAccent}
              expanded={borderOpen}
              onToggle={() => setBorderOpen((v) => !v)}
              master={recipe.borderEnabled}
              onMasterChange={(v) => patch({ borderEnabled: v })}
            >
              <EngSlider label={`${isEn ? 'WIDTH' : 'KALINLIK'}: ${recipe.borderWidth.toFixed(1)}px`} value={recipe.borderWidth} min={0} max={6} step={0.1} onChange={(v) => patch({ borderWidth: v })} accent={studioAccent} />
              <EngSlider label={`${isEn ? 'OPACITY' : 'OPAKLIK'}: ${Math.round(recipe.borderAlpha * 100)}%`} value={recipe.borderAlpha} min={0} max={1} onChange={(v) => patch({ borderAlpha: v })} accent={studioAccent} />
              <EnumPills options={['NONE', 'SWEEP', 'PULSE'] as const} value={recipe.borderGradient} onChange={(v) => patch({ borderGradient: v })} accent={studioAccent} />
              <EnumPills options={['ACCENT', 'LIGHT', 'CONTRAST'] as const} value={recipe.borderColorSrc} onChange={(v) => patch({ borderColorSrc: v })} accent={studioAccent} />
            </EffectGroup>

            <EffectGroup
              title={isEn ? 'SHADOW' : 'GÖLGE'}
              summary={[recipe.hardShadowEnabled && (isEn ? 'hard' : 'sert'), recipe.softShadowEnabled && (isEn ? 'soft' : 'yumuşak')].filter(Boolean).join(' + ') || (isEn ? 'off' : 'kapalı')}
              accent={studioAccent}
              expanded={shadowOpen}
              onToggle={() => setShadowOpen((v) => !v)}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-muted-foreground">{isEn ? 'HARD SHADOW' : 'SERT GÖLGE'}</span>
                <input type="checkbox" checked={recipe.hardShadowEnabled} onChange={(e) => patch({ hardShadowEnabled: e.target.checked })} className="w-3.5 h-3.5" style={{ accentColor: studioAccent }} />
              </div>
              {recipe.hardShadowEnabled && (
                <>
                  <EngSlider label={`${isEn ? 'SIZE' : 'BOYUT'}: ${recipe.hardShadowSize}dp`} value={recipe.hardShadowSize} min={2} max={20} step={1} onChange={(v) => patch({ hardShadowSize: v })} accent={studioAccent} />
                  <EngSlider label={`${isEn ? 'INTENSITY' : 'YOĞUNLUK'}: ${Math.round(recipe.hardShadowAlpha * 100)}%`} value={recipe.hardShadowAlpha} min={0.1} max={1} onChange={(v) => patch({ hardShadowAlpha: v })} accent={studioAccent} />
                  <EnumPills options={['BR', 'BL', 'TR', 'TL', 'B', 'R', 'T', 'L'] as const} value={recipe.hardShadowDir} onChange={(v) => patch({ hardShadowDir: v })} accent={studioAccent} />
                  <EnumPills options={['CONTRAST_BG', 'ACCENT', 'DARK', 'LIGHT'] as const} value={recipe.hardShadowColorMode} onChange={(v) => patch({ hardShadowColorMode: v })} accent={studioAccent} />
                </>
              )}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] font-mono text-muted-foreground">{isEn ? 'SOFT SHADOW' : 'YUMUŞAK GÖLGE'}</span>
                <input type="checkbox" checked={recipe.softShadowEnabled} onChange={(e) => patch({ softShadowEnabled: e.target.checked })} className="w-3.5 h-3.5" style={{ accentColor: studioAccent }} />
              </div>
              {recipe.softShadowEnabled && (
                <>
                  <EngSlider label={`${isEn ? 'ELEVATION' : 'YÜKSEKLİK'}: ${recipe.softShadowElevation}dp`} value={recipe.softShadowElevation} min={0} max={28} step={1} onChange={(v) => patch({ softShadowElevation: v })} accent={studioAccent} />
                  <EngSlider label={`${isEn ? 'INTENSITY' : 'YOĞUNLUK'}: ${Math.round(recipe.softShadowAlpha * 100)}%`} value={recipe.softShadowAlpha} min={0.05} max={0.7} onChange={(v) => patch({ softShadowAlpha: v })} accent={studioAccent} />
                </>
              )}
            </EffectGroup>

            <EffectGroup
              title={isEn ? 'GLOW' : 'PARLAMA'}
              summary={`${recipe.glowRadius}dp ${Math.round(recipe.glowAlpha * 100)}%`}
              accent={studioAccent}
              expanded={glowOpen}
              onToggle={() => setGlowOpen((v) => !v)}
              master={recipe.glowEnabled}
              onMasterChange={(v) => patch({ glowEnabled: v })}
            >
              <EngSlider label={`${isEn ? 'RADIUS' : 'YARIÇAP'}: ${recipe.glowRadius}dp`} value={recipe.glowRadius} min={2} max={20} step={1} onChange={(v) => patch({ glowRadius: v })} accent={studioAccent} />
              <EngSlider label={`${isEn ? 'INTENSITY' : 'YOĞUNLUK'}: ${Math.round(recipe.glowAlpha * 100)}%`} value={recipe.glowAlpha} min={0.2} max={1} onChange={(v) => patch({ glowAlpha: v })} accent={studioAccent} />
            </EffectGroup>

            <EffectGroup
              title={isEn ? 'TEXTURE' : 'DOKU'}
              summary={isEn ? 'frost / shimmer / highlight' : 'buz / parıltı / vurgu'}
              accent={studioAccent}
              expanded={textureOpen}
              onToggle={() => setTextureOpen((v) => !v)}
            >
              <EngSlider label={`${isEn ? 'FROST' : 'BUZ'}: ${Math.round(recipe.frost * 100)}%`} value={recipe.frost} min={0} max={0.6} onChange={(v) => patch({ frost: v })} accent={studioAccent} />
              <EngSlider label={`${isEn ? 'SHIMMER' : 'PARILTI'}: ${Math.round(recipe.shimmer * 100)}%`} value={recipe.shimmer} min={0} max={0.4} onChange={(v) => patch({ shimmer: v })} accent={studioAccent} />
              <EngSlider label={`${isEn ? 'HIGHLIGHT' : 'VURGU'}: ${Math.round(recipe.highlight * 100)}%`} value={recipe.highlight} min={0} max={0.5} onChange={(v) => patch({ highlight: v })} accent={studioAccent} />
              <EngSlider label={`${isEn ? 'INNER GLOW' : 'İÇ PARLAMA'}: ${Math.round(recipe.innerGlow * 100)}%`} value={recipe.innerGlow} min={0} max={0.5} onChange={(v) => patch({ innerGlow: v })} accent={studioAccent} />
            </EffectGroup>

            <EffectGroup
              title={isEn ? 'PATTERN' : 'DESEN'}
              summary={recipe.patternEnabled ? recipe.patternShape : (isEn ? 'off' : 'kapalı')}
              accent={studioAccent}
              expanded={patternOpen}
              onToggle={() => setPatternOpen((v) => !v)}
              master={recipe.patternEnabled}
              onMasterChange={(v) => patch({ patternEnabled: v })}
            >
              <EnumPills options={['DOT', 'BLOCK'] as const} value={recipe.patternShape} onChange={(v) => patch({ patternShape: v })} accent={studioAccent} />
              <EngSlider label={`${isEn ? 'SIZE' : 'BOYUT'}: ${recipe.patternSize}dp`} value={recipe.patternSize} min={1} max={12} step={1} onChange={(v) => patch({ patternSize: v })} accent={studioAccent} />
              <EngSlider label={`${isEn ? 'SPACING' : 'ARALIK'}: ${recipe.patternSpacing}dp`} value={recipe.patternSpacing} min={0} max={20} step={1} onChange={(v) => patch({ patternSpacing: v })} accent={studioAccent} />
              <EngSlider label={`${isEn ? 'OPACITY' : 'OPAKLIK'}: ${Math.round(recipe.patternAlpha * 100)}%`} value={recipe.patternAlpha} min={0} max={1} onChange={(v) => patch({ patternAlpha: v })} accent={studioAccent} />
              <EngSlider label={`${isEn ? 'NOISE' : 'GÜRÜLTÜ'}: ${Math.round(recipe.patternNoise * 100)}%`} value={recipe.patternNoise} min={0} max={0.5} onChange={(v) => patch({ patternNoise: v })} accent={studioAccent} />
              <EnumPills options={['ACCENT', 'LIGHT', 'CONTRAST'] as const} value={recipe.patternColorSrc} onChange={(v) => patch({ patternColorSrc: v })} accent={studioAccent} />
            </EffectGroup>
          </div>
        </div>

        {/* MODULE CATALOG — all 19 real card types from CardRegistry.kt, restyled
            live through the same recipe as the preview above. */}
        <div className="pt-2">
          <div className="px-1 mb-3">
            <h3 className="text-sm font-bold text-foreground">
              {isEn ? 'Module Catalog' : 'Modül Kataloğu'}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {isEn
                ? `All ${MODULE_CATALOG.length} card types the builder ships with — same labels, icons and accent colors as the app's own module picker.`
                : `Kart üreticisinin geldiği tüm ${MODULE_CATALOG.length} modül tipi — uygulamanın kendi modül seçicisiyle aynı etiket, ikon ve vurgu renkleri.`}
            </p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
            {MODULE_CATALOG.map((m) => {
              const ModIcon = m.icon;
              return (
                <div
                  key={m.label}
                  style={cardStyleFor(recipe, m.hex)}
                  className="aspect-square p-2.5 flex flex-col items-center justify-center gap-1.5 text-center transition-[background-color,border-color,box-shadow,border-radius,clip-path] duration-300"
                >
                  <ModIcon className="w-4 h-4 shrink-0" />
                  <div className="text-[9px] font-bold leading-tight whitespace-pre-line">{m.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      </div>
      {/* end main content column */}

    </div>
  );
}
