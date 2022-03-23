// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { ref } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPt-4857nQWinXoxcETabBqiDrSf8WcC8",
  authDomain: "f2kworld.firebaseapp.com",
  projectId: "f2kworld",
  storageBucket: "f2kworld.appspot.com",
  messagingSenderId: "903958259792",
  appId: "1:903958259792:web:3a013f20761755336e8955",
  measurementId: "G-JP5VLXBBS2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const analytics = getAnalytics(app);

export const presenceRef = ref(database, "precense");
