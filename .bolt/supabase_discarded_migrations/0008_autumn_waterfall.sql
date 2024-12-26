/*
  # Analytics Schema Update
  
  1. New Tables
    - `public.user_stats` - Track user game statistics and points
  
  2. Security
    - Enable RLS
    - Add policies for authenticated users
    - Add indexes for performance
*/

-- Create user stats table
CREATE TABLE public.user_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  games_played integer DEFAULT 0,
  points_balance integer DEFAULT 0,
  points_purchased integer DEFAULT 0,
  last_played_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  
  CONSTRAINT valid_stats CHECK (
    games_played >= 0 AND
    points_balance >= 0 AND
    points_purchased >= 0
  )
);

-- Enable RLS
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own stats"
ON public.user_stats FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own stats"
ON public.user_stats FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own stats"
ON public.user_stats FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_user_stats_user_id ON public.user_stats(user_id);
CREATE INDEX idx_user_stats_last_played ON public.user_stats(last_played_at);