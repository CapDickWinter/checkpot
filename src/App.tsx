import React from 'react';
import { useWalletStore } from './store/walletStore';
import { LoginPage } from './components/auth/LoginPage';
import { GamePage } from './components/game/GamePage';
import { WelcomePage } from './components/welcome/WelcomePage';
import { HistoryPage } from './pages/HistoryPage';
import { useGameStore } from './store/gameStore';

export default function App() {
  const { address } = useWalletStore();
  const { isPlaying } = useGameStore();
  const [showHistory, setShowHistory] = React.useState(false);

  // If no wallet is connected, show login page
  if (!address) {
    return <LoginPage />;
  }

  // Show appropriate page based on game state
  return (
    <>
      {showHistory ? (
        <HistoryPage onBack={() => setShowHistory(false)} />
      ) : isPlaying ? (
        <GamePage onHistoryClick={() => setShowHistory(true)} />
      ) : (
        <WelcomePage onHistoryClick={() => setShowHistory(true)} />
      )}
    </>
  );
}