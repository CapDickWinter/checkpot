import { GameSeed, FairnessProof } from './types';
import { verifyHash } from './hash';
import { generateBombPositions } from '../utils/hash';

export const verifyFairness = (proof: FairnessProof): boolean => {
  // First verify the hash matches the seeds
  const isHashValid = verifyHash(
    proof.serverSeed,
    proof.clientSeed,
    proof.nonce,
    proof.hash
  );

  if (!isHashValid) {
    console.error('Hash verification failed');
    return false;
  }

  // Then verify the bomb positions match the hash
  const positions = generateBombPositions(proof.hash, proof.bombPositions.length);
  const generatedPositions = Array.from(positions).sort((a, b) => a - b);
  const providedPositions = [...proof.bombPositions].sort((a, b) => a - b);

  const positionsMatch = JSON.stringify(generatedPositions) === JSON.stringify(providedPositions);
  
  if (!positionsMatch) {
    console.error('Bomb positions verification failed');
    return false;
  }

  return true;
};