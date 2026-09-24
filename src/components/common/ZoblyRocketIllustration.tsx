import React from 'react';

export const ZoblyRocketIllustration: React.FC<{ className?: string }> = ({ className = 'w-48 h-48' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 280 280"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* Main rocket body gradient */}
          <linearGradient id="rocketBodyGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>

          {/* Rocket nose cone gradient */}
          <linearGradient id="rocketNoseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>

          {/* Fins gradient */}
          <linearGradient id="rocketFinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>

          {/* Flame plume gradient */}
          <linearGradient id="flameGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="35%" stopColor="#67E8F9" />
            <stop offset="70%" stopColor="#FDBA74" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>

          {/* Inner core flame */}
          <linearGradient id="innerFlameGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#FEF08A" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>

          {/* Cloud shadow */}
          <filter id="cloudShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#94A3B8" floodOpacity="0.15" />
          </filter>

          {/* Rocket soft shadow */}
          <filter id="rocketShadow" x="-20%" y="-10%" width="140%" height="130%">
            <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#2563EB" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* Floating Stars / Sparkles */}
        {/* Top left sparkle */}
        <path
          d="M 100 28 Q 102 36 110 38 Q 102 40 100 48 Q 98 40 90 38 Q 98 36 100 28 Z"
          fill="#FBBF24"
          opacity="0.9"
        />
        {/* Top right star */}
        <path
          d="M 215 48 Q 217 56 225 58 Q 217 60 215 68 Q 213 60 205 58 Q 213 56 215 48 Z"
          fill="#FBBF24"
          opacity="0.8"
        />
        {/* Right small diamond star */}
        <path
          d="M 235 110 Q 236 114 240 115 Q 236 116 235 120 Q 234 116 230 115 Q 234 114 235 110 Z"
          fill="#93C5FD"
          opacity="0.75"
        />
        {/* Left small diamond */}
        <path
          d="M 50 120 Q 51 123 54 124 Q 51 125 50 128 Q 49 125 46 124 Q 49 123 50 120 Z"
          fill="#60A5FA"
          opacity="0.7"
        />

        {/* Thruster Plume Flame (Bottom) */}
        <g transform="translate(140, 195)">
          {/* Outer Plume */}
          <path
            d="M -15 0 C -25 35 -15 60 0 75 C 15 60 25 35 15 0 Z"
            fill="url(#flameGrad)"
            opacity="0.9"
          />
          {/* Inner Flame Core */}
          <path
            d="M -9 0 C -16 25 -8 45 0 52 C 8 45 16 25 9 0 Z"
            fill="url(#innerFlameGrad)"
          />
        </g>

        {/* Soft Fluffy Launch Cloud beneath rocket */}
        <g filter="url(#cloudShadow)" opacity="0.95">
          <ellipse cx="140" cy="245" rx="55" ry="18" fill="#F8FAFC" />
          <circle cx="112" cy="240" r="18" fill="#FFFFFF" />
          <circle cx="168" cy="240" r="18" fill="#FFFFFF" />
          <circle cx="140" cy="235" r="22" fill="#FFFFFF" />
          <ellipse cx="140" cy="246" rx="48" ry="12" fill="#FFFFFF" />
        </g>

        {/* ROCKET BODY GROUP */}
        <g filter="url(#rocketShadow)">
          {/* Left Wing Fin */}
          <path
            d="M 115 150 C 95 165 72 195 72 205 C 85 204 105 200 118 185 Z"
            fill="url(#rocketFinGrad)"
          />
          {/* Left Wing Highlight */}
          <path
            d="M 115 154 C 98 168 82 192 80 198 C 92 195 106 190 116 180 Z"
            fill="#60A5FA"
            opacity="0.5"
          />

          {/* Right Wing Fin */}
          <path
            d="M 165 150 C 185 165 208 195 208 205 C 195 204 175 200 162 185 Z"
            fill="url(#rocketFinGrad)"
          />
          {/* Right Wing Shadow */}
          <path
            d="M 165 154 C 182 168 198 192 200 198 C 188 195 174 190 164 180 Z"
            fill="#1D4ED8"
            opacity="0.5"
          />

          {/* Rocket Fuselage Main Body */}
          <path
            d="M 140 25 C 165 65 175 140 165 195 L 115 195 C 105 140 115 65 140 25 Z"
            fill="url(#rocketBodyGrad)"
          />

          {/* Fuselage Specular Highlight (Left edge) */}
          <path
            d="M 140 28 C 126 65 118 135 124 192 L 119 192 C 111 135 122 65 140 28 Z"
            fill="#FFFFFF"
            opacity="0.8"
          />

          {/* Fuselage Shadow (Right edge) */}
          <path
            d="M 140 28 C 154 65 162 135 156 192 L 161 192 C 169 135 158 65 140 28 Z"
            fill="#CBD5E1"
            opacity="0.6"
          />

          {/* Top Nose Cone Cap */}
          <path
            d="M 140 25 C 153 48 160 75 162 90 L 118 90 C 120 75 127 48 140 25 Z"
            fill="url(#rocketNoseGrad)"
          />
          {/* Nose Cone highlight */}
          <path
            d="M 140 27 C 132 48 126 70 124 85 L 120 85 C 123 70 130 48 140 27 Z"
            fill="#93C5FD"
            opacity="0.6"
          />

          {/* Central Blue Roundel Badge with Zobly 'Z' */}
          <g transform="translate(140, 130)">
            {/* Outer silver ring */}
            <circle cx="0" cy="0" r="20" fill="#E2E8F0" />
            {/* Blue disc */}
            <circle cx="0" cy="0" r="17" fill="#2563EB" />
            {/* Inner highlight */}
            <circle cx="0" cy="0" r="17" fill="url(#rocketNoseGrad)" />
            {/* Z Logo mark */}
            <path
              d="M -7 -6 L 7 -6 L -3 6 L 7 6"
              stroke="#FFFFFF"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* Lower Engine Nozzle Collar */}
          <path
            d="M 125 195 L 155 195 L 158 202 L 122 202 Z"
            fill="#64748B"
          />
          <ellipse cx="140" cy="202" rx="18" ry="3.5" fill="#475569" />
        </g>
      </svg>
    </div>
  );
};
