import React from 'react';
import { usePointsStore } from '../../store/pointsStore';

export const BalanceDisplay: React.FC = () => {
  const balance = usePointsStore(state => state.balance);

  return (
    <div className="text-center space-y-2">
      <div className="text-gray-400 text-sm font-mono">YOUR TOTAL BALANCE</div>
      <div className="text-3xl font-mono">{balance?.toLocaleString() || '0'} PTS</div>
    </div>
  );
};