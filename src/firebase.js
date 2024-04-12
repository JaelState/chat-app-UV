import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB3Q20lstI71v50_CAx-U-aPVF42DreLec",
    authDomain: "spook-c9c2d.firebaseapp.com",
    projectId: "spook-c9c2d",
    storageBucket: "spook-c9c2d.appspot.com",
    messagingSenderId: "182764752167",
    appId: "1:182764752167:web:a1ede4741298303af16d02",
    measurementId: "G-200LBE0CFR"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;



