export interface GameHistoryEntry {
  id: string;
  timestamp: string;
  stake: number;
  result: number;
  multiplier: number;
  hamletCount: number;
  hash: string;
  isWin: boolean;
  isCheckpot: boolean;
}