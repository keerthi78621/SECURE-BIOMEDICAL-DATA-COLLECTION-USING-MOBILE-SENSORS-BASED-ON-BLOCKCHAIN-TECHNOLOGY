import React, { useState, useEffect } from 'react';

const App = () => {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Load files from localStorage on component mount
  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
    setUploadedFiles(savedFiles);
  }, []);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleUpload = () => {
    if (files.length === 0) {
      alert('Please select files to upload.');
      return;
    }

    const newFiles = files.map((file) => {
      return {
        name: file.name,
        size: file.size,
        type: file.type,
        data: URL.createObjectURL(file), // Store as a Blob URL for easy download
      };
    });

    // Update uploaded files and save to localStorage
    const updatedFiles = [...uploadedFiles, ...newFiles];
    setUploadedFiles(updatedFiles);
    localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));

    alert('Files uploaded successfully!');
    setFiles([]); // Clear selected files
  };

  const handleDownload = (file) => {
    const link = document.createElement('a');
    link.href = file.data;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Cloud Data Storage</h1>

      {/* Custom File Upload Section with Inline CSS */}
      <div
        style={{
          height: '200px',
          width: '300px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'space-between',
          gap: '20px',
          cursor: 'pointer',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px dashed #cacaca',
          backgroundColor: 'rgba(255, 255, 255, 1)',
          padding: '1.5rem',
          borderRadius: '10px',
          boxShadow: '0px 48px 35px -48px rgba(0,0,0,0.1)',
          margin: '0 auto', // Center the upload box
        }}
        onClick={() => document.getElementById('file-input').click()}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            style={{ height: '80px', fill: 'rgba(75, 85, 99, 1)' }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontWeight: '400', color: 'rgba(75, 85, 99, 1)' }}>
            Click to upload files
          </span>
        </div>
        <input
          id="file-input"
          type="file"
          multiple
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>

      <button onClick={handleUpload} className="btn btn-primary mt-4 mb-4">
        Upload Files to Cloud
      </button>

      <div>
        {uploadedFiles.length === 0 ? (
          <p className="text-muted">No files stored in the cloud yet.</p>
        ) : (
          <div className="row">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{file.name}</h5>
                    <p className="card-text">
                      <strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB
                    </p>
                    <p className="card-text">
                      <strong>Type:</strong> {file.type}
                    </p>
                    <button
                      onClick={() => handleDownload(file)}
                      className="btn btn-success"
                    >
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;