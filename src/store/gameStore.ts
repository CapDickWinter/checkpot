import { create } from 'zustand';
import { DifficultyLevel } from '../constants/difficulty';
import { usePointsStore } from './points/store';
import { generateGameSeeds } from '../fairness/seeds';
import { generateGameHash } from '../fairness/hash';
import { generateHamletPositions } from '../utils/hash';
import { initializeMultiplier, calculateNewMultiplier } from '../utils/multiplier/calculateMultiplier';
import { createInitialTiles } from '../utils/tiles';
import { GameState } from './types';

interface GameActions {
  startGame: (stake: number, hamletCount: DifficultyLevel) => void;
  playAgain: () => void;
  revealTile: (id: number) => void;
  collectPoints: () => void;
  setStake: (stake: number) => void;
  setHamletCount: (count: DifficultyLevel) => void;
  resetGame: () => void;
}

const initialState: GameState = {
  isPlaying: false,
  gameOver: false,
  stake: 0,
  points: 0,
  multiplier: 1,
  multiplierState: null,
  hamletCount: 1,
  tiles: createInitialTiles(),
  serverSeed: null,
  gameHash: null,
};

export const useGameStore = create<GameState & GameActions>()((set, get) => ({
  ...initialState,

  startGame: (stake: number, hamletCount: DifficultyLevel) => {
    const pointsStore = usePointsStore.getState();
    if (!pointsStore.deductPoints(stake)) return;

    const seeds = generateGameSeeds();
    const gameHash = generateGameHash(seeds);
    const hamletPositions = generateHamletPositions(gameHash.hash, Number(hamletCount));
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

  playAgain: () => {
    const { stake, hamletCount } = get();
    get().startGame(stake, hamletCount);
  },

  revealTile: (id: number) => {
    const state = get();
    if (state.gameOver || state.tiles[id].revealed || !state.multiplierState) return;

    const newTiles = [...state.tiles];
    const tile = newTiles[id];
    tile.revealed = true;

    if (tile.isHamlet) {
      // Game Over - Reveal all Hamlets
      const allRevealed = newTiles.map(t => ({
        ...t,
        revealed: t.isHamlet || t.revealed
      }));
      
      set({ 
        tiles: allRevealed,
        gameOver: true,
        points: 0 
      });
      return;
    }

    // Calculate new points based on revealed tiles
    const revealedCount = newTiles.filter(t => t.revealed && !t.isHamlet).length;
    const newMultiplier = calculateNewMultiplier(state.multiplierState, revealedCount);
    const points = Math.floor(state.stake * newMultiplier);

    set({ 
      tiles: newTiles, 
      multiplier: newMultiplier,
      points
    });
  },

  collectPoints: () => {
    const state = get();
    const { points } = state;
    if (points <= 0) return;

    const pointsStore = usePointsStore.getState();
    pointsStore.addPoints(points);
    set(initialState);
  },

  setStake: (stake) => set({ stake }),
  setHamletCount: (count) => set({ hamletCount: count }),
  resetGame: () => set(initialState),
}));