import { supabase } from '../lib/supabase';

export async function trackPlayerConnection(walletAddress: string) {
  try {
    // First try to get existing player
    const { data: existingPlayer } = await supabase
      .from('players')
      .select('id')
      .eq('wallet_address', walletAddress)
      .single();

    if (existingPlayer) {
      // Update last active timestamp
      await supabase
        .from('players')
        .update({ last_active: new Date().toISOString() })
        .eq('id', existingPlayer.id);
      
      return existingPlayer.id;
    }

    // Create new player if doesn't exist
    const { data: newPlayer, error } = await supabase
      .from('players')
      .insert({ wallet_address: walletAddress })
      .select('id')
      .single();

    if (error) throw error;
    return newPlayer.id;
  } catch (error) {
    console.error('Error tracking player connection:', error);
    throw error;
  }
}

export async function trackPointPurchase(playerId: string, amount: number) {
  try {
    const { error } = await supabase
      .from('point_purchases')
      .insert({
        player_id: playerId,
        amount
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error tracking point purchase:', error);
    throw error;
  }
}

export async function incrementGamesPlayed(playerId: string) {
  try {
    const { error } = await supabase
      .from('players')
      .update({
        total_games_played: supabase.rpc('increment'),
        last_active: new Date().toISOString()
      })
      .eq('id', playerId);

    if (error) throw error;
  } catch (error) {
    console.error('Error incrementing games played:', error);
    throw error;
  }
}