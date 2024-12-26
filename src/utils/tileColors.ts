const REVEALED_COLORS = [
  '#BCE1C5', // Green
  '#B8C0E4', // Purple
  '#22BEFC', // Blue
  '#C4F7A6', // Light Green
] as const;

export const getTileColor = (revealed: boolean, isBomb: boolean): string => {
  if (isBomb) {
    return revealed ? '#000000' : '#424242';
  }
  return revealed ? REVEALED_COLORS[Math.floor(Math.random() * REVEALED_COLORS.length)] : '#424242';
};