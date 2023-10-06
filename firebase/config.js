// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDzV8y73_u2RY8n21GqNl_fJbKX3y3vc8U",
  authDomain: "ersteandroid-33667.firebaseapp.com",
  databaseURL:
    "https://ersteandroid-33667-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ersteandroid-33667",
  storageBucket: "ersteandroid-33667.appspot.com",
  messagingSenderId: "256325972019",
  appId: "1:256325972019:web:05854723cc0fa5008ef346",
  measurementId: "G-K2Y85X67DW",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default auth;
