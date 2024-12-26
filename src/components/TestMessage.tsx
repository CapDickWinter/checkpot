import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Button } from './ui/Button';

export const TestMessage: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch messages
  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('test_messages')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching messages:', error);
    } else {
      setMessages(data || []);
    }
  };

  // Load messages on mount
  useEffect(() => {
    fetchMessages();
  }, []);

  // Send message
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const { error } = await supabase
        .from('test_messages')
        .insert({
          user_id: user.id,
          message
        });

      if (error) throw error;

      setMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter test message"
          className="w-full p-2 bg-gray-800 rounded"
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Test Message'}
        </Button>
      </form>

      <div className="space-y-2">
        <h3 className="font-bold">Recent Messages:</h3>
        {messages.map((msg) => (
          <div key={msg.id} className="p-2 bg-gray-800 rounded">
            <p>{msg.message}</p>
            <p className="text-xs text-gray-400">
              {new Date(msg.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};