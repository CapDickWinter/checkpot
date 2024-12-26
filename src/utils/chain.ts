import { NETWORK_CONFIG } from '../constants/wallet';

export const validateChainId = async (): Promise<boolean> => {
  if (!window.ethereum) return false;

  try {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    return chainId === NETWORK_CONFIG.chainId;
  } catch (error) {
    console.error('Chain ID validation failed:', error);
    return false;
  }
};