import React, { useState } from 'react';

function CVUpload({ setCvFile }) { // Renamed prop to setCvFile
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        if (file) {
            setCvFile(file); // Pass the File object directly
            setUploadStatus(`File selected: ${file.name}`);
        } else {
            setUploadStatus('');
        }
    };

    return (
        <div>
            <h2>CV Upload</h2>
            <input type="file" accept=".pdf,.txt,.md" onChange={handleFileChange} className="mb-4" />
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
}

export default CVUpload;
