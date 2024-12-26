import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { HistoryStats } from '../components/history/HistoryStats';
import { HistoryTable } from '../components/history/HistoryTable';
import { Footer } from '../components/ui/Footer';

interface HistoryPageProps {
  onBack: () => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="hover:bg-gray-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="font-mono">BACK TO GAME</span>
          </Button>
          <h1 className="text-xl sm:text-2xl font-mono">MY GAMES</h1>
          <div className="w-[88px]" /> {/* Spacer for alignment */}
        </div>

        <HistoryStats />
        <HistoryTable />
        <Footer />
      </div>
    </div>
  );
};