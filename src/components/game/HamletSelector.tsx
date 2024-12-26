import React from 'react';
import { Skull } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';

export const HamletSelector: React.FC = () => {
  const { hamletCount, setHamletCount } = useGameStore();

  const getDifficulty = (count: number) => {
    switch(count) {
      case 1: return 'VERY EASY';
      case 2: return 'EASY';
      case 3: return 'MEDIUM';
      case 4: return 'HARD';
      case 5: return 'VERY HARD';
      default: return '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-gray-400 text-sm">HAMLETS</div>
      </div>

      <div className="grid grid-cols-5 gap-[1px] bg-[#424242]">
        {[1, 2, 3, 4, 5].map((count) => (
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
            <Skull 
              className={`w-full h-full ${count <= hamletCount ? 'text-white' : 'text-gray-600'}`}
            />
          </button>
        ))}
      </div>

      <div className="text-center">
        {hamletCount} HAMLET - {getDifficulty(hamletCount)}
      </div>
    </div>
  );
};