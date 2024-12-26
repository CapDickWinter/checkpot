import { generateServerSeed } from './generateSeed';
import { generateHash } from './hash';
import { generateHamletPositions } from './positions';

export interface FairnessState {
  serverSeed: string;
  gameHash: string;
  hamletPositions: Set<number>;
}

export const createFairnessState = (hamletCount: number): FairnessState => {
  const serverSeed = generateServerSeed();
  const gameHash = generateHash(serverSeed);
  const hamletPositions = generateHamletPositions(gameHash, hamletCount);

  return {
    serverSeed,
    gameHash,
    hamletPositions
  };
};

export const verifyFairness = (serverSeed: string, gameHash: string): boolean => {
  const computedHash = generateHash(serverSeed);
  return computedHash === gameHash;
};