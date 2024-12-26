import React from 'react';
import { useHistoryStore } from '../../store/history/store';
import { formatPoints, formatMultiplier } from '../../utils/format';

export const HistoryTable: React.FC = () => {
  const { entries } = useHistoryStore();

  if (entries.length === 0) {
    return (
      <div className="text-center text-gray-400 py-6 sm:py-8 text-sm sm:text-base">
        No games played yet
      </div>
    );
  }

  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <div className="min-w-[600px] px-4 sm:px-0">
        <table className="w-full text-left font-mono">
          <thead className="text-gray-400 text-xs sm:text-sm">
            <tr>
              <th className="p-2 sm:p-3">TIME</th>
              <th className="p-2 sm:p-3">STAKE</th>
              <th className="p-2 sm:p-3">MULT</th>
              <th className="p-2 sm:p-3">RESULT</th>
              <th className="p-2 sm:p-3">HAMLETS</th>
              <th className="p-2 sm:p-3"></th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {entries.map((entry) => (
              <tr key={entry.id} className="border-t border-gray-800">
                <td className="p-2 sm:p-3">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </td>
                <td className="p-2 sm:p-3">{formatPoints(entry.stake)}</td>
                <td className="p-2 sm:p-3">{formatMultiplier(entry.multiplier)}</td>
                <td className={`p-2 sm:p-3 ${entry.isWin ? 'text-green-500' : 'text-red-500'}`}>
                  {entry.isWin ? '+' : ''}{formatPoints(entry.result)}
                </td>
                <td className="p-2 sm:p-3">{entry.hamletCount}</td>
                <td className="p-2 sm:p-3">
                  {entry.isCheckpot && (
                    <span className="text-[#00FF94]">CHECKPOT!</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};