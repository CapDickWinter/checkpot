import { StateCreator } from 'zustand';
import { GameStore } from '../../../types/store';
import { createGameActions } from './actions';
import { createTileActions } from './tileActions';
import { createInitialState } from './initialState';

export const createGameSlice: StateCreator<GameStore> = (set, get) => ({
  ...createInitialState(),
  ...createGameActions(set, get),
  ...createTileActions(set, get),
});