import { IconPackId, IconShape } from '../types';

export interface IconPackInfo {
  id: IconPackId;
  name: string;
  description: string;
  badge: string;
  style: 'colorful' | 'monochrome' | 'outline' | 'glass' | 'pixel' | 'neon';
  previewColors: string[];
}

export const ICON_PACKS: IconPackInfo[] = [
  {
    id: 'pixel_stock',
    name: 'Pixel Stock',
    description: 'Classic vibrant Pixel design with authentic Google material design icons.',
    badge: 'Official',
    style: 'colorful',
    previewColors: ['#4285F4', '#EA4335', '#FBBC04', '#34A853'],
  },
  {
    id: 'material_you',
    name: 'Material You Monet',
    description: 'Dynamic monochrome adaptive icons that dynamically match your wallpaper palette.',
    badge: 'Monet Theme',
    style: 'monochrome',
    previewColors: ['#A0C6FF', '#D8E2FF', '#00315B', '#1A1C1E'],
  },
  {
    id: 'minimal_line',
    name: 'Minimal Lines',
    description: 'Clean vector line art on semi-transparent dark backgrounds for minimalist lovers.',
    badge: 'Minimalist',
    style: 'outline',
    previewColors: ['#FFFFFF', '#333333', '#121212', '#777777'],
  },
  {
    id: 'glassmorphism',
    name: 'Glassmorphism Gloss',
    description: 'Frosted glass tiles with translucent reflections and glowing soft shadows.',
    badge: 'Premium Glass',
    style: 'glass',
    previewColors: ['rgba(255,255,255,0.4)', 'rgba(66,133,244,0.3)', 'rgba(234,67,53,0.3)'],
  },
  {
    id: 'retro_pixel',
    name: 'Retro 8-Bit Pixel',
    description: 'Nostalgic arcady 8-bit pixelized icons for classic retro vibes.',
    badge: 'Retro Game',
    style: 'pixel',
    previewColors: ['#FF5555', '#55FF55', '#5555FF', '#FFFF55'],
  },
  {
    id: 'neon_glow',
    name: 'Cyberpunk Neon',
    description: 'Vibrant neon outlines on dark OLED slate tiles.',
    badge: 'Cyberpunk',
    style: 'neon',
    previewColors: ['#00F0FF', '#FF007F', '#7F00FF', '#00FF66'],
  },
];

export const ICON_SHAPES: { id: IconShape; name: string; cssRadius: string; polygonPath?: string }[] = [
  { id: 'squircle', name: 'Squircle', cssRadius: '24%' },
  { id: 'circle', name: 'Circle', cssRadius: '50%' },
  { id: 'teardrop', name: 'Teardrop', cssRadius: '50% 50% 50% 8%' },
  { id: 'hexagon', name: 'Hexagon', cssRadius: '16%' },
  { id: 'square', name: 'Rounded Square', cssRadius: '16%' },
];
