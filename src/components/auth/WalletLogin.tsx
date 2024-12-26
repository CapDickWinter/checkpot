import React from 'react';
import { useConnect } from 'wagmi';
import { Button } from '../ui/Button';
import { Wallet } from 'lucide-react';

export const WalletLogin: React.FC = () => {
  const { connect } = useConnect();

  return (
    <Button 
      onClick={() => connect()}
      className="w-full flex items-center justify-center gap-2 p-4 
                bg-[#B2EDE3] hover:bg-[#8FD9CC] text-black font-mono"
    >
      <Wallet className="w-5 h-5" />
      CONNECT WALLET
    </Button>
  );
};