/*
  # Public Sessions Schema

  1. New Tables
    - `public_sessions`
      - `id` (uuid, primary key)
      - `player_address` (text) - Player's wallet address
      - `stake` (integer) - Initial stake amount
      - `result` (integer) - Final result (win/loss amount)
      - `multiplier` (decimal) - Final multiplier
      - `hamlet_count` (integer) - Number of hamlets in game
      - `created_at` (timestamp)
      - `game_hash` (text) - For fairness verification
      - `is_checkpot` (boolean) - If player achieved checkpot
    
  2. Security
    - Enable RLS
    - Allow anyone to read sessions
    - Only allow authenticated users to insert their own sessions
*/

CREATE TABLE IF NOT EXISTS public_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_address text NOT NULL,
  stake integer NOT NULL,
  result integer NOT NULL,
  multiplier decimal(10,2) NOT NULL,
  hamlet_count integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  game_hash text NOT NULL,
  is_checkpot boolean DEFAULT false,
  
  CONSTRAINT valid_stake CHECK (stake > 0),
  CONSTRAINT valid_hamlet_count CHECK (hamlet_count BETWEEN 1 AND 5)
);

-- Enable RLS
ALTER TABLE public_sessions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read sessions
CREATE POLICY "Sessions are viewable by everyone" 
  ON public_sessions
  FOR SELECT
  USING (true);

-- Only allow users to insert their own sessions
CREATE POLICY "Users can insert their own sessions"
  ON public_sessions
  FOR INSERT
  WITH CHECK (auth.uid()::text = player_address);