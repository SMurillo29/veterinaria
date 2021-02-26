import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3KfpMTrU6JRdiw9WEKgdd-pW3ry2cZ7Y",
  authDomain: "crud-f4bab.firebaseapp.com",
  projectId: "crud-f4bab",
  storageBucket: "crud-f4bab.appspot.com",
  messagingSenderId: "742471849119",
  appId: "1:742471849119:web:6c5fed636be7b7704afeaa",
}
export const firebaseApp = firebase.initializeApp(firebaseConfig)


