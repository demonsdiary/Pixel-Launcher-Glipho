import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Music,
  Timer,
  PhoneCall,
  PhoneOff,
  ShoppingBag,
  Bell,
  Play,
  Pause,
  SkipForward,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Activity,
  Zap,
} from 'lucide-react';
import { LiveActivity } from '../types';

interface DynamicNotchPillProps {
  enabled: boolean;
  activities?: LiveActivity[];
  activity?: LiveActivity | null;
  onDismiss?: (id?: string) => void;
  onOpenApp?: (appId?: string) => void;
  onUpdateActivity?: (updated: LiveActivity) => void;
  size?: 'compact' | 'standard' | 'wide';
}

export const DynamicNotchPill: React.FC<DynamicNotchPillProps> = ({
  enabled,
  activities,
  activity,
  onDismiss,
  onOpenApp,
  onUpdateActivity,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Combine activities array or single fallback activity
  const activeList: LiveActivity[] =
    activities && activities.length > 0
      ? activities
      : activity
      ? [activity]
      : [];

  // Check if background media/music is currently playing
  const musicActivity = activeList.find((a) => a.type === 'music');
  const isMusicPlaying = !!(
    musicActivity &&
    musicActivity.musicData &&
    musicActivity.musicData.isPlaying
  );

  const nonMusicActivities = activeList.filter((a) => a.type !== 'music');

  // List of activities to cycle through on the left side of the notch
  const displayList =
    isMusicPlaying && nonMusicActivities.length > 0
      ? nonMusicActivities
      : activeList;

  // Reset activeIndex when displayList changes or goes out of range
  useEffect(() => {
    if (activeIndex >= displayList.length && displayList.length > 0) {
      setActiveIndex(0);
    }
    if (activeList.length === 0) {
      setIsExpanded(false);
    }
  }, [displayList.length, activeList.length, activeIndex]);

  // Auto-cycle through notifications sequentially (one after the other) every 3.5 seconds
  useEffect(() => {
    if (displayList.length <= 1 || isExpanded) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % displayList.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [displayList.length, isExpanded]);

  if (!enabled) return null;

  const hasActivity = activeList.length > 0;
  const currentActivity = displayList[activeIndex % displayList.length] || activeList[0];

  // Helper to get app icon element
  const renderAppIcon = (type: string) => {
    switch (type) {
      case 'music':
        return <Music className="w-3 h-3 text-black" />;
      case 'timer':
        return <Timer className="w-3 h-3 text-black" />;
      case 'call':
        return <PhoneCall className="w-3 h-3 text-white" />;
      case 'delivery':
        return <ShoppingBag className="w-3 h-3 text-white" />;
      case 'notification':
        return <Bell className="w-3 h-3 text-white" />;
      case 'fitness':
        return <Activity className="w-3 h-3 text-black" />;
      case 'charging':
        return <Zap className="w-3 h-3 text-black" />;
      default:
        return <Bell className="w-3 h-3 text-white" />;
    }
  };

  const getAppBgColor = (type: string) => {
    switch (type) {
      case 'music':
        return 'bg-emerald-500';
      case 'timer':
        return 'bg-amber-500';
      case 'call':
        return 'bg-blue-500';
      case 'delivery':
        return 'bg-purple-500';
      case 'notification':
        return 'bg-rose-500';
      case 'fitness':
        return 'bg-cyan-500';
      case 'charging':
        return 'bg-yellow-400';
      default:
        return 'bg-indigo-500';
    }
  };

  const renderRightStatusIcon = (act: LiveActivity) => {
    switch (act.type) {
      case 'music':
        return (
          <div className="flex items-end gap-0.5 h-3 px-0.5">
            <div className="w-0.5 bg-emerald-400 h-2.5 animate-pulse" />
            <div className="w-0.5 bg-emerald-400 h-3 animate-pulse delay-75" />
            <div className="w-0.5 bg-emerald-400 h-1.5 animate-pulse delay-150" />
          </div>
        );
      case 'timer':
        return (
          <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-400 flex items-center justify-center shrink-0">
            <Timer className="w-2.5 h-2.5 animate-spin" style={{ animationDuration: '4s' }} />
          </div>
        );
      case 'call':
        return (
          <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 flex items-center justify-center shrink-0">
            <PhoneCall className="w-2.5 h-2.5 animate-pulse" />
          </div>
        );
      case 'delivery':
        return (
          <div className="w-5 h-5 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-2.5 h-2.5" />
          </div>
        );
      case 'notification':
        return (
          <div className="w-5 h-5 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-300 flex items-center justify-center shrink-0">
            <Bell className="w-2.5 h-2.5 animate-pulse" />
          </div>
        );
      case 'fitness':
        return (
          <div className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 flex items-center justify-center shrink-0">
            <Activity className="w-2.5 h-2.5" />
          </div>
        );
      case 'charging':
        return (
          <div className="w-5 h-5 rounded-full bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 flex items-center justify-center shrink-0">
            <Zap className="w-2.5 h-2.5" />
          </div>
        );
      default:
        return (
          <div className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center shrink-0">
            <Bell className="w-2.5 h-2.5" />
          </div>
        );
    }
  };

  // Toggle play/pause for music
  const toggleMusicPlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (
      currentActivity &&
      currentActivity.type === 'music' &&
      currentActivity.musicData &&
      onUpdateActivity
    ) {
      onUpdateActivity({
        ...currentActivity,
        musicData: {
          ...currentActivity.musicData,
          isPlaying: !currentActivity.musicData.isPlaying,
        },
      });
    }
  };

  // Toggle timer
  const toggleTimer = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (
      currentActivity &&
      currentActivity.type === 'timer' &&
      currentActivity.timerData &&
      onUpdateActivity
    ) {
      onUpdateActivity({
        ...currentActivity,
        timerData: {
          ...currentActivity.timerData,
          isRunning: !currentActivity.timerData.isRunning,
        },
      });
    }
  };

  return (
    <div
      id="dynamic-notch-container"
      className="absolute top-2 left-0 right-0 z-50 flex justify-center items-center pointer-events-none px-4"
    >
      <motion.div
        id="dynamic-notch-pill"
        layout
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        onClick={() => {
          if (hasActivity) {
            setIsExpanded(!isExpanded);
          }
        }}
        className={`pointer-events-auto bg-black text-white shadow-2xl border border-white/10 flex items-center justify-between cursor-pointer overflow-hidden transition-all duration-300 ${
          isExpanded
            ? 'w-full max-w-[340px] rounded-[32px] p-4 bg-slate-950/95 backdrop-blur-2xl ring-1 ring-white/15'
            : hasActivity
            ? 'px-2.5 py-1.5 h-8 gap-3 rounded-full bg-black/95 backdrop-blur-xl border border-white/15 hover:scale-105 active:scale-98 shadow-lg'
            : 'w-16 h-6 rounded-full bg-black/90 border border-slate-800/80 flex items-center justify-center opacity-70 hover:opacity-100'
        }`}
      >
        {!hasActivity ? (
          // Idle camera notch pill - exactly matches physical front camera cutout
          <div className="w-full flex justify-center items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded-full bg-slate-950 ring-2 ring-slate-800/90 shadow-inner flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-950/80" />
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-900 ring-1 ring-slate-800" />
          </div>
        ) : isExpanded ? (
          // EXPANDED VIEW CARD
          <motion.div
            id="notch-expanded-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full flex flex-col gap-3"
          >
            {/* Expanded Header with Pagination if multiple notifications */}
            <div className="flex items-center justify-between text-xs text-slate-400 pb-1 border-b border-white/10">
              <div className="flex items-center gap-2 font-medium text-slate-200">
                <div
                  className={`w-4 h-4 rounded-full ${getAppBgColor(
                    currentActivity.type
                  )} flex items-center justify-center`}
                >
                  {renderAppIcon(currentActivity.type)}
                </div>
                <span className="uppercase text-[10px] tracking-wider font-semibold">
                  {currentActivity.type}
                </span>

                {/* Counter / Pagination switch if >1 notifications */}
                {activeList.length > 1 && (
                  <span className="text-[10px] text-slate-400 bg-white/10 px-1.5 py-0.5 rounded-full font-mono">
                    {activeIndex + 1}/{activeList.length}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1">
                {activeList.length > 1 && (
                  <div className="flex items-center gap-0.5 mr-1 border-r border-white/10 pr-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveIndex(
                          (prev) => (prev - 1 + activeList.length) % activeList.length
                        );
                      }}
                      className="p-1 hover:bg-white/10 rounded-full transition-colors text-slate-300"
                      title="Previous notification"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveIndex((prev) => (prev + 1) % activeList.length);
                      }}
                      className="p-1 hover:bg-white/10 rounded-full transition-colors text-slate-300"
                      title="Next notification"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                <button
                  id="notch-collapse-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(false);
                  }}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
                  title="Collapse"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <button
                  id="notch-dismiss-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onDismiss) onDismiss(currentActivity.id);
                  }}
                  className="p-1 hover:bg-rose-500/20 hover:text-rose-400 rounded-full transition-colors text-slate-400"
                  title="Dismiss notification"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Content Specifics */}
            {currentActivity.type === 'music' && currentActivity.musicData && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-md relative overflow-hidden group">
                    <Music className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-white truncate">
                      {currentActivity.musicData.song}
                    </h4>
                    <p className="text-xs text-slate-400 truncate">
                      {currentActivity.musicData.artist}
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden my-1">
                  <div
                    className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        (currentActivity.musicData.progressSeconds /
                          currentActivity.musicData.durationSeconds) *
                        100
                      }%`,
                    }}
                  />
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between text-xs text-slate-300 px-1 pt-1">
                  <span className="text-[10px] text-slate-400">01:42</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={toggleMusicPlay}
                      className="w-9 h-9 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center transition-transform active:scale-90"
                    >
                      {currentActivity.musicData.isPlaying ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      )}
                    </button>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 hover:bg-white/10 rounded-full text-slate-300"
                    >
                      <SkipForward className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-[10px] text-slate-400">03:30</span>
                </div>
              </div>
            )}

            {currentActivity.type === 'timer' && currentActivity.timerData && (
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border-2 border-amber-400/80 flex items-center justify-center text-amber-400">
                    <Timer className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {currentActivity.timerData.label}
                    </h4>
                    <p className="text-lg font-mono font-bold text-amber-400 tracking-wider">
                      {Math.floor(currentActivity.timerData.remainingSeconds / 60)
                        .toString()
                        .padStart(2, '0')}
                      :
                      {(currentActivity.timerData.remainingSeconds % 60)
                        .toString()
                        .padStart(2, '0')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleTimer}
                    className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-full text-xs font-semibold"
                  >
                    {currentActivity.timerData.isRunning ? 'Pause' : 'Resume'}
                  </button>
                </div>
              </div>
            )}

            {currentActivity.type === 'call' && currentActivity.callData && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-base shadow-lg">
                    {currentActivity.callData.callerName.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-white">
                      {currentActivity.callData.callerName}
                    </h4>
                    <p className="text-xs text-blue-300">
                      {currentActivity.callData.status === 'incoming'
                        ? 'Incoming HD Audio Call'
                        : 'Active Call 02:14'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onDismiss) onDismiss(currentActivity.id);
                    }}
                    className="flex-1 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-full text-xs font-semibold flex items-center justify-center gap-1"
                  >
                    <PhoneOff className="w-3.5 h-3.5" />
                    Decline
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenApp) onOpenApp('phone');
                      setIsExpanded(false);
                    }}
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-xs font-semibold flex items-center justify-center gap-1"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    Answer
                  </button>
                </div>
              </div>
            )}

            {currentActivity.type === 'notification' && currentActivity.notificationData && (
              <div className="flex flex-col gap-2">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs mt-0.5">
                    {currentActivity.notificationData.sender.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-semibold text-white">
                        {currentActivity.notificationData.sender}
                      </h4>
                      <span className="text-[10px] text-slate-400">
                        {currentActivity.notificationData.time}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-2 mt-0.5">
                      {currentActivity.notificationData.message}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenApp) onOpenApp('messages');
                      setIsExpanded(false);
                    }}
                    className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-medium"
                  >
                    Open App
                  </button>
                </div>
              </div>
            )}

            {currentActivity.type === 'delivery' && currentActivity.deliveryData && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-white">
                      {currentActivity.deliveryData.storeName}
                    </h4>
                    <p className="text-xs text-purple-300">
                      {currentActivity.deliveryData.status}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">
                    ETA {currentActivity.deliveryData.etaMinutes}m
                  </span>
                </div>
                {/* Step indicator */}
                <div className="flex items-center gap-1 pt-1">
                  {[1, 2, 3, 4].map((stepNum) => (
                    <div
                      key={stepNum}
                      className={`h-1.5 flex-1 rounded-full ${
                        stepNum <= currentActivity.deliveryData!.step
                          ? 'bg-purple-400'
                          : 'bg-slate-800'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          // COLLAPSED PILL VIEW: Center camera notch cutout flanked symmetrically by app icons
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentActivity.id}-${isMusicPlaying}`}
              initial={{ opacity: 0, scale: 0.85, y: -2 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 2 }}
              transition={{ duration: 0.25 }}
              className="w-full flex items-center justify-between gap-3 px-1"
            >
              {/* Left side: App Icon for this notification */}
              <div className="flex items-center justify-center shrink-0">
                <div
                  className={`w-5 h-5 rounded-full ${getAppBgColor(
                    currentActivity.type
                  )} flex items-center justify-center shadow-sm`}
                >
                  {renderAppIcon(currentActivity.type)}
                </div>
              </div>

              {/* Dead Center: Front Camera Lens Punch-hole Cutout */}
              <div className="w-3.5 h-3.5 rounded-full bg-slate-950 ring-2 ring-slate-800/90 shadow-inner flex items-center justify-center shrink-0 my-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-950/80" />
              </div>

              {/* Right side: Persistent Dynamic Equalizer Icon if media is playing in background, else right status icon */}
              <div className="flex items-center justify-center shrink-0">
                {isMusicPlaying ? (
                  <div className="flex items-end gap-0.5 h-3 px-0.5" title="Media Playing in Background">
                    <div className="w-0.5 bg-emerald-400 h-2.5 animate-pulse" style={{ animationDuration: '0.6s' }} />
                    <div className="w-0.5 bg-emerald-400 h-3 animate-pulse delay-75" style={{ animationDuration: '0.8s' }} />
                    <div className="w-0.5 bg-emerald-400 h-1.5 animate-pulse delay-150" style={{ animationDuration: '0.5s' }} />
                  </div>
                ) : (
                  renderRightStatusIcon(currentActivity)
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    </div>
  );
};

