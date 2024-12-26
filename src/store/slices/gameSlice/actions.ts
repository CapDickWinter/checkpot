import { StateCreator } from 'zustand';
import { GameStore } from '../../../types/store';
import { DifficultyLevel } from '../../../constants/difficulty';
import { createTilesWithBombs } from './tileUtils';
import { generateBombPositions } from '../../../utils/hash';
import { createInitialState } from './initialState';
import { handleGameWinnings, handleStakeDeduction } from './pointsHandling';

export const createGameActions = (
  set: StateCreator<GameStore>['setState'],
  get: () => GameStore
) => ({
  startGame: (stake: number, bombCount: DifficultyLevel) => {
    if (!handleStakeDeduction(stake)) return;
    
    const session = get().initializeSession(stake, bombCount);
    const bombPositions = generateBombPositions(session.hashResult, Number(bombCount));
    const tiles = createTilesWithBombs(bombPositions);

    set({
      ...createInitialState(),
      stake,
      bombCount,
      isPlaying: true,
      tiles,
      hashResult: session.hashResult,
      currentSession: session,
    });
  },

  collectPoints: () => {
    const state = get();
    
    // Add points to balance (includes stake)
    handleGameWinnings(state);

    // Start new game with same settings
    const { stake, bombCount } = state;
    
    // Only start new game if we can deduct the stake
    if (!handleStakeDeduction(stake)) {
      set(createInitialState());
      return;
    }

    const session = get().initializeSession(stake, bombCount);
    const bombPositions = generateBombPositions(session.hashResult, Number(bombCount));
    const tiles = createTilesWithBombs(bombPositions);

    set({
      ...createInitialState(),
      stake,
      bombCount,
      isPlaying: true,
      tiles,
      hashResult: session.hashResult,
      currentSession: session,
    });
  },

  startNewGame: (stake: number, bombCount: DifficultyLevel) => {
    if (!handleStakeDeduction(stake)) return;

    const session = get().initializeSession(stake, bombCount);
    const bombPositions = generateBombPositions(session.hashResult, Number(bombCount));
    const tiles = createTilesWithBombs(bombPositions);

    set({
      ...createInitialState(),
      stake,
      bombCount,
      isPlaying: true,
      tiles,
      hashResult: session.hashResult,
      currentSession: session,
    });
  },

  resetGame: () => {
    set(createInitialState());
  }
});