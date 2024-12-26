export type RiskLevel = 'LOW_RISK' | 'MEDIUM_RISK' | 'HIGH_RISK';

export interface MultiplierState {
  base: number;
  current: number;
  tileIncrement: number;
  riskLevel: RiskLevel;
}