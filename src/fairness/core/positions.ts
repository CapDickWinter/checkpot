import { TOTAL_TILES } from '../../constants/game';

export const generateHamletPositions = (
  hashResult: string, 
  hamletCount: number
): Set<number> => {
  const positions = new Set<number>();
  
  // Convert hash to number sequence in 8-byte chunks
  const numbers = Array.from({ length: Math.ceil(hashResult.length / 8) }, (_, i) => {
    const chunk = hashResult.slice(i * 8, (i + 1) * 8);
    return parseInt(chunk, 16);
  });

  let index = 0;
  while (positions.size < hamletCount && index < numbers.length) {
    const position = numbers[index] % TOTAL_TILES;
    positions.add(position);
    index++;
  }

  return positions;
};