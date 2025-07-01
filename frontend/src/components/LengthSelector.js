import React from 'react';

function LengthSelector({ onSelectLength, currentLength }) {
    return (
        <div className="mb-4">
            <h2>Cover Letter Length</h2>
            <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                    <input
                        type="radio"
                        className="form-radio"
                        name="length"
                        value="Long"
                        checked={currentLength === 'Long'}
                        onChange={() => onSelectLength('Long')}
                    />
                    <span className="ml-2">Long</span>
                </label>
                <label className="inline-flex items-center">
                    <input
                        type="radio"
                        className="form-radio"
                        name="length"
                        value="Medium"
                        checked={currentLength === 'Medium'}
                        onChange={() => onSelectLength('Medium')}
                    />
                    <span className="ml-2">Medium</span>
                </label>
                <label className="inline-flex items-center">
                    <input
                        type="radio"
                        className="form-radio"
                        name="length"
                        value="Short"
                        checked={currentLength === 'Short'}
                        onChange={() => onSelectLength('Short')}
                    />
                    <span className="ml-2">Short</span>
                </label>
            </div>
        </div>
    );
}

export default LengthSelector;
