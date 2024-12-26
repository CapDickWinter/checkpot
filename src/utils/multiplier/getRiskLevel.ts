import { RiskLevel } from './types';

export const getRiskLevel = (hamletCount: number): RiskLevel => {
  if (hamletCount <= 2) return 'LOW_RISK';
  if (hamletCount <= 4) return 'MEDIUM_RISK';
  return 'HIGH_RISK';
};