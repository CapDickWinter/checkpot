import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';
import { useGameStore } from '../../store/gameStore';

export const BackButton: React.FC = () => {
  const resetGame = useGameStore(state => state.resetGame);

  const handleBack = () => {
    resetGame();
  };

  return (
    <Button 
      variant="ghost" 
      size="sm"
      onClick={handleBack}
      className="transition-all duration-200 hover:bg-gray-800"
    >
      <ArrowLeft className="w-4 h-4" />
    </Button>
  );
};