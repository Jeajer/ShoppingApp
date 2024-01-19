import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import { getStorage } from "firebase/storage";
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

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

const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_DB = getFirestore(FIREBASE_APP);
const FIREBASE_PROVIDER = new GoogleAuthProvider();
const FIREBASE_AUTH = getAuth(FIREBASE_APP);
const FIREBASE_STORAGE = getStorage(FIREBASE_APP);

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { FIREBASE_AUTH, FIREBASE_PROVIDER, FIREBASE_DB, firebase };