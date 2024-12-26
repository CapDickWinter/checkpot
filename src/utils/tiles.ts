import { TOTAL_TILES } from '../constants/game';

export interface Tile {
  id: number;
  revealed: boolean;
  isHamlet: boolean;
}

export const createInitialTiles = (): Tile[] => 
  Array.from({ length: TOTAL_TILES }, (_, id) => ({
    id,
    revealed: false,
    isHamlet: false,
  }));