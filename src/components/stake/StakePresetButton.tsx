import React from 'react';
import { Button } from '../ui/Button';
import { formatPoints } from '../../utils/format';

interface StakePresetButtonProps {
  value: number;
  label?: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'preset' | 'max';
  className?: string;
}

export const StakePresetButton: React.FC<StakePresetButtonProps> = ({
  value,
  label,
  onClick,
  disabled,
  variant = 'preset',
  className = ''
}) => {
  return (
    <Button
      variant="secondary"
      onClick={onClick}
      disabled={disabled}
      className={`font-mono ${className}`}
    >
      {label || formatPoints(value)}
    </Button>
  );
};