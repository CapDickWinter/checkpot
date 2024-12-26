export const TILE_COLORS = {
  background: {
    default: '#1A1A1A',    // Dark background for default state
    revealed: '#000000',   // Black for revealed tiles
    bomb: '#FB4D4D',       // Red for bombs
  },
  icon: {
    default: '#424242',    // Gray for unrevealed icons
    revealed: '#000000',   // Black for revealed icons
    bomb: '#FFFFFF',       // White for bomb icons
  }
} as const;