import React, { useState } from 'react';
import dataStore from '../store/datastore.js';
import useMessageStore from '../store/messageStore.js';

const Url = () => {
  const { urlFun } = dataStore();
  const [url, setUrl] = useState('');
const { setType } = useMessageStore();

  // ✅ Declare properly with const
  const handleUrlBtnClick = async () => {
    try {
     await urlFun(url);
        setType('url');
      setUrl('')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full max-w-lg p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <input 
          type="text" 
          placeholder="Enter website URL" 
          className="input input-bordered w-full text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          onClick={handleUrlBtnClick}
          className="btn btn-primary w-full md:w-auto"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Url;
