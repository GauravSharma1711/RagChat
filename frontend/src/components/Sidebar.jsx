import React from 'react';
import { useState } from 'react';


import Text from './Text';
import Pdf from './Pdf';
import Url from './Url';

const Sidebar = () => {
  const [isTextActive, setIsTextActive] = useState(false);
  const [isUrlActive, setIsUrlActive] = useState(false);
  const [isPdfActive, setIsPdfActive] = useState(false);


  const handleButtonClick = (setActiveState) => {
    setIsTextActive(false);
    setIsUrlActive(false);
    setIsPdfActive(false);
    setActiveState(true);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
    
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          RAG Assistant
        </h1>
      </div>

      
      <div className="flex flex-col p-4 space-y-2">
        <button
          onClick={() => handleButtonClick(setIsTextActive)}
          className={`btn ${isTextActive ? 'btn-primary' : 'btn-ghost'}`}
        >
          Text
        </button>
        <button
          onClick={() => handleButtonClick(setIsPdfActive)}
          className={`btn ${isPdfActive ? 'btn-primary' : 'btn-ghost'}`}
        >
          PDF
        </button>
        <button
          onClick={() => handleButtonClick(setIsUrlActive)}
          className={`btn ${isUrlActive ? 'btn-primary' : 'btn-ghost'}`}
        >
          URL
        </button>
      </div>

     
      <div className="flex-1 p-4 overflow-auto">
        {isTextActive && <Text />}
        {isPdfActive && <Pdf />}
        {isUrlActive && <Url />}
      </div>
    </div>
  );
};

export default Sidebar;