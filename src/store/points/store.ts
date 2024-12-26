import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { POINTS_CONSTANTS, POINTS_ERRORS } from '../../constants/points';
import { canPurchasePoints, saveLastPurchase } from '../../utils/purchases';

interface PointsState {
  balance: number;
}

interface PointsActions {
  buyPoints: (amount: number) => { success: boolean; error?: string };
  deductPoints: (amount: number) => boolean;
  addPoints: (amount: number) => void;
}

const initialState: PointsState = {
  balance: POINTS_CONSTANTS.INITIAL_BALANCE,
};

export const usePointsStore = create<PointsState & PointsActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      buyPoints: (amount) => {
        if (amount <= 0) {
          return { success: false, error: POINTS_ERRORS.INVALID_AMOUNT };
        }

        const purchaseCheck = canPurchasePoints(amount);
        if (!purchaseCheck.allowed) {
          return { success: false, error: purchaseCheck.error };
        }

        const currentBalance = get().balance;
        const newBalance = Math.min(
          currentBalance + amount,
          POINTS_CONSTANTS.MAX_BALANCE
        );

        if (newBalance === currentBalance) {
          return { success: false, error: POINTS_ERRORS.MAX_BALANCE_REACHED };
        }

        set({ balance: newBalance });
        saveLastPurchase(amount);
        return { success: true };
      },

      deductPoints: (amount) => {
        if (amount <= 0) return false;
        const currentBalance = get().balance;
        if (currentBalance < amount) return false;
        
        set({ balance: currentBalance - amount });
        return true;
      },

      addPoints: (amount) => {
        if (amount <= 0) return;
        const newBalance = Math.min(
          get().balance + amount,
          POINTS_CONSTANTS.MAX_BALANCE
        );
        set({ balance: newBalance });
      },
    }),
    {
      name: 'points-storage',
      version: 1,
    }
  )
);