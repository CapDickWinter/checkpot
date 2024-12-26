import React from 'react';
import { usePointsStore } from '../../store/points/store';
import { formatPoints } from '../../utils/format';

export const BalanceDisplay: React.FC = () => {
  const balance = usePointsStore(state => state.balance);

  return (
    <div className="text-center space-y-1 sm:space-y-2">
      <h2 className="text-gray-500 uppercase tracking-wider text-xs sm:text-sm font-mono">
        YOUR TOTAL BALANCE
      </h2>
      <p className="text-2xl sm:text-4xl font-mono">
        {formatPoints(balance)} <span className="text-gray-500">PTS</span>
      </p>
    </div>
  );
};