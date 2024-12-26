import React from 'react';
import { Button } from '../ui/Button';
import { Wallet } from 'lucide-react';
import { useWalletStore } from '../../store/walletStore';
import { WilliamCheckspeare } from '../wallet/WilliamCheckspeare';
import { Quote } from '../wallet/Quote';
import { Attribution } from '../wallet/Attribution';

export const LoginPage: React.FC = () => {
  const { connect, isConnecting, error } = useWalletStore();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-12 text-center">
        <h1 className="text-3xl font-mono">THE CHECKPOT GAME</h1>
        <WilliamCheckspeare />
        <Quote />
        
        <Button
          onClick={connect}
          disabled={isConnecting}
          className="w-full p-4 bg-[#B2EDE3] hover:bg-[#8FD9CC] text-black font-mono
                   flex items-center justify-center gap-2 transition-all duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Wallet className="w-5 h-5" />
          {isConnecting ? 'CONNECTING...' : 'CONNECT WALLET'}
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