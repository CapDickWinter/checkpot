import { StateCreator } from 'zustand';
import { GameStore } from '../types';
import { calculateNewMultiplier } from '../../../utils/multiplier/calculateMultiplier';

export const createTileActions = (
  set: StateCreator<GameStore>['setState'],
  get: () => GameStore
) => ({
  revealTile: (id: number) => {
    const state = get();
    if (state.gameOver || state.tiles[id].revealed || !state.multiplierState) return;

    const newTiles = [...state.tiles];
    const tile = newTiles[id];

    if (tile.isHamlet) {
      // Reveal all tiles when a Hamlet is hit
      const revealedTiles = newTiles.map(t => ({
        ...t,
        revealed: true // Reveal every tile
      }));

      set({ 
        tiles: revealedTiles,
        gameOver: true,
        points: 0 
      });
      return;
    }

    // Normal tile reveal logic
    tile.revealed = true;
    const revealedCount = newTiles.filter(t => t.revealed && !t.isHamlet).length;
    const newMultiplier = calculateNewMultiplier(state.multiplierState, revealedCount);
    const points = Math.floor(state.stake * newMultiplier);

    set({ 
      tiles: newTiles, 
      multiplier: newMultiplier, 
      points 
    });
  }
});