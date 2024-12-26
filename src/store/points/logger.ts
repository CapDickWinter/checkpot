import { PointsPurchaseLog } from './types';

const STORAGE_KEY = 'points-purchases';

export const logPointsPurchase = (log: PointsPurchaseLog) => {
  try {
    const purchases = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    purchases.push(log);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(purchases));
  } catch (error) {
    console.error('Failed to log points purchase:', error);
  }
};

export const getPurchaseHistory = (): PointsPurchaseLog[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};