import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDj58BGR3qdvoTqBNpWFUda-5YXXV-CEqg",
  authDomain: "votesmart-ai-2c2a5.firebaseapp.com",
  projectId: "votesmart-ai-2c2a5",
  storageBucket: "votesmart-ai-2c2a5.firebasestorage.app",
  messagingSenderId: "443564959825",
  appId: "1:443564959825:web:3db7f31f826c371fe87070",
  measurementId: "G-3JCT8ZPWTL",
};

// Initialize Firebase (safe for SSR)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Auth & Google provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Initialize Analytics conditionally (only in browser, not SSR)
let analytics: ReturnType<typeof getAnalytics> | undefined;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, googleProvider, analytics };
