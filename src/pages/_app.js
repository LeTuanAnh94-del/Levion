import { getAuth } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import { Suspense, useEffect, useState } from "react";
import "react-toastify/ReactToastify.min.css";
import "@/styles/globals.css";

import Header from "@/components/layout/header";
import Loading from "./loading";
import { getOrders, onInitFirebaseApp } from "@/firebase/firebase";
import { useRouter } from "next/router";
import { appFirebase } from "../firebase/firebase";

onInitFirebaseApp();

export default function App({ Component, pageProps }) {
  const [isFullContentPage, setIsFullContentPage] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const auth = getAuth(appFirebase);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/");
      } else {
        router.push("/login");
      }
    });
    return () => {
      unsubscribe();
    };
  }, [auth, router]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const _isFullContentPage =
      typeof window !== "undefined" &&
      ["/login", "/register", "/forgot-password", "/congratulation"].includes(
        router.pathname
      );

    setIsFullContentPage(_isFullContentPage);
    setIsFirstRender(false);
  }, [router]);

  useEffect(() => {
    getOrders();
  }, []);

  if (isFirstRender) return null;
  if (isFullContentPage) {
    return <Component {...pageProps} />;
  }

  return (
    <div>
      <Header />
      <Suspense fallback={<Loading />}>
        <Component {...pageProps} />
        <ToastContainer />
      </Suspense>
    </div>
  );
}
