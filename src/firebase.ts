import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBAXauyBGJU1mzhcy-T8KXCRaiYvt8iydA",
  authDomain: "react-auth-ee1a6.firebaseapp.com",
  projectId: "react-auth-ee1a6",
  storageBucket: "react-auth-ee1a6.appspot.com",
  messagingSenderId: "925410279008",
  appId: "1:925410279008:web:4c0b2c56f0cc0dc79a8d05",
  measurementId: "G-1REP99R6NH"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

export const auth = firebase.auth();
export default firebase;
