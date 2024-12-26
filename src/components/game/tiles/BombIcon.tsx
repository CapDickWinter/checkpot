import React from 'react';
import { TileState } from '../../../types/tile';

interface BombIconProps {
  state: TileState;
}

export const BombIcon: React.FC<BombIconProps> = ({ state }) => {
  const color = state === 'bomb' ? '#FFFFFF' : '#666666';
  
  return (
    <svg viewBox="0 0 56 56" className="absolute inset-0 w-full h-full p-4">
      <circle cx="28" cy="28" r="8" fill={color} />
      <path
        d="M28 22V34M22 28H34"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};