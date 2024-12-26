import React from 'react';

interface GameLayoutProps {
  children: React.ReactNode;
}

export const GameLayout: React.FC<GameLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col">
      <div className="flex-grow flex flex-col items-center justify-center max-w-2xl mx-auto w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-mono">WELCOME TO</h1>
          <h2 className="text-4xl font-mono">THE CHECKPOT GAME</h2>
        </div>

        <div className="relative w-48 h-48">
          <img
            src="https://i.imgur.com/XdtQNWl.png"
            alt="William Shakespeare with pixel sunglasses"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="space-y-2 text-center">
          <div className="font-mono">"TO BURN, OR NOT TO BURN"</div>
          <div className="font-mono text-gray-400">THAT'S THE QUESTION.</div>
        </div>

        {children}
      </div>

      <div className="text-center text-gray-500 text-sm font-mono mt-8">
        INSPIRED BY @JACKBUTCHER
      </div>
    </div>
  );
};