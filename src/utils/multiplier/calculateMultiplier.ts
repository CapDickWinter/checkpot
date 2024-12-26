import { BASE_MULTIPLIERS, TILE_MULTIPLIERS } from './constants';
import { getRiskLevel } from './getRiskLevel';
import { MultiplierState } from './types';

export const initializeMultiplier = (hamletCount: number): MultiplierState => {
  const riskLevel = getRiskLevel(hamletCount);
  const base = BASE_MULTIPLIERS[hamletCount];
  const tileIncrement = TILE_MULTIPLIERS[riskLevel];

  return {
    base,
    current: base,
    tileIncrement,
    riskLevel
  };
};

export const calculateNewMultiplier = (
  state: MultiplierState,
  revealedCount: number
): number => {
  const tileBonus = revealedCount * state.tileIncrement;
  return state.base + tileBonus;
};