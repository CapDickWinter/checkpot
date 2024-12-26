import React from 'react';

interface CloudBackgroundProps {
  color: string;
}

export const CloudBackground: React.FC<CloudBackgroundProps> = ({ color }) => (
  <svg viewBox="0 0 56 56" className="absolute inset-0 w-full h-full">
    <path
      d="M28 14C21.3726 14 16 19.3726 16 26C16 32.6274 21.3726 38 28 38C34.6274 38 40 32.6274 40 26C40 19.3726 34.6274 14 28 14ZM28 36C22.4772 36 18 31.5228 18 26C18 20.4772 22.4772 16 28 16C33.5228 16 38 20.4772 38 26C38 31.5228 33.5228 36 28 36Z"
      fill={color}
      className="transition-colors duration-200"
    />
  </svg>
);