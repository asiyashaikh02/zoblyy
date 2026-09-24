import React from 'react';

interface IndiaFlagProps {
  className?: string;
  id?: string;
}

export const IndiaFlag: React.FC<IndiaFlagProps> = ({
  className = 'w-5 h-3.5',
  id = 'india-flag-badge',
}) => {
  return (
    <span
      id={id}
      className={`inline-flex items-center justify-center overflow-hidden rounded-[2px] shadow-[0_0_0_1px_rgba(0,0,0,0.12)] shrink-0 align-middle ${className}`}
      title="India"
      role="img"
      aria-label="Flag of India"
    >
      <svg
        viewBox="0 0 90 60"
        className="w-full h-full block"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top Saffron Band */}
        <rect width="90" height="20" fill="#FF671F" />
        
        {/* Middle White Band */}
        <rect y="20" width="90" height="20" fill="#FFFFFF" />
        
        {/* Bottom Green Band */}
        <rect y="40" width="90" height="20" fill="#046A38" />
        
        {/* Ashoka Chakra (Navy Blue) */}
        <g stroke="#000080">
          {/* Outer Ring */}
          <circle cx="45" cy="30" r="7.8" fill="none" strokeWidth="0.9" />
          
          {/* Center Hub */}
          <circle cx="45" cy="30" r="1.6" fill="#000080" stroke="none" />
          
          {/* 24 Radial Spokes */}
          <g strokeWidth="0.55" strokeLinecap="round">
            {Array.from({ length: 24 }).map((_, i) => (
              <line
                key={i}
                x1="45"
                y1="30"
                x2="45"
                y2="22.2"
                transform={`rotate(${i * 15} 45 30)`}
              />
            ))}
          </g>
        </g>
      </svg>
    </span>
  );
};
