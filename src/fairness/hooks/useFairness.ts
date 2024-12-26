import { useState } from 'react';
import { generateServerSeed } from '../core/generateSeed';
import { generateHash } from '../core/hash';
import { generateHamletPositions } from '../core/positions';

export interface FairnessState {
  serverSeed: string;
  gameHash: string;
  hamletPositions: Set<number>;
}

export const useFairness = (hamletCount: number) => {
  const [state, setState] = useState<FairnessState | null>(null);

  const initialize = () => {
    const serverSeed = generateServerSeed();
    const gameHash = generateHash(serverSeed);
    const hamletPositions = generateHamletPositions(gameHash, hamletCount);

    const newState = { serverSeed, gameHash, hamletPositions };
    setState(newState);
    return newState;
  };

  const verify = (serverSeed: string, gameHash: string): boolean => {
    const computedHash = generateHash(serverSeed);
    return computedHash === gameHash;
  };

  return {
    state,
    initialize,
    verify
  };
};