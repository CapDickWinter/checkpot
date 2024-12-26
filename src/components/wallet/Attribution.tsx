import React from 'react';

export const Attribution: React.FC = () => {
  return (
    <div className="text-gray-500 text-sm font-mono">
      INSPIRED BY{' '}
      <a 
        href="https://x.com/jackbutcher" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-white hover:underline"
      >
        @JACKBUTCHER
      </a>
    </div>
  );
};