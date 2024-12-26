import { StateCreator } from 'zustand';
import { PointsStore } from './types';
import { POINTS_CONSTANTS } from '../../constants/points';
import { logPointsPurchase } from './logger';
import { calculateNewBalance } from './balance';
import { createTransaction } from './transactions';

export const createPointsActions: StateCreator<PointsStore> = (set, get) => ({
  buyPoints: (amount: number) => {
    if (amount <= 0) return;
    
    const currentBalance = get().balance;
    const newBalance = calculateNewBalance(currentBalance, amount);
    
    if (newBalance === currentBalance) return;
    
    const transaction = createTransaction(amount, currentBalance, newBalance, 'purchase');
    logPointsPurchase(transaction);
    set({ balance: newBalance });
  },

  deductPoints: (amount: number) => {
    if (amount <= 0) return false;
    
    const currentBalance = get().balance;
    if (currentBalance < amount) {
      console.warn('Insufficient balance');
      return false;
    }
    
    const newBalance = calculateNewBalance(currentBalance, -amount);
    const transaction = createTransaction(-amount, currentBalance, newBalance, 'stake');
    logPointsPurchase(transaction);
    set({ balance: newBalance });
    return true;
  },

  addWinnings: (amount: number) => {
    if (amount <= 0) return;
    
    const currentBalance = get().balance;
    const newBalance = calculateNewBalance(currentBalance, amount);
    const transaction = createTransaction(amount, currentBalance, newBalance, 'winnings');
    logPointsPurchase(transaction);
    set({ balance: newBalance });
  }
});