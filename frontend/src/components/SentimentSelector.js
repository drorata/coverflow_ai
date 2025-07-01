import React from 'react';

function SentimentSelector({ onSelectSentiment, currentSentiment }) {
    return (
        <div className="mb-4">
            <h2>Cover Letter Sentiment</h2>
            <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                    <input
                        type="radio"
                        className="form-radio"
                        name="sentiment"
                        value="Formal"
                        checked={currentSentiment === 'Formal'}
                        onChange={() => onSelectSentiment('Formal')}
                    />
                    <span className="ml-2">Formal</span>
                </label>
                <label className="inline-flex items-center">
                    <input
                        type="radio"
                        className="form-radio"
                        name="sentiment"
                        value="Casual"
                        checked={currentSentiment === 'Casual'}
                        onChange={() => onSelectSentiment('Casual')}
                    />
                    <span className="ml-2">Casual</span>
                </label>
                <label className="inline-flex items-center">
                    <input
                        type="radio"
                        className="form-radio"
                        name="sentiment"
                        value="Fun"
                        checked={currentSentiment === 'Fun'}
                        onChange={() => onSelectSentiment('Fun')}
                    />
                    <span className="ml-2">Fun</span>
                </label>
            </div>
        </div>
    );
}

export default SentimentSelector;
