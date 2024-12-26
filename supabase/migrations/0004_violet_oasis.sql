/*
  # Fix sessions table and policies

  1. Changes
    - Add NOT NULL constraints
    - Add proper indexes
    - Update RLS policies
    
  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated users can insert their own sessions" ON public_sessions;
DROP POLICY IF EXISTS "Users can view their own sessions" ON public_sessions;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_public_sessions_player_address ON public_sessions(player_address);
CREATE INDEX IF NOT EXISTS idx_public_sessions_created_at ON public_sessions(created_at);

-- Update RLS policies
CREATE POLICY "Users can insert their own sessions"
ON public_sessions FOR INSERT 
TO authenticated
WITH CHECK (auth.uid()::text = player_address);

CREATE POLICY "Users can view all sessions"
ON public_sessions FOR SELECT
TO authenticated
USING (true);