import React from 'react';
import { Wallet } from 'lucide-react';
import { useWalletStore } from '../../store/walletStore';
import { Button } from '../ui/Button';
import { WilliamCheckspeare } from './WilliamCheckspeare';
import { Quote } from './Quote';
import { Attribution } from './Attribution';

export const ConnectWallet: React.FC = () => {
  const { setAddress, error } = useWalletStore();

  const handleConnect = () => {
    setAddress('0x1234...5678');
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-12 text-center">
        <h1 className="text-3xl font-mono">THE CHECKPOT GAME</h1>
        <WilliamCheckspeare />
        <Quote />
        
        <Button
          onClick={handleConnect}
          className="w-full p-4 bg-[#B2EDE3] hover:bg-[#8FD9CC] text-black font-mono
                   flex items-center justify-center gap-2 transition-all duration-200"
        >
          <Wallet className="w-5 h-5" />
          CONNECT WALLET
        </Button>

        {error && (
          <p className="text-red-500 font-mono text-sm">
            {error}
          </p>
        )}

        <Attribution />
      </div>
    </div>
  );
};