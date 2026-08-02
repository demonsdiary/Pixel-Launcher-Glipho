import React from 'react';
import { Sun, Cloud, Calendar, BatteryCharging, Wind } from 'lucide-react';
import { MonetPalette } from '../types';

interface AtAGlanceWidgetProps {
  palette: MonetPalette;
  onOpenApp?: (appId: string) => void;
  showWeather?: boolean;
  showCalendar?: boolean;
  showBattery?: boolean;
}

export const AtAGlanceWidget: React.FC<AtAGlanceWidgetProps> = ({
  palette,
  onOpenApp,
  showWeather = true,
  showCalendar = true,
  showBattery = true,
}) => {
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      id="at-a-glance-widget"
      className="w-full px-5 pt-3 pb-2 select-none z-10 flex flex-col gap-1 text-white drop-shadow-md cursor-pointer hover:opacity-95 transition-opacity"
      onClick={() => onOpenApp?.('calendar')}
    >
      {/* Date row */}
      <div id="at-a-glance-date" className="flex items-center gap-2 text-2xl font-normal tracking-tight">
        <span className="font-medium drop-shadow-sm">{dateString}</span>
      </div>

      {/* Weather & Secondary info line */}
      <div id="at-a-glance-subtext" className="flex items-center gap-3 text-sm font-medium opacity-90">
        {showWeather && (
          <div
            id="at-a-glance-weather"
            onClick={(e) => {
              e.stopPropagation();
              onOpenApp?.('weather');
            }}
            className="flex items-center gap-1.5 hover:underline"
          >
            <Sun className="w-4 h-4 text-amber-300 fill-amber-300/40" />
            <span>72°F</span>
            <span className="text-xs opacity-80">Sunny</span>
          </div>
        )}

        {showWeather && showCalendar && <span className="opacity-40">•</span>}

        {showCalendar && (
          <div
            id="at-a-glance-event"
            className="flex items-center gap-1.5 text-xs bg-white/15 backdrop-blur-md px-2 py-0.5 rounded-full"
          >
            <Calendar className="w-3 h-3 text-sky-200" />
            <span className="truncate max-w-[140px]">Design Review in 25m</span>
          </div>
        )}

        {showBattery && (
          <div id="at-a-glance-battery" className="hidden sm:flex items-center gap-1 text-xs opacity-80">
            <BatteryCharging className="w-3.5 h-3.5 text-emerald-300" />
            <span>88%</span>
          </div>
        )}
      </div>
    </div>
  );
};
