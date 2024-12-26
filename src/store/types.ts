import { DifficultyLevel } from '../constants/difficulty';
import { Tile } from '../utils/tiles';
import { MultiplierState } from '../utils/multiplier';

export interface GameState {
  isPlaying: boolean;
  gameOver: boolean;
  stake: number;
  points: number;
  multiplier: number;
  multiplierState: MultiplierState | null;
  hamletCount: DifficultyLevel;
  tiles: Tile[];
  serverSeed: string | null;
  gameHash: string | null;
}