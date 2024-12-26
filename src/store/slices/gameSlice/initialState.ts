import { GameState } from '../../../types/store';
import { DEFAULT_BOMB_COUNT } from '../../../constants/game';
import { createInitialTiles } from './tileUtils';

export const createInitialState = (): GameState => ({
  points: 0,
  stake: 0,
  multiplier: 1,
  isPlaying: false,
  gameOver: false,
  tiles: createInitialTiles(),
  hashResult: '',
  bombCount: DEFAULT_BOMB_COUNT,
  currentSession: null,
});