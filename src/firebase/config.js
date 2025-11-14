// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwRQPub57VZXjZ4vuUQ7CaQrQ2NLJ1m_M",
  authDomain: "famehikes-39b02.firebaseapp.com",
  projectId: "famehikes-39b02",
  storageBucket: "famehikes-39b02.firebasestorage.app",
  messagingSenderId: "676952858342",
  appId: "1:676952858342:web:acf71309c0759147a2e527",
  measurementId: "G-TN1LDMZPFM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only in browser)
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize Auth
export const auth = getAuth(app);

export { app, analytics };
export default app;

