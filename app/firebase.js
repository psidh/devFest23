import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB-Rkf1mhTFTHaftLC28zrth4bmfHLdtIc',
  authDomain: 'devfest23-5fb80.firebaseapp.com',
  projectId: 'devfest23-5fb80',
  storageBucket: 'devfest23-5fb80.appspot.com',
  messagingSenderId: '817019684183',
  appId: '1:817019684183:web:8d148f3be2e57b0aecaa12',
  measurementId: 'G-EQ5CY0CJBY',
};

const app = firebase.initializeApp(firebaseConfig);
export const db = app.firestore();
