import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface AuthState {
  isConnecting: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isConnecting: false,
  error: null,

  connect: async () => {
    set({ isConnecting: true, error: null });
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to connect' });
    } finally {
      set({ isConnecting: false });
    }
  },

  disconnect: async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}));