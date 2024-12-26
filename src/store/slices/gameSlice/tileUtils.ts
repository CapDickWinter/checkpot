import { TOTAL_TILES } from '../../../constants/game';
import { Tile } from '../../../types/game';

export const createInitialTiles = (): Tile[] => {
  return Array.from({ length: TOTAL_TILES }, (_, id) => ({
    id,
    revealed: false,
    isBomb: false,
  }));
};

export const createTilesWithBombs = (bombPositions: Set<number>): Tile[] => {
  return createInitialTiles().map(tile => ({
    ...tile,
    isBomb: bombPositions.has(tile.id),
  }));
};