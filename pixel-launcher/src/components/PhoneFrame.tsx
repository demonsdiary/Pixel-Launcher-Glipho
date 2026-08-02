import React, { useState } from 'react';
import {
  Smartphone,
  Maximize2,
  Sliders,
  Sparkles,
  Music,
  Timer,
  PhoneCall,
  Bell,
  Sun,
  Moon,
  Info,
} from 'lucide-react';
import { LauncherSettings, MonetPalette } from '../types';
import { LAUNCHER_ICON_PATH } from '../lib/themeEngine';

interface PhoneFrameProps {
  children: React.ReactNode;
  settings: LauncherSettings;
  palette: MonetPalette;
  onOpenSettings: () => void;
  onTriggerLiveActivity: (type: string, data: any) => void;
  onToggleThemeMode: () => void;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  settings,
  palette,
  onOpenSettings,
  onTriggerLiveActivity,
  onToggleThemeMode,
}) => {
  const [isFrameMode, setIsFrameMode] = useState<boolean>(true);

  return (
    <div id="phone-frame-wrapper" className="w-full h-screen bg-slate-950 flex flex-col items-center justify-between font-sans overflow-hidden select-none">
      {/* Top Controls Toolbar */}
      <header className="w-full h-14 bg-slate-900/90 border-b border-white/10 px-4 flex items-center justify-between z-30 shrink-0">
        {/* Left: Pixel Launcher Branding */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl overflow-hidden shadow-md ring-1 ring-sky-400/40 shrink-0">
            <img
              src={LAUNCHER_ICON_PATH}
              alt="Pixel Launcher Icon"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-xs font-bold text-white tracking-wide flex items-center gap-1.5">
              <span>Pixel Launcher</span>
              <span className="text-[9px] bg-sky-500/20 text-sky-300 border border-sky-400/30 px-1.5 py-0.2 rounded-full font-mono">
                Android 15
              </span>
            </h1>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              Dynamic Notch Pill • Monet Theme • Search Toggle
            </p>
          </div>
        </div>

        {/* Center: Live Activity Quick Test Bar */}
        <div className="hidden md:flex items-center gap-1 bg-black/40 border border-white/10 p-1 rounded-full text-xs">
          <span className="text-[10px] text-slate-400 font-semibold px-2 uppercase tracking-wider">
            Test Pill:
          </span>
          <button
            onClick={() =>
              onTriggerLiveActivity('music', {
                song: 'Pixel Horizon',
                artist: 'Google Ambient Ensemble',
                isPlaying: true,
                progressSeconds: 102,
                durationSeconds: 210,
              })
            }
            className="px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-full font-medium flex items-center gap-1 text-[11px] transition-colors"
          >
            <Music className="w-3 h-3 text-emerald-400" />
            Music
          </button>
          <button
            onClick={() =>
              onTriggerLiveActivity('timer', {
                label: 'Pomodoro',
                totalSeconds: 1500,
                remainingSeconds: 1240,
                isRunning: true,
              })
            }
            className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-full font-medium flex items-center gap-1 text-[11px] transition-colors"
          >
            <Timer className="w-3 h-3 text-amber-400" />
            Timer
          </button>
          <button
            onClick={() =>
              onTriggerLiveActivity('call', {
                callerName: 'Alex Rivera',
                callerNumber: '+1 (555) 019-2834',
                status: 'incoming',
              })
            }
            className="px-2.5 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-full font-medium flex items-center gap-1 text-[11px] transition-colors"
          >
            <PhoneCall className="w-3 h-3 text-blue-400" />
            Call
          </button>
          <button
            onClick={() =>
              onTriggerLiveActivity('notification', {
                sender: 'Sarah Jenkins',
                message: 'Hey, did you check the new Pixel Launcher update?',
                time: 'Just now',
              })
            }
            className="px-2.5 py-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 rounded-full font-medium flex items-center gap-1 text-[11px] transition-colors"
          >
            <Bell className="w-3 h-3 text-rose-400" />
            Alert
          </button>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2">
          {/* Frame View Toggle */}
          <button
            onClick={() => setIsFrameMode(!isFrameMode)}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors border border-white/10"
            title={isFrameMode ? 'Switch to Fullscreen Canvas' : 'Switch to Pixel Phone Frame'}
          >
            {isFrameMode ? (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline">Fullscreen</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline">Phone Frame</span>
              </>
            )}
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className="p-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-full text-xs flex items-center gap-1 shadow-lg transition-transform active:scale-95"
            title="Launcher Settings"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main View Container */}
      <main className="flex-1 w-full flex items-center justify-center relative overflow-hidden py-2 px-2">
        {isFrameMode ? (
          /* Pixel 9 Pro Hardware Phone Frame Mockup */
          <div
            id="pixel-phone-hardware-frame"
            className="relative w-full max-w-[390px] h-full max-h-[810px] rounded-[52px] bg-black p-3.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border-[4px] border-slate-700/80 ring-1 ring-slate-600/50 flex flex-col overflow-hidden"
          >
            {/* Phone Bezel Buttons */}
            <div className="absolute -right-[7px] top-28 w-[3px] h-12 bg-slate-700 rounded-r-md" /> {/* Power button */}
            <div className="absolute -right-[7px] top-44 w-[3px] h-16 bg-slate-700 rounded-r-md" /> {/* Volume rocker */}

            {/* Internal OLED Screen */}
            <div
              id="pixel-phone-screen"
              className="relative w-full h-full rounded-[42px] overflow-hidden bg-cover bg-center flex flex-col justify-between"
              style={{ backgroundImage: `url(${palette.wallpaperUrl})` }}
            >
              {/* Screen overlay gradient */}
              <div className="absolute inset-0 bg-black/15 pointer-events-none" />

              {children}

              {/* Bottom Android Gesture Navigation Bar */}
              <div className="w-full py-1.5 flex justify-center z-30 pointer-events-none">
                <div className="w-32 h-1 rounded-full bg-white/80 shadow-md" />
              </div>
            </div>
          </div>
        ) : (
          /* Raw Canvas View Mode */
          <div
            id="pixel-canvas-screen"
            className="relative w-full h-full max-w-lg rounded-3xl overflow-hidden bg-cover bg-center flex flex-col justify-between shadow-2xl border border-white/10"
            style={{ backgroundImage: `url(${palette.wallpaperUrl})` }}
          >
            {children}
            <div className="w-full py-1.5 flex justify-center z-30 pointer-events-none">
              <div className="w-32 h-1 rounded-full bg-white/80 shadow-md" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
