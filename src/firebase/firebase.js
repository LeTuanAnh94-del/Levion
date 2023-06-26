import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  and,
  collection,
  getDocs,
  getFirestore,
  or,
  query,
  where,
} from "firebase/firestore/lite";

const firebaseConfig = {
  // apiKey: "AIzaSyBLPeieDSs-fi75wzML5WMfjNwej7NFZ6U",
  // authDomain: "levion-2057d.firebaseapp.com",
  // projectId: "levion-2057d",
  apiKey: "AIzaSyBA1mkfYB9JpdMUHA1dw7woMU5AH82UUSQ",
  projectId: "vietgangz-cbb8e",
  storageBucket: "vietgangz-cbb8e.appspot.com",
  messagingSenderId: "764177501399",
  appId: "1:764177501399:ios:dade0d53fdcb7119ccb492",
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

export const getOrders = async (categoryFilter, cityFilter, phoneSearch) => {
  if (!app) return;

  const db = getFirestore(app);

  let queryBuilder = null;

  if (cityFilter && phoneSearch && categoryFilter) {
    queryBuilder = query(
      collection(db, "orders"),
      and(
        where("city", "==", cityFilter || ""),
        where("phone", "==", phoneSearch || ""),
        where("categoryId", "==", categoryFilter || "")
      )
    );
  } else if (categoryFilter && cityFilter) {
    queryBuilder = query(
      collection(db, "orders"),
      and(
        where("categoryId", "==", categoryFilter || ""),
        where("city", "==", cityFilter || "")
      )
    );
  } else if (categoryFilter && phoneSearch) {
    queryBuilder = query(
      collection(db, "orders"),
      and(
        where("categoryId", "==", categoryFilter || ""),
        where("phone", "==", phoneSearch || "")
      )
    );
  } else if (cityFilter && phoneSearch) {
    queryBuilder = query(
      collection(db, "orders"),
      and(
        where("city", "==", cityFilter || ""),
        where("phone", "==", phoneSearch || "")
      )
    );
  } else if (cityFilter && phoneSearch && categoryFilter) {
    queryBuilder = query(
      collection(db, "orders"),
      and(
        where("city", "==", cityFilter || ""),
        where("phone", "==", phoneSearch || ""),
        where("categoryId", "==", categoryFilter || "")
      )
    );
  } else {
    if (categoryFilter === "" && cityFilter === "") {
      queryBuilder = query(collection(db, "orders"));
    } else {
      queryBuilder = query(
        collection(db, "orders"),
        or(
          and(where("categoryId", "==", categoryFilter || "")),
          and(where("city", "==", cityFilter || "")),
          and(where("phone", "==", phoneSearch || ""))
        )
      );
    }
  }

  const citySnapshot = await getDocs(queryBuilder);
  const orderList = citySnapshot.docs.map((doc) => doc.data());
  
  return orderList;
};
