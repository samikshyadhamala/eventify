// src/components/Chatbot/ChatbotWidget.jsx

import React, { useState } from 'react';
import './ChatbotWidget.css';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className="chatbot-widget">
      <button className="chatbot-toggle" onClick={toggleChat}>
        💬 Chat
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <iframe
            src="/chatbot.html"  // Change this if you are embedding something else
            width="300"
            height="400"
            title="Chatbot"
            style={{ border: 'none' }}
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;
