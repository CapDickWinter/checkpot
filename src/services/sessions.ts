import { supabase } from '../lib/supabase';
import { GameSession } from '../types/game';

export const savePublicSession = async (session: GameSession) => {
  try {
    console.log('Saving session:', session);
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('No authenticated user found');
    }

    const { data, error } = await supabase
      .from('public_sessions')
      .insert({
        player_address: user.id,
        stake: session.stake,
        result: session.result,
        multiplier: session.multiplier,
        hamlet_count: session.hamletCount,
        game_hash: session.gameHash,
        is_checkpot: session.isCheckpot
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving session:', error);
      throw error;
    }

    console.log('Session saved successfully:', data);
    return data;
  } catch (error) {
    console.error('Failed to save session:', error);
    throw error;
  }
};

export const getPublicSessions = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('No authenticated user found');
    }

    const { data, error } = await supabase
      .from('public_sessions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching sessions:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching sessions:', error);
    throw error;
  }
};

export const getUserSessions = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('No authenticated user found');
    }

    const { data, error } = await supabase
      .from('public_sessions')
      .select('*')
      .eq('player_address', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user sessions:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching user sessions:', error);
    throw error;
  }
};