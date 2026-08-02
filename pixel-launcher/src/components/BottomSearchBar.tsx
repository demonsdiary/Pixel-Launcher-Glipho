import React from 'react';
import { Mic, Camera, Search } from 'lucide-react';
import { MonetPalette, SearchBarStyle } from '../types';

interface BottomSearchBarProps {
  showSearch: boolean;
  searchBarStyle: SearchBarStyle;
  palette: MonetPalette;
  enableThemedIcons?: boolean;
  onSearchClick: () => void;
  onMicClick: () => void;
  onLensClick: () => void;
}

export const BottomSearchBar: React.FC<BottomSearchBarProps> = ({
  showSearch,
  searchBarStyle,
  palette,
  enableThemedIcons = false,
  onSearchClick,
  onMicClick,
  onLensClick,
}) => {
  if (!showSearch) return null;

  const isThemed = searchBarStyle === 'material_you' || enableThemedIcons;

  return (
    <div
      id="bottom-search-container"
      className="w-full px-5 pb-3 pt-1 z-20 flex items-center justify-center select-none"
    >
      <div
        id="bottom-search-bar"
        onClick={onSearchClick}
        className={`w-full h-13 px-4 rounded-full flex items-center justify-between cursor-pointer shadow-lg transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] border ${
          isThemed
            ? 'bg-white/20 dark:bg-black/40 backdrop-blur-xl border-white/20 text-slate-100'
            : searchBarStyle === 'glass'
            ? 'bg-white/30 dark:bg-slate-900/40 backdrop-blur-2xl border-white/30 text-white'
            : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border-slate-200/50 dark:border-slate-800'
        }`}
        style={
          isThemed
            ? {
                backgroundColor: palette.isDark ? 'rgba(30,35,45,0.75)' : 'rgba(255,255,255,0.85)',
                borderColor: palette.primaryContainer,
              }
            : undefined
        }
      >
        {/* Left: Google G logo */}
        <div className="flex items-center gap-3">
          {isThemed ? (
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center font-black text-sm"
              style={{ color: palette.primary }}
            >
              G
            </div>
          ) : (
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          )}

          <span className="text-sm font-normal opacity-70 tracking-wide">
            Search or say &quot;Hey Google&quot;
          </span>
        </div>

        {/* Right: Mic & Lens buttons */}
        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          <button
            id="search-mic-btn"
            onClick={onMicClick}
            className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors text-slate-600 dark:text-slate-300"
            title="Search with voice"
          >
            <Mic className="w-4 h-4" />
          </button>
          <button
            id="search-lens-btn"
            onClick={onLensClick}
            className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors text-slate-600 dark:text-slate-300"
            title="Google Lens"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
