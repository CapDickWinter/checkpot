import React from 'react';
import { StakePresetButton } from './StakePresetButton';
import { STAKE_PRESETS } from '../../constants/stake';
import { formatPoints } from '../../utils/format';

interface StakeInputProps {
  value: number;
  onChange: (value: number) => void;
  balance: number;
}

export const StakeInput: React.FC<StakeInputProps> = ({
  value,
  onChange,
  balance
}) => {
  const handleStakeChange = (newValue: number) => {
    const validValue = Math.min(Math.max(0, newValue), balance);
    onChange(validValue);
  };

  const handleMaxStake = () => {
    handleStakeChange(balance);
  };

  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <div className="text-gray-400 text-sm font-mono">INITIAL STAKE</div>
        <input
          type="number"
          value={value || ''}
          onChange={(e) => handleStakeChange(Number(e.target.value))}
          className="w-full bg-transparent border border-gray-800 rounded-lg p-3 
                   text-center font-mono text-xl focus:outline-none focus:border-gray-600"
          placeholder="0"
          min={0}
          max={balance || 0}
        />
      </div>

      <div className="grid grid-cols-4 gap-2">
        {STAKE_PRESETS.map((preset) => (
          <StakePresetButton
            key={preset}
            value={preset}
            onClick={() => handleStakeChange(preset)}
            disabled={preset > balance}
          />
        ))}
        <StakePresetButton
          value={balance}
          label="ALL-IN"
          onClick={handleMaxStake}
          variant="max"
          className="bg-gray-700 hover:bg-gray-600"
        />
      </div>
    </div>
  );
};