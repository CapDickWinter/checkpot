import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { formatPoints, formatMultiplier } from '../../utils/format';
import { Button } from '../ui/Button';

export const GameControls: React.FC = () => {
  const { 
    points, 
    stake, 
    multiplier, 
    gameOver,
    collectPoints,
    playAgain 
  } = useGameStore();

  return (
    <div className="space-y-4 w-full max-w-[460px] mx-auto px-2 sm:px-0">
      <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
        <div>
          <div className="text-xs sm:text-sm text-gray-400 font-mono">NEXT</div>
          <div className="text-sm sm:text-base font-mono">{formatPoints(points)}</div>
        </div>
        <div>
          <div className="text-xs sm:text-sm text-gray-400 font-mono">STAKE</div>
          <div className="text-sm sm:text-base font-mono">{formatPoints(stake)}</div>
        </div>
        <div>
          <div className="text-xs sm:text-sm text-gray-400 font-mono">MULT</div>
          <div className="text-sm sm:text-base font-mono">{formatMultiplier(multiplier)}</div>
        </div>
      </div>

      <div className="space-y-[1px]">
        <Button
          onClick={collectPoints}
          disabled={points <= 0}
          className="w-full p-3 sm:p-4 bg-[#B2EDE3] hover:bg-[#8FD9CC] text-black font-mono text-sm sm:text-base
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          COLLECT {formatPoints(points)} PTS
        </Button>

        {gameOver && (
          <Button
            onClick={playAgain}
            className="w-full p-3 sm:p-4 bg-white hover:bg-gray-100 text-black font-mono text-sm sm:text-base"
          >
            PLAY AGAIN
          </Button>
        )}
      </div>
    </div>
  );
};