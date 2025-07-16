import React from 'react';
import { auth } from '../firebaseConfig';
import { signInAnonymously } from 'firebase/auth';

const AnonymousSignIn = () => {
  const handleAnonymousSignIn = async () => {
    try {
      await signInAnonymously(auth);
      console.log("Signed in anonymously");
      // The onAuthStateChanged listener in App.js will handle state update
    } catch (error) {
      console.error("Error signing in anonymously:", error);
      // Handle errors, e.g., display an error message to the user
    }
  };

  return (
    <button onClick={handleAnonymousSignIn} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-400 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
    >
      Continue as Guest
    </button>
  );
};

export default AnonymousSignIn;
