import { FIREBASE_AUTH } from "../../firebaseConfig";
import {createUserWithEmailAndPassword} from "firebase/auth";
import Expo from 'expo';

googleLogin = async () => {
    try {
        const result = await Expo.Google.logInAsync({
            androidClientId: "897286761932-bujvtc43va53gr3vk5ej4ngn0ip4gq0r.apps.googleusercontent.com",
            //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
            scopes: ["profile", "email"]

        })
        if (result.type === "success") {
            const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);
            firebase.auth().signInAndRetrieveDataWithCredential(credential).then(function (result) {
                console.log(result);
            });
            this.props.navigation.navigate('Where you want to go');
        } else {
            console.log("cancelled")
        }
    } catch (e) {
        console.log("error", e)
    }
}

export const CreateUserWithEmailAndPassword = ({email, password}) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const SignOutUser = () => {
    return FIREBASE_AUTH.signOut();
};

export const SignInWithGoogle = () => {
    googleLogin();
    return console.log('SignInWithGoogle');
};

export const SignInWithFacebook = () => {
    return console.log('SignInWithFacebook');
};