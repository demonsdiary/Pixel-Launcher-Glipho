import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  X,
  Search,
  Smartphone,
  Palette,
  Grid,
  Bell,
  Sparkles,
  Sliders,
  Check,
  Music,
  Timer,
  PhoneCall,
  ShoppingBag,
  Zap,
  Layers,
  Image as ImageIcon,
} from 'lucide-react';
import {
  LauncherSettings,
  MonetPalette,
  IconPackId,
  IconShape,
  SearchBarStyle,
  GridSize,
} from '../types';
import { ICON_PACKS, ICON_SHAPES } from '../data/iconPacks';
import { MONET_PALETTES, LAUNCHER_ICON_PATH } from '../lib/themeEngine';

interface SettingsModalProps {
  settings: LauncherSettings;
  palette: MonetPalette;
  onUpdateSettings: (newSettings: Partial<LauncherSettings>) => void;
  onClose: () => void;
  onTriggerLiveActivity: (type: string, data: any) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  palette,
  onUpdateSettings,
  onClose,
  onTriggerLiveActivity,
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'notch' | 'theme' | 'icons' | 'about'>('home');

  return (
    <div
      id="settings-modal-backdrop"
      className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-3xl flex flex-col select-none text-white overflow-hidden"
    >
      {/* Header */}
      <div className="w-full px-5 py-4 flex items-center justify-between border-b border-white/10 bg-slate-900/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 p-0.5 flex items-center justify-center shadow-lg">
            <Sliders className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-base tracking-tight">Pixel Launcher Settings</h2>
            <p className="text-xs text-slate-400">Customization & Dynamic Controls</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 px-5 py-2.5 border-b border-white/10 overflow-x-auto no-scrollbar bg-slate-900/40">
        {[
          { id: 'home', label: 'Home Screen & Search', icon: Grid },
          { id: 'notch', label: 'Notch Pill (Island)', icon: Bell },
          { id: 'theme', label: 'Material You Theme', icon: Palette },
          { id: 'icons', label: 'Icon Packs & Shapes', icon: Layers },
          { id: 'about', label: 'About Launcher', icon: Sparkles },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-md'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-5 max-w-2xl mx-auto w-full space-y-6">
        {/* TAB 1: HOME SCREEN & BOTTOM SEARCH BAR */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                <Search className="w-4 h-4" />
                Bottom Search Bar Settings
              </h3>

              {/* TOGGLE BOTTOM SEARCH BAR */}
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <div>
                  <h4 className="text-sm font-semibold text-white">Enable Bottom Search Bar</h4>
                  <p className="text-xs text-slate-400">
                    Display the Google search bar at the bottom of the home screen
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.showBottomSearch}
                    onChange={(e) => onUpdateSettings({ showBottomSearch: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500" />
                </label>
              </div>

              {/* SEARCH BAR STYLE */}
              {settings.showBottomSearch && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-semibold text-slate-300 block">
                    Search Bar Visual Style
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'google_classic', name: 'Google Classic' },
                      { id: 'colored_g', name: 'Multi-Color G' },
                      { id: 'material_you', name: 'Material You Tint' },
                      { id: 'glass', name: 'Glassmorphism' },
                    ].map((style) => (
                      <button
                        key={style.id}
                        onClick={() =>
                          onUpdateSettings({ searchBarStyle: style.id as SearchBarStyle })
                        }
                        className={`px-3 py-2 rounded-xl text-xs font-medium border text-left transition-all ${
                          settings.searchBarStyle === style.id
                            ? 'bg-sky-500/20 border-sky-400 text-sky-200'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                        }`}
                      >
                        {style.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* HOME GRID & ICON SIZE */}
            <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                <Grid className="w-4 h-4" />
                Home Screen Grid Layout
              </h3>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-300 block">
                  Grid Columns & Rows
                </span>
                <div className="grid grid-cols-5 gap-2">
                  {(['3x3', '4x4', '4x5', '5x5', '6x6'] as GridSize[]).map((gSize) => (
                    <button
                      key={gSize}
                      onClick={() => onUpdateSettings({ gridSize: gSize })}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        settings.gridSize === gSize
                          ? 'bg-sky-500 text-slate-950 border-sky-400'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {gSize}
                    </button>
                  ))}
                </div>
              </div>

              {/* Show Icon Labels */}
              <div className="flex items-center justify-between py-2 border-t border-white/5">
                <div>
                  <h4 className="text-sm font-semibold text-white">Show Icon Labels</h4>
                  <p className="text-xs text-slate-400">Display app text names under icons</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.showIconLabels}
                    onChange={(e) => onUpdateSettings({ showIconLabels: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500" />
                </label>
              </div>

              {/* At a glance widget */}
              <div className="flex items-center justify-between py-2 border-t border-white/5">
                <div>
                  <h4 className="text-sm font-semibold text-white">Pixel &quot;At a Glance&quot; Widget</h4>
                  <p className="text-xs text-slate-400">Display date, weather and upcoming events at top</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.enableAtAGlance}
                    onChange={(e) => onUpdateSettings({ enableAtAGlance: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500" />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DYNAMIC NOTCH PILL (DYNAMIC ISLAND) */}
        {activeTab === 'notch' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Dynamic Notch Pill (Dynamic Island)
              </h3>

              {/* TOGGLE NOTCH PILL */}
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <div>
                  <h4 className="text-sm font-semibold text-white">Enable Notch Pill</h4>
                  <p className="text-xs text-slate-400">
                    Display top-centered dynamic island pill for notifications & live activities
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.enableNotchPill}
                    onChange={(e) => onUpdateSettings({ enableNotchPill: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500" />
                </label>
              </div>

              {/* QUICK LIVE ACTIVITY TEST TRIGGER BUTTONS */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-semibold text-slate-300 block">
                  Interactive Live Activity Trigger Tester
                </span>
                <p className="text-xs text-slate-400">
                  Click any button below to instantly feed a live activity into the Notch Pill and test click expansion!
                </p>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() =>
                      onTriggerLiveActivity('music', {
                        song: 'Starboy',
                        artist: 'The Weeknd ft. Daft Punk',
                        isPlaying: true,
                        progressSeconds: 95,
                        durationSeconds: 230,
                      })
                    }
                    className="flex items-center gap-2.5 px-3 py-2.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 rounded-xl text-xs font-medium text-emerald-300 transition-all text-left"
                  >
                    <Music className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Now Playing Music</span>
                  </button>

                  <button
                    onClick={() =>
                      onTriggerLiveActivity('timer', {
                        label: 'Workout Timer',
                        totalSeconds: 300,
                        remainingSeconds: 215,
                        isRunning: true,
                      })
                    }
                    className="flex items-center gap-2.5 px-3 py-2.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 rounded-xl text-xs font-medium text-amber-300 transition-all text-left"
                  >
                    <Timer className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Countdown Timer</span>
                  </button>

                  <button
                    onClick={() =>
                      onTriggerLiveActivity('call', {
                        callerName: 'Sarah Jenkins',
                        callerNumber: '+1 (555) 392-1082',
                        status: 'incoming',
                      })
                    }
                    className="flex items-center gap-2.5 px-3 py-2.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 rounded-xl text-xs font-medium text-blue-300 transition-all text-left"
                  >
                    <PhoneCall className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Incoming Phone Call</span>
                  </button>

                  <button
                    onClick={() =>
                      onTriggerLiveActivity('notification', {
                        sender: 'WhatsApp • Team Chat',
                        message: 'Hey! Are we still meeting for coffee at 3pm?',
                        time: 'Just now',
                      })
                    }
                    className="flex items-center gap-2.5 px-3 py-2.5 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 rounded-xl text-xs font-medium text-rose-300 transition-all text-left"
                  >
                    <Bell className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>WhatsApp Alert</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MATERIAL YOU THEME & MONET ENGINE */}
        {activeTab === 'theme' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Material You Theme & Palette Engine
              </h3>

              {/* THEMED ICONS TOGGLE */}
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <div>
                  <h4 className="text-sm font-semibold text-white">Material You Themed Icons</h4>
                  <p className="text-xs text-slate-400">
                    Apply dynamic monochrome color tinting to all home screen and drawer icons
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.enableThemedIcons}
                    onChange={(e) => onUpdateSettings({ enableThemedIcons: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500" />
                </label>
              </div>

              {/* MONET COLOR PALETTE PICKER */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-semibold text-slate-300 block">
                  Dynamic Monet Palettes
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {MONET_PALETTES.map((monet) => (
                    <div
                      key={monet.id}
                      onClick={() => onUpdateSettings({ monetPaletteId: monet.id })}
                      className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                        settings.monetPaletteId === monet.id
                          ? 'bg-white/15 border-emerald-400 ring-2 ring-emerald-400/30'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center border border-white/20"
                          style={{ backgroundColor: monet.primary }}
                        >
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: monet.primaryContainer }}
                          />
                        </div>
                        <div>
                          <h5 className="text-xs font-semibold text-white">{monet.name}</h5>
                          <span className="text-[10px] text-slate-400">
                            {monet.isDark ? 'Dark OLED Theme' : 'Light Vibrant Theme'}
                          </span>
                        </div>
                      </div>
                      {settings.monetPaletteId === monet.id && (
                        <Check className="w-4 h-4 text-emerald-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: THIRD-PARTY ICON PACKS & SHAPES */}
        {activeTab === 'icons' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Third-Party Icon Packs
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ICON_PACKS.map((pack) => (
                  <div
                    key={pack.id}
                    onClick={() => onUpdateSettings({ activeIconPack: pack.id })}
                    className={`p-3.5 rounded-2xl border cursor-pointer flex flex-col gap-2 transition-all ${
                      settings.activeIconPack === pack.id
                        ? 'bg-purple-500/20 border-purple-400 ring-2 ring-purple-400/30'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{pack.name}</span>
                      <span className="text-[10px] bg-white/10 text-purple-300 px-2 py-0.5 rounded-full font-semibold">
                        {pack.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2">{pack.description}</p>
                  </div>
                ))}
              </div>

              {/* ICON SHAPE PICKER */}
              <div className="space-y-3 pt-3 border-t border-white/10">
                <span className="text-xs font-semibold text-slate-300 block">
                  Adaptive Icon Shape
                </span>
                <div className="grid grid-cols-5 gap-2">
                  {ICON_SHAPES.map((shape) => (
                    <button
                      key={shape.id}
                      onClick={() => onUpdateSettings({ iconShape: shape.id })}
                      className={`py-2 px-1 rounded-xl text-[11px] font-semibold border flex flex-col items-center gap-1 transition-all ${
                        settings.iconShape === shape.id
                          ? 'bg-purple-500 text-white border-purple-400'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <div
                        className="w-5 h-5 bg-white/40 border border-white/60"
                        style={{ borderRadius: shape.cssRadius }}
                      />
                      <span className="truncate">{shape.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: ABOUT LAUNCHER */}
        {activeTab === 'about' && (
          <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center space-y-4 shadow-xl">
            <div className="w-20 h-20 rounded-3xl overflow-hidden shadow-2xl ring-2 ring-sky-400/40">
              <img
                src={LAUNCHER_ICON_PATH}
                alt="Pixel Launcher Icon"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Pixel Launcher</h3>
              <p className="text-xs text-sky-400 font-semibold mt-0.5">Version 15.0 • Android 15 Monet</p>
            </div>
            <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
              Authentic Pixel Launcher experience with bottom search bar toggle, dynamic iPhone-like notch pill for live activities, Material You Monet theme engine, and full third-party icon pack customization.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
