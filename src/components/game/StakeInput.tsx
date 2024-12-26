import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { usePointsStore } from '../../store/points/store';

export const StakeInput: React.FC = () => {
  const { stake, setStake } = useGameStore();
  const balance = usePointsStore(state => state.balance);

  const presets = [100, 250, 500];

  const handleStakeChange = (value: number) => {
    const validValue = Math.min(Math.max(0, value), balance);
    setStake(validValue);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-gray-400 text-sm">INITIAL STAKE</div>
      </div>

      <div className="bg-[#424242] p-[1px]">
        <input
          type="number"
          value={stake || ''}
          onChange={(e) => handleStakeChange(Number(e.target.value))}
          className="w-full bg-[#1A1A1A] p-4 text-center focus:outline-none"
          placeholder="0"
        />
      </div>

      <div className="grid grid-cols-4 gap-[1px] bg-[#424242]">
        {presets.map((preset) => (
          <button
            key={preset}
            onClick={() => handleStakeChange(preset)}
            className="p-4 bg-[#1A1A1A] hover:bg-gray-800 transition-all duration-200"
          >
            {preset}
          </button>
        ))}
        <button
          onClick={() => handleStakeChange(balance)}
          className="p-4 bg-[#1A1A1A] hover:bg-gray-800 transition-all duration-200"
        >
          ALL-IN
        </button>
      </div>
    </div>
  );
};