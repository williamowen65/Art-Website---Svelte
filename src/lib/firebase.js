import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';


const firebaseConfig = {
    apiKey: "AIzaSyC_NsYU251eWSP7x5q3Mk5VvXFgML6m9pc",
    authDomain: "art-website-d1dfe.firebaseapp.com",
    projectId: "art-website-d1dfe",
    storageBucket: "art-website-d1dfe.appspot.com",
    messagingSenderId: "1082267217866",
    appId: "1:1082267217866:web=6ef4d6343e2fbda48a2933",
    measurementId: "G-VW2HHRP6S9"
}


// Initialize Firebase
console.count('initializeApp')
console.log({ 'firebase.apps': firebase.apps, getFirestore })
let app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
firebase.apps.push(app)


export const db = getFirestore(app);
export const auth = getAuth(app);
// console.log({ firebaseConfig, app, db, auth })
export const firestore = app
