import React from 'react';

const RefinementInput = ({ value, onChange, onSubmit, isLoading }) => {
  return (
    <div className="mt-10 bg-white p-6 rounded-xl shadow-lg w-full max-w-4xl">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Refine Your Cover Letter</h3>
      <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
        <textarea
          value={value}
          onChange={onChange}
          placeholder="Enter your refinement instructions here. For example, 'Make it more enthusiastic' or 'Focus more on my project management skills.'"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
          rows="4"
        />
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="mt-4 w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-bold py-3 px-6 rounded-xl text-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Refining...
                </span>
              ) : (
                'Refine Letter'
              )}
        </button>
      </div>
    </div>
  );
};

export default RefinementInput;