import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import dotenv from 'dotenv';
dotenv.config();
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export async function register(email, password) {
    try {
        return await createUserWithEmailAndPassword(auth, email, password);
    }
    catch (error) {
        throw new Error(error instanceof Error ? error.message : "Registration failed");
    }
}
export async function login(email, password) {
    try {
        return await signInWithEmailAndPassword(auth, email, password);
    }
    catch (error) {
        throw new Error(error instanceof Error ? error.message : "Login failed");
    }
}
export async function loginWithGoogle() {
    try {
        return await signInWithPopup(auth, googleProvider);
    }
    catch (error) {
        throw new Error(error instanceof Error ? error.message : "Google login failed");
    }
}
