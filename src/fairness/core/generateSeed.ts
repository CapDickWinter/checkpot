import { generateRandomHex } from '../../utils/random';

export const generateServerSeed = (): string => generateRandomHex(32);