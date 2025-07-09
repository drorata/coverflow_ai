import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

function CoverLetterDisplay({ coverLetter }) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        if (!coverLetter) return;
        navigator.clipboard.writeText(coverLetter).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); // Revert after 2 seconds
        }, (err) => {
            console.error('Could not copy text: ', err);
        });
    };

    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Generated Cover Letter 💪🏼</h2>
            <div className="relative">
                <button
                    onClick={handleCopy}
                    className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full transition duration-200 ease-in-out disabled:opacity-50"
                    disabled={!coverLetter || isCopied}
                    aria-label="Copy to clipboard"
                >
                    {isCopied ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    )}
                </button>
                <div className="prose lg:prose-lg p-4 border rounded-md bg-gray-100 max-h-96 overflow-y-auto">
                    <ReactMarkdown>{coverLetter}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
}

export default CoverLetterDisplay;
