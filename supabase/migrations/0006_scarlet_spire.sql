/*
  # Update Public Sessions Table
  
  1. Changes
    - Add missing indexes if they don't exist
    - Update RLS policies
    
  2. Security
    - Ensure proper RLS policies for authenticated users
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can insert their own sessions" ON public_sessions;
DROP POLICY IF EXISTS "Users can view all sessions" ON public_sessions;

-- Create or update indexes (IF NOT EXISTS prevents errors if they already exist)
CREATE INDEX IF NOT EXISTS idx_public_sessions_player_address ON public_sessions(player_address);
CREATE INDEX IF NOT EXISTS idx_public_sessions_created_at ON public_sessions(created_at);

-- Create new policies
CREATE POLICY "Users can insert their own sessions"
ON public_sessions FOR INSERT 
TO authenticated
WITH CHECK (auth.uid()::text = player_address);

CREATE POLICY "Users can view all sessions"
ON public_sessions FOR SELECT
TO authenticated
USING (true);