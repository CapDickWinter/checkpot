import { DifficultyLevel } from '../constants/difficulty';
import { GameSession } from './game';
import { GameHash, FairnessProof } from '../fairness/types';

export interface GameState {
  points: number;
  stake: number;
  multiplier: number;
  isPlaying: boolean;
  gameOver: boolean;
  tiles: Array<{
    id: number;
    revealed: boolean;
    isBomb: boolean;
  }>;
  hashResult: string;
  bombCount: DifficultyLevel;
  currentSession: GameSession | null;
  currentHash: GameHash | null;
  fairnessProof: FairnessProof | null;
}

export interface GameActions {
  startGame: (stake: number, bombCount: DifficultyLevel) => void;
  resetGame: () => void;
  revealTile: (id: number) => void;
  collectPoints: () => void;
  setStake: (stake: number) => void;
  setBombCount: (count: DifficultyLevel) => void;
}

export interface SessionActions {
  initializeSession: (stake: number, bombCount: DifficultyLevel) => GameSession;
  verifySession: (session: GameSession) => boolean;
}

export interface FairnessActions {
  initializeFairness: () => string;
  revealFairness: () => FairnessProof | null;
}

export type GameStore = GameState & GameActions & SessionActions & FairnessActions;