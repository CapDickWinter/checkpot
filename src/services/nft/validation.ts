import { alchemy } from '../../config/alchemy';
import { NFT_CONTRACT_ADDRESS } from '../../constants/wallet';

export const validateContract = async (): Promise<boolean> => {
  try {
    return await alchemy.core.isContractAddress(NFT_CONTRACT_ADDRESS);
  } catch (error) {
    console.error('Contract validation failed:', error);
    return false;
  }
};

export const checkTokenOwnership = async (address: string): Promise<boolean> => {
  try {
    // Get all token IDs owned by the address for this contract
    const { owners } = await alchemy.nft.getOwnersForContract(NFT_CONTRACT_ADDRESS);
    
    // Check if the address is in the owners list (case-insensitive)
    const normalizedAddress = address.toLowerCase();
    const isOwner = owners.some(owner => owner.toLowerCase() === normalizedAddress);
    
    console.log('Token ownership check:', {
      address: normalizedAddress,
      isOwner,
      totalOwners: owners.length
    });
    
    return isOwner;
  } catch (error) {
    console.error('Token ownership check failed:', error);
    throw error;
  }
};