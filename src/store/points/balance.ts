import { POINTS_CONSTANTS } from '../../constants/points';

export const validateBalance = (balance: number | null | undefined): number => {
  if (balance == null || isNaN(balance)) {
    return POINTS_CONSTANTS.INITIAL_BALANCE;
  }
  return Math.max(0, Math.min(balance, POINTS_CONSTANTS.MAX_BALANCE));
};

export const calculateNewBalance = (currentBalance: number, amount: number): number => {
  const newBalance = currentBalance + amount;
  return validateBalance(newBalance);
};