import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBNWieY1hiscJ0EAzkA_lqoz3VzJuO99H8",
  authDomain: "mernadda.firebaseapp.com",
  databaseURL: "https://mernadda-default-rtdb.firebaseio.com/",
  projectId: "mernadda",
  storageBucket: "gs://mernadda.appspot.com",
  messagingSenderId: "321827330120",
  appId: "1:321827330120:web:c52e0b82643e727a00a07d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);


export default firebaseConfig