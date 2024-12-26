import React from 'react';

export const Footer: React.FC = () => {
  return (
    <div className="text-center text-gray-500 text-xs sm:text-sm font-mono mt-6 sm:mt-8">
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