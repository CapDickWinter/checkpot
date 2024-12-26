import React from 'react';
import { PartyPopper } from 'lucide-react';
import { Modal } from './Modal';
import { formatPoints } from '../../utils/format';
import { CHECKPOT_REWARD } from '../../constants/game';

interface CheckpotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckpotModal: React.FC<CheckpotModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="CHECKPOT!"
    >
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <PartyPopper className="w-16 h-16 text-[#00FF94]" />
        </div>
        
        <div className="space-y-2">
          <p className="text-2xl font-mono">CONGRATULATIONS!</p>
          <p className="text-gray-400">You've achieved a perfect game!</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-gray-400 text-sm mb-2">REWARD</p>
          <p className="text-3xl font-mono text-[#00FF94]">
            {formatPoints(CHECKPOT_REWARD)} PTS
          </p>
        </div>
      </div>
    </Modal>
  );
};