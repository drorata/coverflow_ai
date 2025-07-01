import React from 'react';

function LanguageSelector({ onSelectLanguage, currentLanguage }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cover Letter Language</h2>
            <select
                value={currentLanguage}
                onChange={(e) => onSelectLanguage(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm"
            >
                <option value="English">English</option>
                <option value="German">German</option>
                <option value="Hebrew">Hebrew</option>
            </select>
        </div>
    );
}

export default LanguageSelector;
