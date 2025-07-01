import React from 'react';

function LengthSelector({ onSelectLength, currentLength }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cover Letter Length</h2>
            <div className="flex flex-col space-y-2">
                <label className="inline-flex items-center cursor-pointer">
                    <input
                        type="radio"
                        className="form-radio h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                        name="length"
                        value="Long"
                        checked={currentLength === 'Long'}
                        onChange={() => onSelectLength('Long')}
                    />
                    <span className="ml-3 text-gray-700 text-lg">Long</span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                    <input
                        type="radio"
                        className="form-radio h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                        name="length"
                        value="Medium"
                        checked={currentLength === 'Medium'}
                        onChange={() => onSelectLength('Medium')}
                    />
                    <span className="ml-3 text-gray-700 text-lg">Medium</span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                    <input
                        type="radio"
                        className="form-radio h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                        name="length"
                        value="Short"
                        checked={currentLength === 'Short'}
                        onChange={() => onSelectLength('Short')}
                    />
                    <span className="ml-3 text-gray-700 text-lg">Short</span>
                </label>
            </div>
        </div>
    );
}

export default LengthSelector;
