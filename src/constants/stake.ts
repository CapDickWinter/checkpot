export const STAKE_PRESETS = [100, 250, 500] as const;

export const STAKE_LIMITS = {
  MIN: 0,
  MAX_MULTIPLIER: 10,
} as const;

export const STAKE_ERRORS = {
  INSUFFICIENT_BALANCE: 'Insufficient balance',
  INVALID_AMOUNT: 'Invalid stake amount',
} as const;