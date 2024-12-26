import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameHistory, GameHistoryEntry } from '../../types/history';

interface HistoryStore extends GameHistory {
  addEntry: (entry: GameHistoryEntry) => void;
  clearHistory: () => void;
}

const initialState: GameHistory = {
  entries: [],
  totalGames: 0,
  totalWins: 0,
  totalLosses: 0,
  netProfit: 0,
};

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set) => ({
      ...initialState,

      addEntry: (entry) => set((state) => {
        const newEntries = [entry, ...state.entries];
        const totalWins = newEntries.filter(e => e.isWin).length;
        const totalLosses = newEntries.length - totalWins;
        const netProfit = newEntries.reduce((sum, e) => sum + e.result, 0);

        return {
          entries: newEntries,
          totalGames: newEntries.length,
          totalWins,
          totalLosses,
          netProfit,
        };
      }),

      clearHistory: () => set(initialState),
    }),
    {
      name: 'game-history',
      version: 1,
    }
  )
);