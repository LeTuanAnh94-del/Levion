import "@/styles/globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Suspense, useEffect, useState } from "react";
import Loading from "./loading";
import { useRouter } from "next/router";
import "react-toastify/ReactToastify.min.css";

export default function App({ Component, pageProps }) {
  const [isFullContentPage, setIsFullContentPage] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const _isFullContentPage =
      typeof window !== "undefined" &&
      ["/login", "/register"].includes(router.pathname);

    setIsFullContentPage(_isFullContentPage);
    setIsFirstRender(false);
  }, [router]);

  if (isFirstRender) return null;
  if (isFullContentPage) {
    return <Component {...pageProps} />;
  }

  return (
    <div>
      <Header />
      <Suspense fallback={<Loading />}>
        <Component {...pageProps} />
      </Suspense>
      <Footer />
    </div>
  );
}
