import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'

    const signUp = (e) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages
        setMessageType('');
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                setMessage('Sign up successful!');
                setMessageType('success');
            })
            .catch((error) => {
                console.error(error);
                setMessage(`Sign up failed: ${error.message}`);
                setMessageType('error');
            });
    }

    return (
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sign Up</h2>
            <form onSubmit={signUp} className="space-y-4">
                <div>
                    <label htmlFor="email-signup" className="sr-only">Email</label>
                    <input
                        id="email-signup"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="password-signup" className="sr-only">Password</label>
                    <input
                        id="password-signup"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
                >
                    Sign Up
                </button>
            </form>
            {message && (
                <p className={`mt-4 text-center text-sm ${messageType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {message}
                </p>
            )}
        </div>
    );
}

export default SignUp;
