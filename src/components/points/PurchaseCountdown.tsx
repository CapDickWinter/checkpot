import React, { useState, useEffect } from 'react';
import { getLastPurchase } from '../../utils/purchases';
import { POINTS_CONSTANTS } from '../../constants/points';

export const PurchaseCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<string | null>(null);

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

    // Update immediately and then every second
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) return null;

  return (
    <div className="text-gray-400 text-sm text-center font-mono">
      Next purchase available in: {timeLeft}
    </div>
  );
};