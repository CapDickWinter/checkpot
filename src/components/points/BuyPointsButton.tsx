import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { usePointsStore } from '../../store/points/store';
import { POINTS_CONSTANTS } from '../../constants/points';
import { PurchaseCountdown } from './PurchaseCountdown';

export const BuyPointsButton: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const buyPoints = usePointsStore(state => state.buyPoints);

  const handleBuyPoints = () => {
    const result = buyPoints(POINTS_CONSTANTS.PURCHASE_AMOUNT);
    if (!result.success && result.error) {
      setError(result.error);
      // Clear error after 3 seconds
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <div className="space-y-2">
      <Button
        variant="primary"
        className="w-full font-mono"
        onClick={handleBuyPoints}
      >
        BUY POINTS
      </Button>
      {error && (
        <p className="text-red-500 text-sm text-center font-mono">{error}</p>
      )}
      <PurchaseCountdown />
    </div>
  );
};