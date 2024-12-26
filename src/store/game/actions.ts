import { StateCreator } from 'zustand';
import { GameState, GameActions } from '../types';
import { usePointsStore } from '../points/store';
import { generateGameSeeds } from '../../fairness/seeds';
import { generateGameHash } from '../../fairness/hash';
import { generateHamletPositions } from '../../utils/hash';
import { initializeMultiplier, calculateNewMultiplier } from '../../utils/multiplier/calculateMultiplier';
import { createInitialTiles } from '../../utils/tiles';
import { savePublicSession } from '../../services/sessions';
import { supabase } from '../../lib/supabase';

export const createGameActions: StateCreator<GameState & GameActions> = (set, get) => ({
  // ... other actions remain the same ...

  collectPoints: async () => {
    const state = get();
    const { points, stake, multiplier, hamletCount, gameHash } = state;
    if (points <= 0) return;

    try {
      // First save the session
      await savePublicSession({
        playerAddress: '', // Will be set in the service
        stake,
        result: points - stake,
        multiplier,
        hamletCount,
        gameHash: gameHash || '',
        isCheckpot: false
      });

      // Then add points to balance
      const pointsStore = usePointsStore.getState();
      pointsStore.addPoints(points);

      // Reset game state
      set({
        isPlaying: false,
        gameOver: false,
        stake: 0,
        points: 0,
        multiplier: 1,
        multiplierState: null,
        tiles: createInitialTiles(),
        serverSeed: null,
        gameHash: null,
      });
    } catch (error) {
      console.error('Failed to complete game:', error);
      // Still add points even if saving fails
      const pointsStore = usePointsStore.getState();
      pointsStore.addPoints(points);
    }
  },
});