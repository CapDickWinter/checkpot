import { TOTAL_TILES } from '../../../constants/game';
import { Tile } from '../../../types/game';

export const createInitialTiles = (): Tile[] => 
  Array.from({ length: TOTAL_TILES }, (_, id) => ({
    id,
    revealed: false, // Ensure tiles start unrevealed
    isBomb: false,
  }));