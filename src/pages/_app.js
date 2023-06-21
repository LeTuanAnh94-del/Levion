import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { getOrders, onInitFirebaseApp } from "@/firebase/firebase";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { Suspense, useEffect, useState } from "react";
import "react-toastify/ReactToastify.min.css";
import Loading from "./loading";
import { ToastContainer } from "react-toastify";

onInitFirebaseApp();

export default function App({ Component, pageProps }) {
  const [isFullContentPage, setIsFullContentPage] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const _isFullContentPage =
      typeof window !== "undefined" &&
      ["/login", "/register", "/forgot-password"].includes(router.pathname);

    setIsFullContentPage(_isFullContentPage);
    setIsFirstRender(false);
  }, [router]);

  // useEffect(() => {
  //   getOrders();
  // }, []);

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
      <Footer />
    </div>
  );
}
