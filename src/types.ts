export type GridSize = '3x3' | '4x4' | '4x5' | '5x5' | '6x6';
export type IconShape = 'circle' | 'squircle' | 'teardrop' | 'hexagon' | 'square';
export type IconPackId = 'pixel_stock' | 'material_you' | 'minimal_line' | 'glassmorphism' | 'retro_pixel' | 'neon_glow' | 'custom';
export type SearchBarStyle = 'google_classic' | 'colored_g' | 'material_you' | 'pill' | 'glass';
export type ThemeMode = 'system' | 'light' | 'dark' | 'oled';

export interface AppItem {
  id: string;
  name: string;
  packageName: string;
  iconName: string; // Lucide icon name or image path
  category: 'social' | 'games' | 'tools' | 'productivity' | 'media' | 'system';
  color: string; // Base color for default or themed icon
  customIconUrl?: string;
  customLabel?: string;
  isSystem?: boolean;
}

export interface FolderItem {
  id: string;
  name: string;
  appIds: string[];
  color?: string;
}

export type LiveActivityType = 'music' | 'timer' | 'call' | 'delivery' | 'fitness' | 'notification' | 'charging';

export interface LiveActivity {
  id: string;
  type: LiveActivityType;
  title: string;
  subtitle: string;
  iconName: string;
  appId?: string;
  timestamp: string;
  // Specific data fields
  musicData?: {
    song: string;
    artist: string;
    isPlaying: boolean;
    durationSeconds: number;
    progressSeconds: number;
    coverUrl?: string;
  };
  timerData?: {
    label: string;
    totalSeconds: number;
    remainingSeconds: number;
    isRunning: boolean;
  };
  callData?: {
    callerName: string;
    callerNumber: string;
    callerAvatar?: string;
    status: 'incoming' | 'active' | 'muted';
    durationSeconds?: number;
  };
  deliveryData?: {
    storeName: string;
    status: string;
    etaMinutes: number;
    step: number; // 1-4
  };
  fitnessData?: {
    activity: string;
    distanceKm: number;
    duration: string;
    bpm: number;
  };
  notificationData?: {
    sender: string;
    message: string;
    time: string;
    avatarUrl?: string;
    actions?: string[];
  };
}

export interface NotificationItem {
  id: string;
  appId: string;
  appName: string;
  appIcon: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  avatarUrl?: string;
}

export interface MonetPalette {
  id: string;
  name: string;
  primary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  secondaryContainer: string;
  tertiary: string;
  surface: string;
  surfaceVariant: string;
  background: string;
  onBackground: string;
  accent: string;
  wallpaperUrl: string;
  isDark: boolean;
}

export interface LauncherSettings {
  // Home Screen
  showBottomSearch: boolean;
  searchBarStyle: SearchBarStyle;
  gridSize: GridSize;
  iconSize: number; // 80 - 120 %
  showIconLabels: boolean;
  enableAtAGlance: boolean;
  atAGlanceWeather: boolean;
  atAGlanceCalendar: boolean;
  atAGlanceBattery: boolean;
  
  // Dynamic Notch Pill
  enableNotchPill: boolean;
  notchPillSize: 'compact' | 'standard' | 'wide';
  notchPillPosition: 'top' | 'inset';
  autoExpandOnNewNotification: boolean;
  showMusicInPill: boolean;
  showTimerInPill: boolean;
  showCallInPill: boolean;

  // Material You Theme
  selectedWallpaper: string;
  monetPaletteId: string;
  themeMode: ThemeMode;
  enableThemedIcons: boolean;
  useOledDark: boolean;

  // Icon Packs & Customization
  activeIconPack: IconPackId;
  iconShape: IconShape;
  
  // Gestures
  swipeDownAction: 'notifications' | 'search' | 'settings' | 'none';
  doubleTapAction: 'lock' | 'settings' | 'none';
}
