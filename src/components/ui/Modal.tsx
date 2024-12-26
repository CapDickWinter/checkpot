import React from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#000000] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-800 sticky top-0 bg-[#000000]">
          <h2 className="text-lg sm:text-xl font-mono">{title}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="p-4 sm:p-6">{children}</div>
      </div>
    </div>
  );
};