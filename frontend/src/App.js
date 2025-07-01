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

    const idToken = await user.getIdToken();

    const formData = new FormData();
    formData.append('cv_file', cvFile);
    formData.append('job_description', jobDescription);
    formData.append('sentiment', sentiment);
    formData.append('length', length);
    formData.append('language', language);

    try {
      const response = await fetch('http://localhost:8000/generate', {
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
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">CoverFlow AI</h1>
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <button onClick={handleSignOut} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4">Sign Out</button>
          <CVUpload setCvFile={setCvFile} />
          <JobDescriptionInput setJobDescription={setJobDescription} />
          <SentimentSelector onSelectSentiment={setSentiment} currentSentiment={sentiment} />
          <LengthSelector onSelectLength={setLength} currentLength={length} />
          <LanguageSelector onSelectLanguage={setLanguage} currentLanguage={language} />
          <button onClick={generateCoverLetter} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Generate Cover Letter</button>
          <CoverLetterDisplay coverLetter={coverLetter} />
        </div>
      ) : (
        <div>
          <SignUp />
          <SignIn />
        </div>
      )}
    </div>
  );
}

export default App;
