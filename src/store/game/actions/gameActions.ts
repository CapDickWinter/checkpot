import { StateCreator } from 'zustand';
import { GameStore } from '../types';
import { usePointsStore } from '../../points/store';
import { generateGameSeeds } from '../../../fairness/seeds';
import { generateGameHash } from '../../../fairness/hash';
import { generateHamletPositions } from '../../../utils/hash';
import { initializeMultiplier } from '../../../utils/multiplier/calculateMultiplier';
import { createInitialTiles } from '../../../utils/tiles';
import { initialState } from '../initialState';

export const createGameActions = (
  set: StateCreator<GameStore>['setState']
) => ({
  startGame: (stake: number, hamletCount: number) => {
    const pointsStore = usePointsStore.getState();
    if (!pointsStore.deductPoints(stake)) return;

    const seeds = generateGameSeeds();
    const gameHash = generateGameHash(seeds);
    const hamletPositions = generateHamletPositions(gameHash.hash, hamletCount);
    
    const multiplierState = initializeMultiplier(hamletCount);
    
    const tiles = createInitialTiles().map(tile => ({
      ...tile,
      isHamlet: hamletPositions.has(tile.id),
    }));

    set({
      isPlaying: true,
      gameOver: false,
      stake,
      points: stake,
      multiplier: multiplierState.base,
      multiplierState,
      hamletCount,
      tiles,
      serverSeed: seeds.serverSeed,
      gameHash: gameHash.hash,
    });
  },

  collectPoints: () => {
    const pointsStore = usePointsStore.getState();
    const { points } = pointsStore.getState();
    if (points <= 0) return;

    pointsStore.addPoints(points);
    set(initialState);
  },

  resetGame: () => set(initialState),
  setStake: (stake: number) => set({ stake }),
  setHamletCount: (count: number) => set({ hamletCount: count }),
});