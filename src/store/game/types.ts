import { DifficultyLevel } from '../../constants/difficulty';
import { MultiplierState } from '../../utils/multiplier';
import { Tile } from '../../utils/tiles';

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

export interface GameActions {
  startGame: (stake: number, hamletCount: DifficultyLevel) => void;
  revealTile: (id: number) => void;
  collectPoints: () => void;
  setStake: (stake: number) => void;
  setHamletCount: (count: DifficultyLevel) => void;
  resetGame: () => void;
}

export type GameStore = GameState & GameActions;