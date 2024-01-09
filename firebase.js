// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
//import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
//import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAX4kHWwhCVOdozcpiV0mBeKO9mhRAzjbA",
  authDomain: "nevix-e496d.firebaseapp.com",
  projectId: "nevix-e496d",
  storageBucket: "nevix-e496d.appspot.com",
  messagingSenderId: "119997746663",
  appId: "1:119997746663:web:5b6fe96a1c919c26e54142"
};

//Initialize Firebase

const app = initializeApp(firebaseConfig);
//const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore();

export {auth,db};