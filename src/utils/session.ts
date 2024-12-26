export const generateSessionId = (): string => {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
  const random = Math.random().toString(36).substring(2, 8);
  return `game_${timestamp}_${random}`;
};

export const getStoredSession = (sessionId: string) => {
  const stored = localStorage.getItem(`game_session_${sessionId}`);
  return stored ? JSON.parse(stored) : null;
};