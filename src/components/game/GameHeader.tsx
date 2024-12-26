import React, { useState } from 'react';
import { History, Info } from 'lucide-react';
import { BackButton } from '../navigation/BackButton';
import { Button } from '../ui/Button';
import { MobileMenu } from '../navigation/MobileMenu';
import { HistoryModal } from '../history/HistoryModal';
import { FairnessInfo } from './FairnessInfo';
import { Modal } from '../ui/Modal';
import { useGameStore } from '../../store/gameStore';
import { usePointsStore } from '../../store/points/store';
import { formatPoints } from '../../utils/format';

export const GameHeader: React.FC = () => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isTransparencyOpen, setIsTransparencyOpen] = useState(false);
  const points = useGameStore(state => state.points);
  const balance = usePointsStore(state => state.balance);

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
        <div className="flex items-center justify-between w-full">
          <MobileMenu onHistoryClick={() => setIsHistoryOpen(true)} />
          <div className="text-center flex-1">
            <h1 className="text-xl sm:text-2xl font-mono">THE CHECKPOT GAME</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsTransparencyOpen(true)}
            className="sm:hidden"
          >
            <Info className="w-4 h-4 fill-current" />
          </Button>
        </div>
        
        <div className="flex items-center justify-center gap-8 w-full">
          <div className="font-mono text-center">
            <div className="text-xs sm:text-sm text-gray-400">TOTAL BALANCE</div>
            <div className="text-lg sm:text-xl">{formatPoints(balance)}</div>
          </div>
          <div className="font-mono text-center">
            <div className="text-xs sm:text-sm text-gray-400">POINTS</div>
            <div className="text-lg sm:text-xl">{formatPoints(points)}</div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <BackButton />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsTransparencyOpen(true)}
            className="transition-all duration-200 hover:bg-gray-800"
          >
            <Info className="w-4 h-4 fill-current" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsHistoryOpen(true)}
            className="transition-all duration-200 hover:bg-gray-800"
          >
            <History className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />

      <Modal
        isOpen={isTransparencyOpen}
        onClose={() => setIsTransparencyOpen(false)}
        title="GAME TRANSPARENCY"
      >
        <FairnessInfo />
      </Modal>
    </>
  );
};