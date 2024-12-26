import React from 'react';
import { Modal } from '../ui/Modal';
import { HistoryStats } from './HistoryStats';
import { HistoryTable } from './HistoryTable';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="GAME HISTORY"
    >
      <div className="space-y-8">
        <HistoryStats />
        <HistoryTable />
      </div>
    </Modal>
  );
};