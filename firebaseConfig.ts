import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAA-RUpSokUG_MtJkJgEhWQ0P8FvVMMNDg",
    authDomain: "shopping-app-691fd.firebaseapp.com",
    projectId: "shopping-app-691fd",
    storageBucket: "shopping-app-691fd.appspot.com",
    messagingSenderId: "897286761932",
    appId: "1:897286761932:web:f77afcbcf8e77693f60169",
    measurementId: "G-83LMFHM5GY"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);