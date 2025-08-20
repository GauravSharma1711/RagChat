import React, { useState } from 'react';
import useMessageStore from '../store/messageStore.js';

const ChatInterface = () => {
  const { messages, getAnswer, clear } = useMessageStore();
  const [input, setInput] = useState('');


  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    // Call the store function to handle sending the message & fetching answer
    await getAnswer(input);
    setInput('');
  };

  return (
    <div className="flex flex-col flex-1 h-full bg-gray-50 dark:bg-gray-900">
      
      {/* Chat Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          AI Assistant
        </h2>
        <button
          onClick={clear}
          className="btn btn-sm btn-error"
        >
          Clear
        </button>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat ${msg.myQuestion ? 'chat-end' : 'chat-start'}`}
          >
            <div
              className={`chat-bubble break-words ${
                msg.isLoading ? 'loading' : ''
              }`}
            >

              {msg.isLoading
    ? '...'
    : typeof msg.answer === 'string'
      ? msg.answer
      : JSON.stringify(msg.answer)}
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
