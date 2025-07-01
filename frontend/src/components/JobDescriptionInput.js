import React, { useState } from 'react';

function JobDescriptionInput({ setJobDescription }) {
    const [jobDescriptionText, setJobDescriptionText] = useState('');

    const handleChange = (event) => {
        setJobDescriptionText(event.target.value);
        setJobDescription(event.target.value);
    };

    return (
        <div>
            <h2>Job Description Input</h2>
            <textarea
                value={jobDescriptionText}
                onChange={handleChange}
                placeholder="Paste Job Description Here"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            />
        </div>
    );
}

export default JobDescriptionInput;
