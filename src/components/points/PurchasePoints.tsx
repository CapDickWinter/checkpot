import React, { useState, useEffect } from 'react';
import { usePointsStore } from '../../store/points/store';
import { POINTS_CONSTANTS } from '../../constants/points';
import { Button } from '../ui/Button';
import { getLastPurchase } from '../../utils/purchases';

export const PurchasePoints: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const buyPoints = usePointsStore(state => state.buyPoints);

  useEffect(() => {
    const updateCountdown = () => {
      const lastPurchase = getLastPurchase();
      if (!lastPurchase) {
        setTimeLeft(null);
        return;
      }

      const now = Date.now();
      const nextPurchaseTime = lastPurchase.timestamp + POINTS_CONSTANTS.PURCHASE_COOLDOWN;
      const remaining = nextPurchaseTime - now;

      if (remaining <= 0) {
        setTimeLeft(null);
        return;
      }

      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handlePurchase = () => {
    const result = buyPoints(POINTS_CONSTANTS.PURCHASE_AMOUNT);
    if (!result.success && result.error) {
      setError(result.error);
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <div className="space-y-2">
      <Button
        onClick={handlePurchase}
        disabled={!!timeLeft}
        className="w-full p-3 sm:p-4 bg-[#B2EDE3] hover:bg-[#8FD9CC] text-black font-mono 
                 text-sm sm:text-base transition-all duration-200
                 disabled:opacity-80 disabled:cursor-not-allowed"
      >
        {timeLeft ? (
          <span>NEXT PURCHASE IN {timeLeft}</span>
        ) : (
          <span>BUY {POINTS_CONSTANTS.PURCHASE_AMOUNT.toLocaleString()} POINTS</span>
        )}
      </Button>

      {error && (
        <div className="text-red-500 text-sm text-center font-mono">
          {error}
        </div>
      )}
    </div>
  );
};