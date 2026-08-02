import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronUp,
  Settings as SettingsIcon,
  Palette,
  LayoutGrid,
  Plus,
  Trash2,
  FolderPlus,
} from 'lucide-react';
import { AppItem, FolderItem, LauncherSettings, MonetPalette } from '../types';
import { AppIcon } from './AppIcon';
import { AtAGlanceWidget } from './AtAGlanceWidget';
import { BottomSearchBar } from './BottomSearchBar';

interface HomeScreenProps {
  settings: LauncherSettings;
  palette: MonetPalette;
  homeApps: AppItem[];
  folders: FolderItem[];
  allApps: AppItem[];
  onOpenApp: (appId: string) => void;
  onOpenFolder: (folder: FolderItem) => void;
  onOpenDrawer: () => void;
  onOpenSettings: () => void;
  onRemoveFromHome: (appId: string) => void;
  onOpenMic: () => void;
  onOpenLens: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  settings,
  palette,
  homeApps,
  folders,
  allApps,
  onOpenApp,
  onOpenFolder,
  onOpenDrawer,
  onOpenSettings,
  onRemoveFromHome,
  onOpenMic,
  onOpenLens,
}) => {
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const [homeContextMenu, setHomeContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [appContextMenu, setAppContextMenu] = useState<{ app: AppItem; x: number; y: number } | null>(null);

  // Pagination slice (e.g. 12 or 20 items per page depending on grid)
  const itemsPerPage = settings.gridSize === '3x3' ? 9 : settings.gridSize === '4x4' ? 12 : 16;
  const page1Apps = homeApps.slice(0, itemsPerPage);
  const page2Apps = homeApps.slice(itemsPerPage, itemsPerPage * 2);

  const totalPages = page2Apps.length > 0 ? 2 : 1;
  const currentApps = activePageIndex === 0 ? page1Apps : page2Apps;

  // Grid columns class mapping
  const gridColsClass =
    settings.gridSize === '3x3'
      ? 'grid-cols-3'
      : settings.gridSize === '4x4'
      ? 'grid-cols-4'
      : settings.gridSize === '4x5'
      ? 'grid-cols-4'
      : settings.gridSize === '6x6'
      ? 'grid-cols-6'
      : 'grid-cols-5';

  return (
    <div
      id="home-screen-container"
      onContextMenu={(e) => {
        // Long press backdrop for Home settings
        e.preventDefault();
        setHomeContextMenu({ x: e.clientX, y: e.clientY });
      }}
      className="w-full h-full flex flex-col justify-between relative overflow-hidden select-none"
    >
      {/* Top: At a Glance Widget */}
      {settings.enableAtAGlance && (
        <div className="pt-8">
          <AtAGlanceWidget
            palette={palette}
            onOpenApp={onOpenApp}
            showWeather={settings.atAGlanceWeather}
            showCalendar={settings.atAGlanceCalendar}
            showBattery={settings.atAGlanceBattery}
          />
        </div>
      )}

      {/* Middle: Grid of Apps & Folders */}
      <div className="flex-1 flex flex-col justify-center px-4 py-2 my-auto">
        <div className={`grid ${gridColsClass} gap-y-7 gap-x-4 justify-items-center items-center`}>
          {/* Render Folders first if page 0 */}
          {activePageIndex === 0 &&
            folders.map((folder) => {
              const previewApps = allApps.filter((a) => folder.appIds.includes(a.id)).slice(0, 4);
              return (
                <div
                  key={`folder-${folder.id}`}
                  onClick={() => onOpenFolder(folder)}
                  className="flex flex-col items-center gap-1.5 cursor-pointer group"
                >
                  <div className="w-13 h-13 rounded-[24%] bg-white/25 dark:bg-black/40 backdrop-blur-md border border-white/20 p-1.5 grid grid-cols-2 gap-1 items-center justify-items-center shadow-lg group-hover:scale-105 transition-transform">
                    {previewApps.map((pa) => (
                      <div
                        key={`fp-${pa.id}`}
                        className="w-4 h-4 rounded-md"
                        style={{ backgroundColor: pa.color || palette.primary }}
                      />
                    ))}
                  </div>
                  {settings.showIconLabels && (
                    <span className="text-xs font-normal text-white drop-shadow-md truncate max-w-[70px]">
                      {folder.name}
                    </span>
                  )}
                </div>
              );
            })}

          {/* Render Home Apps */}
          {currentApps.map((app) => (
            <AppIcon
              key={app.id}
              app={app}
              iconPack={settings.activeIconPack}
              shape={settings.iconShape}
              palette={palette}
              enableThemedIcons={settings.enableThemedIcons}
              showLabel={settings.showIconLabels}
              size="md"
              onClick={() => onOpenApp(app.id)}
              onLongPress={(e) => {
                setAppContextMenu({
                  app,
                  x: e.clientX,
                  y: e.clientY,
                });
              }}
            />
          ))}
        </div>
      </div>

      {/* Page Indicator Dots if multiple pages */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 py-1">
          {[0, 1].map((pIndex) => (
            <div
              key={pIndex}
              onClick={() => setActivePageIndex(pIndex)}
              className={`h-1.5 rounded-full cursor-pointer transition-all ${
                activePageIndex === pIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>
      )}

      {/* Bottom Area: Search Bar + App Drawer Indicator */}
      <div className="flex flex-col items-center pb-2">
        {/* Swipe Up Arrow indicator */}
        <button
          onClick={onOpenDrawer}
          className="p-1 hover:bg-white/10 rounded-full text-white/80 hover:text-white transition-all transform active:translate-y-[-2px]"
          title="Swipe up for App Drawer"
        >
          <ChevronUp className="w-5 h-5 animate-bounce" />
        </button>

        {/* Bottom Google Search Bar (Controlled by toggle!) */}
        <BottomSearchBar
          showSearch={settings.showBottomSearch}
          searchBarStyle={settings.searchBarStyle}
          palette={palette}
          enableThemedIcons={settings.enableThemedIcons}
          onSearchClick={onOpenDrawer}
          onMicClick={onOpenMic}
          onLensClick={onOpenLens}
        />
      </div>

      {/* LONG PRESS HOME BACKDROP CONTEXT MENU */}
      {homeContextMenu && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
          onClick={() => setHomeContextMenu(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900/90 border border-white/20 rounded-2xl p-2 w-60 shadow-2xl backdrop-blur-2xl flex flex-col gap-1 text-slate-100"
          >
            <div className="px-3 py-2 border-b border-white/10 font-medium text-xs text-slate-400 uppercase tracking-wider">
              Pixel Launcher Options
            </div>
            <button
              onClick={() => {
                onOpenSettings();
                setHomeContextMenu(null);
              }}
              className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/10 rounded-xl text-xs font-medium transition-colors"
            >
              <Palette className="w-4 h-4 text-emerald-400" />
              <span>Wallpaper & Style</span>
            </button>
            <button
              onClick={() => {
                onOpenSettings();
                setHomeContextMenu(null);
              }}
              className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/10 rounded-xl text-xs font-medium transition-colors"
            >
              <SettingsIcon className="w-4 h-4 text-sky-400" />
              <span>Home Settings</span>
            </button>
            <button
              onClick={() => {
                onOpenDrawer();
                setHomeContextMenu(null);
              }}
              className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/10 rounded-xl text-xs font-medium transition-colors"
            >
              <LayoutGrid className="w-4 h-4 text-purple-400" />
              <span>All Apps Drawer</span>
            </button>
          </motion.div>
        </div>
      )}

      {/* LONG PRESS APP CONTEXT MENU */}
      {appContextMenu && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
          onClick={() => setAppContextMenu(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-white/20 rounded-2xl p-2 w-56 shadow-2xl flex flex-col gap-1 text-slate-200"
          >
            <div className="px-3 py-2 border-b border-white/10 font-semibold text-sm text-white">
              {appContextMenu.app.name}
            </div>
            <button
              onClick={() => {
                onRemoveFromHome(appContextMenu.app.id);
                setAppContextMenu(null);
              }}
              className="flex items-center gap-2.5 px-3 py-2 hover:bg-rose-500/20 text-rose-300 rounded-xl text-xs font-medium transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Remove from Home</span>
            </button>
            <button
              onClick={() => {
                onOpenApp(appContextMenu.app.id);
                setAppContextMenu(null);
              }}
              className="flex items-center gap-2.5 px-3 py-2 hover:bg-white/10 rounded-xl text-xs font-medium transition-colors"
            >
              <SettingsIcon className="w-4 h-4 text-sky-400" />
              <span>App Info</span>
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};
