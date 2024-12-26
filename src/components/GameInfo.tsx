import React from 'react';
import { useGameStore } from '../store/gameStore';

export const GameInfo: React.FC = () => {
  const { points, multiplier, hashResult, gameOver, resetGame } = useGameStore();

  return (
    <div className="text-white space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Points</h2>
          <p className="text-2xl font-mono">{points.toFixed(0)}</p>
        </div>
        <div>
          <h2 className="text-xl font-bold">Multiplier</h2>
          <p className="text-2xl font-mono">x{multiplier.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="text-sm opacity-50 break-all">
        <p>Game Hash:</p>
        <p className="font-mono">{hashResult}</p>
      </div>

      {gameOver && (
        <button
          onClick={resetGame}
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
        >
          Play Again
        </button>
      )}
    </div>
  );
};