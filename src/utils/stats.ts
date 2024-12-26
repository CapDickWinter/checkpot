import { GameHistoryEntry } from '../types/history';

interface GameStats {
  totalGames: number;
  winRate: number;
  netProfit: number;
  checkpots: number;
  avgStake: number;
  avgMultiplier: number;
  bestMultiplier: number;
  biggestWin: number;
  biggestLoss: number;
  avgProfit: number;
  hamletDistribution: number[];
  currentStreak: number;
  bestStreak: number;
}

export const calculateStats = (entries: GameHistoryEntry[]): GameStats => {
  if (entries.length === 0) {
    return {
      totalGames: 0,
      winRate: 0,
      netProfit: 0,
      checkpots: 0,
      avgStake: 0,
      avgMultiplier: 0,
      bestMultiplier: 0,
      biggestWin: 0,
      biggestLoss: 0,
      avgProfit: 0,
      hamletDistribution: [0, 0, 0, 0, 0],
      currentStreak: 0,
      bestStreak: 0,
    };
  }

  const wins = entries.filter(e => e.isWin);
  const totalGames = entries.length;
  const netProfit = entries.reduce((sum, e) => sum + e.result, 0);
  const checkpots = entries.filter(e => e.isCheckpot).length;

  // Calculate streaks
  let currentStreak = 0;
  let bestStreak = 0;
  let tempStreak = 0;

  entries.forEach(entry => {
    if (entry.isWin) {
      tempStreak++;
      bestStreak = Math.max(bestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  });

  // Current streak is based on most recent games
  for (let i = 0; i < entries.length; i++) {
    if (entries[i].isWin) {
      currentStreak++;
    } else {
      break;
    }
  }

  // Hamlet distribution
  const hamletDistribution = Array(5).fill(0);
  entries.forEach(entry => {
    hamletDistribution[entry.hamletCount - 1]++;
  });

  return {
    totalGames,
    winRate: Number(((wins.length / totalGames) * 100).toFixed(1)),
    netProfit,
    checkpots,
    avgStake: Math.round(entries.reduce((sum, e) => sum + e.stake, 0) / totalGames),
    avgMultiplier: Number((entries.reduce((sum, e) => sum + e.multiplier, 0) / totalGames).toFixed(2)),
    bestMultiplier: Math.max(...entries.map(e => e.multiplier)),
    biggestWin: Math.max(...entries.map(e => e.result)),
    biggestLoss: Math.min(...entries.map(e => e.result)),
    avgProfit: Math.round(netProfit / totalGames),
    hamletDistribution,
    currentStreak,
    bestStreak,
  };
};