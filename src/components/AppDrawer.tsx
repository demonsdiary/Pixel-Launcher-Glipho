import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ChevronDown, Plus, Info, Edit, Trash2 } from 'lucide-react';
import { AppItem, IconPackId, IconShape, MonetPalette } from '../types';
import { AppIcon } from './AppIcon';

interface AppDrawerProps {
  isOpen: boolean;
  apps: AppItem[];
  palette: MonetPalette;
  iconPack: IconPackId;
  iconShape: IconShape;
  enableThemedIcons: boolean;
  onClose: () => void;
  onOpenApp: (appId: string) => void;
  onAddToHomeScreen: (appId: string) => void;
  onUninstallApp?: (appId: string) => void;
}

export const AppDrawer: React.FC<AppDrawerProps> = ({
  isOpen,
  apps,
  palette,
  iconPack,
  iconShape,
  enableThemedIcons,
  onClose,
  onOpenApp,
  onAddToHomeScreen,
  onUninstallApp,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [contextMenuApp, setContextMenuApp] = useState<{ app: AppItem; x: number; y: number } | null>(null);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'social', name: 'Social' },
    { id: 'productivity', name: 'Productivity' },
    { id: 'tools', name: 'Tools' },
    { id: 'media', name: 'Media' },
    { id: 'system', name: 'System' },
  ];

  // Filtered Apps
  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [apps, searchQuery, selectedCategory]);

  // Alphabetical Grouping
  const alphabetList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        id="app-drawer-backdrop"
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 350, damping: 32 }}
        className="fixed inset-0 z-40 bg-slate-950/85 backdrop-blur-3xl flex flex-col pt-12 pb-6 select-none"
      >
        {/* Swipe Handle */}
        <div className="w-full flex justify-center py-2 cursor-pointer" onClick={onClose}>
          <div className="w-12 h-1.5 rounded-full bg-white/30 hover:bg-white/50 transition-colors" />
        </div>

        {/* Drawer Header Search */}
        <div className="px-5 pt-2 pb-3">
          <div className="relative w-full">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search apps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-10 rounded-full bg-white/10 text-white placeholder-slate-400 text-sm font-medium border border-white/15 focus:outline-none focus:border-primary/80 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-white text-slate-900 shadow-md font-bold'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Recent / Suggested row */}
        {!searchQuery && selectedCategory === 'all' && (
          <div className="px-5 pb-4 border-b border-white/10">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-3">
              Suggested Apps
            </span>
            <div className="flex items-center justify-between">
              {apps.slice(0, 5).map((app) => (
                <AppIcon
                  key={`rec-${app.id}`}
                  app={app}
                  iconPack={iconPack}
                  shape={iconShape}
                  palette={palette}
                  enableThemedIcons={enableThemedIcons}
                  size="sm"
                  onClick={() => {
                    onOpenApp(app.id);
                    onClose();
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Main Alphabetical App Grid */}
        <div className="flex-1 overflow-y-auto px-5 py-4 relative">
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-y-6 gap-x-4 pb-12">
            {filteredApps.map((app) => (
              <AppIcon
                key={app.id}
                app={app}
                iconPack={iconPack}
                shape={iconShape}
                palette={palette}
                enableThemedIcons={enableThemedIcons}
                size="md"
                onClick={() => {
                  onOpenApp(app.id);
                  onClose();
                }}
                onLongPress={(e) => {
                  setContextMenuApp({
                    app,
                    x: e.clientX,
                    y: e.clientY,
                  });
                }}
              />
            ))}
          </div>
        </div>

        {/* Long Press Context Menu */}
        {contextMenuApp && (
          <div
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
            onClick={() => setContextMenuApp(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-white/20 rounded-2xl p-2 w-56 shadow-2xl flex flex-col gap-1 text-slate-200"
            >
              <div className="px-3 py-2 border-b border-white/10 font-semibold text-sm text-white flex items-center gap-2">
                <span>{contextMenuApp.app.name}</span>
              </div>
              <button
                onClick={() => {
                  onAddToHomeScreen(contextMenuApp.app.id);
                  setContextMenuApp(null);
                }}
                className="flex items-center gap-2.5 px-3 py-2 hover:bg-white/10 rounded-xl text-xs font-medium transition-colors"
              >
                <Plus className="w-4 h-4 text-emerald-400" />
                <span>Add to Home Screen</span>
              </button>
              <button
                onClick={() => {
                  onOpenApp(contextMenuApp.app.id);
                  setContextMenuApp(null);
                  onClose();
                }}
                className="flex items-center gap-2.5 px-3 py-2 hover:bg-white/10 rounded-xl text-xs font-medium transition-colors"
              >
                <Info className="w-4 h-4 text-sky-400" />
                <span>App Info</span>
              </button>
              {onUninstallApp && !contextMenuApp.app.isSystem && (
                <button
                  onClick={() => {
                    onUninstallApp(contextMenuApp.app.id);
                    setContextMenuApp(null);
                  }}
                  className="flex items-center gap-2.5 px-3 py-2 hover:bg-rose-500/20 text-rose-300 rounded-xl text-xs font-medium transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Uninstall App</span>
                </button>
              )}
            </motion.div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
