import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { formatPoints, formatMultiplier } from '../../utils/format';
import { verifyHash } from '../../fairness/core/hash';
import { Button } from '../ui/Button';

export const FairnessInfo: React.FC = () => {
  const { 
    stake, 
    points, 
    multiplier, 
    hamletCount,
    serverSeed,
    gameHash,
    gameOver
  } = useGameStore();
  
  const [verified, setVerified] = React.useState<boolean | null>(null);

  const handleVerify = () => {
    if (!serverSeed || !gameHash) return;
    const isValid = verifyHash(serverSeed, gameHash);
    setVerified(isValid);
  };

  return (
    <div className="space-y-8 font-mono">
      <div>
        <p className="text-gray-400 mb-4">
          Every game's outcome is predetermined using a SHA256 hash of a 
          server seed. This hash is shown to you before the game starts, 
          ensuring that the outcome cannot be manipulated.
        </p>
        <p className="text-gray-400">
          When the game ends, you can verify the fairness by checking that 
          the revealed server seed matches the initial hash.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 text-center">
        <div>
          <div className="text-gray-400 text-sm">INITIAL</div>
          <div>{formatPoints(stake)} PTS</div>
        </div>
        <div>
          <div className="text-gray-400 text-sm">STAKE</div>
          <div>{formatPoints(points)} PTS</div>
        </div>
        <div>
          <div className="text-gray-400 text-sm">MULT</div>
          <div>{formatMultiplier(multiplier)}</div>
        </div>
        <div>
          <div className="text-gray-400 text-sm">HAMLETS</div>
          <div>{hamletCount}</div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-gray-400 text-sm">GAME HASH (SHA256)</div>
        <div className="bg-gray-800 p-3 rounded-lg break-all text-sm font-mono">
          {gameHash || 'Not available'}
        </div>
      </div>

      {gameOver && serverSeed && (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="text-gray-400 text-sm">SERVER SEED</div>
            <div className="bg-gray-800 p-3 rounded-lg break-all text-sm font-mono">
              {serverSeed}
            </div>
          </div>

          <Button
            variant="secondary"
            className="w-full"
            onClick={handleVerify}
          >
            VERIFY FAIRNESS
          </Button>

          {verified !== null && (
            <div className={`text-center ${verified ? 'text-green-500' : 'text-red-500'}`}>
              {verified ? 'Hash verified! The game was fair.' : 'Verification failed'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};