import SHA256 from 'crypto-js/sha256';

export const generateHash = (serverSeed: string): string => {
  return SHA256(serverSeed).toString();
};

export const verifyHash = (serverSeed: string, expectedHash: string): boolean => {
  const computedHash = generateHash(serverSeed);
  return computedHash === expectedHash;
};