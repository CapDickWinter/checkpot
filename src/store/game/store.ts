import { create } from 'zustand';
import { GameState, GameActions } from '../types';
import { createGameActions } from './actions';
import { createInitialTiles } from '../../utils/tiles';

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
  ...createGameActions(set, get),
}));