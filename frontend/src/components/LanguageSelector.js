import React from 'react';

function LanguageSelector({ onSelectLanguage, currentLanguage }) {
    return (
        <div className="mb-4">
            <h2>Cover Letter Language</h2>
            <select
                value={currentLanguage}
                onChange={(e) => onSelectLanguage(e.target.value)}
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
                <option value="English">English</option>
                <option value="German">German</option>
                <option value="Hebrew">Hebrew</option>
            </select>
        </div>
    );
}

export default LanguageSelector;
