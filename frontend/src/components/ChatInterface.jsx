import React, { useState } from 'react';

const ChatInterface = () => {
  // State to store chat messages
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: 'bot' },
    { text: "I'm looking for some information on the RAG model.", sender: 'user' },
  ]);
  // State to store the current user input
  const [input, setInput] = useState('');

  // Function to handle sending a new message
  const handleSendMessage = () => {
    if (input.trim() !== '') {
      // Add the user's message to the messages array
      const newUserMessage = { text: input, sender: 'user' };
      setMessages([...messages, newUserMessage]);
      // Clear the input field
      setInput('');

      // Simulate a bot response after a short delay
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Interesting! The RAG model combines retrieval and generation.", sender: 'bot' },
        ]);
      }, 1000);
    }
  };

  return (
    // Main container for the chat interface. It fills the remaining space,
    // has a clean background, and is structured as a column.
    <div className="flex flex-col flex-1 h-full bg-gray-50 dark:bg-gray-900">
      
      {/* Chat Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          AI Assistant
        </h2>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, index) => (
          // Message bubble container, aligned left for 'bot' and right for 'user'.
          <div
            key={index}
            className={`chat ${msg.sender === 'user' ? 'chat-end' : 'chat-start'}`}
          >
            <div className="chat-bubble break-words">
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Type your message here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          className="input input-bordered input-primary flex-1 text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700"
        />
        <button
          onClick={handleSendMessage}
          className="btn btn-primary"
        >
          Send
        </button>
      </div>

    </div>
  );
};

export default ChatInterface;