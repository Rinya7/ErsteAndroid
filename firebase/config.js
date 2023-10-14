// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAuth } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA90VG8f0aEBtJeqigrfkkTj2Mhh_aVOJU",
  authDomain: "myandroidapp-f5bd1.firebaseapp.com",
  projectId: "myandroidapp-f5bd1",
  storageBucket: "myandroidapp-f5bd1.appspot.com",
  messagingSenderId: "318334086086",
  appId: "1:318334086086:web:e691c7f0e8d3af71fba0c7",
  measurementId: "G-6QHWJZNT1H",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

//export const db = getFirestore(app);
export const storage = getStorage(app);

export default auth;
