import { FIREBASE_AUTH } from "../../firebaseConfig";
import {createUserWithEmailAndPassword} from "firebase/auth";



export const CreateUserWithEmailAndPassword = ({email, password}) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const SignOutUser = () => {
    return FIREBASE_AUTH.signOut();
};

export const SignInWithGoogle = () => {
    return console.log('SignInWithGoogle');
};

export const SignInWithFacebook = () => {
    return console.log('SignInWithFacebook');
};