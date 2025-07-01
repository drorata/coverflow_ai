import React from 'react';

function CoverLetterDisplay({ coverLetter }) {
    return (
        <div>
            <h2>Generated Cover Letter</h2>
            <p>{coverLetter}</p>
        </div>
    );
}

export default CoverLetterDisplay;
