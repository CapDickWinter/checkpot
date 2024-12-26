export const POINTS_CONSTANTS = {
  PURCHASE_AMOUNT: 10_000,
  INITIAL_BALANCE: 10_000,
  MAX_BALANCE: 1_000_000,
  MAX_PURCHASE: 50_000,
  PURCHASE_COOLDOWN: 2 * 60 * 60 * 1000, // 2 hours in milliseconds
} as const;

export const POINTS_ERRORS = {
  INSUFFICIENT_BALANCE: 'Insufficient balance',
  INVALID_AMOUNT: 'Invalid amount',
  MAX_BALANCE_REACHED: 'Maximum balance limit reached',
  PURCHASE_LIMIT: 'Maximum purchase limit is 50,000 points',
  COOLDOWN_ACTIVE: 'Please wait before purchasing more points',
} as const;