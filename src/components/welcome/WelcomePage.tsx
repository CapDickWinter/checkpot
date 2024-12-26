import React from 'react';
import { GameSettings } from '../settings/GameSettings';
import { WelcomeHeader } from './WelcomeHeader';
import { Footer } from '../ui/Footer';

interface WelcomePageProps {
  onHistoryClick: () => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onHistoryClick }) => {
  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6">
      <div className="max-w-2xl mx-auto space-y-8 sm:space-y-12">
        <WelcomeHeader onHistoryClick={onHistoryClick} />
        <GameSettings />
        <Footer />
      </div>
    </div>
  );
};