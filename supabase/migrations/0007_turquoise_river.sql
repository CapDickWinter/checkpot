/*
  # Remove Test Messages Table
  
  1. Changes
    - Drop the test_messages table and its associated policies
    
  2. Security
    - No security changes needed as table is being removed
*/

-- Drop the test_messages table and its policies
DROP TABLE IF EXISTS test_messages;