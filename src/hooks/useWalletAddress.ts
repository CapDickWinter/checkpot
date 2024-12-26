import { useWalletStore } from '../store/walletStore';
import { formatWalletAddress } from '../services/wallet/validation';

export function useWalletAddress() {
  const address = useWalletStore(state => state.address);
  const formattedAddress = address ? formatWalletAddress(address) : '';
  
  return {
    address,
    formattedAddress
  };
}