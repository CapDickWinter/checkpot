/*
  # Update public_sessions policies

  1. Changes
    - Allow public inserts without authentication
    - Keep public read access
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can insert their own sessions" ON public_sessions;
DROP POLICY IF EXISTS "Sessions are viewable by everyone" ON public_sessions;

-- Create new policies
CREATE POLICY "Anyone can insert sessions"
  ON public_sessions
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Sessions are viewable by everyone"
  ON public_sessions
  FOR SELECT
  USING (true);