export interface PointsState {
  balance: number;
  version: number;
}

export interface PointsActions {
  buyPoints: (amount: number) => void;
  deductPoints: (amount: number) => boolean;
  addWinnings: (stake: number, winnings: number) => void;
}

export type PointsStore = PointsState & PointsActions;

export interface PointsPurchaseLog {
  sessionId: string;
  amount: number;
  previousBalance: number;
  newBalance: number;
  timestamp: string;
  type: 'purchase' | 'stake' | 'winnings' | 'loss';
}