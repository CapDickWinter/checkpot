import { STAKE_LIMITS } from '../constants/stake';

export const validateStake = (stake: number, balance: number): boolean => {
  if (isNaN(stake) || stake < STAKE_LIMITS.MIN) return false;
  if (stake > balance) return false;
  return true;
};

export const validateMultiplier = (multiplier: number): boolean => {
  if (multiplier < 1) return false;
  if (multiplier > STAKE_LIMITS.MAX_MULTIPLIER) return false;
  return true;
};