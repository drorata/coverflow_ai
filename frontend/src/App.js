import React, { useState, useEffect } from 'react';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import CVUpload from './components/CVUpload';
import JobDescriptionInput from './components/JobDescriptionInput';
import CoverLetterDisplay from './components/CoverLetterDisplay';
import RefinementInput from './components/RefinementInput';
import SentimentSelector from './components/SentimentSelector';
import LengthSelector from './components/LengthSelector';
import LanguageSelector from './components/LanguageSelector';
import { auth } from './firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMugHot } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import logo from './logo.png';



function App() {
  const [cvFile, setCvFile] = useState(null); // New state for CV File object
  const [jobDescription, setJobDescription] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [sentiment, setSentiment] = useState('Formal'); // New state for sentiment, default to Formal
  const [length, setLength] = useState('Medium'); // New state for length, default to Medium
  const [language, setLanguage] = useState('English'); // New state for language, default to English
  const [user, setUser] = useState(null); // New state for user
  const [isLoading, setIsLoading] = useState(false); // New state for loading indicator
  const [refinementText, setRefinementText] = useState(''); // New state for refinement text

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
      const cleanedLetter = data.cover_letter.replace(/^```(?:markdown)?\s*|```\s*$/g, '').trim();
      setCoverLetter(cleanedLetter);
    } catch (error) {
      console.error('Error generating cover letter:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false); // Set loading to false regardless of success or failure
    }
  };

  const refineCoverLetter = async () => {
    if (!user) {
      alert('Please sign in to refine a cover letter.');
      return;
    }

    if (!refinementText.trim()) {
      alert('Please provide refinement instructions.');
      return;
    }

    setIsLoading(true);

    try {
      const idToken = await user.getIdToken();

      const formData = new FormData();
      formData.append('cv_file', cvFile);
      formData.append('job_description', jobDescription);
      formData.append('sentiment', sentiment);
      formData.append('length', length);
      formData.append('language', language);
      formData.append('cover_letter', coverLetter);
      formData.append('refinement_instructions', refinementText);


      const backendApiUrl = `${process.env.REACT_APP_BACKEND_URL}/refine`;

      const response = await fetch(backendApiUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Authorization': `Bearer ${idToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to refine cover letter');
      }

      const data = await response.json();
      const cleanedLetter = data.cover_letter.replace(/^```(?:markdown)?\s*|```\s*$/g, '').trim();
      setCoverLetter(cleanedLetter);
      setRefinementText(''); // Clear the refinement text input
    } catch (error) {
      console.error('Error refining cover letter:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
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
        <div className="flex justify-center items-center mb-10">
          <img src={logo} alt="CoverFlow AI Logo" className="h-12 w-12 mr-4"/>
          <h1 className="text-5xl font-extrabold text-gray-900 text-center tracking-tight">CoverFlow AI</h1>
        </div>

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

            <div className="text-center p-4 bg-gray-100 rounded-lg">
              🎯 This project was created by <i>Dror Atariah</i> 🎯
              <div className="flex justify-center items-center space-x-4">
                <p>🚀</p><a href="https://coff.ee/drorata" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 font-semibold">
                  <FontAwesomeIcon icon={faMugHot} className="mr-1" /> Buy me a coffee
                </a><p>🚀</p>
                <a href="https://linkedin.com/in/atariah" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 font-semibold">
                  <FontAwesomeIcon icon={faLinkedinIn} className="mr-1" /> LinkedIn
                </a><p>🚀</p>
              </div>
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
              <CoverLetterDisplay coverLetter={coverLetter} onCoverLetterChange={(e) => setCoverLetter(e.target.value)} />
            )}

            {coverLetter && !isLoading && (
              <RefinementInput
                value={refinementText}
                onChange={(e) => setRefinementText(e.target.value)}
                onSubmit={refineCoverLetter}
                isLoading={isLoading}
              />
            )}
          </div>
        ) : (
          <div className="space-y-8">
            <SignUp />
            <SignIn />
          </div>
        )}
      </div>
      <footer className="text-center text-white mt-8">
        <p>Made with ❤️ in Berlin</p>
      </footer>
    </div>
  );
}

export default App;
