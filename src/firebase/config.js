import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, update, get, onValue } from "firebase/database";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyD29zvJ5gOvHRgk1qUWFzZJL8foY1sf8bk",
  authDomain: "primeroastweb.firebaseapp.com",
  databaseURL: "https://primeroastweb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "primeroastweb",
  storageBucket: "primeroastweb.appspot.com",
  messagingSenderId: "157736544071",
  appId: "1:157736544071:web:2713ba60d8edddc5344e62",
  measurementId: "G-MGMCTZCX2G"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app); 
const auth = getAuth(app); 

export { app, analytics, db,auth,ref,set,update,get,onValue  };