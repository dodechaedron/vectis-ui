import Head from "next/head";

import type { AppProps } from "next/app";

import Navbar from "../components/Navbar";

import "../styles/globals.css";

import { Anek_Latin } from "@next/font/google";
import { DaoProvider, CosmWasmProvider } from "~/providers";
import clsx from "clsx";
import { ModalProvider } from "~/providers/ModalProvider";
import ControlModal from "~/components/Modal/ControlModal";

const font = Anek_Latin({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

function VectisApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico?v=3" />
      </Head>

      <CosmWasmProvider>
        <DaoProvider>
          <ModalProvider>
            <Navbar />
            <main className={clsx("my-0 mx-auto max-w-[1054px] p-4", font.className)}>
              <Component {...pageProps} />
            </main>
            <ControlModal />
          </ModalProvider>
        </DaoProvider>
      </CosmWasmProvider>
    </>
  );
}

export default VectisApp;
