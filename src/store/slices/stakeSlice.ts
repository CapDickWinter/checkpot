import { StateCreator } from 'zustand';
import { GameState } from '../types';

export interface StakeSlice {
  stake: number;
  setStake: (stake: number) => void;
}

export const createStakeSlice: StateCreator<GameState, [], [], StakeSlice> = (set) => ({
  stake: 0,
  setStake: (stake) => set({ stake }),
});