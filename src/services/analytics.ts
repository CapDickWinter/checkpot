import { supabase } from '../lib/supabase';

export interface PlayerStats {
  totalPlayers: number;
  activePlayers24h: number;
  totalPurchases: number;
  totalPointsPurchased: number;
}

export async function getPlayerStats(): Promise<PlayerStats> {
  const now = new Date();
  const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  try {
    // Get total players
    const { count: totalPlayers } = await supabase
      .from('players')
      .select('*', { count: 'exact', head: true });

    // Get active players in last 24h
    const { count: activePlayers24h } = await supabase
      .from('players')
      .select('*', { count: 'exact', head: true })
      .gte('last_active_at', last24h.toISOString());

    // Get purchase stats
    const { data: purchaseStats } = await supabase
      .from('point_purchases')
      .select('amount')
      .throwOnError();

    const totalPurchases = purchaseStats?.length || 0;
    const totalPointsPurchased = purchaseStats?.reduce((sum, p) => sum + p.amount, 0) || 0;

    return {
      totalPlayers: totalPlayers || 0,
      activePlayers24h: activePlayers24h || 0,
      totalPurchases,
      totalPointsPurchased
    };
  } catch (error) {
    console.error('Error fetching player stats:', error);
    throw error;
  }
}