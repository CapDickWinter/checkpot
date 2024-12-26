import React from 'react';
import { useWalletStore } from '../../store/walletStore';

interface WelcomeHeaderProps {
  onHistoryClick: () => void;
}

export const WelcomeHeader: React.FC<WelcomeHeaderProps> = () => {
  const { address, disconnect } = useWalletStore();
  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  return (
    <div className="flex items-center justify-between w-full">
      <h1 className="text-2xl sm:text-3xl font-mono">THE CHECKPOT GAME</h1>
      <div className="flex items-center gap-4">
        <span className="font-mono text-gray-400">{shortAddress}</span>
        <button
          onClick={disconnect}
          className="px-4 py-2 bg-white hover:bg-gray-100 text-black transition-all duration-200 font-mono uppercase text-sm"
        >
          Disconnect
        </button>
      </div>
    </div>
  );
};