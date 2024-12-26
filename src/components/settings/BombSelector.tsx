import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { DIFFICULTY_LEVELS, DifficultyLevel } from '../../constants/difficulty';
import hamletIcon from '../../assets/svgs/bomb-revealed.svg';

export const HamletSelector: React.FC = () => {
  const { hamletCount, setHamletCount } = useGameStore();
  const { color, label } = DIFFICULTY_LEVELS[hamletCount];

  return (
    <div className="space-y-4 w-[460px] mx-auto">
      <div className="text-center">
        <h2 className="text-gray-500 uppercase tracking-wider text-sm font-mono">HAMLETS</h2>
      </div>
      
      <div className="grid grid-cols-5 gap-[1px] bg-[#424242]">
        {(Object.keys(DIFFICULTY_LEVELS) as unknown as DifficultyLevel[]).map((count) => (
          <button
            key={count}
            onClick={() => setHamletCount(count)}
            className={`
              aspect-square p-4 transition-all duration-200
              ${count === hamletCount 
                ? 'bg-gray-700' 
                : 'bg-[#1A1A1A] hover:bg-gray-800'}
            `}
          >
            <img 
              src={hamletIcon} 
              alt="Hamlet"
              className="w-full h-full transition-opacity duration-200"
              style={{ 
                opacity: count <= hamletCount ? 1 : 0.3,
                filter: count <= hamletCount ? 'none' : 'grayscale(100%)'
              }}
            />
          </button>
        ))}
      </div>

      <div className="text-center font-mono">
        <span style={{ color }}>{hamletCount} HAMLET{hamletCount > 1 ? 'S' : ''}</span>
        <span style={{ color }}> - {label}</span>
      </div>
    </div>
  );
};