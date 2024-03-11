// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
  measurementId: "G-C1WW3YTGR3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);