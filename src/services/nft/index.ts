import { validateContract, checkTokenOwnership } from './validation';
import { NFT_CONTRACT_ADDRESS } from '../../constants/wallet';

export const validateNFTOwnership = async (address: string): Promise<boolean> => {
  try {
    console.log('=== NFT Validation Start ===');
    console.log('Wallet address:', address);
    console.log('Contract address:', NFT_CONTRACT_ADDRESS);

    // First verify the contract is valid
    const isValidContract = await validateContract();
    console.log('Is valid contract:', isValidContract);

    if (!isValidContract) {
      throw new Error('Invalid NFT contract address');
    }

    // Check if the address owns any tokens
    const isOwner = await checkTokenOwnership(address);
    console.log('=== NFT Validation End ===');
    console.log('Is token owner:', isOwner);

    return isOwner;
  } catch (error) {
    console.error('=== NFT Validation Error ===');
    console.error('Error details:', error);
    throw error;
  }
};