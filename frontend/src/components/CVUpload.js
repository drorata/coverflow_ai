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
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload CV</h2>
            <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="cv_upload">
                Select your CV (PDF, TXT, MD):
            </label>
            <input
                type="file"
                accept=".pdf,.txt,.md"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                id="cv_upload"
            />
            {uploadStatus && <p className="mt-3 text-sm text-gray-600">{uploadStatus}</p>}
        </div>
    );
}

export default CVUpload;
