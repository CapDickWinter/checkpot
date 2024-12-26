import { StateCreator } from 'zustand';
import { GameStore } from '../../types/store';
import { DifficultyLevel } from '../../constants/difficulty';
import { DEFAULT_HAMLET_COUNT, CHECKPOT_TILES, CHECKPOT_REWARD } from '../../constants/game';
import { createInitialTiles } from './gameSlice/tiles';
import { handleGameResult } from './gameSlice/results';
import { generateHamletPositions } from '../../utils/hash';
import { calculateMultiplier } from '../../utils/multiplier';
import { usePointsStore } from '../points/store';

const initialState = {
  isPlaying: false,
  gameOver: false,
  stake: 0,
  points: 0,
  multiplier: 1,
  hamletCount: DEFAULT_HAMLET_COUNT as DifficultyLevel,
  tiles: createInitialTiles(),
  currentHash: null,
  fairnessProof: null,
  currentSession: null,
  showCheckpotModal: false,
};

export const createGameSlice: StateCreator<GameStore> = (set, get) => ({
  ...initialState,

  setStake: (stake: number) => set({ stake }),
  setHamletCount: (count: DifficultyLevel) => set({ hamletCount: count }),
  setShowCheckpotModal: (show: boolean) => set({ showCheckpotModal: show }),

  startGame: (stake: number, hamletCount: DifficultyLevel) => {
    const pointsStore = usePointsStore.getState();
    if (!pointsStore.deductPoints(stake)) return;

    const hash = get().initializeFairness();
    const hamletPositions = generateHamletPositions(hash, Number(hamletCount));
    const tiles = createInitialTiles().map(tile => ({
      ...tile,
      isHamlet: hamletPositions.has(tile.id),
      revealed: false,
    }));

    set({
      isPlaying: true,
      gameOver: false,
      stake,
      points: 0,
      multiplier: 1,
      hamletCount,
      tiles,
      showCheckpotModal: false,
    });
  },

  revealTile: (id: number) => {
    const state = get();
    if (state.gameOver || state.tiles[id].revealed) return;

    const newTiles = [...state.tiles];
    const tile = newTiles[id];
    tile.revealed = true;

    if (tile.isHamlet) {
      const allRevealed = newTiles.map(t => ({
        ...t,
        revealed: t.isHamlet || t.revealed
      }));
      handleGameResult(state, allRevealed, true);
      set({ tiles: allRevealed, gameOver: true, points: 0 });
      return;
    }

    const revealedCount = newTiles.filter(t => t.revealed && !t.isHamlet).length;
    const multiplier = calculateMultiplier(revealedCount);
    const points = Math.floor(state.stake * multiplier);

    // Check for Checkpot
    if (revealedCount === CHECKPOT_TILES) {
      const pointsStore = usePointsStore.getState();
      pointsStore.addPoints(CHECKPOT_REWARD);
      set({ 
        tiles: newTiles, 
        multiplier, 
        points,
        showCheckpotModal: true,
      });
      return;
    }

    set({ tiles: newTiles, multiplier, points });
  },

  collectPoints: () => {
    const state = get();
    if (state.points <= 0) return;

    const allRevealed = state.tiles.map(t => ({
      ...t,
      revealed: t.isHamlet || t.revealed
    }));
    
    const revealedCount = allRevealed.filter(t => t.revealed && !t.isHamlet).length;
    const isCheckpot = revealedCount === CHECKPOT_TILES;
    
    handleGameResult(state, allRevealed, false, isCheckpot);
    set(initialState);
  },

  resetGame: () => set(initialState),
});