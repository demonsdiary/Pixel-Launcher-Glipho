import React, { useState, useEffect } from 'react';
import { Wifi, Signal, Battery, Bell } from 'lucide-react';

interface StatusBarProps {
  isDark?: boolean;
  notificationCount?: number;
  timeString?: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({ isDark = true, notificationCount = 0 }) => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      id="android-status-bar"
      className={`w-full px-5 pt-2 pb-1 flex items-center justify-between text-xs font-medium select-none z-30 transition-colors duration-300 ${
        isDark ? 'text-white' : 'text-slate-900'
      }`}
    >
      {/* Time & Notification badge */}
      <div id="status-bar-left" className="flex items-center gap-2">
        <span id="status-time" className="font-semibold tracking-tight text-[13px]">
          {time || '10:00'}
        </span>
        {notificationCount > 0 && (
          <div
            id="status-notification-indicator"
            className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-1.5 py-0.5 rounded-full text-[10px]"
          >
            <Bell className="w-2.5 h-2.5" />
            <span>{notificationCount}</span>
          </div>
        )}
      </div>

      {/* Right icons: WiFi, 5G, Battery */}
      <div id="status-bar-right" className="flex items-center gap-2 text-[11px] font-semibold">
        <span className="text-[10px] tracking-widest font-mono opacity-80">5G</span>
        <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
        <Signal className="w-3.5 h-3.5 stroke-[2.5]" />
        <div className="flex items-center gap-1">
          <span className="text-[10px] opacity-90">88%</span>
          <div className="relative flex items-center">
            <Battery className="w-4 h-4 rotate-90 stroke-[2]" />
            <div className="absolute left-[3px] top-[4px] w-[9px] h-[6px] bg-current rounded-[1px]" />
          </div>
        </div>
      </div>
    </div>
  );
};
