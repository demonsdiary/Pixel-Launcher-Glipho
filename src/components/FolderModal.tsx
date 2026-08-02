import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Edit2 } from 'lucide-react';
import { AppItem, FolderItem, IconPackId, IconShape, MonetPalette } from '../types';
import { AppIcon } from './AppIcon';

interface FolderModalProps {
  folder: FolderItem;
  apps: AppItem[];
  palette: MonetPalette;
  iconPack: IconPackId;
  iconShape: IconShape;
  enableThemedIcons: boolean;
  onClose: () => void;
  onOpenApp: (appId: string) => void;
  onRenameFolder: (folderId: string, newName: string) => void;
}

export const FolderModal: React.FC<FolderModalProps> = ({
  folder,
  apps,
  palette,
  iconPack,
  iconShape,
  enableThemedIcons,
  onClose,
  onOpenApp,
  onRenameFolder,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [folderName, setFolderName] = useState<string>(folder.name);

  const folderApps = apps.filter((a) => folder.appIds.includes(a.id));

  const handleSaveName = () => {
    setIsEditing(false);
    if (folderName.trim()) {
      onRenameFolder(folder.id, folderName.trim());
    }
  };

  return (
    <div
      id="folder-modal-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 select-none"
    >
      <motion.div
        id="folder-modal-card"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-[32px] bg-slate-900/90 border border-white/20 p-6 flex flex-col gap-6 shadow-2xl backdrop-blur-2xl"
      >
        {/* Title / Edit header */}
        <div className="flex items-center justify-between">
          {isEditing ? (
            <div className="flex items-center gap-2 flex-1">
              <input
                type="text"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                autoFocus
                className="bg-white/10 text-white font-semibold text-lg px-3 py-1 rounded-xl outline-none border border-primary/50 w-full"
              />
              <button
                onClick={handleSaveName}
                className="px-3 py-1 bg-emerald-600 text-white rounded-xl text-xs font-semibold"
              >
                Save
              </button>
            </div>
          ) : (
            <div
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <h3 className="text-xl font-medium text-white tracking-tight">{folder.name}</h3>
              <Edit2 className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
            </div>
          )}

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Folder App Grid */}
        <div className="grid grid-cols-3 gap-6 py-2">
          {folderApps.map((app) => (
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
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
