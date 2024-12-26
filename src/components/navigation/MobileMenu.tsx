import React, { useState } from 'react';
import { Menu, History, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { useWalletStore } from '../../store/walletStore';

interface MobileMenuProps {
  onHistoryClick: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ onHistoryClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { address, disconnect } = useWalletStore();
  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="sm:hidden"
      >
        <Menu className="w-5 h-5" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black z-50">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="hover:bg-gray-800"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <span className="font-mono text-gray-400">{shortAddress}</span>
            </div>

            <div className="flex-1 p-4">
              <div className="space-y-[1px]">
                <button
                  onClick={() => {
                    onHistoryClick();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center px-4 py-5 bg-[#1A1A1A] hover:bg-gray-800 transition-colors"
                >
                  <History className="w-5 h-5 mr-3" />
                  <span className="font-mono">My Games</span>
                </button>

                <button
                  onClick={() => {
                    disconnect();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center px-4 py-5 bg-[#1A1A1A] hover:bg-gray-800 transition-colors"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  <span className="font-mono">Disconnect Wallet</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};