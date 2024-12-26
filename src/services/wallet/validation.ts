export function validateWalletAddress(address: string): boolean {
  // Basic Ethereum address validation
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function formatWalletAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}