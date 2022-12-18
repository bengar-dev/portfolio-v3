import "../styles/globals.css";
import "../styles/fonts.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import AOS from "aos";

import "aos/dist/aos.css";
import AppContextProvider from "../context/AppContext";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);

  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  );
}

export default MyApp;
