import React, { useState } from 'react';
import dataStore from '../store/datastore.js';

const Pdf = () => {
  const { pdfFun } = dataStore(); // ✅ get function from store
  const [selectedFile, setSelectedFile] = useState(null);

  // Handler for file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      console.error("Please select a valid PDF file.");
    }
  };

  // Handler for the upload button click
  const handleUploadClick = async () => {
    if (selectedFile) {
      try {
        console.log('Uploading file:', selectedFile.name);
        await pdfFun(selectedFile); 
        setSelectedFile(null);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-4">
      <div className="card w-full max-w-lg bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl font-bold">Upload a PDF</h2>
          <p className="text-gray-500 mt-2 mb-4">
            Select a PDF from your system to upload.
          </p>
          
          <div className="flex flex-col items-center space-y-4">
            {/* DaisyUI file input component */}
            <input 
              type="file" 
              accept="application/pdf"
              onChange={handleFileChange}
              className="file-input file-input-bordered file-input-primary w-full" 
            />
            
           
            {selectedFile && (
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Selected file: <span className="font-semibold">{selectedFile.name}</span>
              </p>
            )}

           
            <button 
              onClick={handleUploadClick}
              disabled={!selectedFile}
              className="btn btn-primary w-full max-w-xs mt-4"
            >
              Upload PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pdf;
