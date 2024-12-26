import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { usePointsStore } from '../../store/points/store';
import { Button } from '../ui/Button';
import { validateStake } from '../../utils/validation';
import { POINTS_CONSTANTS } from '../../constants/points';

export const ActionButtons: React.FC = () => {
  const { stake, hamletCount, startGame } = useGameStore();
  const { balance, buyPoints } = usePointsStore();
  const [purchaseError, setPurchaseError] = useState<string | null>(null);

  const handleBuyPoints = () => {
    const result = buyPoints(POINTS_CONSTANTS.PURCHASE_AMOUNT);
    if (!result.success && result.error) {
      setPurchaseError(result.error);
      // Clear error after 3 seconds
      setTimeout(() => setPurchaseError(null), 3000);
    }
  };

  const handleCreateGame = () => {
    if (!validateStake(stake, balance)) return;
    startGame(stake, hamletCount);
  };

  return (
    <div className="space-y-4 w-full max-w-[460px] mx-auto px-2 sm:px-0">
      <div className="space-y-2">
        <Button
          onClick={handleBuyPoints}
          className="w-full p-3 sm:p-4 font-mono text-sm sm:text-base bg-[#B2EDE3] hover:bg-[#8FD9CC]
                   text-black transition-all duration-200"
        >
          BUY {POINTS_CONSTANTS.PURCHASE_AMOUNT.toLocaleString()} POINTS
        </Button>

        {purchaseError && (
          <p className="text-red-500 text-sm text-center font-mono">
            {purchaseError}
          </p>
        )}
      </div>

      <Button
        onClick={handleCreateGame}
        disabled={!validateStake(stake, balance)}
        className="w-full p-3 sm:p-4 font-mono text-sm sm:text-base bg-white hover:bg-gray-100
                 text-black transition-all duration-200
                 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        START GAME
      </Button>
    </div>
  );
};