import React from 'react';
import { History } from 'lucide-react';
import { Button } from '../ui/Button';

interface HistoryButtonProps {
  onClick: () => void;
}

export const HistoryButton: React.FC<HistoryButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className="transition-all duration-200 hover:bg-gray-800"
      title="View Game History"
    >
      <History className="w-4 h-4" />
    </Button>
  );
};