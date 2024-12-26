export type TileState = 'hidden' | 'revealed' | 'bomb' | 'disabled-bomb';

export interface Tile {
  id: number;
  revealed: boolean;
  isBomb: boolean;
}