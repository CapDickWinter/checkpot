import React from 'react';
import { useHistoryStore } from '../../store/history/store';
import { formatPoints, formatMultiplier } from '../../utils/format';
import { calculateStats } from '../../utils/stats';

export const HistoryStats: React.FC = () => {
  const { entries } = useHistoryStore();
  const stats = calculateStats(entries);

  return (
    <div className="space-y-6">
      {/* Primary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center font-mono">
        <div>
          <div className="text-xs sm:text-sm text-gray-400">TOTAL GAMES</div>
          <div className="text-base sm:text-xl">{stats.totalGames}</div>
        </div>
        <div>
          <div className="text-xs sm:text-sm text-gray-400">WIN RATE</div>
          <div className="text-base sm:text-xl">{stats.winRate}%</div>
        </div>
        <div>
          <div className="text-xs sm:text-sm text-gray-400">NET PROFIT</div>
          <div className={`text-base sm:text-xl ${stats.netProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {formatPoints(stats.netProfit)}
          </div>
        </div>
        <div>
          <div className="text-xs sm:text-sm text-gray-400">CHECKPOTS</div>
          <div className="text-base sm:text-xl text-[#00FF94]">{stats.checkpots}</div>
        </div>
      </div>

      {/* Advanced Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 text-center font-mono">
        <div>
          <div className="text-xs sm:text-sm text-gray-400">AVG STAKE</div>
          <div className="text-base">{formatPoints(stats.avgStake)}</div>
        </div>
        <div>
          <div className="text-xs sm:text-sm text-gray-400">AVG MULTIPLIER</div>
          <div className="text-base">{formatMultiplier(stats.avgMultiplier)}</div>
        </div>
        <div>
          <div className="text-xs sm:text-sm text-gray-400">BEST MULTIPLIER</div>
          <div className="text-base">{formatMultiplier(stats.bestMultiplier)}</div>
        </div>
        <div>
          <div className="text-xs sm:text-sm text-gray-400">BIGGEST WIN</div>
          <div className="text-base text-green-500">{formatPoints(stats.biggestWin)}</div>
        </div>
        <div>
          <div className="text-xs sm:text-sm text-gray-400">BIGGEST LOSS</div>
          <div className="text-base text-red-500">{formatPoints(stats.biggestLoss)}</div>
        </div>
        <div>
          <div className="text-xs sm:text-sm text-gray-400">PROFIT PER GAME</div>
          <div className={`text-base ${stats.avgProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {formatPoints(stats.avgProfit)}
          </div>
        </div>
      </div>

      {/* Risk Analysis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-center font-mono">
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-xs sm:text-sm text-gray-400 mb-2">HAMLET DISTRIBUTION</div>
          <div className="grid grid-cols-5 gap-2">
            {stats.hamletDistribution.map((count, index) => (
              <div key={index + 1} className="text-sm">
                <div className="text-gray-400">{index + 1}H</div>
                <div>{count}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-xs sm:text-sm text-gray-400 mb-2">WIN STREAK</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-gray-400">CURRENT</div>
              <div className="text-xl">{stats.currentStreak}</div>
            </div>
            <div>
              <div className="text-gray-400">BEST</div>
              <div className="text-xl">{stats.bestStreak}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};