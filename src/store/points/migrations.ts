import { PointsState } from './types';
import { POINTS_CONSTANTS } from '../../constants/points';

export const migrations = {
  0: (state: PointsState) => ({
    ...state,
    version: 1,
    balance: state.balance ?? POINTS_CONSTANTS.INITIAL_BALANCE,
  }),
  1: (state: PointsState) => ({
    ...state,
    version: 2,
    balance: state.balance ?? POINTS_CONSTANTS.INITIAL_BALANCE,
  }),
};

export const getLatestVersion = () => 
  Math.max(...Object.keys(migrations).map(Number));