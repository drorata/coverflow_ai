import React, { useState, useEffect } from 'react';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import CVUpload from './components/CVUpload';
import JobDescriptionInput from './components/JobDescriptionInput';
import CoverLetterDisplay from './components/CoverLetterDisplay';
import SentimentSelector from './components/SentimentSelector';
import LengthSelector from './components/LengthSelector';
import LanguageSelector from './components/LanguageSelector';
import { auth } from './firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';

function App() {
  const [cvFile, setCvFile] = useState(null); // New state for CV File object
  const [jobDescription, setJobDescription] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [sentiment, setSentiment] = useState('Formal'); // New state for sentiment, default to Formal
  const [length, setLength] = useState('Medium'); // New state for length, default to Medium
  const [language, setLanguage] = useState('English'); // New state for language, default to English
  const [user, setUser] = useState(null); // New state for user
  const [isLoading, setIsLoading] = useState(false); // New state for loading indicator

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const generateCoverLetter = async () => {
    if (!user) {
      alert('Please sign in to generate a cover letter.');
      return;
    }

    if (!cvFile) {
      alert('Please upload a CV.');
      return;
    }

    if (!jobDescription.trim()) {
      alert('Please provide a job description.');
      return;
    }

    setIsLoading(true); // Set loading to true
    setCoverLetter(''); // Clear previous cover letter

    try {
      const idToken = await user.getIdToken();

      const formData = new FormData();
      formData.append('cv_file', cvFile);
      formData.append('job_description', jobDescription);
      formData.append('sentiment', sentiment);
      formData.append('length', length);
      formData.append('language', language);

      const backendApiUrl = `${process.env.REACT_APP_BACKEND_URL}/generate`;

      const response = await fetch(backendApiUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Authorization': `Bearer ${idToken}`, // Send ID token
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to generate cover letter');
      }

      const data = await response.json();
      setCoverLetter(data.cover_letter);
    } catch (error) {
      console.error('Error generating cover letter:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false); // Set loading to false regardless of success or failure
    }
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUser(null);
      alert('Signed out successfully!');
    }).catch((error) => {
      console.error('Error signing out:', error);
      alert('Error signing out.');
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-700 to-blue-900 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-4xl transform transition-all duration-300 hover:shadow-3xl">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-10 text-center tracking-tight">CoverFlow AI</h1>

        {user ? (
          <div className="space-y-10">
            <div className="flex justify-between items-center pb-6 border-b border-gray-200">
              <p className="text-lg text-gray-700">Welcome, <span className="font-semibold text-indigo-600">{user.email}</span>!</p>
              <button
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
              >
                Sign Out
              </button>
            </div>

            <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl shadow-inner space-y-6">
                <CVUpload setCvFile={setCvFile} />
                <JobDescriptionInput setJobDescription={setJobDescription} />
            </div>

            <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl shadow-inner space-y-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4">Customize Your Cover Letter</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <SentimentSelector onSelectSentiment={setSentiment} currentSentiment={sentiment} />
                  <LengthSelector onSelectLength={setLength} currentLength={length} />
                  <LanguageSelector onSelectLanguage={setLanguage} currentLanguage={language} />
                </div>
            </div>

            <button
              onClick={generateCoverLetter}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-4 px-6 rounded-xl text-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </span>
              ) : (
                'Generate Cover Letter'
              )}
            </button>

            {!isLoading && coverLetter && (
              <CoverLetterDisplay coverLetter={coverLetter} />
            )}
          </div>
        ) : (
          <div className="space-y-8">
            <SignUp />
            <SignIn />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
