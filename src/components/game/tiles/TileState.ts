import { TileState } from '../../../types/tile';

export const getTileState = (
  revealed: boolean,
  isBomb: boolean,
  gameOver: boolean
): TileState => {
  if (!revealed && !gameOver) return 'hidden';
  if (revealed && isBomb) return 'bomb';
  if (gameOver && isBomb) return 'disabled-bomb';
  if (revealed) return 'revealed';
  return 'hidden';
};