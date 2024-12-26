import { usePointsStore } from '../../points/store';
import { GameState } from '../../../types/store';

export const handleGameWinnings = (state: GameState): boolean => {
  const { points } = state;
  if (!points || points <= 0) return false;

  const pointsStore = usePointsStore.getState();
  pointsStore.addPoints(points);
  return true;
};

export const handleStakeDeduction = (stake: number): boolean => {
  if (!stake || stake <= 0) return false;
  const pointsStore = usePointsStore.getState();
  return pointsStore.deductPoints(stake);
};

export const calculateGamePoints = (stake: number, multiplier: number): number => {
  if (!stake || !multiplier || stake <= 0 || multiplier <= 0) return 0;
  return Math.floor(stake * multiplier);
};