import { create } from 'zustand';
import { connectWallet, setupWalletListeners, removeWalletListeners } from '../services/wallet/connect';

interface WalletState {
  address: string | null;
  isConnecting: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  address: null,
  isConnecting: false,
  error: null,

  connect: async () => {
    set({ isConnecting: true, error: null });

    try {
      const address = await connectWallet();
      
      setupWalletListeners(
        (newAddress) => set({ address: newAddress }),
        () => window.location.reload()
      );

      set({ address, isConnecting: false });
    } catch (error) {
      console.error('Wallet connection error:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to connect wallet',
        isConnecting: false 
      });
    }
  },

  disconnect: () => {
    removeWalletListeners();
    set({ address: null, error: null });
  }
}));