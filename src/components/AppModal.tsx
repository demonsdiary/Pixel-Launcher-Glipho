import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  X,
  Phone,
  MessageSquare,
  Music,
  Sun,
  Camera,
  Image as ImageIcon,
  Clock,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  PhoneCall,
  Search,
  Settings as SettingsIcon,
} from 'lucide-react';
import { AppItem, MonetPalette } from '../types';

interface AppModalProps {
  app: AppItem | null;
  palette: MonetPalette;
  onClose: () => void;
  onTriggerLiveActivity?: (type: string, data: any) => void;
  onOpenSettings?: () => void;
}

export const AppModal: React.FC<AppModalProps> = ({
  app,
  palette,
  onClose,
  onTriggerLiveActivity,
  onOpenSettings,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [dialNumber, setDialNumber] = useState<string>('');

  if (!app) return null;

  return (
    <div
      id="app-modal-backdrop"
      className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-2xl flex flex-col select-none text-white overflow-hidden"
    >
      {/* App Header Bar */}
      <div className="w-full px-5 py-3 flex items-center justify-between border-b border-white/10 bg-slate-900/60">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs"
            style={{ backgroundColor: app.color || palette.primary }}
          >
            {app.name.charAt(0)}
          </div>
          <span className="font-semibold text-sm">{app.name}</span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* App Specific Content */}
      <div className="flex-1 overflow-y-auto p-5 flex flex-col items-center justify-center">
        {/* MUSIC APP */}
        {app.id === 'spotify' ? (
          <div className="w-full max-w-sm flex flex-col items-center gap-6 py-4">
            <div className="w-64 h-64 rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
              <div className="flex justify-between items-center text-white/80">
                <Music className="w-6 h-6" />
                <span className="text-xs font-mono">SPOTIFY HI-FI</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white drop-shadow-md">Pixel Horizon</h2>
                <p className="text-sm text-emerald-100 opacity-90">Google Ambient Ensemble</p>
              </div>
            </div>

            <div className="w-full flex flex-col gap-2">
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full w-2/5 rounded-full" />
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>01:42</span>
                <span>03:30</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <button className="p-3 text-slate-400 hover:text-white transition-colors">
                <SkipBack className="w-6 h-6" />
              </button>
              <button
                onClick={() => {
                  setIsPlaying(!isPlaying);
                  if (onTriggerLiveActivity) {
                    onTriggerLiveActivity('music', {
                      song: 'Pixel Horizon',
                      artist: 'Google Ambient Ensemble',
                      isPlaying: !isPlaying,
                      progressSeconds: 102,
                      durationSeconds: 210,
                    });
                  }
                }}
                className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center shadow-lg transition-transform active:scale-95"
              >
                {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1" />}
              </button>
              <button className="p-3 text-slate-400 hover:text-white transition-colors">
                <SkipForward className="w-6 h-6" />
              </button>
            </div>

            <p className="text-xs text-slate-400 text-center">
              Click play/pause to test the Dynamic Notch Pill Music Player activity!
            </p>
          </div>
        ) : app.id === 'phone' ? (
          /* PHONE APP */
          <div className="w-full max-w-xs flex flex-col items-center gap-6">
            <div className="text-2xl font-mono font-bold tracking-wider text-emerald-400 h-10 flex items-center">
              {dialNumber || 'Enter Number'}
            </div>
            <div className="grid grid-cols-3 gap-4 w-full">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((digit) => (
                <button
                  key={digit}
                  onClick={() => setDialNumber((prev) => prev + digit)}
                  className="w-16 h-16 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-xl font-semibold hover:bg-white/10 active:scale-95 transition-all mx-auto"
                >
                  {digit}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={() => {
                  if (onTriggerLiveActivity) {
                    onTriggerLiveActivity('call', {
                      callerName: dialNumber || 'Alex Rivera',
                      callerNumber: dialNumber || '+1 (555) 019-2834',
                      status: 'incoming',
                    });
                  }
                  onClose();
                }}
                className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center shadow-xl active:scale-95"
              >
                <PhoneCall className="w-7 h-7" />
              </button>
              {dialNumber && (
                <button
                  onClick={() => setDialNumber('')}
                  className="px-4 py-2 bg-slate-800 rounded-full text-xs text-slate-300"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        ) : app.id === 'weather' ? (
          /* WEATHER APP */
          <div className="w-full max-w-sm flex flex-col items-center gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <Sun className="w-20 h-20 text-amber-400 animate-spin-slow" />
              <span className="text-5xl font-bold tracking-tight">72°F</span>
              <span className="text-lg text-slate-300 font-medium">Mountain View, CA</span>
              <span className="text-xs text-slate-400">Sunny • H: 76° L: 58° • Air Quality 32</span>
            </div>

            <div className="w-full grid grid-cols-4 gap-2 bg-slate-900/80 border border-white/10 p-3 rounded-2xl">
              {[
                { time: 'Now', temp: '72°' },
                { time: '2 PM', temp: '75°' },
                { time: '4 PM', temp: '74°' },
                { time: '6 PM', temp: '69°' },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1 text-xs py-1">
                  <span className="text-slate-400">{item.time}</span>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="font-semibold">{item.temp}</span>
                </div>
              ))}
            </div>
          </div>
        ) : app.id === 'pixel_launcher' || app.id === 'settings' ? (
          /* SETTINGS / LAUNCHER CONFIG */
          <div className="flex flex-col items-center gap-4 text-center">
            <SettingsIcon className="w-16 h-16 text-sky-400 animate-spin-slow" />
            <h3 className="text-2xl font-bold">Pixel Launcher Settings</h3>
            <p className="text-sm text-slate-400 max-w-xs">
              Configure bottom search bar toggle, dynamic notch pill, Material You colors, and icon packs.
            </p>
            <button
              onClick={() => {
                onClose();
                if (onOpenSettings) onOpenSettings();
              }}
              className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-black font-semibold rounded-full shadow-lg transition-all"
            >
              Open Launcher Settings
            </button>
          </div>
        ) : (
          /* GENERIC APP PLACEHOLDER */
          <div className="flex flex-col items-center gap-4 text-center max-w-xs">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-xl text-3xl font-bold"
              style={{ backgroundColor: app.color || palette.primary }}
            >
              {app.name.charAt(0)}
            </div>
            <h3 className="text-xl font-semibold">{app.name}</h3>
            <p className="text-xs text-slate-400">
              {app.packageName} • Version 15.0.1
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-full text-xs font-semibold"
              >
                Close App
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
