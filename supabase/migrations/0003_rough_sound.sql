/*
  # Authentication and Access Control

  1. Changes
    - Add auth policies for public_sessions table
    - Restrict access to authenticated users only
    
  2. Security
    - Only authenticated users can insert sessions
    - Users can only view their own sessions
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can insert sessions" ON public_sessions;
DROP POLICY IF EXISTS "Sessions are viewable by everyone" ON public_sessions;

-- Create new restricted policies
CREATE POLICY "Authenticated users can insert their own sessions"
ON public_sessions
FOR INSERT
TO authenticated
WITH CHECK (auth.uid()::text = player_address);

CREATE POLICY "Users can view their own sessions"
ON public_sessions
FOR SELECT
TO authenticated
USING (auth.uid()::text = player_address);