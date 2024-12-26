export const DIFFICULTY_LEVELS = {
  1: { label: 'VERY EASY', color: '#FFFFFF' },
  2: { label: 'EASY', color: '#4DFB7E' },
  3: { label: 'MEDIUM', color: '#FBCA4D' },
  4: { label: 'HARD', color: '#FB8C4D' },
  5: { label: 'VERY HARD', color: '#FB4D4D' }
} as const;

export type DifficultyLevel = keyof typeof DIFFICULTY_LEVELS;