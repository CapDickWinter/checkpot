import { useMemo } from 'react';

const REVEALED_TILES = [
  '/src/assets/svgs/tile-revealed-blue.svg',
  '/src/assets/svgs/tile-revealed-green.svg',
  '/src/assets/svgs/tile-revealed-yellow.svg',
] as const;

export const getRandomRevealedTile = (): string => {
  const randomIndex = Math.floor(Math.random() * REVEALED_TILES.length);
  return REVEALED_TILES[randomIndex];
};