import React from 'react';
import { ZOBLY_LOGO_DATA_URI } from '../../assets/zobly-logo-data-uri';

interface ZoblyLogoProps {
  className?: string;
  id?: string;
  color?: string;
}

export const ZoblyLogo: React.FC<ZoblyLogoProps> = ({
  className = 'h-8 w-auto',
  id = 'zobly-brand-logo-img',
}) => {
  return (
    <svg
      id={id}
      viewBox="0 0 681 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      role="img"
      aria-label="Zobly logo"
    >
      <image
        href={ZOBLY_LOGO_DATA_URI}
        width="681"
        height="256"
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  );
};


