import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { FairnessInfo } from './FairnessInfo';

export const InfoButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsModalOpen(true)}
        className="transition-all duration-200 hover:bg-gray-800"
      >
        <Info className="w-4 h-4" />
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="GAME TRANSPARENCY"
      >
        <FairnessInfo />
      </Modal>
    </>
  );
};