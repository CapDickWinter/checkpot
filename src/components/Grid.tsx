import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Bomb, Check } from 'lucide-react';

export const Grid: React.FC = () => {
  const { tiles, revealTile, gameOver } = useGameStore();

  return (
    <div className="grid grid-cols-5 gap-2 w-[400px] h-[400px]">
      {tiles.map((tile) => (
        <button
          key={tile.id}
          onClick={() => revealTile(tile.id)}
          disabled={gameOver || tile.revealed}
          className={`
            w-full h-full rounded-lg transition-all duration-200
            ${tile.revealed 
              ? tile.isBomb 
                ? 'bg-red-500' 
                : 'bg-green-500'
              : 'bg-gray-700 hover:bg-gray-600'
            }
            ${gameOver && tile.isBomb ? 'animate-pulse' : ''}
            disabled:cursor-not-allowed
          `}
        >
          {tile.revealed && (
            <div className="flex items-center justify-center h-full">
              {tile.isBomb ? (
                <Bomb className="w-8 h-8 text-white" />
              ) : (
                <Check className="w-8 h-8 text-white" />
              )}
            </div>
          )}
        </button>
      ))}
    </div>
  );
};