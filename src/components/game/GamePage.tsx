import React from 'react';
import { GameHeader } from './GameHeader';
import { GameGrid } from './GameGrid';
import { GameControls } from './GameControls';
import { Footer } from '../ui/Footer';

interface GamePageProps {
  onHistoryClick: () => void;
}

export const GamePage: React.FC<GamePageProps> = ({ onHistoryClick }) => {
  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6">
      <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
        <GameHeader onHistoryClick={onHistoryClick} />
        <GameGrid />
        <GameControls />
        <Footer />
      </div>
    </div>
  );
};