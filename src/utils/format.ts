export const formatPoints = (points: number | null | undefined): string => {
  if (points == null || isNaN(points)) return '0';
  return Math.floor(points).toLocaleString();
};

export const formatMultiplier = (multiplier: number): string => {
  if (!multiplier || isNaN(multiplier)) return 'x1.00';
  return `x${multiplier.toFixed(2)}`;
};