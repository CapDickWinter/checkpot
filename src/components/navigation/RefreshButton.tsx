import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';
import { useGameStore } from '../../store/gameStore';

export const RefreshButton: React.FC = () => {
  const resetGame = useGameStore(state => state.resetGame);

  return (
    <Button 
      variant="ghost" 
      size="sm"
      onClick={resetGame}
      className="transition-all duration-200 hover:bg-gray-800"
    >
      <RefreshCw className="w-4 h-4" />
    </Button>
  );
};