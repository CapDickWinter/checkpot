import React from 'react';
import { Button } from '../ui/Button';

interface StakeInputProps {
  value: number;
  onChange: (value: number) => void;
  balance: number;
  maxStake?: number;
}

export const StakeInput: React.FC<StakeInputProps> = ({
  value,
  onChange,
  balance,
  maxStake = 10000
}) => {
  const presets = [100, 250, 500];

  const handleStakeChange = (newValue: number) => {
    const validValue = Math.min(Math.max(0, newValue), maxStake);
    onChange(validValue);
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
        />
      </div>

      <div className="grid grid-cols-4 gap-2">
        {presets.map((preset) => (
          <Button
            key={preset}
            variant="secondary"
            onClick={() => handleStakeChange(preset)}
            className="font-mono"
          >
            {preset}
          </Button>
        ))}
        <Button
          variant="secondary"
          onClick={() => handleStakeChange(maxStake)}
          className="font-mono"
        >
          MAX
        </Button>
      </div>
    </div>
  );
};