import SHA256 from 'crypto-js/sha256';

export const generateHash = (input: string): string => {
  return SHA256(input).toString();
};

export const verifyHash = (input: string, hash: string): boolean => {
  const computed = generateHash(input);
  return computed === hash;
};