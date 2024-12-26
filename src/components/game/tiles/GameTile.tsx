import React from 'react';
import { Check, Bomb } from 'lucide-react';

interface GameTileProps {
  revealed: boolean;
  isHamlet: boolean;
  onClick: () => void;
  disabled: boolean;
  gameOver: boolean;
}

export const GameTile: React.FC<GameTileProps> = ({
  revealed,
  isHamlet,
  onClick,
  disabled,
  gameOver
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative aspect-square w-full transition-all duration-200 
        flex items-center justify-center
        ${revealed 
          ? isHamlet 
            ? 'bg-red-500' 
            : 'bg-[#00FF94]'
          : 'bg-[#1a1a1a] hover:bg-gray-800'
        }
        ${disabled && !revealed ? 'opacity-50' : ''}
        border border-[#424242]
        disabled:cursor-not-allowed
      `}
    >
      {(revealed || (gameOver && isHamlet)) && (
        <div className="flex items-center justify-center h-full">
          {isHamlet ? (
            <Bomb className="w-8 h-8 text-white" />
          ) : (
            <Check className="w-8 h-8 text-black" />
          )}
        </div>
      )}
    </button>
  );
};