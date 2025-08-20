import React from 'react';
import { useState } from 'react';
import dataStore from '../store/datastore.js';
import useMessageStore from '../store/messageStore.js';

const Text = () => {
  const {textFun} = dataStore();
  const [text, setText] = useState('')
const { setType } = useMessageStore();

  const handleTextBtnClick = async()=>{
    try {
   await   textFun({text})
        setType('text');
      setText('');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        <h3 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-white">Add Text Input</h3>
        <textarea
          className="textarea textarea-bordered w-full h-40 mb-4
           text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700
            placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
          placeholder="Type your text here..."
          value={text}
          onChange={(e)=>setText(e.target.value)}
        ></textarea>
        <button 
        onClick={handleTextBtnClick}
        className="btn btn-primary w-full">Submit</button>
      </div>
    </div>
  );
};

export default Text;