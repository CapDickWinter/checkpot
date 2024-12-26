import { PointsPurchaseLog } from './types';
import { generateSessionId } from '../../utils/session';

export const createTransaction = (
  amount: number,
  previousBalance: number,
  newBalance: number,
  type: PointsPurchaseLog['type']
): PointsPurchaseLog => ({
  sessionId: generateSessionId(),
  amount,
  previousBalance,
  newBalance,
  timestamp: new Date().toISOString(),
  type
});