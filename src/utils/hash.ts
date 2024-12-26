import SHA256 from 'crypto-js/sha256';
import { TOTAL_TILES } from '../constants/game';

export const generateGameHash = (serverSeed: string): string => {
  return SHA256(serverSeed).toString();
};

export const verifyHash = (serverSeed: string, expectedHash: string): boolean => {
  const computedHash = SHA256(serverSeed).toString();
  return computedHash === expectedHash;
};

export const generateHamletPositions = (hashResult: string, hamletCount: number): Set<number> => {
  const hamletPositions = new Set<number>();
  
  // Convert hash to a number sequence
  const numbers = [];
  for (let i = 0; i < hashResult.length; i += 8) {
    const chunk = hashResult.slice(i, i + 8);
    numbers.push(parseInt(chunk, 16));
  }

  let index = 0;
  while (hamletPositions.size < hamletCount && index < numbers.length) {
    const position = numbers[index] % TOTAL_TILES;
    if (!hamletPositions.has(position)) {
      hamletPositions.add(position);
    }
    index++;
  }

  return hamletPositions;
};