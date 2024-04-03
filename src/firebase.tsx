// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPnIQFs-q1jDX4LJWE0C8WA-7E7fnKnpg",
  authDomain: "point-of-sale-59331.firebaseapp.com",
  databaseURL: "https://point-of-sale-59331-default-rtdb.firebaseio.com",
  projectId: "point-of-sale-59331",
  storageBucket: "point-of-sale-59331.appspot.com",
  messagingSenderId: "115442671167",
  appId: "1:115442671167:web:cb4da070f57eca5a15628a",
  measurementId: "G-C1WW3YTGR3",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase analytics
const analytics = getAnalytics(app);

// Initialize Firebase database
const database = getDatabase(app);

// Function to start Firebase and return database reference
function StartFirebase() {
  return database;
}

export default StartFirebase;
