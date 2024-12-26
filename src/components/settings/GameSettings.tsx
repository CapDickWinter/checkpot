import React from 'react';
import { HamletSelector } from './HamletSelector';
import { StakeInput } from './StakeInput';
import { ActionButtons } from './ActionButtons';
import { BalanceDisplay } from './BalanceDisplay';

export const GameSettings: React.FC = () => {
  return (
    <div className="w-full space-y-8 sm:space-y-12">
      <BalanceDisplay />
      <HamletSelector />
      <StakeInput />
      <ActionButtons />
    </div>
  );
};