import React from 'react';
import { Bomb } from 'lucide-react';
import { DIFFICULTY_LEVELS, DifficultyLevel } from '../../constants/difficulty';
import { DEFAULT_BOMB_COUNT } from '../../constants/game';

interface BombSelectorProps {
  bombCount: DifficultyLevel;
  onChange: (count: DifficultyLevel) => void;
}

export const BombSelector: React.FC<BombSelectorProps> = ({
  bombCount = DEFAULT_BOMB_COUNT,
  onChange
}) => {
  const { label, color } = DIFFICULTY_LEVELS[bombCount];

  const isSelected = (count: DifficultyLevel) => count <= bombCount;

  const getRingColor = (count: DifficultyLevel) => {
    if (count === bombCount) return DIFFICULTY_LEVELS[count].color;
    return 'transparent';
  };

  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <div className="text-gray-400 text-sm font-mono">BOMBS</div>
      </div>

      <div className="flex justify-center gap-2">
        {(Object.keys(DIFFICULTY_LEVELS) as unknown as DifficultyLevel[]).map((count) => (
          <button
            key={count}
            onClick={() => onChange(count)}
            style={{ '--ring-color': getRingColor(count) } as React.CSSProperties}
            className={`
              w-16 aspect-square rounded-lg transition-all duration-200
              ${isSelected(count) 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'bg-gray-800 hover:bg-gray-700'
              }
              flex items-center justify-center
              ${count === bombCount ? 'ring-2' : ''}
              ring-[var(--ring-color)]
            `}
          >
            <Bomb 
              className={`w-8 h-8 ${
                isSelected(count) ? 'text-white' : 'text-gray-600'
              }`}
            />
          </button>
        ))}
      </div>

      <div className="text-center font-mono">
        <span style={{ color }}>{bombCount} BOMB{bombCount > 1 ? 'S' : ''}</span>
        {' - '}
        <span className="text-gray-400">{label}</span>
      </div>
    </div>
  );
};