import { GameSeed } from './types';
import { generateRandomHex } from '../utils/random';

export const generateGameSeeds = (): GameSeed => ({
  serverSeed: generateRandomHex(32),
  clientSeed: '', // Not used in this implementation
  nonce: Date.now()
});