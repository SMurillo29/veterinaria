import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB080q7F6Cf8p05pmAVRY9pc_nUMjPwL5c",
  authDomain: "veterinaria-c5b9f.firebaseapp.com",
  projectId: "veterinaria-c5b9f",
  storageBucket: "veterinaria-c5b9f.appspot.com",
  messagingSenderId: "366699586414",
  appId: "1:366699586414:web:6eed239f4e5e10433e577f"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig)


