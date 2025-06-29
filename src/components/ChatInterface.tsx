// This line is crucial! It tells Next.js that this is an interactive component.
"use client"; 

import React, { useState, KeyboardEvent } from 'react';

// Define the structure of a message object
interface Message {
  text: string;
  type: 'user' | 'ai';
}

export default function ChatInterface() {
  // State to hold the list of messages
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How can I assist you today?", type: 'ai' }
  ]);
  // State to hold the current user input
  const [inputValue, setInputValue] = useState<string>('');

  const handleSendMessage = async () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) return;

    // Add user's message to the chat
    const newMessages: Message[] = [...messages, { text: trimmedInput, type: 'user' }];
    setMessages(newMessages);
    setInputValue(''); // Clear the input field

    // --- Backend API Call Would Go Here ---
    // For now, we'll simulate a response
    // In a real app, you would use fetch() to call a Next.js API Route
    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, { text: "This is a simulated AI response.", type: 'ai' }]);
    }, 1000);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-log">
        {messages.map((msg, index) => (
          <div key={index} className={`message message-${msg.type}`}>
            <div className="message-content">
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <textarea
          id="chat-input"
          placeholder="Type your message..."
          rows={1}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button id="send-button" onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}