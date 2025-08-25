import React, { useState, useEffect } from 'react';
import tmi from 'tmi.js';

const ChatTwitch = () => {
  const [messages, setMessages] = useState([]);
  const [lastMessage, setLastMessage] = useState('');

  useEffect(() => {
    const client = new tmi.Client({
      channels: ['rayzopp'],
    });

    client.connect();

    client.on('message', (channel, tags, message, self) => {
      if (self) return;

      const newMessage = `${tags['display-name']}: ${message}`;

      if (newMessage !== lastMessage) {
        setMessages(prevMessages => [...prevMessages, newMessage]);
        setLastMessage(newMessage);
      }
    });

    return () => client.disconnect();
  }, [lastMessage]);
  return (
    <div>
      <div className="chat-box" style={{ height: '200px', overflowY: 'scroll' }}>
        <br />
        {messages.reverse().map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
    </div>
  );
};

export default ChatTwitch;
