import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC8qmqVCgKsbVTml4gfw47RCUsLizQQCA4",
  authDomain: "adoptme-36e2a.firebaseapp.com",
  databaseURL:
    "https://adoptme-36e2a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "adoptme-36e2a",
  storageBucket: "adoptme-36e2a.appspot.com",
  messagingSenderId: "410787635697",
  appId: "1:410787635697:web:1e85417062cace591e6450",
  measurementId: "G-B2MZ0SK6E4",
};

export const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
