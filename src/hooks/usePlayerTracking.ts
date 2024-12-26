import { useEffect, useState } from 'react';
import { useWalletStore } from '../store/walletStore';
import { trackPlayerConnection } from '../services/players';

export function usePlayerTracking() {
  const { address } = useWalletStore();
  const [playerId, setPlayerId] = useState<string | null>(null);

  useEffect(() => {
    if (!address) return;

    trackPlayerConnection(address)
      .then(id => setPlayerId(id))
      .catch(console.error);
  }, [address]);

  return { playerId };
}