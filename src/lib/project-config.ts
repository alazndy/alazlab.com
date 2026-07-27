import { Box, Cpu, Globe, Layers, Shield, Puzzle, Smartphone, Music, Zap, Code2, ShoppingBag, type LucideIcon } from 'lucide-react';

export type HeroVariant = 'browser' | 'mobile' | 'hardware' | 'data' | 'design' | 'default';

export interface CategoryConfig {
  icon: LucideIcon;
  accent: string;        // text color
  accentBg: string;      // bg color
  glow: string;          // blur glow color
  badge: string;         // badge classes
  hero: HeroVariant;
  gradient: string;      // hero overlay gradient
}

export const categoryConfig: Record<string, CategoryConfig> = {
  'AI & Finance': {
    icon: Cpu, accent: 'text-purple-400', accentBg: 'bg-purple-400',
    glow: 'bg-purple-500/20', badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    hero: 'data', gradient: 'from-purple-950/80 via-black/60 to-transparent',
  },
  'Security': {
    icon: Shield, accent: 'text-red-400', accentBg: 'bg-red-400',
    glow: 'bg-red-500/20', badge: 'bg-red-500/10 text-red-400 border-red-500/20',
    hero: 'default', gradient: 'from-red-950/80 via-black/60 to-transparent',
  },
  'Hardware & Embedded': {
    icon: Box, accent: 'text-amber-400', accentBg: 'bg-amber-400',
    glow: 'bg-amber-500/20', badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    hero: 'hardware', gradient: 'from-amber-950/70 via-black/60 to-transparent',
  },
  'Web & Apps': {
    icon: Globe, accent: 'text-cyan-400', accentBg: 'bg-cyan-400',
    glow: 'bg-cyan-500/20', badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    hero: 'default', gradient: 'from-cyan-950/70 via-black/60 to-transparent',
  },
  'UI Infrastructure': {
    icon: Layers, accent: 'text-orange-400', accentBg: 'bg-orange-400',
    glow: 'bg-orange-500/20', badge: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    hero: 'design', gradient: 'from-orange-950/70 via-black/60 to-transparent',
  },
  'Browser Extensions': {
    icon: Puzzle, accent: 'text-emerald-400', accentBg: 'bg-emerald-400',
    glow: 'bg-emerald-500/20', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    hero: 'browser', gradient: 'from-emerald-950/70 via-black/60 to-transparent',
  },
  'Mobil & Oyun': {
    icon: Smartphone, accent: 'text-sky-400', accentBg: 'bg-sky-400',
    glow: 'bg-sky-500/20', badge: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    hero: 'mobile', gradient: 'from-sky-950/70 via-black/60 to-transparent',
  },
  'Kişisel Üretkenlik': {
    icon: Zap, accent: 'text-yellow-400', accentBg: 'bg-yellow-400',
    glow: 'bg-yellow-500/20', badge: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    hero: 'default', gradient: 'from-yellow-950/70 via-black/60 to-transparent',
  },
  'Medya & Ses': {
    icon: Music, accent: 'text-pink-400', accentBg: 'bg-pink-400',
    glow: 'bg-pink-500/20', badge: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
    hero: 'default', gradient: 'from-pink-950/70 via-black/60 to-transparent',
  },
  'UI Altyapısı': {
    icon: Layers, accent: 'text-orange-400', accentBg: 'bg-orange-400',
    glow: 'bg-orange-500/20', badge: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    hero: 'design', gradient: 'from-orange-950/70 via-black/60 to-transparent',
  },
  'Web Platformları': {
    icon: Globe, accent: 'text-cyan-400', accentBg: 'bg-cyan-400',
    glow: 'bg-cyan-500/20', badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    hero: 'default', gradient: 'from-cyan-950/70 via-black/60 to-transparent',
  },
  'Tasarım & Geliştirici Araçları': {
    icon: Code2, accent: 'text-violet-400', accentBg: 'bg-violet-400',
    glow: 'bg-violet-500/20', badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    hero: 'design', gradient: 'from-violet-950/70 via-black/60 to-transparent',
  },
};

export const defaultConfig: CategoryConfig = {
  icon: Globe, accent: 'text-white/50', accentBg: 'bg-white/30',
  glow: 'bg-white/10', badge: 'bg-white/5 text-white/40 border-white/10',
  hero: 'default', gradient: 'from-black/80 via-black/50 to-transparent',
};

export const statusConfig: Record<string, string> = {
  'Live':    'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Active':  'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  'Stable':  'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'Early':   'bg-white/5 text-white/30 border-white/10',
  'Pending': 'bg-white/5 text-white/25 border-white/8',
  'Legacy':  'bg-white/3 text-white/20 border-white/5',
};

export const statusDot: Record<string, string> = {
  'Live':    'bg-emerald-400 animate-pulse',
  'Active':  'bg-cyan-400',
  'Stable':  'bg-orange-400',
  'Early':   'bg-white/30',
  'Pending': 'bg-white/20',
  'Legacy':  'bg-white/10',
};
