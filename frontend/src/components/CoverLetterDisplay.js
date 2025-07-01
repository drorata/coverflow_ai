import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

function CoverLetterDisplay({ coverLetter }) {
    const [viewMode, setViewMode] = useState('rendered'); // 'rendered' or 'raw'

    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold mb-2">Generated Cover Letter</h2>
            <div className="mb-4">
                <label className="inline-flex items-center mr-4">
                    <input
                        type="radio"
                        className="form-radio"
                        name="viewMode"
                        value="rendered"
                        checked={viewMode === 'rendered'}
                        onChange={() => setViewMode('rendered')}
                    />
                    <span className="ml-2">Rendered</span>
                </label>
                <label className="inline-flex items-center">
                    <input
                        type="radio"
                        className="form-radio"
                        name="viewMode"
                        value="raw"
                        checked={viewMode === 'raw'}
                        onChange={() => setViewMode('raw')}
                    />
                    <span className="ml-2">Raw Markdown</span>
                </label>
            </div>
            <div className="prose lg:prose-lg p-4 border rounded-md bg-gray-100 max-h-96 overflow-y-auto">
                {viewMode === 'rendered' ? (
                    <ReactMarkdown>{coverLetter}</ReactMarkdown>
                ) : (
                    <pre className="whitespace-pre-wrap font-mono text-sm">{coverLetter}</pre>
                )}
            </div>
        </div>
    );
}

export default CoverLetterDisplay;
