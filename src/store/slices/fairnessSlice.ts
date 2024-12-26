import { StateCreator } from 'zustand';
import { GameStore } from '../../types/store';
import { generateGameSeeds } from '../../fairness/seeds';
import { generateGameHash } from '../../fairness/hash';
import { FairnessProof } from '../../fairness/types';

export const createFairnessSlice: StateCreator<GameStore> = (set, get) => ({
  currentHash: null,
  fairnessProof: null,

  initializeFairness: () => {
    const seeds = generateGameSeeds();
    const gameHash = generateGameHash(seeds);
    
    set({
      currentHash: gameHash,
      fairnessProof: {
        ...seeds,
        hash: gameHash.hash,
        bombPositions: []
      }
    });

    return gameHash.hash;
  },

  revealFairness: () => {
    const { fairnessProof, tiles } = get();
    if (!fairnessProof) return null;

    const bombPositions = tiles
      .filter(tile => tile.isBomb)
      .map(tile => tile.id);

    const proof: FairnessProof = {
      ...fairnessProof,
      bombPositions
    };

    set({ currentHash: { ...get().currentHash!, revealed: true } });
    return proof;
  }
});