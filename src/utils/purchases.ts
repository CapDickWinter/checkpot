import { POINTS_CONSTANTS, POINTS_ERRORS } from '../constants/points';

interface PurchaseHistory {
  amount: number;
  timestamp: number;
}

export const getLastPurchase = (): PurchaseHistory | null => {
  const stored = localStorage.getItem('last_points_purchase');
  return stored ? JSON.parse(stored) : null;
};

export const saveLastPurchase = (amount: number) => {
  const purchase: PurchaseHistory = {
    amount,
    timestamp: Date.now(),
  };
  localStorage.setItem('last_points_purchase', JSON.stringify(purchase));
};

export const canPurchasePoints = (amount: number): { allowed: boolean; error?: string } => {
  // Check amount limit
  if (amount > POINTS_CONSTANTS.MAX_PURCHASE) {
    return { allowed: false, error: POINTS_ERRORS.PURCHASE_LIMIT };
  }

  // Check cooldown
  const lastPurchase = getLastPurchase();
  if (lastPurchase) {
    const timeSinceLastPurchase = Date.now() - lastPurchase.timestamp;
    if (timeSinceLastPurchase < POINTS_CONSTANTS.PURCHASE_COOLDOWN) {
      const waitTimeHours = Math.ceil(
        (POINTS_CONSTANTS.PURCHASE_COOLDOWN - timeSinceLastPurchase) / (1000 * 60 * 60)
      );
      return { 
        allowed: false, 
        error: `Please wait ${waitTimeHours} hours before purchasing more points`
      };
    }
  }

  return { allowed: true };
};