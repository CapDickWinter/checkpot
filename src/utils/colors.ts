import { TILE_COLORS } from '../constants/colors';

export const getRandomTileColor = (): string => {
  const randomIndex = Math.floor(Math.random() * TILE_COLORS.length);
  return TILE_COLORS[randomIndex];
};