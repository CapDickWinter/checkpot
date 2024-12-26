/*
  # Player Analytics Schema

  1. New Tables
    - `player_analytics`
      - Track individual player statistics
      - Store first and last seen timestamps
      - Track games played and points purchased
    - `point_transactions`
      - Track all point purchase transactions
      - Link to authenticated users

  2. Security
    - Enable RLS
    - Policies for authenticated users
    - Indexes for performance
*/

-- Create player analytics table
CREATE TABLE IF NOT EXISTS player_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  games_played integer DEFAULT 0,
  points_purchased integer DEFAULT 0,
  first_seen_at timestamptz DEFAULT now(),
  last_seen_at timestamptz DEFAULT now(),
  
  CONSTRAINT fk_user
    FOREIGN KEY (user_id) 
    REFERENCES auth.users (id)
    ON DELETE CASCADE
);

-- Create point transactions table
CREATE TABLE IF NOT EXISTS point_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  amount integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  
  CONSTRAINT fk_user
    FOREIGN KEY (user_id) 
    REFERENCES auth.users (id)
    ON DELETE CASCADE,
  
  CONSTRAINT positive_amount
    CHECK (amount > 0)
);

-- Enable RLS
ALTER TABLE player_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE point_transactions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own analytics"
ON player_analytics FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analytics"
ON player_analytics FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own analytics"
ON player_analytics FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can view own transactions"
ON point_transactions FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions"
ON point_transactions FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_player_analytics_user ON player_analytics(user_id);
CREATE INDEX idx_player_analytics_last_seen ON player_analytics(last_seen_at);
CREATE INDEX idx_point_transactions_user ON point_transactions(user_id);
CREATE INDEX idx_point_transactions_created ON point_transactions(created_at);