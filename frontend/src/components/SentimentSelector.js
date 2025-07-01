import React from 'react';

function SentimentSelector({ onSelectSentiment, currentSentiment }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cover Letter Sentiment</h2>
            <div className="flex flex-col space-y-2">
                <label className="inline-flex items-center cursor-pointer">
                    <input
                        type="radio"
                        className="form-radio h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                        name="sentiment"
                        value="Formal"
                        checked={currentSentiment === 'Formal'}
                        onChange={() => onSelectSentiment('Formal')}
                    />
                    <span className="ml-3 text-gray-700 text-lg">Formal</span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                    <input
                        type="radio"
                        className="form-radio h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                        name="sentiment"
                        value="Casual"
                        checked={currentSentiment === 'Casual'}
                        onChange={() => onSelectSentiment('Casual')}
                    />
                    <span className="ml-3 text-gray-700 text-lg">Casual</span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                    <input
                        type="radio"
                        className="form-radio h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                        name="sentiment"
                        value="Fun"
                        checked={currentSentiment === 'Fun'}
                        onChange={() => onSelectSentiment('Fun')}
                    />
                    <span className="ml-3 text-gray-700 text-lg">Fun</span>
                </label>
            </div>
        </div>
    );
}

export default SentimentSelector;
