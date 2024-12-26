export const BASE_MULTIPLIERS = {
  1: 1.0, // Low risk
  2: 1.3,
  3: 1.6,
  4: 2.0,
  5: 2.5  // High risk
} as const;

export const TILE_MULTIPLIERS = {
  LOW_RISK: 0.05,    // 1-2 bombs
  MEDIUM_RISK: 0.10, // 3-4 bombs
  HIGH_RISK: 0.15    // 5 bombs
} as const;