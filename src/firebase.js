import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC_NsYU251eWSP7x5q3Mk5VvXFgML6m9pc",
    authDomain: "art-website-d1dfe.firebaseapp.com",
    projectId: "art-website-d1dfe",
    storageBucket: "art-website-d1dfe.appspot.com",
    messagingSenderId: "1082267217866",
    appId: "1:1082267217866:web=6ef4d6343e2fbda48a2933",
    measurementId: "G-VW2HHRP6S9"
}
// console.log({
//     initializeApp,
//     getAuth,
//     getFirestore,
//     getStorage,
// })


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };