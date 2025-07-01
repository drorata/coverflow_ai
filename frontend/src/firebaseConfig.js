import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAUEhcHfuM4F3FhyPVr1I6JLo3n-h9Pyhk",
    authDomain: "coverflow-ai-d0418.firebaseapp.com",
    projectId: "coverflow-ai-d0418",
    storageBucket: "coverflow-ai-d0418.firebasestorage.app",
    messagingSenderId: "966215430876",
    appId: "1:966215430876:web:6c6c0c06f9912e652bfa19",
    measurementId: "G-47DX3EBJL7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
