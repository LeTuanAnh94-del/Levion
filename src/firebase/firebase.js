import firebase, { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBA1mkfYB9JpdMUHA1dw7woMU5AH82UUSQ",
  projectId: "vietgangz-cbb8e",
  storageBucket: "vietgangz-cbb8e.appspot.com",
  messagingSenderId: "764177501399",
  appId: "1:764177501399:ios:dade0d53fdcb7119ccb492",
};

export const appFirebase = initializeApp(firebaseConfig);

const fireStore = firebase.firestore();

export default fireStore;
