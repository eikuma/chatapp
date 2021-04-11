import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyC_wkOjoZ8FPokrWz-gFxGuPcbOR49Eti4",
    authDomain: "chatapp-31515.firebaseapp.com",
    databaseURL: "https://chatapp-31515.firebaseio.com",
    projectId: "chatapp-31515",
    storageBucket: "chatapp-31515.appspot.com",
    messagingSenderId: "903668150993",
    appId: "1:903668150993:web:b47913f033b455c1038bf0",
    measurementId: "G-RMYDY86GLL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export const auth = firebase.auth(); //ログイン機能のための変数https://firebase.google.com/docs/auth/web/manage-users?hl=ja
export const db = firebase.firestore();