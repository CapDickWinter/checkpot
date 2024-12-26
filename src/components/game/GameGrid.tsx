import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { Tile } from './tiles/Tile';

export const GameGrid: React.FC = () => {
  const { tiles, revealTile, gameOver } = useGameStore();

  return (
    <div className="relative w-full max-w-[460px] mx-auto aspect-square">
      <div className="absolute inset-0 p-[1px] bg-[#424242]">
        <div className="grid grid-cols-5 gap-[1px] bg-[#424242] h-full">
          {tiles.map((tile) => (
            <Tile
              key={tile.id}
              {...tile}
              onClick={() => revealTile(tile.id)}
              disabled={gameOver || tile.revealed}
              gameOver={gameOver}
            />
          ))}
        </div>
      </div>
    </div>
  );
};