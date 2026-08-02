import React from 'react';
import * as LucideIcons from 'lucide-react';
import { AppItem, IconPackId, IconShape, MonetPalette } from '../types';
import { ICON_SHAPES } from '../data/iconPacks';

interface AppIconProps {
  app: AppItem;
  iconPack: IconPackId;
  shape: IconShape;
  palette: MonetPalette;
  enableThemedIcons?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  onLongPress?: (e: React.MouseEvent) => void;
  showLabel?: boolean;
  customLabel?: string;
  customIconUrl?: string;
}

export const AppIcon: React.FC<AppIconProps> = ({
  app,
  iconPack,
  shape,
  palette,
  enableThemedIcons = false,
  size = 'md',
  onClick,
  onLongPress,
  showLabel = true,
  customLabel,
  customIconUrl,
}) => {
  // Dynamic Lucide icon lookup
  const IconComponent = (LucideIcons as Record<string, React.ElementType>)[app.iconName] || LucideIcons.AppWindow;

  const shapeInfo = ICON_SHAPES.find((s) => s.id === shape) || ICON_SHAPES[0];

  // Dimensions based on size
  const containerSize = size === 'sm' ? 'w-10 h-10' : size === 'lg' ? 'w-16 h-16' : 'w-13 h-13';
  const iconSize = size === 'sm' ? 'w-5 h-5' : size === 'lg' ? 'w-8 h-8' : 'w-6 h-6';

  // Determine effective theme mode for Material You Monochromatic icons
  const isMonetIcon = iconPack === 'material_you' || enableThemedIcons;

  // Background and icon colors depending on iconPack style
  let bgStyle: React.CSSProperties = {
    borderRadius: shapeInfo.cssRadius,
  };
  let iconColor = 'white';
  let extraClasses = '';

  if (isMonetIcon) {
    // Material You Tinted Monochromatic
    bgStyle = {
      ...bgStyle,
      backgroundColor: palette.primaryContainer,
    };
    iconColor = palette.onPrimaryContainer;
  } else if (iconPack === 'minimal_line') {
    bgStyle = {
      ...bgStyle,
      backgroundColor: 'rgba(20, 20, 25, 0.75)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    };
    iconColor = '#FFFFFF';
  } else if (iconPack === 'glassmorphism') {
    bgStyle = {
      ...bgStyle,
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.4)',
      boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
    };
    iconColor = app.color || palette.accent;
  } else if (iconPack === 'neon_glow') {
    bgStyle = {
      ...bgStyle,
      backgroundColor: '#0F121C',
      border: `1.5px solid ${app.color || '#00F0FF'}`,
      boxShadow: `0 0 12px ${app.color || '#00F0FF'}66`,
    };
    iconColor = app.color || '#00F0FF';
  } else if (iconPack === 'retro_pixel') {
    bgStyle = {
      ...bgStyle,
      backgroundColor: app.color || '#333333',
      borderRadius: '4px', // 8-bit crisp
    };
    iconColor = '#FFFFFF';
  } else {
    // Pixel Stock Colorful
    bgStyle = {
      ...bgStyle,
      backgroundColor: app.color || palette.primary,
    };
    iconColor = '#FFFFFF';
  }

  return (
    <div
      id={`app-icon-${app.id}`}
      onClick={onClick}
      onContextMenu={(e) => {
        if (onLongPress) {
          e.preventDefault();
          onLongPress(e);
        }
      }}
      className="flex flex-col items-center justify-center gap-1.5 cursor-pointer group select-none touch-manipulation"
    >
      <div
        className={`relative ${containerSize} flex items-center justify-center shadow-md group-hover:scale-105 group-active:scale-95 transition-all duration-200 overflow-hidden ${extraClasses}`}
        style={bgStyle}
      >
        {customIconUrl || app.customIconUrl ? (
          <img
            src={customIconUrl || app.customIconUrl}
            alt={app.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        ) : (
          <IconComponent className={iconSize} style={{ color: iconColor }} />
        )}
      </div>

      {showLabel && (
        <span
          className="text-xs font-normal text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] text-center tracking-tight truncate max-w-[72px] opacity-95 group-hover:opacity-100"
        >
          {customLabel || app.customLabel || app.name}
        </span>
      )}
    </div>
  );
};
