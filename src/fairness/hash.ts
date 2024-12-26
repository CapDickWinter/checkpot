import SHA256 from 'crypto-js/sha256';
import { GameSeed, GameHash } from './types';

export const generateGameHash = (seed: GameSeed): GameHash => {
  return {
    hash: SHA256(seed.serverSeed).toString(),
    revealed: false
  };
};

export const verifyHash = (serverSeed: string, expectedHash: string): boolean => {
  const computedHash = SHA256(serverSeed).toString();
  return computedHash === expectedHash;
};