import React, { useState } from 'react';

function JobDescriptionInput({ setJobDescription }) {
    const [jobDescriptionText, setJobDescriptionText] = useState('');

    const handleChange = (event) => {
        setJobDescriptionText(event.target.value);
        setJobDescription(event.target.value);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Job Description Input</h2>
            <textarea
                value={jobDescriptionText}
                onChange={handleChange}
                placeholder="Paste Job Description Here"
                rows="8"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none"
            />
        </div>
    );
}

export default JobDescriptionInput;
