import React from 'react';

interface DiamondGemProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

export const DiamondGem: React.FC<DiamondGemProps> = ({
  className = '',
  size = 40,
  glow = true,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {glow && (
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/40 via-amber-300/30 to-fuchsia-400/40 blur-md pointer-events-none animate-pulse-subtle"
          style={{ transform: 'scale(1.25)' }}
        />
      )}
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="relative z-10 drop-shadow-[0_2px_8px_rgba(216,180,254,0.6)]"
      >
        <defs>
          <linearGradient id="facetTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95" />
            <stop offset="50%" stop-color="#e9d5ff" stop-opacity="0.85" />
            <stop offset="100%" stop-color="#c084fc" stop-opacity="0.8" />
          </linearGradient>

          <linearGradient id="facetSideL" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#d8b4fe" stop-opacity="0.9" />
            <stop offset="100%" stop-color="#9333ea" stop-opacity="0.75" />
          </linearGradient>

          <linearGradient id="facetSideR" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#f5d061" stop-opacity="0.85" />
            <stop offset="50%" stop-color="#c084fc" stop-opacity="0.75" />
            <stop offset="100%" stop-color="#7e22ce" stop-opacity="0.9" />
          </linearGradient>

          <linearGradient id="facetBottom" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stop-color="#c084fc" stop-opacity="0.9" />
            <stop offset="60%" stop-color="#581c87" stop-opacity="0.95" />
            <stop offset="100%" stop-color="#2e1065" stop-opacity="1" />
          </linearGradient>

          <linearGradient id="facetCenter" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fffbeb" stop-opacity="0.95" />
            <stop offset="50%" stop-color="#f3e8ff" stop-opacity="0.9" />
            <stop offset="100%" stop-color="#a855f7" stop-opacity="0.8" />
          </linearGradient>
        </defs>

        {/* Outer Facets Crown */}
        <polygon points="26,24 74,24 88,44 12,44" fill="url(#facetTop)" />

        {/* Center Table Facet */}
        <polygon points="34,24 66,24 72,44 28,44" fill="url(#facetCenter)" />

        {/* Left Crown Facet */}
        <polygon points="26,24 34,24 28,44 12,44" fill="url(#facetSideL)" />

        {/* Right Crown Facet */}
        <polygon points="66,24 74,24 88,44 72,44" fill="url(#facetSideR)" />

        {/* Pavilion Lower Center */}
        <polygon points="28,44 72,44 50,86" fill="url(#facetBottom)" />

        {/* Pavilion Lower Left */}
        <polygon points="12,44 28,44 50,86" fill="url(#facetSideL)" />

        {/* Pavilion Lower Right */}
        <polygon points="72,44 88,44 50,86" fill="url(#facetSideR)" />

        {/* Delicate Gemstone Facet Outline in Champagne Gold */}
        <polygon
          points="26,24 74,24 88,44 50,86 12,44"
          fill="none"
          stroke="#fef08a"
          strokeWidth="1.2"
          strokeOpacity="0.8"
        />

        {/* Sparkling Glint Star */}
        <path
          d="M34,28 Q34,36 30,36 Q34,36 34,44 Q34,36 38,36 Q34,36 34,28 Z"
          fill="#ffffff"
          opacity="0.95"
        />
        <circle cx="34" cy="36" r="1.5" fill="#fef08a" />
      </svg>
    </div>
  );
};
