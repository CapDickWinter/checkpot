import React from 'react';

interface TileIconProps {
  type: 'check' | 'skull';
  color: string;
}

export const TileIcon: React.FC<TileIconProps> = ({ type, color }) => {
  if (type === 'check') {
    return (
      <svg viewBox="0 0 56 56" className="absolute inset-0 w-full h-full p-4">
        <path
          d="M23 28L26 31L33 24"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-colors duration-200"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 56 56" className="absolute inset-0 w-full h-full p-4">
      <path
        d="M28 20C28 18.8954 28.8954 18 30 18H32C33.1046 18 34 18.8954 34 20V22C34 23.1046 33.1046 24 32 24H30C28.8954 24 28 23.1046 28 22V20Z"
        fill={color}
      />
      <circle cx="28" cy="28" r="8" fill={color} />
    </svg>
  );
};