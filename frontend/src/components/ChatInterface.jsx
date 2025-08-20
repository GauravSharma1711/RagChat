import React, { useState } from 'react';
import useMessageStore from '../store/messageStore.js';
import { FiSend, FiTrash2 } from 'react-icons/fi'; // Icons for Send and Clear

const ChatInterface = () => {
  const { messages, getAnswer, clear } = useMessageStore();
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (input.trim() === '') return;
    await getAnswer(input);
    setInput('');
  };

  return (
    <div className="flex flex-col flex-1 h-full bg-gray-100 dark:bg-gray-900 shadow-xl rounded-lg overflow-hidden">
      
      {/* Chat Header */}
      <div className="bg-white dark:bg-gray-800 p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          AI Assistant ✨
        </h2>
        <button
          onClick={clear}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300 flex items-center gap-2"
        >
          <FiTrash2 /> Clear Chat
        </button>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-gray-50 dark:bg-gray-900">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
            <p className="text-lg">Start a conversation with the AI Assistant.</p>
          </div>
        )}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.myQuestion ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg p-4 rounded-xl shadow-md transition-all duration-300 ${
                msg.myQuestion
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none'
              } ${msg.isLoading ? 'animate-pulse' : ''}`}
            >
              {msg.isLoading
                ? 'Thinking...'
                : typeof msg.answer === 'string'
                ? msg.answer
                : JSON.stringify(msg.answer)}
            </div>
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center space-x-3">
        <input
          type="text"
          placeholder="Type your message here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          className="flex-1 px-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors duration-300 shadow-lg"
        >
          <FiSend className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;