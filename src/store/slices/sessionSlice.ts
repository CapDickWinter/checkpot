import { StateCreator } from 'zustand';
import { GameStore } from '../../types/store';
import { GameSession } from '../../types/game';
import { generateGameSeeds } from '../../fairness/seeds';
import { generateGameHash } from '../../fairness/hash';
import { generateSessionId } from '../../utils/session';
import { DifficultyLevel } from '../../constants/difficulty';

export const createSessionSlice: StateCreator<GameStore> = (set, get) => ({
  initializeSession: (stake: number, bombCount: DifficultyLevel): GameSession => {
    const seeds = generateGameSeeds();
    const gameHash = generateGameHash(seeds);
    
    const session: GameSession = {
      sessionId: generateSessionId(),
      startTime: new Date().toISOString(),
      stake,
      bombCount,
      hashResult: gameHash.hash,
      serverSeed: seeds.serverSeed,
      clientSeed: seeds.clientSeed,
    };

    // Store session in localStorage for verification
    localStorage.setItem(`game_session_${session.sessionId}`, JSON.stringify(session));

    return session;
  },

  verifySession: (session: GameSession): boolean => {
    const gameHash = generateGameHash({
      serverSeed: session.serverSeed,
      clientSeed: session.clientSeed,
      nonce: Date.now()
    });
    return gameHash.hash === session.hashResult;
  }
});