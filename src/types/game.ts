export interface GameSession {
  playerAddress: string;
  stake: number;
  result: number;
  multiplier: number;
  hamletCount: number;
  gameHash: string;
  isCheckpot: boolean;
}

export interface PublicSession extends GameSession {
  id: string;
  created_at: string;
}