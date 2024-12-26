import { TOTAL_TILES } from '../constants/game';

export const calculateMultiplier = (revealedCount: number): number => {
  if (revealedCount === 0) return 1;

  // Exponential growth formula for multiplier
  const progress = revealedCount / TOTAL_TILES;
  const baseMultiplier = 1;
  const maxMultiplier = 10;
  
  // Exponential curve that starts slow and accelerates
  const multiplier = baseMultiplier + (maxMultiplier - baseMultiplier) * Math.pow(progress, 2);
  
  // Round to 2 decimal places
  return Math.round(multiplier * 100) / 100;
};