import { useCallback } from 'react';
import { useWalletStore } from '../store/walletStore';
import { validateNFTOwnership } from '../services/nft';
import { usePointsStore } from '../store/points/store';
import { INITIAL_BALANCE } from '../constants/wallet';

export const useWalletAccess = () => {
  const { setValidated, setError } = useWalletStore();
  const { addPoints } = usePointsStore();

  const validateAccess = useCallback(async (address: string) => {
    try {
      const hasNFT = await validateNFTOwnership(address);
      console.log('NFT validation result:', hasNFT);
      
      if (hasNFT) {
        setValidated(true);
        addPoints(INITIAL_BALANCE);
        return true;
      } else {
        setError('No Game Token found in wallet');
        return false;
      }
    } catch (error) {
      console.error('Access validation failed:', error);
      setError('Failed to validate token ownership');
      return false;
    }
  }, [setValidated, setError, addPoints]);

  return { validateAccess };
};