import React, { useState } from 'react';
import { DEFAULT_APPS } from './data/defaultApps';
import {
  AppItem,
  FolderItem,
  LauncherSettings,
  LiveActivity,
  NotificationItem,
} from './types';
import { getPaletteById, WALLPAPER_FLUID, WALLPAPER_DARK } from './lib/themeEngine';
import { PhoneFrame } from './components/PhoneFrame';
import { StatusBar } from './components/StatusBar';
import { DynamicNotchPill } from './components/DynamicNotchPill';
import { HomeScreen } from './components/HomeScreen';
import { AppDrawer } from './components/AppDrawer';
import { FolderModal } from './components/FolderModal';
import { AppModal } from './components/AppModal';
import { SettingsModal } from './components/SettingsModal';

export default function App() {
  // Launcher Settings State
  const [settings, setSettings] = useState<LauncherSettings>({
    showBottomSearch: true,
    searchBarStyle: 'google_classic',
    gridSize: '4x5',
    iconSize: 100,
    showIconLabels: true,
    enableAtAGlance: true,
    atAGlanceWeather: true,
    atAGlanceCalendar: true,
    atAGlanceBattery: true,

    enableNotchPill: true,
    notchPillSize: 'standard',
    notchPillPosition: 'top',
    autoExpandOnNewNotification: true,
    showMusicInPill: true,
    showTimerInPill: true,
    showCallInPill: true,

    selectedWallpaper: WALLPAPER_FLUID,
    monetPaletteId: 'monet_fluid',
    themeMode: 'system',
    enableThemedIcons: false,
    useOledDark: false,

    activeIconPack: 'pixel_stock',
    iconShape: 'squircle',

    swipeDownAction: 'notifications',
    doubleTapAction: 'lock',
  });

  // Apps State
  const [allApps, setAllApps] = useState<AppItem[]>(DEFAULT_APPS);

  // Home Screen App IDs
  const [homeAppIds, setHomeAppIds] = useState<string[]>([
    'phone',
    'messages',
    'chrome',
    'camera',
    'photos',
    'spotify',
    'weather',
    'settings',
    'clock',
    'calendar',
    'whatsapp',
    'pixel_launcher',
  ]);

  // Folders State
  const [folders, setFolders] = useState<FolderItem[]>([
    {
      id: 'google_tools',
      name: 'Google Apps',
      appIds: ['gmail', 'maps', 'drive', 'notes', 'files', 'playstore'],
    },
  ]);

  // Live Activities for Notch Pill State
  const [liveActivities, setLiveActivities] = useState<LiveActivity[]>([
    {
      id: 'act-init-music',
      type: 'music',
      title: 'Pixel Horizon',
      subtitle: 'Google Ambient Ensemble',
      iconName: 'Music',
      timestamp: 'Now',
      musicData: {
        song: 'Pixel Horizon',
        artist: 'Google Ambient Ensemble',
        isPlaying: true,
        progressSeconds: 102,
        durationSeconds: 210,
      },
    },
    {
      id: 'act-init-timer',
      type: 'timer',
      title: 'Focus Timer',
      subtitle: '04:15 remaining',
      iconName: 'Timer',
      timestamp: 'Now',
      timerData: {
        label: 'Focus Timer',
        remainingSeconds: 255,
        totalSeconds: 300,
        isRunning: true,
      },
    },
  ]);

  // Notifications State
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      appId: 'whatsapp',
      appName: 'WhatsApp',
      appIcon: 'MessageCircle',
      title: 'Sarah Jenkins',
      body: 'Hey! Did you see the new Pixel Launcher update with Dynamic Notch Pill?',
      time: '2m ago',
      read: false,
    },
  ]);

  // Modal Visibility State
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [openedApp, setOpenedApp] = useState<AppItem | null>(null);
  const [openedFolder, setOpenedFolder] = useState<FolderItem | null>(null);

  // Get active Monet Palette
  const currentPalette = getPaletteById(settings.monetPaletteId);

  // Update Settings handler
  const handleUpdateSettings = (newSettings: Partial<LauncherSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      // Synchronize wallpaper if monet palette changed
      if (newSettings.monetPaletteId) {
        const p = getPaletteById(newSettings.monetPaletteId);
        updated.selectedWallpaper = p.wallpaperUrl;
      }
      return updated;
    });
  };

  // Trigger Live Activity for Notch Pill
  const handleTriggerLiveActivity = (type: string, data: any) => {
    let newAct: LiveActivity;
    if (type === 'music') {
      newAct = {
        id: `act-music-${Date.now()}`,
        type: 'music',
        title: data.song || 'Now Playing',
        subtitle: data.artist || 'Artist',
        iconName: 'Music',
        timestamp: 'Just now',
        musicData: data,
      };
    } else if (type === 'timer') {
      newAct = {
        id: `act-timer-${Date.now()}`,
        type: 'timer',
        title: data.label || 'Countdown',
        subtitle: 'Active Timer',
        iconName: 'Timer',
        timestamp: 'Just now',
        timerData: data,
      };
    } else if (type === 'call') {
      newAct = {
        id: `act-call-${Date.now()}`,
        type: 'call',
        title: data.callerName || 'Incoming Call',
        subtitle: data.callerNumber || 'HD Voice',
        iconName: 'PhoneCall',
        timestamp: 'Just now',
        callData: data,
      };
    } else {
      newAct = {
        id: `act-notif-${Date.now()}`,
        type: 'notification',
        title: data.sender || 'New Notification',
        subtitle: data.message || '',
        iconName: 'Bell',
        timestamp: 'Just now',
        notificationData: data,
      };
    }

    setLiveActivities((prev) => {
      const existingIdx = prev.findIndex((a) => a.type === newAct.type);
      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx] = newAct;
        return copy;
      }
      return [newAct, ...prev];
    });
  };

  // Dismiss activity
  const handleDismissActivity = (id?: string) => {
    if (!id) {
      setLiveActivities([]);
    } else {
      setLiveActivities((prev) => prev.filter((a) => a.id !== id));
    }
  };

  // Update specific activity
  const handleUpdateActivity = (updated: LiveActivity) => {
    setLiveActivities((prev) =>
      prev.map((a) => (a.id === updated.id ? updated : a))
    );
  };

  // Home Apps filter
  const homeApps = allApps.filter((app) => homeAppIds.includes(app.id));

  // Add App to Home Screen
  const handleAddToHomeScreen = (appId: string) => {
    if (!homeAppIds.includes(appId)) {
      setHomeAppIds((prev) => [...prev, appId]);
    }
  };

  // Remove App from Home Screen
  const handleRemoveFromHome = (appId: string) => {
    setHomeAppIds((prev) => prev.filter((id) => id !== appId));
  };

  // Rename Folder
  const handleRenameFolder = (folderId: string, newName: string) => {
    setFolders((prev) =>
      prev.map((f) => (f.id === folderId ? { ...f, name: newName } : f))
    );
  };

  // Uninstall App
  const handleUninstallApp = (appId: string) => {
    setAllApps((prev) => prev.filter((a) => a.id !== appId));
    setHomeAppIds((prev) => prev.filter((id) => id !== appId));
  };

  return (
    <PhoneFrame
      settings={settings}
      palette={currentPalette}
      onOpenSettings={() => setIsSettingsOpen(true)}
      onTriggerLiveActivity={handleTriggerLiveActivity}
      onToggleThemeMode={() => {
        const nextPaletteId =
          settings.monetPaletteId === 'monet_fluid' ? 'monet_dark_oled' : 'monet_fluid';
        handleUpdateSettings({ monetPaletteId: nextPaletteId });
      }}
    >
      {/* Top Android Status Bar */}
      <StatusBar
        isDark={currentPalette.isDark}
        notificationCount={notifications.filter((n) => !n.read).length}
      />

      {/* Dynamic Notch Pill (iPhone-like Dynamic Island) */}
      <DynamicNotchPill
        enabled={settings.enableNotchPill}
        activities={liveActivities}
        onDismiss={handleDismissActivity}
        onOpenApp={(appId) => {
          const targetApp = allApps.find((a) => a.id === appId);
          if (targetApp) setOpenedApp(targetApp);
        }}
        onUpdateActivity={handleUpdateActivity}
        size={settings.notchPillSize}
      />

      {/* Main Home Screen Area */}
      <div className="flex-1 w-full relative z-10 overflow-hidden">
        <HomeScreen
          settings={settings}
          palette={currentPalette}
          homeApps={homeApps}
          folders={folders}
          allApps={allApps}
          onOpenApp={(appId) => {
            const target = allApps.find((a) => a.id === appId);
            if (target) {
              if (target.id === 'pixel_launcher') {
                setIsSettingsOpen(true);
              } else {
                setOpenedApp(target);
              }
            }
          }}
          onOpenFolder={(folder) => setOpenedFolder(folder)}
          onOpenDrawer={() => setIsDrawerOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onRemoveFromHome={handleRemoveFromHome}
          onOpenMic={() => {
            handleTriggerLiveActivity('notification', {
              sender: 'Google Voice Search',
              message: 'Listening for "Hey Google"...',
              time: 'Now',
            });
          }}
          onOpenLens={() => {
            handleTriggerLiveActivity('notification', {
              sender: 'Google Lens',
              message: 'Camera lens search initialized.',
              time: 'Now',
            });
          }}
        />
      </div>

      {/* Swipe-Up App Drawer */}
      <AppDrawer
        isOpen={isDrawerOpen}
        apps={allApps}
        palette={currentPalette}
        iconPack={settings.activeIconPack}
        iconShape={settings.iconShape}
        enableThemedIcons={settings.enableThemedIcons}
        onClose={() => setIsDrawerOpen(false)}
        onOpenApp={(appId) => {
          const target = allApps.find((a) => a.id === appId);
          if (target) {
            if (target.id === 'pixel_launcher') {
              setIsSettingsOpen(true);
            } else {
              setOpenedApp(target);
            }
          }
        }}
        onAddToHomeScreen={handleAddToHomeScreen}
        onUninstallApp={handleUninstallApp}
      />

      {/* Folder Expanded Modal */}
      {openedFolder && (
        <FolderModal
          folder={openedFolder}
          apps={allApps}
          palette={currentPalette}
          iconPack={settings.activeIconPack}
          iconShape={settings.iconShape}
          enableThemedIcons={settings.enableThemedIcons}
          onClose={() => setOpenedFolder(null)}
          onOpenApp={(appId) => {
            const target = allApps.find((a) => a.id === appId);
            if (target) setOpenedApp(target);
          }}
          onRenameFolder={handleRenameFolder}
        />
      )}

      {/* App Window Modal */}
      {openedApp && (
        <AppModal
          app={openedApp}
          palette={currentPalette}
          onClose={() => setOpenedApp(null)}
          onTriggerLiveActivity={handleTriggerLiveActivity}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />
      )}

      {/* Launcher Settings Modal */}
      {isSettingsOpen && (
        <SettingsModal
          settings={settings}
          palette={currentPalette}
          onUpdateSettings={handleUpdateSettings}
          onClose={() => setIsSettingsOpen(false)}
          onTriggerLiveActivity={handleTriggerLiveActivity}
        />
      )}
    </PhoneFrame>
  );
}
