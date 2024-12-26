import { ethers } from 'ethers';

export async function connectWallet(): Promise<string> {
  if (!window.ethereum) {
    throw new Error('Please install MetaMask to connect your wallet');
  }

  const accounts = await window.ethereum.request({ 
    method: 'eth_requestAccounts' 
  });

  if (!accounts || accounts.length === 0) {
    throw new Error('No accounts found');
  }

  return accounts[0];
}

export function setupWalletListeners(
  onAccountChange: (address: string | null) => void,
  onChainChange: () => void
) {
  if (!window.ethereum) return;

  window.ethereum.on('accountsChanged', (accounts: string[]) => {
    onAccountChange(accounts.length > 0 ? accounts[0] : null);
  });

  window.ethereum.on('chainChanged', onChainChange);
}

export function removeWalletListeners() {
  if (!window.ethereum) return;
  window.ethereum.removeListener('accountsChanged', () => {});
  window.ethereum.removeListener('chainChanged', () => {});
}