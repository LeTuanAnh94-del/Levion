import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBLPeieDSs-fi75wzML5WMfjNwej7NFZ6U",
  authDomain: "levion-2057d.firebaseapp.com",
  projectId: "levion-2057d",
  //   apiKey: "AIzaSyBA1mkfYB9JpdMUHA1dw7woMU5AH82UUSQ",
  //   projectId: "vietgangz-cbb8e",
  //   storageBucket: "vietgangz-cbb8e.appspot.com",
  //   messagingSenderId: "764177501399",
  //   appId: "1:764177501399:ios:dade0d53fdcb7119ccb492",
};

let app = null;
let auth = null;

export const onInitFirebaseApp = () => {
  if (!app) {
    app = initializeApp(firebaseConfig, "[DEFAULT]", true);
    auth = getAuth(app);
  }
};

export { auth };

export const getOrders = async () => {
  if (!app) return;
  const db = getFirestore(app);

  const queryBuilder = query(
    collection(db, "orders"),
    where("email", "==", "test@gmail.com")
  );

  const citySnapshot = await getDocs(queryBuilder);
  const orderList = citySnapshot.docs.map((doc) => doc.data());
  return orderList;
};
