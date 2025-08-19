import React from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';

const App = () => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <ChatInterface />
      </div>

    </div>
  );
};

export default App;