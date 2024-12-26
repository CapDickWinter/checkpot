import { StateCreator } from 'zustand';
import { GameStore } from '../../../types/store';
import { calculateMultiplier } from '../../../utils/multiplier';
import { calculateGamePoints } from './pointsHandling';

export const createTileActions = (
  set: StateCreator<GameStore>['setState'],
  get: () => GameStore
) => ({
  revealTile: (id: number) => {
    const state = get();
    if (state.gameOver || state.tiles[id].revealed) return;

    const newTiles = [...state.tiles];
    const tile = newTiles[id];
    tile.revealed = true;

    if (tile.isBomb) {
      // Game Over - Reveal all tiles
      newTiles.forEach(t => {
        t.revealed = true;
      });

      set({
        tiles: newTiles,
        gameOver: true,
        points: 0,
      });
      return;
    }

    const revealedCount = newTiles.filter(t => t.revealed && !t.isBomb).length;
    const newMultiplier = calculateMultiplier(revealedCount);
    const newPoints = calculateGamePoints(state.stake, newMultiplier);

    set({
      tiles: newTiles,
      multiplier: newMultiplier,
      points: newPoints,
    });
  }
});