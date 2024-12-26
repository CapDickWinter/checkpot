/*
  # Test Messages Table
  
  1. New Tables
    - test_messages
      - id (uuid, primary key)
      - user_id (uuid, foreign key to auth.users)
      - message (text)
      - created_at (timestamp with timezone)
      
  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

CREATE TABLE test_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE test_messages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can insert their own messages"
ON test_messages FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view all messages"
ON test_messages FOR SELECT
TO authenticated
USING (true);

-- Create index
CREATE INDEX idx_test_messages_created_at ON test_messages(created_at);