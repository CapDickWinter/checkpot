import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { DIFFICULTY_LEVELS, DifficultyLevel } from '../../constants/difficulty';
import { CloudShape } from '../game/tiles/CloudShape';
import { CheckMark } from '../game/tiles/CheckMark';
import { HamletIcon } from '../game/tiles/HamletIcon';
import { TILE_DEFAULTS } from '../../constants/colors';

export const HamletSelector: React.FC = () => {
  const { hamletCount, setHamletCount } = useGameStore();
  const { color, label } = DIFFICULTY_LEVELS[hamletCount];

  return (
    <div className="space-y-3 sm:space-y-4 w-full max-w-[460px] mx-auto px-2 sm:px-0">
      <div className="text-center">
        <h2 className="text-gray-500 uppercase tracking-wider text-xs sm:text-sm font-mono">HAMLETS</h2>
      </div>
      
      <div className="grid grid-cols-5 gap-[1px] bg-[#424242]">
        {(Object.keys(DIFFICULTY_LEVELS) as unknown as DifficultyLevel[]).map((count) => (
          <button
            key={count}
            onClick={() => setHamletCount(count)}
            className={`
              relative aspect-square transition-all duration-200
              ${count === hamletCount 
                ? 'bg-gray-700' 
                : 'bg-[#1A1A1A] hover:bg-gray-800'}
            `}
          >
            {count <= hamletCount ? (
              <HamletIcon />
            ) : (
              <>
                <CloudShape color={TILE_DEFAULTS.CLOUD.DEFAULT} />
                <CheckMark color="black" />
              </>
            )}
          </button>
        ))}
      </div>

      <div className="text-center font-mono text-sm sm:text-base">
        <span style={{ color }}>{hamletCount} HAMLET{hamletCount > 1 ? 'S' : ''}</span>
        <span className="text-gray-400"> - {label}</span>
      </div>
    </div>
  );
};