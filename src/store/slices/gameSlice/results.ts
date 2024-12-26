import { GameState } from '../../../types/store';
import { Tile } from '../../../types/game';
import { usePointsStore } from '../../points/store';
import { useHistoryStore } from '../../history/store';
import { generateSessionId } from '../../../utils/session';

export const handleGameResult = (
  state: GameState,
  tiles: Tile[],
  isLoss: boolean
) => {
  const { stake, points, bombCount, multiplier } = state;
  const pointsStore = usePointsStore.getState();
  const historyStore = useHistoryStore.getState();

  if (!isLoss) {
    pointsStore.addPoints(points);
  }

  historyStore.addEntry({
    id: generateSessionId(),
    timestamp: new Date().toISOString(),
    stake,
    result: isLoss ? -stake : points - stake,
    multiplier: isLoss ? 0 : multiplier,
    bombCount,
    hash: state.currentHash?.hash || '',
    isWin: !isLoss,
  });
};