import Head from "next/head";

import type { AppProps } from "next/app";

import { ChainProvider } from "@cosmos-kit/react-lite";
import Navbar from "../components/Navbar";
import { Chains } from "@chain-registry/types";

import "../styles/globals.css";
import { chains } from "~/config/chains";
import { wallets as vectisWallets } from "@cosmos-kit/vectis";
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

      <ChainProvider
        assetLists={[]}
        chains={chains as Chains}
        wallets={vectisWallets}
        endpointOptions={{
          endpoints: {
            junolocalnet: {
              rest: ["http://localhost:1317"],
              rpc: ["http://localhost:26657"],
            },
          },
        }}
      >
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
      </ChainProvider>
    </>
  );
}

export default VectisApp;
