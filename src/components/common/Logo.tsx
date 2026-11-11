import React from 'react';

interface LogoProps {
  variant?: 'horizontal' | 'stacked' | 'mark' | 'wordmark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  inverted?: boolean;
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  inverted = false,
  showTagline = false,
  className = '',
  onClick,
}) => {
  // Dimensions for the houses SVG
  const sizes = {
    sm: { height: 26, width: 34, fontSize: 'text-lg', lampSize: 'w-2 h-2', subSize: 'text-[10px]' },
    md: { height: 38, width: 50, fontSize: 'text-2xl', lampSize: 'w-3 h-3', subSize: 'text-xs' },
    lg: { height: 56, width: 74, fontSize: 'text-3xl', lampSize: 'w-4 h-4', subSize: 'text-sm' },
    xl: { height: 80, width: 106, fontSize: 'text-5xl', lampSize: 'w-6 h-6', subSize: 'text-base' },
  };

  const currentSize = sizes[size];

  // SVG Mark: Left House (Terracotta), Gap, Right House (Ink), Glowing Amber Lamp
  const MarkSVG = (
    <svg
      width={currentSize.width}
      height={currentSize.height}
      viewBox="0 0 100 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 hover:scale-105"
    >
      {/* Amber Glowing Lamp in the Gap */}
      <circle
        cx="50"
        cy="36"
        r="14"
        fill="#EBA43B"
        className="transition-all duration-500"
      />
      {/* Left House - Terracotta */}
      <path
        d="M 6 40 L 26 20 L 44 38 L 44 76 L 6 76 Z"
        fill={inverted ? '#B94A31' : '#B94A31'}
      />
      {/* Arch Door Left House */}
      <path
        d="M 19 76 L 19 56 A 6 6 0 0 1 31 56 L 31 76 Z"
        fill={inverted ? '#1F3A3D' : '#FAF4E9'}
      />

      {/* Right House - Ink */}
      <path
        d="M 56 38 L 74 20 L 94 40 L 94 76 L 56 76 Z"
        fill={inverted ? '#FAF4E9' : '#1F3A3D'}
      />
      {/* Arch Door Right House */}
      <path
        d="M 69 76 L 69 56 A 6 6 0 0 1 81 56 L 81 76 Z"
        fill={inverted ? '#1F3A3D' : '#FAF4E9'}
      />
    </svg>
  );

  const Wordmark = (
    <div className="flex flex-col text-left">
      <div className={`font-serif font-bold tracking-tight ${currentSize.fontSize} leading-none`}>
        <span className={inverted ? 'text-paper' : 'text-ink'}>Neighbour</span>
        <span className="text-amber">Link</span>
      </div>
      {showTagline && (
        <span className={`italic font-serif ${currentSize.subSize} tracking-wide mt-1 ${inverted ? 'text-paper/80' : 'text-ink/80'}`}>
          Beyond Walls, Building Bonds.
        </span>
      )}
    </div>
  );

  if (variant === 'mark') {
    return (
      <div className={`inline-flex items-center cursor-pointer ${className}`} onClick={onClick}>
        {MarkSVG}
      </div>
    );
  }

  if (variant === 'wordmark') {
    return (
      <div className={`inline-flex cursor-pointer ${className}`} onClick={onClick}>
        {Wordmark}
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div
        className={`inline-flex flex-col items-center gap-2 cursor-pointer text-center ${className}`}
        onClick={onClick}
      >
        {MarkSVG}
        {Wordmark}
      </div>
    );
  }

  // Horizontal primary
  return (
    <div
      className={`inline-flex items-center gap-3 cursor-pointer ${className}`}
      onClick={onClick}
    >
      {MarkSVG}
      {Wordmark}
    </div>
  );
};
