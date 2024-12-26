import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { usePointsStore } from '../../store/points/store';
import { formatPoints } from '../../utils/format';
import { STAKE_PRESETS } from '../../constants/stake';

export const StakeInput: React.FC = () => {
  const { stake, setStake } = useGameStore();
  const balance = usePointsStore(state => state.balance);

  const handleStakeChange = (value: number) => {
    const validValue = Math.min(Math.max(0, value), balance);
    setStake(validValue);
  };

  return (
    <div className="space-y-3 sm:space-y-4 w-full max-w-[460px] mx-auto px-2 sm:px-0">
      <div className="text-center">
        <h2 className="text-gray-500 uppercase tracking-wider text-xs sm:text-sm font-mono">INITIAL STAKE</h2>
      </div>

      <div className="bg-[#424242] p-[1px]">
        <input
          type="number"
          value={stake || ''}
          onChange={(e) => handleStakeChange(Number(e.target.value))}
          className="w-full bg-[#1A1A1A] p-3 sm:p-4
                   text-center font-mono text-lg sm:text-xl focus:outline-none"
          placeholder="0"
        />
      </div>

      <div className="grid grid-cols-4 gap-[1px] bg-[#424242]">
        {STAKE_PRESETS.map((preset) => (
          <button
            key={preset}
            onClick={() => handleStakeChange(preset)}
            disabled={preset > balance}
            className="p-3 sm:p-4 font-mono text-sm sm:text-base bg-[#1A1A1A] hover:bg-gray-800
                     transition-all duration-200 disabled:opacity-50 
                     disabled:cursor-not-allowed"
          >
            {formatPoints(preset)}
          </button>
        ))}
        <button
          onClick={() => handleStakeChange(balance)}
          className="p-3 sm:p-4 font-mono text-sm sm:text-base bg-[#1A1A1A] hover:bg-gray-800
                   transition-all duration-200"
        >
          ALL-IN
        </button>
      </div>
    </div>
  );
};