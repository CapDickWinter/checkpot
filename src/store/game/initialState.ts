import { GameState } from './types';
import { createInitialTiles } from '../../utils/tiles';

export const initialState: GameState = {
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